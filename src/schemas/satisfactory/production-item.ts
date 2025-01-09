import * as Yup from 'yup';
import DefaultSchema from '..';

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
