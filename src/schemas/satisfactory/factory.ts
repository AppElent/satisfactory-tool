import * as Yup from 'yup';
import DefaultSchema from '..';
import { Calculator, calculatorYupSchema } from './calculator';

export const factoryYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3).label('ID'),
  name: Yup.string().required().min(3).label('Name').default(''),
  description: Yup.string().min(3).label('Description').default(''),
  production: Yup.array().of(calculatorYupSchema).default([]),
});

export type Factory = Yup.InferType<typeof factoryYupSchema>;

export class FactorySchema extends DefaultSchema<Factory> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }

  getTemplate = () => {
    return {
      ...super.getTemplate(),
      id: this._generateNanoId(),
    };
  };
}

export const factorySchema = new FactorySchema(factoryYupSchema);

export default class FactoryClass implements Factory {
  id: string;
  name: string;
  description: string;
  production: Calculator[];

  constructor(factory: Factory) {
    this.id = factory.id;
    this.name = factory.name;
    this.description = factory.description;
    this.production = factory.production;
    // this.calculator = factory.calculator;
    // this.recipes = factory.recipes;
  }

  // getNetworks = () => {
  //   const networks = this.production.map((calculator) => calculator.result);
  //   return networks;
  // };
}
