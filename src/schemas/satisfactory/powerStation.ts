import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import * as Yup from 'yup';
import { createDefaultSchema } from '..';

const generatorYupSchema = Yup.object().shape({
  type: Yup.string().required().min(3).label('Generator type'),
  amount: Yup.number().required().label('Amount').default(0),
  fuel: Yup.string().default('').label('Fuel'),
  potential: Yup.number().label('Potential'),
});

export type Generator = Yup.InferType<typeof generatorYupSchema>;

export const createPowerStationGeneratorSchema = () => {
  const customFieldDefinitions = {
    type: {
      options: satisfactoryData.generators.map((generator) => ({
        key: generator.className,
        label: generator.name,
        img: generator.getIconComponent(),
      })),
      definition: 'autocomplete',
    },
  };
  const defaultSchema = createDefaultSchema<Generator>(generatorYupSchema, customFieldDefinitions);
  return {
    ...defaultSchema,
    getTemplate: () => {
      return {
        ...defaultSchema.getTemplate(),
        type: '',
        amount: 0,
        potential: 0,
      };
    },
  };
};

export const powerStationYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3),
  name: Yup.string().required().min(3).label('Name'),
  generators: Yup.array().of(generatorYupSchema).default([]).label('Generators'),
});

export type PowerStation = Yup.InferType<typeof powerStationYupSchema>;

export const createPowerStationSchema = () => {
  const customFieldDefinitions = {
    'generators.type': createPowerStationGeneratorSchema().getFieldDefinitions().type,
  };
  const defaultSchema = createDefaultSchema<PowerStation>(
    powerStationYupSchema,
    customFieldDefinitions
  );
  return {
    ...defaultSchema,
    getTemplate: () => {
      return {
        ...defaultSchema.getTemplate(),
        id: defaultSchema.generateNanoId(),
        name: defaultSchema.generateName(),
      };
    },
  };
};

export class PowerStationSchema {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {}

  getTemplate(): { [key: string]: any } {
    return {
      id: '',
      name: '',
      generators: [],
    };
  }
}

export const powerStationSchema = new PowerStationSchema(powerStationYupSchema);

export default class PowerStationClass implements PowerStation {
  id: string;
  name: string;
  generators: Generator[];

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
