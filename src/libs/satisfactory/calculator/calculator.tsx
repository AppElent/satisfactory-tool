import { Calculator as CalculatorType } from '@/schemas/satisfactory/calculator';
import satisfactoryData from '../data/satisfactory-data';
import SatisfactoryNetwork from './network/satisfactory-network';
import SatisfactoryModelerConnector from './satisfactory-modeler-connector';
import ToolsConnector from './tools-connector';

export default class Calculator {
  public tools: ToolsConnector;
  public modeler: SatisfactoryModelerConnector;
  public data = satisfactoryData;
  public result?: SatisfactoryNetwork;
  public config?: CalculatorType;

  constructor(config?: CalculatorType) {
    this.tools = new ToolsConnector(this);
    this.modeler = new SatisfactoryModelerConnector(this);
    this.setConfig(config);
  }

  setConfig = (config?: CalculatorType) => {
    if (config) {
      this.config = {
        ...config,
        // convert resourcemax strings to numbers
        resourceMax: Object.fromEntries(
          Object.entries(config?.resourceMax).map(([key, value]) => [key, Number(value)])
        ) as CalculatorType['resourceMax'],
        // Filter items that have an item and amount convertable to number
        production: config.production
          .filter((i) => i.item && i.amount)
          .map((p) => ({
            ...p,
            amount: Number(p.amount) || 0,
            ratio: 100,
            mode: p.mode ?? 'perMinute',
          })),
        input: config.input
          .filter((i) => i.item && i.amount)
          .map((i) => ({
            ...i,
            amount: Number(i.amount) || 0,
          })),
      };
      console.log(this.config);
    }
  };

  getSatisfactoryToolsConfig = async (externalId: string): Promise<CalculatorType> => {
    if (!this.config) {
      throw new Error('No config set. Set config using setConfig() first.');
    }
    const result = await this.tools.getProductionConfig(externalId);
    console.log(result);
    return {
      ...this.config,
      ...result,
      id: this.config.id,
    };
  };

  saveSatisfactoryTools = async (): Promise<string> => {
    if (!this.config) {
      throw new Error('No config set. Set config using setConfig() first.');
    }
    this.tools.setConfig(this.config);
    if (this.tools.request) {
      const result = await this.tools.saveProductionConfig();
      this.config.externalId = result;
      return result;
    } else {
      throw new Error('No request set');
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

  // generateEdges = (nodes: SatisfactoryNode[]): SatisfactoryEdge[] => {
  //   const edges: SatisfactoryEdge[] = [];
  //   for (const node of nodes) {
  //     const inputs = node.getInputs();
  //     console.log('INPUTS', node.id, inputs);
  //     for (const input of inputs) {
  //       let inputAmount = input.amount;
  //       console.log('inputamount', input.amount);
  //       const products = nodes.filter(
  //         (n) => n.item === input.item && n.id !== node.id && n.type !== 'product'
  //       );
  //       for (const product of products) {
  //         const usedAmount = product?.useAmount(product.item, inputAmount) || 0;
  //         if (usedAmount > 0) {
  //           const edge = new SatisfactoryEdge({
  //             source: product.id,
  //             target: node.id,
  //             amount: usedAmount,
  //             item: input.item,
  //           });
  //           inputAmount = inputAmount - usedAmount;
  //           edges.push(edge);
  //         }
  //       }
  //       const recipeNodes = (nodes as RecipeNode[]).filter(
  //         (n) => n.type === 'recipe' && n.recipe?.products.some((i) => i.item === input.item)
  //       );
  //       for (const recipeNode of recipeNodes) {
  //         // TODO: deze useamount hier is niet goed
  //         const product = recipeNode.recipe?.products.find((i) => i.item === input.item);
  //         const usedAmount = recipeNode.useAmount(product?.item as string, inputAmount);
  //         console.log('RECIPE', node.item, recipeNode.id, usedAmount, inputAmount);
  //         if (usedAmount > 0) {
  //           const edge = new SatisfactoryEdge({
  //             source: recipeNode.id,
  //             target: node.id,
  //             amount: usedAmount,
  //             item: input.item,
  //           });
  //           edges.push(edge);
  //         }
  //       }
  //     }
  //   }
  //   return edges;
  // };
}
