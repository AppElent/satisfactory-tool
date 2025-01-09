import { FieldConfig } from '@/libs/forms';
import { faker } from '@faker-js/faker';
import _, { merge } from 'lodash';
import * as Yup from 'yup';

export interface Schema {
  [key: string]: {
    required?: boolean;
    type?: string;
    minLength?: number;
  };
}

type YupSchema<T extends Yup.AnyObject> = Yup.ObjectSchema<T>;

export default class DefaultSchema<T> {
  // public getCustomFieldDefinitions?: () => { [key: string]: { [key: string]: any } } | undefined;
  public getCustomFieldDefinitions?: () => { [key: string]: Partial<FieldConfig> } | undefined;
  constructor(
    public yupSchema: Yup.ObjectSchema<any>
    // public getCustomFieldDefinitions?: () => {
    //   [key: string]: { [key: string]: Partial<FieldConfig> };
    // }
  ) {
    // this.getCustomFieldDefinitions = () => customFieldDefinitions;
  }

  #generateTestData = <T extends Yup.AnyObject>(schema: YupSchema<T>): T => {
    const shape = schema.fields;
    const data: Partial<T> = {};

    Object.keys(shape).forEach((key) => {
      const field = shape[key];

      if (field instanceof Yup.StringSchema) {
        const minLength = (field.spec as any).min ?? 5;
        const maxLength = (field.spec as any).max ?? 20;
        data[key as keyof T] = faker.lorem.words(
          faker.number.int({ min: minLength, max: maxLength })
        ) as any;
      } else if (field instanceof Yup.NumberSchema) {
        const min = (field.spec as any).min ?? 0;
        const max = (field.spec as any).max ?? 100;
        data[key as keyof T] = faker.number.int({ min, max }) as any;
      } else if (field instanceof Yup.BooleanSchema) {
        data[key as keyof T] = faker.datatype.boolean() as any;
      } else if (field instanceof Yup.DateSchema) {
        const minDate = (field.spec as any).min
          ? new Date((field.spec as any).min)
          : faker.date.past();
        const maxDate = (field.spec as any).max
          ? new Date((field.spec as any).max)
          : faker.date.future();
        data[key as keyof T] = faker.date.between({ from: minDate, to: maxDate }) as any;
      } else if (field instanceof Yup.ArraySchema) {
        const itemType = (field as Yup.ArraySchema<any, any, any, any>).innerType;
        const minItems = (field.spec as any).min ?? 1;
        const maxItems = (field.spec as any).max ?? 5;
        const length = faker.number.int({ min: minItems, max: maxItems });

        if (itemType instanceof Yup.StringSchema) {
          data[key as keyof T] = Array.from({ length }, () => faker.lorem.word()) as any;
        } else if (itemType instanceof Yup.NumberSchema) {
          data[key as keyof T] = Array.from({ length }, () => faker.number.int()) as any;
        }
      } else if (field instanceof Yup.ObjectSchema) {
        data[key as keyof T] = this.#generateTestData(field) as any;
      }
    });

    return data as T;
  };

  generateObjectName = () => {
    return faker.word.noun();
  };

  generateName = () => {
    const name = faker.word.verb() + ' ' + faker.word.noun();
    // Capatalize first letter of each word
    return name.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  _generateId = () => {
    return faker.string.uuid();
  };

  _generateUlid = () => {
    return faker.string.ulid();
  };

  _generateNanoId = (options?: number | { min: number; max: number }) => {
    return faker.string.nanoid(options);
  };

  _generateUuid = () => {
    return faker.string.uuid();
  };

  getTemplate(): Partial<T> {
    const defaultValues = this.yupSchema.getDefault();
    // Return all non undefined values
    return Object.keys(defaultValues).reduce((acc: Partial<T>, key) => {
      if (defaultValues[key] !== undefined) {
        acc[key as keyof T] = defaultValues[key as keyof T];
      }
      return acc;
    }, {});
    // return this.yupSchema.getDefault();
  }

  getFieldTemplate(field: string) {
    const template: { [key: string]: any } = this.getTemplate();
    return template[field] || undefined;
  }

  getTestData = (count?: number): T | T[] => {
    // If number is 1, return a single object
    if (!count || count === 1) {
      return {
        ...this.#generateTestData(this.yupSchema),
        name: faker.word.verb() + ' ' + faker.word.noun(),
      };
    } else if (count > 1) {
      return Array.from({ length: count }, () => {
        return {
          ...this.#generateTestData(this.yupSchema),
          name: faker.word.verb() + ' ' + faker.word.noun(),
        };
      });
    } else {
      throw new Error('Count must be greater than 0');
    }
  };

  getFieldDefinitions(): {
    [key: string]: FieldConfig;
  } {
    // Go through all fields and add them to the return schema.
    // Merge with fieldConfig if it exists.
    // If there are meta fields, also add them
    // If there are nested fields, also add them

    const result: { [key: string]: FieldConfig } = {};
    const extractFields = (schema: Yup.ObjectSchema<any>, basePath?: string) => {
      const fields = schema.fields;
      Object.keys(fields).forEach((key) => {
        const newKey = basePath ? `${basePath}.${key}` : key;
        const field = fields[key];
        const description = field.describe();
        const label = 'label' in description ? description.label : key;
        const defaultValue = 'default' in description ? description.default : undefined;
        const meta = 'meta' in description ? description.meta : {};
        const newField: FieldConfig = {
          name: newKey,
          id: key,
          label,
          type: description.type,
          default: defaultValue,
          ...meta,
        };

        if (field.describe().type === 'object') {
          extractFields(field as Yup.ObjectSchema<any>, newField.name);
        } else if (field.describe().type === 'array') {
          const itemType = (field as Yup.ArraySchema<any, any, any, any>).innerType;
          if (itemType instanceof Yup.ObjectSchema) {
            extractFields(itemType as Yup.ObjectSchema<any>, newField.name);
          }
        }
        result[newKey] = newField;
      });
    };
    extractFields(this.yupSchema);
    const customFieldDefinitions = this.getCustomFieldDefinitions
      ? this.getCustomFieldDefinitions()
      : {};
    const returnFieldDefinitions = _.merge({}, result, customFieldDefinitions);
    return returnFieldDefinitions; //defaultFieldDefinitions;
    // const merged = merge({}, result, fieldConfig);
    // return merged;
  }
}

export const extractFieldDefinitionFromYupSchema = (
  schema: Yup.ObjectSchema<any>,
  fieldConfig?: { [key: string]: Partial<FieldConfig> }
): { [key: string]: FieldConfig } => {
  // Go through all fields and add them to the return schema.
  // Merge with fieldConfig if it exists.
  // If there are meta fields, also add them
  // If there are nested fields, also add them

  const result: { [key: string]: FieldConfig } = {};
  const extractFields = (schema: Yup.ObjectSchema<any>, basePath?: string) => {
    const fields = schema.fields;
    Object.keys(fields).forEach((key) => {
      const newKey = basePath ? `${basePath}.${key}` : key;
      const field = fields[key];
      const description = field.describe();
      const label = 'label' in description ? description.label : key;
      const defaultValue = 'default' in description ? description.default : undefined;
      const meta = 'meta' in description ? description.meta : {};
      const newField: FieldConfig = {
        name: newKey,
        label,
        type: description.type,
        default: defaultValue,
        ...meta,
      };

      if (field.describe().type === 'object') {
        extractFields(field as Yup.ObjectSchema<any>, newField.name);
      } else if (field.describe().type === 'array') {
        const itemType = (field as Yup.ArraySchema<any, any, any, any>).innerType;
        extractFields(itemType as Yup.ObjectSchema<any>, newField.name);
      }
      result[newKey] = newField;
    });
  };
  extractFields(schema);
  const merged = merge({}, result, fieldConfig);
  return merged;
};

// const schemas = {
//   recipe: recipeYupSchema,
// };

// export const getYupSchema = (name: keyof typeof schemas) => {
//   const schema = {
//     ...schemas[name],
//   };
//   return schema;
// };
