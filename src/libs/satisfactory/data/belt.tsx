import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryBelts extends SatisfactoryBaseItem {
  rate: number;
}

export default class Belt extends BaseItem implements SatisfactoryBelts {
  public rate: number;

  constructor(
    belt: SatisfactoryBelts,
    public data: SatisfactoryData
  ) {
    super(belt);
    this.rate = belt.rate;
  }

  getBuildable = () => {
    return this.data.getBuildable(this.className);
  };

  toObject = () => {
    return {
      ...super.toObject(),
      rate: this.rate,
    };
  };
}
