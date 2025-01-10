import Recipe, { SatisfactoryRecipe } from './recipe';
import { SatisfactoryData } from './satisfactory-data';

export type SatisfactoryBuildableRecipe = Omit<SatisfactoryRecipe, 'producedIn'>;

export default class BuildableRecipe extends Recipe implements SatisfactoryBuildableRecipe {
  constructor(recipe: SatisfactoryRecipe, data: SatisfactoryData) {
    super(recipe, data);
  }

  getProducts = () => {
    throw new Error(
      'getProducts() is not allowed from a BuildableRecipe. Use getOutput() instead.'
    );
  };

  getOutput = () => {
    const buildable = this.data.buildables.find(
      (buildable) => buildable.className === this.products[0].item
    );
    return {
      ...this.products[0],
      output: buildable,
    };
  };

  getBuildable = () => {
    return this.data.getBuildable(this.products[0].item);
  };

  getIcon = () => {
    return this.getBuildable()?.getIcon() as string;
  };

  getImage = () => {
    return this.getBuildable()?.getImage() as string;
  };
}
