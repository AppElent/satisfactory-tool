import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import * as Yup from 'yup';
import DefaultSchema, { createDefaultSchema } from '..';

export const productionItemYupSchema = Yup.object().shape({
  item: Yup.string().required().label('Product'),
  mode: Yup.string()
    .required()
    .oneOf(['perMinute', 'max'])
    .default('perMinute')
    .label('Production mode'),
  amount: Yup.number().required().default(0).label('Amount'),
  ratio: Yup.number().required().default(100).label('Ratio'),
});

export type ProductionItem = Yup.InferType<typeof productionItemYupSchema>;

export const createProductionItemSchema = () => {
  const customFieldDefinitions = {
    item: {
      options: satisfactoryData.products.map((product) => ({
        key: product.className,
        label: product.name,
        img: product.getIconComponent(),
      })),
      definition: 'autocomplete',
      custom: {
        muiTableCellProps: {
          width: 450,
        },
      },
    },
    mode: {
      options: [
        { key: 'perMinute', value: 'Per Minute' },
        { key: 'max', value: 'Max' },
      ],
      definition: 'select',
    },
  };
  const defaultSchema = createDefaultSchema<ProductionItem>(
    productionItemYupSchema,
    customFieldDefinitions
  );
  return {
    ...defaultSchema,
  };
};

export class ProductionItemSchema extends DefaultSchema<ProductionItem> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }

  getTemplate(): { [key: string]: any } {
    return {
      ...super.getTemplate(),
      mode: 'perMinute',
      amount: 0,
      ratio: 100,
    };
  }
}

export const productionItemSchema = new ProductionItemSchema(productionItemYupSchema);
