import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryBuilding extends SatisfactoryBaseItem {
  description: string;
  metadata: {
    powerConsumption: number;
    powerConsumptionExponent: number;
    manufacturingSpeed: number;
  };
}

export default class Building extends BaseItem implements SatisfactoryBuilding {
  public description: string;
  public metadata: {
    powerConsumption: number;
    powerConsumptionExponent: number;
    manufacturingSpeed: number;
  };

  constructor(
    building: SatisfactoryBuilding,
    public data: SatisfactoryData
  ) {
    super(building);
    this.description = building.description;
    this.metadata = building.metadata;
  }

  getBuildable = () => {
    return this.data.findBuildable(this.className);
  };
}
