import { Chip, Tooltip } from '@mui/material';
import BaseItem from './base-item';
import { SatisfactoryBaseItem, SatisfactoryData } from './satisfactory-data';

export interface SatisfactoryItem extends SatisfactoryBaseItem {
  description: string;
  sinkPoints: number;
  stackSize: number;
  energyValue: number;
  liquid: boolean;
  tier: string;
  category: string;
  tags: string[];
  isEquipment: boolean;
  isRadioactive: boolean;
  isFuel: boolean;
  isResource: boolean;
}

export default class Product extends BaseItem implements SatisfactoryItem {
  public description: string;
  public liquid: boolean = false;
  public stackSize: number = 0;
  public sinkPoints: number;
  public tier: string;
  public category: string;
  public tags: string[];
  public energyValue: number;
  public isEquipment: boolean;
  public isRadioactive: boolean;
  public isFuel: boolean;
  public isResource: boolean = false;
  private data: SatisfactoryData;

  constructor(product: SatisfactoryItem, data: SatisfactoryData) {
    super(product);
    this.description = product.description;
    this.liquid = product.liquid;
    this.stackSize = product.stackSize;
    this.sinkPoints = product.sinkPoints;
    this.tier = product.tier;
    this.category = product.category;
    this.tags = product.tags;
    this.energyValue = product.energyValue;
    this.isEquipment = product.isEquipment;
    this.isRadioactive = product.isRadioactive;
    this.isFuel = product.isFuel;
    this.isResource = product.isResource;
    this.data = data;
  }

  getRecipes = () => {
    return this.data.recipes.filter((recipe) =>
      recipe.products.find((p) => p.item === this.className)
    );
  };

  getDefaultRecipe = () => {
    const recipes = this.getDefaultRecipes().filter(
      (recipe) =>
        !['Desc_Packager_C', 'Desc_Converter_C'].includes(recipe.getMachine()?.className as string)
    );
    return recipes?.[0];
  };

  getDefaultRecipes = () => {
    return this.getRecipes().filter((recipe) => !recipe.alternate);
  };

  getProductionRate = () => {
    const recipe = this.getDefaultRecipe();
    const productItem = recipe?.products.find((p) => p.item === this.className);
    return productItem?.amountMin || 0;
  };

  getAlternateRecipes = () => {
    return this.getRecipes().filter((recipe) => recipe.alternate);
  };

  getUsedFor = () => {
    return this.data.recipes.filter((recipe) =>
      recipe.ingredients.find((i) => i.item === this.className)
    );
  };

  getTierChip = () => {
    return (
      <Tooltip title={'This item can be created in tier ' + this.tier}>
        <Chip label={`Tier: ${this.tier}`} />
      </Tooltip>
    );
  };

  toObject = () => {
    return {
      ...super.toObject(),
      description: this.description,
      liquid: this.liquid,
      stackSize: this.stackSize,
      sinkPoints: this.sinkPoints,
      tier: this.tier,
      category: this.category,
      tags: this.tags,
      energyValue: this.energyValue,
      isEquipment: this.isEquipment,
      isRadioactive: this.isRadioactive,
      isFuel: this.isFuel,
      isResource: this.isResource,
    };
  };
}
