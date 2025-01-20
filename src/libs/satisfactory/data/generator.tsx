import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryGenerator extends SatisfactoryBaseItem {
  fuel: string[];
  powerProduction: number;
}

export default class Generator extends BaseItem implements SatisfactoryGenerator {
  public fuel: string[];
  public powerProduction: number;

  constructor(
    generator: SatisfactoryGenerator,
    public data: SatisfactoryData
  ) {
    super(generator);
    this.fuel = generator.fuel;
    this.powerProduction = generator.powerProduction;
  }

  getBuildable = () => {
    return this.data.getBuildable(this.className);
  };

  getFuels = () => {
    return this.fuel.map((fuel) => this.data.getProduct(fuel));
  };

  toObject = () => {
    return {
      ...super.toObject(),
      fuel: this.fuel,
      powerProduction: this.powerProduction,
    };
  };
}
