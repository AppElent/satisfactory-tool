import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryMiner extends SatisfactoryBaseItem {
  allowedResources: string[];
  extractionRate: number;
}

export default class Miner extends BaseItem implements SatisfactoryMiner {
  public allowedResources: string[];
  public extractionRate: number;

  constructor(
    miner: SatisfactoryMiner,
    public data: SatisfactoryData
  ) {
    super(miner);
    this.allowedResources = miner.allowedResources;
    this.extractionRate = miner.extractionRate;
  }

  getBuildable = () => {
    return this.data.getBuildable(this.className);
  };

  toObject = () => {
    return {
      ...super.toObject(),
      allowedResources: this.allowedResources,
      extractionRate: this.extractionRate,
    };
  };
}
