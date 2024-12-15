import { SatisfactoryBaseItem } from '..';
import BaseItem from './base-item';
import { SatisfactoryData } from './satisfactory-data';

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

  getRecipe = () => {
    return this.data.buildableRecipes.find((r) =>
      r.products.find((p) => p.item === this.className)
    );
  };
}
