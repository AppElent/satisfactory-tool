import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import * as Yup from 'yup';
import { createDefaultSchema } from '..';

export const productionInputYupSchema = Yup.object().shape({
  item: Yup.string().required().label('Product'),
  amount: Yup.number().required().label('Amount').default(0),
});

export type ProductionInput = Yup.InferType<typeof productionInputYupSchema>;

export const createProductionInputSchema = () => {
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
  };
  const defaultSchema = createDefaultSchema<ProductionInput>(
    productionInputYupSchema,
    customFieldDefinitions
  );
  return {
    ...defaultSchema,
    getTemplate: () => {
      return {
        ...defaultSchema.getTemplate(),
        amount: 0,
      };
    },
  };
};

// export class ProductionInputSchema extends DefaultSchema<ProductionInput> {
//   constructor(public yupSchema: Yup.ObjectSchema<any>) {
//     super(yupSchema);
//   }

//   getTemplate(): { [key: string]: any } {
//     return {
//       ...super.getTemplate(),
//       amount: 0,
//     };
//   }
// }

// export const productionInputSchema = new ProductionInputSchema(productionInputYupSchema);
