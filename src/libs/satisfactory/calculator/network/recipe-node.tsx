import { SatisfactoryRecipe } from '../../data/recipe';
import satisfactoryData from '../../data/satisfactory-data';
import SatisfactoryNode, { SatisfactoryNodeProps } from './satisfactory-node';

const getLabel = (item: string, amount: number) => {
  const recipe = satisfactoryData.getRecipe(item);
  const machineName = recipe?.getMachine()?.name;
  return `${recipe?.name as string}\n${+amount.toFixed(3)}x ${machineName}`;
};

export default class RecipeNode extends SatisfactoryNode {
  public recipe: SatisfactoryRecipe;
  constructor(node: SatisfactoryNodeProps) {
    super({
      ...node,
      label: node.label ?? getLabel(node.item, node.amount),
    });
    this.recipe = satisfactoryData.getRecipe(node.item) as SatisfactoryRecipe;
    if (!this.recipe) {
      throw new Error(`Recipe ${node.item} not found`);
    }
    this.initAmounts();
  }

  initAmounts = () => {
    this.usedAmount = {};
    for (const product of this.recipe.products) {
      this.usedAmount[product.item] = 0;
      this.grossAmount[product.item] = product.amountMin * this.amount;
    }
  };

  getInputs = () => {
    return (
      this.recipe.ingredients.map((i) => {
        return {
          item: i.item,
          amount: Math.round(i.amountMin * this.amount * 1000) / 1000,
        };
      }) || []
    );
  };

  getOutputs = () => {
    return (
      this.recipe.products.map((i) => {
        return {
          item: i.item,
          amount: i.amountMin * this.amount,
        };
      }) || []
    );
  };
}
