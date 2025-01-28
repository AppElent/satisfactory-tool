import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import * as Yup from 'yup';
import { createDefaultSchema } from '..';
import { createProductionInputSchema, productionInputYupSchema } from './production-input';
import { createProductionItemSchema, productionItemYupSchema } from './production-item';

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
  externalId: Yup.string().min(3).label('External ID'),
  name: Yup.string().required().min(3).default('').label('Name'),
  production: Yup.array().of(productionItemYupSchema).default([]).label('Production'),
  input: Yup.array().of(productionInputYupSchema).default([]).label('Input'),
  allowedAlternateRecipes: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedRecipes: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedResources: Yup.array().of(Yup.string().min(3).required()).default([]),
  blockedMachines: Yup.array().of(Yup.string().min(3).required()).default([]),
  sinkableResources: Yup.array().of(Yup.string().min(3).required()).default([]),
  resourceMax: resourceListSchema,
  // result: Yup.object().shape({
  //   item: Yup.string().required().label('Product'),
  //   amount: Yup.number().required().label('Amount'),
  // }), //TODO: fix
});

export type Calculator = Yup.InferType<typeof calculatorYupSchema>;

export const createCalculatorSchema = () => {
  const productionItemFieldDefinitions = createProductionItemSchema().getFieldDefinitions();
  const productionInputFieldDefinitions = createProductionInputSchema().getFieldDefinitions();
  const customFieldDefinitions = {
    // 'production.item': {
    //   options: satisfactoryData.products.map((product) => ({
    //     key: product.className,
    //     label: product.name,
    //     img: product.getIconComponent(),
    //   })),
    //   definition: 'autocomplete',
    //   custom: {
    //     muiTableCellProps: {
    //       width: 450,
    //     },
    //   },
    // },
    'production.item': productionItemFieldDefinitions.item,
    'production.mode': productionItemFieldDefinitions.mode,
    // {
    //   options: [
    //     { key: 'perMinute', value: 'Per Minute' },
    //     { key: 'max', value: 'Max' },
    //   ],
    //   definition: 'select',
    // },
    allowedAlternateRecipes: {
      options: satisfactoryData.recipes
        .filter((r) => r.alternate)
        .map((recipe) => {
          return {
            key: recipe.className,
            value: recipe.className,
            label: recipe.name,
            img: recipe.getIcon(),
          };
        }),
    },
    blockedRecipes: {
      options: satisfactoryData.recipes
        .filter((r) => !r.alternate)
        .map((recipe) => {
          return {
            key: recipe.className,
            value: recipe.className,
            label: recipe.name,
            img: recipe.getIcon(),
          };
        }),
    },
    blockedMachines: {
      options: satisfactoryData.buildings.map((machine) => {
        return {
          key: machine.className,
          value: machine.className,
          label: machine.name,
          img: machine.getIcon(),
        };
      }),
    },
    'input.item': productionInputFieldDefinitions.item,
    // {
    //   options: satisfactoryData.products.map((product) => ({
    //     key: product.className,
    //     label: product.name,
    //     img: product.getIconComponent(),
    //   })),
    //   definition: 'autocomplete',
    //   custom: {
    //     muiTableCellProps: {
    //       width: 450,
    //     },
    //   },
    // },
  };
  const defaultSchema = createDefaultSchema<Calculator>(
    calculatorYupSchema,
    customFieldDefinitions
  );

  return {
    ...defaultSchema,
    getTemplate: () => {
      const resourceMax = satisfactoryData.getResourceMax() as Calculator['resourceMax'];
      return {
        ...defaultSchema.getTemplate(),
        id: defaultSchema.generateNanoId(),
        name: '',
        resourceMax,
        blockedMachines: ['Desc_Converter_C'],
        production: [createProductionItemSchema().getTemplate()],
      };
    },
    clean: (calculator: Calculator) => {
      calculator.production = calculator.production?.filter(
        (prod) => prod.item && prod.item !== ''
      );
      calculator.input = calculator.input?.filter((input) => input.item && input.item !== '');
      calculator.name =
        calculator.name ||
        satisfactoryData.getProduct(calculator?.production?.[0]?.item)?.name ||
        'No products';
      return calculator;
    },
  };
};

// class CalculatorSchema extends DefaultSchema<Calculator> {
//   constructor(public yupSchema: Yup.ObjectSchema<any>) {
//     super(yupSchema);
//     this.getCustomFieldDefinitions = () => ({
//       'production.item': {
//         options: satisfactoryData.products.map((product) => ({
//           key: product.className,
//           label: product.name,
//           img: product.getIconComponent(),
//         })),
//         definition: 'autocomplete',
//         custom: {
//           muiTableCellProps: {
//             width: 450,
//           },
//         },
//       },
//       'production.mode': {
//         options: [
//           { key: 'perMinute', value: 'Per Minute' },
//           { key: 'max', value: 'Max' },
//         ],
//         definition: 'select',
//       },
//       allowedAlternateRecipes: {
//         options: satisfactoryData.recipes
//           .filter((r) => r.alternate)
//           .map((recipe) => {
//             return {
//               key: recipe.className,
//               value: recipe.className,
//               label: recipe.name,
//               img: recipe.getIcon(),
//             };
//           }),
//       },
//       blockedRecipes: {
//         options: satisfactoryData.recipes
//           .filter((r) => !r.alternate)
//           .map((recipe) => {
//             return {
//               key: recipe.className,
//               value: recipe.className,
//               label: recipe.name,
//               img: recipe.getIcon(),
//             };
//           }),
//       },
//       blockedMachines: {
//         options: satisfactoryData.buildings.map((machine) => {
//           return {
//             key: machine.className,
//             value: machine.className,
//             label: machine.name,
//             img: machine.getIcon(),
//           };
//         }),
//       },
//       'input.item': {
//         options: satisfactoryData.products.map((product) => ({
//           key: product.className,
//           label: product.name,
//           img: product.getIconComponent(),
//         })),
//         definition: 'autocomplete',
//         custom: {
//           muiTableCellProps: {
//             width: 450,
//           },
//         },
//       },
//     });
//   }

//   getTemplate = (): any => {
//     const resourceMax = satisfactoryData.getResourceMax();
//     return {
//       ...super.getTemplate(),
//       id: this._generateNanoId(),
//       name: '',
//       resourceMax,
//       blockedMachines: ['Desc_Converter_C'],
//       production: [productionItemSchema.getTemplate()],
//     };
//   };

//   // getFieldDefinitions = (): {
//   //   [key: string]: FieldConfig;
//   // } => {
//   //   const defaultFieldDefinitions = super.getFieldDefinitions();
//   //   // const customFieldDefinitions: { [key: string]: Partial<FieldConfig> } = {
//   //   //   'production.item': {
//   //   //     options: satisfactoryData.products.map((product) => ({
//   //   //       key: product.className,
//   //   //       label: product.name,
//   //   //       img: product.getIconComponent(),
//   //   //     })),
//   //   //     definition: 'autocomplete',
//   //   //     custom: {
//   //   //       muiTableCellProps: {
//   //   //         width: 450,
//   //   //       },
//   //   //     },
//   //   //   },
//   //   //   'production.mode': {
//   //   //     options: [
//   //   //       { key: 'perMinute', value: 'Per Minute' },
//   //   //       { key: 'max', value: 'Max' },
//   //   //     ],
//   //   //     definition: 'select',
//   //   //   },
//   //   //   allowedAlternateRecipes: {
//   //   //     options: satisfactoryData.recipes
//   //   //       .filter((r) => r.alternate)
//   //   //       .map((recipe) => {
//   //   //         return {
//   //   //           key: recipe.className,
//   //   //           value: recipe.className,
//   //   //           label: recipe.name,
//   //   //           img: recipe.getIcon(),
//   //   //         };
//   //   //       }),
//   //   //   },
//   //   //   blockedRecipes: {
//   //   //     options: satisfactoryData.recipes
//   //   //       .filter((r) => !r.alternate)
//   //   //       .map((recipe) => {
//   //   //         return {
//   //   //           key: recipe.className,
//   //   //           value: recipe.className,
//   //   //           label: recipe.name,
//   //   //           img: recipe.getIcon(),
//   //   //         };
//   //   //       }),
//   //   //   },
//   //   //   blockedMachines: {
//   //   //     options: satisfactoryData.buildings.map((machine) => {
//   //   //       return {
//   //   //         key: machine.className,
//   //   //         value: machine.className,
//   //   //         label: machine.name,
//   //   //         img: machine.getIcon(),
//   //   //       };
//   //   //     }),
//   //   //   },
//   //   //   'input.item': {
//   //   //     options: satisfactoryData.products.map((product) => ({
//   //   //       key: product.className,
//   //   //       label: product.name,
//   //   //       img: product.getIconComponent(),
//   //   //     })),
//   //   //     definition: 'autocomplete',
//   //   //     custom: {
//   //   //       muiTableCellProps: {
//   //   //         width: 450,
//   //   //       },
//   //   //     },
//   //   //   },
//   //   // };
//   //   // defaultFieldDefinitions['production.item'] = {
//   //   //   ...defaultFieldDefinitions['production.item'],
//   //   //   options: satisfactoryData.products.map((product) => ({
//   //   //     key: product.className,
//   //   //     label: product.name,
//   //   //     img: product.getIconComponent(),
//   //   //   })),
//   //   //   definition: 'autocomplete',
//   //   // };
//   //   // _.set(defaultFieldDefinitions['production.item'], 'custom.muiTableCellProps', {
//   //   //   width: 450,
//   //   // });
//   //   // _.set(defaultFieldDefinitions['input.item'], 'custom.muiTableCellProps', {
//   //   //   width: 450,
//   //   // });
//   //   // // _.set(defaultFieldDefinitions['production.item'], 'custom.muiAutocompleteProps', {
//   //   // //   width: 300,
//   //   // // });
//   //   // defaultFieldDefinitions['production.mode'] = {
//   //   //   ...defaultFieldDefinitions['production.mode'],
//   //   //   options: [
//   //   //     { key: 'perMinute', value: 'Per Minute' },
//   //   //     { key: 'max', value: 'Max' },
//   //   //   ],
//   //   //   definition: 'select',
//   //   // };
//   //   // defaultFieldDefinitions.allowedAlternateRecipes.options = satisfactoryData.recipes
//   //   //   .filter((r) => r.alternate)
//   //   //   .map((recipe) => {
//   //   //     return {
//   //   //       key: recipe.className,
//   //   //       value: recipe.className,
//   //   //       label: recipe.name,
//   //   //       img: recipe.getIcon(),
//   //   //     };
//   //   //   });
//   //   // defaultFieldDefinitions.blockedRecipes.options = satisfactoryData.recipes
//   //   //   .filter((r) => !r.alternate)
//   //   //   .map((recipe) => {
//   //   //     return {
//   //   //       key: recipe.className,
//   //   //       value: recipe.className,
//   //   //       label: recipe.name,
//   //   //       img: recipe.getIcon(),
//   //   //     };
//   //   //   });
//   //   // defaultFieldDefinitions.blockedMachines.options = satisfactoryData.buildings.map((machine) => {
//   //   //   return {
//   //   //     key: machine.className,
//   //   //     value: machine.className,
//   //   //     label: machine.name,
//   //   //     img: machine.getIcon(),
//   //   //   };
//   //   // });
//   //   // defaultFieldDefinitions['input.item'] = {
//   //   //   ...defaultFieldDefinitions['production.item'],
//   //   //   options: satisfactoryData.products.map((product) => ({
//   //   //     key: product.className,
//   //   //     label: product.name,
//   //   //     img: product.getIconComponent(),
//   //   //   })),
//   //   //   definition: 'autocomplete',
//   //   // };
//   //   const customFieldDefinitions = this.getCustomFieldDefinitions
//   //     ? this.getCustomFieldDefinitions()
//   //     : {};
//   //   const returnFieldDefinitions = _.merge({}, defaultFieldDefinitions, customFieldDefinitions);
//   //   return returnFieldDefinitions; //defaultFieldDefinitions;
//   // };

//   // getFieldDefinition = (id: string) => {
//   //   const fieldDefinitions = this.getFieldDefinitions();
//   //   return fieldDefinitions[id];
//   // };

//   // getFieldDefinitions = () => {
//   //   return {
//   //     ...super.getFieldDefinitions(),
//   //     custom: {
//   //       table: {
//   //         columns: [
//   //           { label: 'Name', key: 'name' },
//   //           { label: 'Production', key: 'production' },
//   //           { label: 'Input', key: 'input' },
//   //           { label: 'Allowed Recipes', key: 'allowedAlternateRecipes' },
//   //           { label: 'Blocked Recipes', key: 'blockedRecipes' },
//   //           { label: 'Blocked Resources', key: 'blockedResources' },
//   //           { label: 'Blocked Machines', key: 'blockedMachines' },
//   //           { label: 'Sinkable Resources', key: 'sinkableResources' },
//   //           { label: 'Resource Max', key: 'resourceMax' },
//   //         ],
//   //       },
//   //     }
//   //   }
//   // }
// }

// const calculatorSchema = new CalculatorSchema(calculatorYupSchema);
// export default calculatorSchema;
