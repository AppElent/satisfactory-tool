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
  };

  generateEdges = (): void => {
    const nodes = this.nodes;
    const edges: SatisfactoryEdge[] = [];
    for (const node of nodes) {
      const inputs = node.getInputs();
      for (const input of inputs) {
        let inputAmount = input.amount;
        const products = nodes.filter(
          (n) => n.item === input.item && n.id !== node.id && n.type !== 'product'
        );
        for (const product of products) {
          const usedAmount = product?.useAmount(product.item, inputAmount) || 0;
          if (usedAmount > 0) {
            const edge = new SatisfactoryEdge({
              source: product.id,
              target: node.id,
              amount: usedAmount,
              item: input.item,
            });
            inputAmount = inputAmount - usedAmount;
            edges.push(edge);
          }
        }
        const recipeNodes = (nodes as RecipeNode[]).filter(
          (n) => n.type === 'recipe' && n.recipe?.products.some((i) => i.item === input.item)
        );
        for (const recipeNode of recipeNodes) {
          // TODO: deze useamount hier is niet goed
          const product = recipeNode.recipe?.products.find((i) => i.item === input.item);
          const usedAmount = recipeNode.useAmount(product?.item as string, inputAmount);
          if (usedAmount > 0) {
            const edge = new SatisfactoryEdge({
              source: recipeNode.id,
              target: node.id,
              amount: usedAmount,
              item: input.item,
            });
            edges.push(edge);
          }
        }
      }
    }
    this.edges = edges;
  };

  fromNodes = (nodes: SatisfactoryNode[]): void => {
    this.nodes = nodes.map((node) => {
      if (node.type === 'recipe') {
        return new RecipeNode(node);
      }
      return new ProductNode(node);
    });
    this.generateEdges();
  };

  fromObject = (object: { nodes: SatisfactoryNode[]; edges: SatisfactoryEdge[] }): void => {
    this.fromNodes(object.nodes);
    this.edges = object.edges.map((edge) => new SatisfactoryEdge(edge));
  };

  toObject = () => {
    return {
      nodes: this.nodes.map((node) => node.toObject()),
      edges: this.edges.map((edge) => edge.toObject()),
    };
  };

  // mergeNetworks = (networks: SatisfactoryNetwork[]): void => {
  //   const nodes = this.nodes || [];
  //   const edges = this.edges || [];
  //   for (const network of networks) {
  //     nodes.push(...network.nodes);
  //     edges.push(...network.edges);
  //   }
  //   this.nodes = nodes;
  //   this.edges = edges;
  // };

  getInputs = (): SatisfactoryNode[] => {
    return this.nodes.filter((node) => ['input', 'mine'].includes(node.type));
  };

  getOutputs = (): SatisfactoryNode[] => {
    return this.nodes.filter((node) => ['product', 'byproduct', 'sink'].includes(node.type));
  };

  getRecipes = (): SatisfactoryNode[] => {
    return this.nodes.filter((node) => node.type === 'recipe');
  };
}
