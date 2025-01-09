import * as Yup from 'yup';
import DefaultSchema from '..';

export const productionInputYupSchema = Yup.object().shape({
  item: Yup.string().required().label('Product'),
  amount: Yup.number().required().label('Amount'),
});

export type ProductionInput = Yup.InferType<typeof productionInputYupSchema>;

export class ProductionInputSchema extends DefaultSchema<ProductionInput> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }

  getTemplate(): { [key: string]: any } {
    return {
      ...super.getTemplate(),
      amount: 0,
    };
  }
}

export const productionInputSchema = new ProductionInputSchema(productionInputYupSchema);
