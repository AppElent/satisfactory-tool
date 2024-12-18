import Recipe, { SatisfactoryRecipe } from './recipe';
import { SatisfactoryData } from './satisfactory-data';

export type SatisfactoryBuildableRecipe = Omit<SatisfactoryRecipe, 'producedIn'>;

export default class BuildableRecipe extends Recipe implements SatisfactoryBuildableRecipe {
  constructor(recipe: SatisfactoryRecipe, data: SatisfactoryData) {
    super(recipe, data);
  }

  getBuildable = () => {
    return this.data.buildables.find((buildable) => buildable.className === this.products[0].item);
  };

  getIcon = () => {
    return this.getBuildable()?.getIcon() as string;
  };

  getImage = () => {
    return this.getBuildable()?.getImage() as string;
  };
}
