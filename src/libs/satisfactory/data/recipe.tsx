import { Chip, Tooltip } from '@mui/material';
import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryRecipe extends SatisfactoryBaseItem {
  alternate: boolean;
  time: number;
  inHand: boolean;
  forBuilding: boolean;
  inWorkshop: boolean;
  inMachine: boolean;
  manualTimeMultiplier: number;
  ingredients: {
    item: string;
    amount: number;
    name: string;
    amountMin: number;
  }[];
  products: {
    item: string;
    amount: number;
    name: string;
    amountMin: number;
  }[];
  producedIn: string;
  cyclesMin: number;
  isVariablePower: boolean;
  minPower: number;
  maxPower: number;
  rating?: {
    score: string;
    description: string;
  };
}

export type SatisfactoryBuildableRecipe = Omit<SatisfactoryRecipe, 'producedIn'>;

export default class Recipe extends BaseItem implements SatisfactoryRecipe {
  public alternate: boolean;
  public time: number;
  public inHand: boolean;
  public forBuilding: boolean;
  public inWorkshop: boolean;
  public inMachine: boolean;
  public manualTimeMultiplier: number;
  public ingredients: SatisfactoryRecipe['ingredients'];
  public products: SatisfactoryRecipe['products'];
  public producedIn: string;
  public isVariablePower: boolean;
  public minPower: number;
  public maxPower: number;
  public cyclesMin: number;
  public rating?: SatisfactoryRecipe['rating'];
  public data: SatisfactoryData;

  constructor(recipe: SatisfactoryRecipe, data: SatisfactoryData) {
    super(recipe);
    this.alternate = recipe.alternate;
    this.time = recipe.time;
    this.inHand = recipe.inHand;
    this.forBuilding = recipe.forBuilding;
    this.inWorkshop = recipe.inWorkshop;
    this.inMachine = recipe.inMachine;
    this.manualTimeMultiplier = recipe.manualTimeMultiplier;
    this.ingredients = recipe.ingredients;
    this.products = recipe.products;
    this.producedIn = recipe.producedIn;
    this.isVariablePower = recipe.isVariablePower;
    this.minPower = recipe.minPower;
    this.maxPower = recipe.maxPower;
    this.cyclesMin = recipe.cyclesMin;
    this.rating = recipe.rating;
    this.data = data;
  }

  getMachine = () => {
    return this.data.buildings.find((m) => m.className === this.producedIn);
  };

  getIngredients = () => {
    return this.ingredients.map((ingredient) => {
      const product = this.data.products.find((product) => product.className === ingredient.item);
      return {
        ...ingredient,
        product,
      };
    });
  };

  getProducts = () => {
    return this.products.map((p) => {
      const product = this.data.products.find((pr) => pr.className === p.item);
      return {
        ...p,
        product,
      };
    });
  };

  getProduct = () => {
    const foundProduct = this.products.find((p) => p.name === this.name);
    if (foundProduct) {
      return foundProduct;
    } else {
      return this.products[0];
    }
  };

  getIcon = () => {
    return this.data.products
      .find((p) => p.className === this.getProduct().item)
      ?.getIcon() as string;
  };

  getImage = () => {
    return this.data.products
      .find((p) => p.className === this.getProduct().item)
      ?.getImage() as string;
  };

  getRatingChip = () => {
    if (!this.rating) return null;
    const chipClass = {
      S: 'success',
      A: 'info',
      B: 'primary',
      C: 'warning',
      D: 'error',
      F: 'error',
    }[this.rating.score as 'S' | 'A' | 'B' | 'C' | 'D' | 'F'] as
      | 'success'
      | 'info'
      | 'primary'
      | 'warning'
      | 'default'
      | 'secondary'
      | 'error';
    return (
      <Tooltip title={this.rating.description}>
        <Chip
          label={`Rating: ${this.rating.score}`}
          color={chipClass}
        />
      </Tooltip>
    );
  };
}
