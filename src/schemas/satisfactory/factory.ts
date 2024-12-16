import * as Yup from 'yup';
import { calculatorYupSchema } from './calculator';

export const factoryYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3),
  name: Yup.string().required().min(3),
  description: Yup.string().min(3),
  calculator: calculatorYupSchema,
  recipes: Yup.array().of(
    Yup.object().shape({
      recipeClass: Yup.string().required(),
      amount: Yup.number().required(),
    })
  ),
});

export type Factory = Yup.InferType<typeof factoryYupSchema>;

export default class FactoryClass implements Factory {
  id: string;
  name: string;
  description?: string;
  calculator: any;
  recipes?: any[];

  constructor(factory: Factory) {
    this.id = factory.id;
    this.name = factory.name;
    this.description = factory.description;
    this.calculator = factory.calculator;
    this.recipes = factory.recipes;
  }
}
