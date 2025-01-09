import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import * as Yup from 'yup';
import DefaultSchema from '..';
import { factoryYupSchema } from './factory';
import { powerStationYupSchema } from './powerStation';

export const gameYupSchema = Yup.object().shape({
  id: Yup.string().required().min(3).label('ID'),
  name: Yup.string().required().min(3).label('Name'),
  owner: Yup.string().required().min(3).label('Owner'),
  factories: Yup.array().of(factoryYupSchema).label('Factories').default([]),
  notes: Yup.string().min(3).label('Notes'),
  todos: Yup.array().of(Yup.string().required().min(3)).label('Todos'),
  powerStations: Yup.array().of(powerStationYupSchema).label('Power Stations'),
  version: Yup.string().required().label('Version'),
  createdAt: Yup.date()
    .required()
    .default(() => new Date())
    .label('Created At'),
  updatedAt: Yup.date()
    .required()
    .default(() => new Date())
    .label('Updated At'),
});

export class GameSchema extends DefaultSchema<Game> {
  constructor(public yupSchema: Yup.ObjectSchema<any>) {
    super(yupSchema);
  }

  getTemplate() {
    return {
      ...super.getTemplate(),
      id: this._generateNanoId(),
      name: this.generateName(),
      version: satisfactoryData.version.key,
    };
  }
}

export const gameSchema = new GameSchema(gameYupSchema);

export type Game = Yup.InferType<typeof gameYupSchema>;

// export default class GameClass implements Game {
//   id: string;
//   name: string;
//   factories?: Factory[];
//   notes?: string;
//   todos?: string[];
//   powerStations?: PowerStation[];
//   version: string;
//   schema: GameSchema;

//   constructor(game: Game) {
//     this.id = game.id;
//     this.name = game.name;
//     this.factories = game.factories?.map((factory) => new FactoryClass(factory));
//     this.notes = game.notes;
//     this.todos = game.todos;
//     this.powerStations = game.powerStations?.map(
//       (powerStation) => new PowerStationClass(powerStation)
//     );
//     this.version = game.version;
//     this.schema = new GameSchema(gameYupSchema);
//   }
// }

// export const gameConverter = {
//   fromFirestore: (snapshot: any) => {
//     const data = snapshot.data();
//     return new GameClass(data);
//   },
//   toFirestore: (game: Game) => {
//     return { ...game };
//   },
// };
