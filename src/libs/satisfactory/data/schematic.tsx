import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactorySchematic extends SatisfactoryBaseItem {
  type: string;
  cost: {
    item: string;
    amount: number;
  }[];
  unlock: {
    recipes: string[];
    scannerResources: string[];
    inventorySlots: number;
    giveItems: { item: string; amount: number }[];
  };
  tier: number;
  time: number;
  mam: boolean;
  alternate: boolean;
}

export default class Schematic extends BaseItem implements SatisfactorySchematic {
  public type: string;
  public cost: SatisfactorySchematic['cost'];
  public unlock: SatisfactorySchematic['unlock'];
  public time: SatisfactorySchematic['time'];
  public tier: SatisfactorySchematic['tier'];
  public mam: boolean;
  public alternate: boolean;

  constructor(
    schematic: SatisfactorySchematic,
    public data: SatisfactoryData
  ) {
    super(schematic);
    this.type = schematic.type;
    this.cost = schematic.cost;
    this.unlock = schematic.unlock;
    this.time = schematic.time;
    this.tier = schematic.tier;
    this.mam = schematic.mam;
    this.alternate = schematic.alternate;
  }

  toObject = () => {
    return {
      ...super.toObject(),
      type: this.type,
      cost: this.cost,
      unlock: this.unlock,
      time: this.time,
      tier: this.tier,
      mam: this.mam,
      alternate: this.alternate,
    };
  };
}
