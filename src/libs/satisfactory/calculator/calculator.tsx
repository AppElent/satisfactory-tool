import { Calculator as CalculatorType } from '@/schemas/satisfactory/calculator';
import satisfactoryData from '../data/satisfactory-data';
import RecipeNode from './network/recipe-node';
import SatisfactoryEdge from './network/satisfactory-edge';
import SatisfactoryNetwork from './network/satisfactory-network';
import SatisfactoryNode from './network/satisfactory-node';
import SatisfactoryModelerConnector from './satisfactory-modeler-connector';
import ToolsConnector from './tools-connector';

// export interface ProductionConfig {
//   production: ProductionItem[];
//   resources: ResourceList;
//   inputs: ProductionInput[];
//   blockedRecipes: string[];
//   allowedAlternateRecipes: string[];
//   // blockedResources: string[];
//   // sinkableResources: string[];
//   blockedMachines: string[];
//   // recipes: {
//   //   blockedRecipes: string[];
//   //   allowedAlternateRecipes: string[];
//   // };
//   // machines: {
//   //   blockedMachines: string[];
//   // };
// }

export default class Calculator {
  public tools: ToolsConnector;
  public modeler: SatisfactoryModelerConnector;
  public data = satisfactoryData;
  public result?: SatisfactoryNetwork;

  constructor(public config?: CalculatorType) {
    this.tools = new ToolsConnector(this);
    this.modeler = new SatisfactoryModelerConnector(this);
  }

  setConfig = (config: CalculatorType) => {
    if (config) {
      this.config = {
        ...config,
        // convert resourcemax strings to numbers
        resourceMax: Object.fromEntries(
          Object.entries(config?.resourceMax).map(([key, value]) => [key, Number(value)])
        ) as CalculatorType['resourceMax'],
        production: config.production.map((p) => ({
          ...p,
          amount: Number(p.amount),
          ratio: 100,
          mode: p.mode ?? 'perMinute',
        })),
      };
      console.log(this.config);
    }
  };

  calculate = async () => {
    console.log('Calculating');
    console.log('CONFIG', this.config);
    if (!this.config) {
      throw new Error('No config set');
    }
    this.tools.setConfig(this.config as CalculatorType);
    this.result = await this.tools.solveProduction();
  };

  getNodes = () => {};

  generateEdges = (nodes: SatisfactoryNode[]): SatisfactoryEdge[] => {
    // TODO: werkt nog niet, oa getallen verkeerd en tekst toevoegen water
    const edges: SatisfactoryEdge[] = [];
    for (const node of nodes) {
      const inputs = node.getInputs();
      console.log('INPUTS', node.id, inputs);
      for (const input of inputs) {
        let inputAmount = input.amount;
        console.log('inputamount', input.amount);
        const products = nodes.filter((n) => n.item === input.item && n.id !== node.id);
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
          console.log('RECIPE', node.item, recipeNode.id, usedAmount, inputAmount);
          if (usedAmount > 0) {
            const edge = new SatisfactoryEdge({
              source: recipeNode.item,
              target: node.item,
              amount: usedAmount,
              item: input.item,
            });
            edges.push(edge);
          }
        }

        // const edge = {
        //   source: input.item,
        //   target: node.item,
        //   amount: input.amount,
        // };
        // edges.push(edge);
      }
    }
    return edges;
  };
}
