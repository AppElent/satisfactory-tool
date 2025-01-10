import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryBuildable extends SatisfactoryBaseItem {
  description: string;
  metadata: {
    powerConsumption: number;
    powerConsumptionExponent: number;
    manufacturingSpeed: number;
  };
}

export default class Buildable extends BaseItem implements SatisfactoryBuildable {
  public description: string;
  public metadata: {
    powerConsumption: number;
    powerConsumptionExponent: number;
    manufacturingSpeed: number;
  };

  constructor(
    buildable: SatisfactoryBuildable,
    public data: SatisfactoryData
  ) {
    super(buildable);
    this.description = buildable.description;
    this.metadata = buildable.metadata;
  }

  // getBuildableRecipe = (): BuildableRecipe => {
  //   return this.data.buildableRecipes.find((r) =>
  //     r.products.find((p) => p.item === this.className)
  //   );
  // };

  getRecipe = () => {
    throw new Error('getRecipe() cannot be used from buildable. Use getBuildableRecipe() instead.');
  };

  getBuildableRecipe = () => {
    return this.data.buildableRecipes.find((r) =>
      r.products.find((p) => p.item === this.className)
    );
  };

  toObject = () => {
    return {
      ...super.toObject(),
      description: this.description,
      metadata: this.metadata,
    };
  };
}
