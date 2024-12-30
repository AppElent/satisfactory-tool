import Recipe from '../../data/recipe';
import Network from './network';
import ProductNode from './product-node';
import RecipeNode from './recipe-node';
import SatisfactoryEdge from './satisfactory-edge';
import SatisfactoryNode from './satisfactory-node';

export default class SatisfactoryNetwork extends Network {
  public nodes: SatisfactoryNode[] = [];
  public edges: SatisfactoryEdge[] = [];
  constructor(nodes?: SatisfactoryNode[], edges?: SatisfactoryEdge[]) {
    super(nodes, edges);
    this.nodes = nodes || [];
    this.edges = edges || [];
  }

  fromRecipe = (recipe: Recipe): void => {
    const nodes: SatisfactoryNode[] = [];
    const edges: SatisfactoryEdge[] = [];

    const recipeNode = new RecipeNode({
      type: 'recipe',
      item: recipe.className,
      amount: 1,
    });
    nodes.push(recipeNode);

    for (const product of recipe.products) {
      const productNode = new ProductNode({
        type: 'product',
        item: product.item,
        amount: product.amountMin,
      });
      nodes.push(productNode);

      const edge = new SatisfactoryEdge({
        source: recipeNode.id,
        target: productNode.id,
        amount: product.amountMin,
        item: product.item,
      });
      edges.push(edge);
    }

    for (const ingredient of recipe.ingredients) {
      const ingredientNode = new ProductNode({
        type: 'input',
        item: ingredient.item,
        amount: ingredient.amountMin,
      });
      nodes.push(ingredientNode);

      const edge = new SatisfactoryEdge({
        source: ingredientNode.id,
        target: recipeNode.id,
        amount: ingredient.amountMin,
        item: ingredient.item,
      });
      edges.push(edge);
    }

    this.nodes = nodes;
    this.edges = edges;
    console.log(nodes, edges);
  };
}
