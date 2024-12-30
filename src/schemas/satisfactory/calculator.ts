import { FieldConfig } from '@/libs/forms';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import _ from 'lodash';
import * as Yup from 'yup';
import DefaultSchema from '..';

export const productionInputYupSchema = Yup.object().shape({
  item: Yup.string().required(),
  amount: Yup.number().required(),
});

export type ProductionInput = Yup.InferType<typeof productionInputYupSchema>;

export const productionItemYupSchema = Yup.object().shape({
  item: Yup.string().required().label('Product'),
  mode: Yup.string()
    .required()
    .oneOf(['perMinute', 'max'])
    .default('perMinute')
    .label('Production mode'),
  amount: Yup.number().required().default(0).label('Amount'),
  ratio: Yup.number().required().default(100),
});

export type ProductionItem = Yup.InferType<typeof productionItemYupSchema>;

export const resourceListSchema = Yup.object().shape({
  Desc_OreIron_C: Yup.number().required().default(0).label('Iron Ore'),
  Desc_OreCopper_C: Yup.number().required().default(0).label('Copper Ore'),
  Desc_Stone_C: Yup.number().required().default(0).label('Limestone'),
  Desc_Coal_C: Yup.number().required().default(0).label('Coal'),
  Desc_OreGold_C: Yup.number().required().default(0).label('Caterium'),
  Desc_LiquidOil_C: Yup.number().required().default(0).label('Crude Oil'),
  Desc_RawQuartz_C: Yup.number().required().default(0).label('Raw Quartz'),
  Desc_Sulfur_C: Yup.number().required().default(0).label('Sulfur'),
  Desc_OreBauxite_C: Yup.number().required().default(0).label('Bauxite'),
  Desc_OreUranium_C: Yup.number().required().default(0).label('Uranium'),
  Desc_NitrogenGas_C: Yup.number().required().default(0).label('Nitrogen Gas'),
  Desc_SAM_C: Yup.number().required().default(0).label('SAM Ore'),
  Desc_Water_C: Yup.number().required().default(0).label('Water'),
});

export type ResourceList = Yup.InferType<typeof resourceListSchema>;

export const calculatorYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3),
  externalId: Yup.string().min(3),
  name: Yup.string().required().min(3).default('').label('Name'),
  production: Yup.array().of(productionItemYupSchema).default([]).label('Production'),
  input: Yup.array().of(productionInputYupSchema).default([]),
  allowedAlternateRecipes: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedRecipes: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedResources: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedMachines: Yup.array().of(Yup.string().min(3).required()).default([]),
  sinkableResources: Yup.array().of(Yup.string().min(3).required()).default([]),
  resourceMax: resourceListSchema,
});

export type Calculator = Yup.InferType<typeof calculatorYupSchema>;

class CalculatorSchemaClass extends DefaultSchema<Calculator> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }

  getTemplate = (): any => {
    return {
      ...super.getTemplate(),
      id: this._generateNanoId(),
    };
  };

  getFieldDefinitions = (): {
    [key: string]: FieldConfig;
  } => {
    const defaultFieldDefinitions = super.getFieldDefinitions();
    defaultFieldDefinitions['production.item'].options = satisfactoryData.products.map(
      (product) => ({
        key: product.className,
        label: product.name,
        img: product.getIcon(),
      })
    );
    _.set(defaultFieldDefinitions['production.item'], 'custom.muiTableCellProps', {
      width: 300,
    });
    // _.set(defaultFieldDefinitions['production.item'], 'custom.muiAutocompleteProps', {
    //   width: 300,
    // });
    defaultFieldDefinitions['production.mode'].options = [
      {
        key: 'perMinute',
        value: 'Per minute',
      },
      {
        key: 'max',
        value: 'Max',
      },
    ];
    defaultFieldDefinitions.allowedAlternateRecipes.options = satisfactoryData.recipes
      .filter((r) => r.alternate)
      .map((recipe) => {
        return {
          key: recipe.className,
          value: recipe.className,
          label: recipe.name,
          img: recipe.getIcon(),
        };
      });
    defaultFieldDefinitions.blockedRecipes.options = satisfactoryData.recipes
      .filter((r) => !r.alternate)
      .map((recipe) => {
        return {
          key: recipe.className,
          value: recipe.className,
          label: recipe.name,
          img: recipe.getIcon(),
        };
      });

    return defaultFieldDefinitions;
  };

  // getFieldDefinitions = () => {
  //   return {
  //     ...super.getFieldDefinitions(),
  //     custom: {
  //       table: {
  //         columns: [
  //           { label: 'Name', key: 'name' },
  //           { label: 'Production', key: 'production' },
  //           { label: 'Input', key: 'input' },
  //           { label: 'Allowed Recipes', key: 'allowedAlternateRecipes' },
  //           { label: 'Blocked Recipes', key: 'blockedRecipes' },
  //           { label: 'Blocked Resources', key: 'blockedResources' },
  //           { label: 'Blocked Machines', key: 'blockedMachines' },
  //           { label: 'Sinkable Resources', key: 'sinkableResources' },
  //           { label: 'Resource Max', key: 'resourceMax' },
  //         ],
  //       },
  //     }
  //   }
  // }
}

const calculatorSchemaClass = new CalculatorSchemaClass(calculatorYupSchema);
export default calculatorSchemaClass;
