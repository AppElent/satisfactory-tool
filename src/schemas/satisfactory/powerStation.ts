import * as Yup from 'yup';

const generatorYupSchema = Yup.object().shape({
  type: Yup.string().required().min(3),
  amount: Yup.number().required(),
});

export const powerStationYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3),
  name: Yup.string().required().min(3),
  generators: Yup.array().of(generatorYupSchema),
});

export type PowerStation = Yup.InferType<typeof powerStationYupSchema>;

export default class PowerStationClass implements PowerStation {
  id: string;
  name: string;
  generators?: any[];

  constructor(powerStation: PowerStation) {
    this.id = powerStation.id;
    this.name = powerStation.name;
    this.generators = powerStation.generators;
  }

  getTotalPower = () => {
    return this.generators?.reduce((acc, generator) => {
      return acc + generator.amount;
    }, 0);
  };
}
