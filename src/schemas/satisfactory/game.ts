import * as Yup from 'yup';
import DefaultSchema from '..';
import FactoryClass, { Factory, factoryYupSchema } from './factory';
import PowerStationClass, { PowerStation, powerStationYupSchema } from './powerStation';

export const gameYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3),
  name: Yup.string().required().min(3),
  factories: Yup.array().of(factoryYupSchema),
  notes: Yup.string().min(3),
  todos: Yup.array().of(Yup.string().required().min(3)),
  powerStations: Yup.array().of(powerStationYupSchema),
  version: Yup.string().required(),
});

export class GameSchema extends DefaultSchema<Game> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }
}

export type Game = Yup.InferType<typeof gameYupSchema>;

export default class GameClass implements Game {
  id: string;
  name: string;
  factories?: Factory[];
  notes?: string;
  todos?: string[];
  powerStations?: PowerStation[];
  version: string;
  schema: GameSchema;

  constructor(game: Game) {
    this.id = game.id;
    this.name = game.name;
    this.factories = game.factories?.map((factory) => new FactoryClass(factory));
    this.notes = game.notes;
    this.todos = game.todos;
    this.powerStations = game.powerStations?.map(
      (powerStation) => new PowerStationClass(powerStation)
    );
    this.version = game.version;
    this.schema = new GameSchema(gameYupSchema);
  }
}

export const gameConverter = {
  fromFirestore: (snapshot: any) => {
    const data = snapshot.data();
    return new GameClass(data);
  },
  toFirestore: (game: Game) => {
    return { ...game };
  },
};
