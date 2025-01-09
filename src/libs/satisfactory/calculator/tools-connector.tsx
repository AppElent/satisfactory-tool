import { Calculator as CalculatorType } from '@/schemas/satisfactory/calculator';
import satisfactoryData from '../data/satisfactory-data';
import Calculator from './calculator';
import ProductNode from './network/product-node';
import RecipeNode from './network/recipe-node';
import SatisfactoryNetwork from './network/satisfactory-network';
import SatisfactoryNode, { NodeType } from './network/satisfactory-node';

interface ProductionItem {
  item: string;
  type: 'perMinute' | 'max';
  amount: number;
  ratio: number;
}

interface ProductionInput {
  item: string;
  amount: number;
}

interface ShareRequest {
  metadata?: {
    gameVersion?: string;
    icon?: string;
    name?: string;
    schemaVersion?: number;
  };
  request: ToolsRequest;
}

interface ToolsRequest {
  allowedAlternateRecipes: string[];
  blockedRecipes: string[];
  blockedResources: string[];
  blockedMachines?: string[];
  sinkableResources: string[];
  production: ProductionItem[];
  input: ProductionInput[];
  resourceMax: {
    Desc_OreIron_C: number;
    Desc_OreCopper_C: number;
    Desc_Stone_C: number;
    Desc_Coal_C: number;
    Desc_OreGold_C: number;
    Desc_LiquidOil_C: number;
    Desc_RawQuartz_C: number;
    Desc_Sulfur_C: number;
    Desc_OreBauxite_C: number;
    Desc_OreUranium_C: number;
    Desc_NitrogenGas_C: number;
    Desc_SAM_C: number;
    Desc_Water_C: number;
  };
  resourceWeight: {
    Desc_OreIron_C: number;
    Desc_OreCopper_C: number;
    Desc_Stone_C: number;
    Desc_Coal_C: number;
    Desc_OreGold_C: number;
    Desc_LiquidOil_C: number;
    Desc_RawQuartz_C: number;
    Desc_Sulfur_C: number;
    Desc_OreBauxite_C: number;
    Desc_OreUranium_C: number;
    Desc_NitrogenGas_C: number;
    Desc_SAM_C: number;
    Desc_Water_C: number;
  };
  gameVersion: string;
}

interface ToolsResponse {
  [key: string]: string;
}

export default class ToolsConnector {
  private baseUrl: string = 'https://api.satisfactorytools.com';
  private resourceWeight: ToolsRequest['resourceWeight'] = {
    Desc_OreIron_C: 1,
    Desc_OreCopper_C: 2.4959349593495936,
    Desc_Stone_C: 1.3175965665236051,
    Desc_Coal_C: 2.1773049645390072,
    Desc_OreGold_C: 6.140000000000001,
    Desc_LiquidOil_C: 7.30952380952381,
    Desc_RawQuartz_C: 6.822222222222222,
    Desc_Sulfur_C: 8.527777777777779,
    Desc_OreBauxite_C: 7.487804878048781,
    Desc_OreUranium_C: 43.85714285714286,
    Desc_NitrogenGas_C: 7.675000000000001,
    Desc_SAM_C: 9.029411764705882,
    Desc_Water_C: 0,
  };
  private apiVersion: string = '1.0.0';
  private guiVersion: string = '1.0';
  private defaultSolveRequest: ToolsRequest = {
    allowedAlternateRecipes: [],
    blockedRecipes: [],
    blockedResources: [],
    sinkableResources: [],
    production: [],
    input: [],
    resourceMax: {
      Desc_OreIron_C: 0,
      Desc_OreCopper_C: 0,
      Desc_Stone_C: 0,
      Desc_Coal_C: 0,
      Desc_OreGold_C: 0,
      Desc_LiquidOil_C: 0,
      Desc_RawQuartz_C: 0,
      Desc_Sulfur_C: 0,
      Desc_OreBauxite_C: 0,
      Desc_OreUranium_C: 0,
      Desc_NitrogenGas_C: 0,
      Desc_SAM_C: 0,
      Desc_Water_C: 0,
    },
    resourceWeight: this.resourceWeight,
    gameVersion: this.apiVersion,
  };
  //public calculator: Calculator;
  public request?: ToolsRequest;
  public metadata?: ShareRequest['metadata'];
  public result?: ToolsResponse;

  constructor(public calculator: Calculator) {
    //this.calculator = new Calculator();
    this.apiVersion = satisfactoryData.version.tools.api;
    this.guiVersion = satisfactoryData.version.tools.gui;
    this.defaultSolveRequest.gameVersion = this.apiVersion;
    const resourceMax = satisfactoryData.getResourceMax();
    console.log(resourceMax);
    this.defaultSolveRequest.resourceMax = {
      ...this.defaultSolveRequest.resourceMax,
      ...resourceMax,
    };
  }

  parseToolsResponse = (response: ToolsResponse): SatisfactoryNetwork => {
    const nodes: SatisfactoryNode[] = [];
    const customTypes = ['Mine', 'Sink', 'Product', 'Byproduct', 'Input'];
    for (const recipeData in response) {
      const amount = parseFloat(response[recipeData] + '');
      const [machineData, machineClass] = recipeData.split('#');
      if (machineData === 'special__power') continue;
      if (customTypes.includes(machineClass)) {
        nodes.push(
          new ProductNode({
            type: machineClass.toLowerCase() as NodeType,
            item: machineData,
            amount,
          })
        );
      } else {
        const [recipeClass] = machineData.split('@');
        nodes.push(
          new RecipeNode({
            type: 'recipe',
            item: recipeClass,
            amount,
          })
        );
      }
    }
    // const edges = this.calculator.generateEdges(nodes);
    // console.log(nodes);
    const network = new SatisfactoryNetwork(nodes);
    console.log(network);
    network.generateEdges();
    return network;
    // TODO: excess inputs and resources....
  };

  setMetadata = (metadata: ShareRequest['metadata']): void => {
    this.metadata = metadata;
  };

  setConfig = (config: CalculatorType): void => {
    this.request = {
      allowedAlternateRecipes: config.allowedAlternateRecipes,
      blockedRecipes: config.blockedRecipes,
      blockedResources: config.blockedResources,
      sinkableResources: config.sinkableResources,
      blockedMachines: config.blockedMachines,
      resourceMax: {
        ...this.defaultSolveRequest.resourceMax,
        ...config.resourceMax,
      },
      input: config.input,
      resourceWeight: this.resourceWeight,
      gameVersion: this.apiVersion,
      production: config.production.map((production) => ({
        amount: production.amount,
        item: production.item,
        ratio: production.ratio || 100,
        type: production.mode || 'perMinute',
      })),
    };
    this.metadata = {
      gameVersion: '0',
      schemaVersion: 1,
      name: config.name,
      icon: config.production[0]?.item,
    };
  };

  solveProduction = async (): Promise<SatisfactoryNetwork> => {
    // Remove blockedMachines from request and add blockedRecipes
    const request = { ...this.request };
    if (request.blockedMachines) {
      console.log(request.blockedMachines);
      for (const machine of request.blockedMachines) {
        // Add machine recipes to blockedRecipes
        console.log(machine);
        const recipes = this.calculator.data.recipes.filter(
          (recipe) => recipe.producedIn === machine && !recipe.alternate
        );
        console.log(recipes);
        if (recipes.length > 0) {
          const classNames = recipes.map((recipe) => recipe.className);
          if (!request.blockedRecipes) request.blockedRecipes = [];
          request.blockedRecipes.push(...classNames);
        }
        // Check if allowedAlternateRecipes contains any of the machine recipes
        const alternateRecipes = this.calculator.data.recipes.filter(
          (recipe) => recipe.producedIn === machine && recipe.alternate
        );
        console.log(alternateRecipes);
        if (alternateRecipes.length > 0) {
          const classNames = alternateRecipes.map((recipe) => recipe.className);
          if (!request.allowedAlternateRecipes) request.allowedAlternateRecipes = [];
          request.allowedAlternateRecipes = request.allowedAlternateRecipes.filter(
            (recipe) => !classNames.includes(recipe)
          );
        }
      }
      delete request.blockedMachines;
    }
    console.log(request);
    const result = await fetch(this.baseUrl + '/v2/solver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const res = await result.json();
    if (res.code !== 200) {
      throw new Error(res.error);
    }
    console.log(res);
    this.result = res;
    return this.parseToolsResponse(res.result);
  };

  saveProductionConfig = async (): Promise<string> => {
    const request = {
      metadata: this.metadata,
      request: this.request,
    };
    console.log('REQUEST', request);
    const result = await fetch(this.baseUrl + '/v2/share?version=' + this.guiVersion, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const res = await result.json();
    return res.link;
  };

  getProductionConfig = async (id: string): Promise<Omit<CalculatorType, 'id'>> => {
    // if id is URL, get query param named share
    if (id.includes('share=')) {
      const url = new URL(id);
      console.log(url);
      id = url.searchParams.get('share') || '';
    }
    console.log(id);

    const result = await fetch(this.baseUrl + '/v1/share/' + id);
    const res = (await result.json()).data;
    console.log(res);
    const returnData = {
      name: res.metadata.name,
      production: res.request.production.map((production: ProductionItem) => ({
        item: production.item,
        amount: production.amount,
        mode: production.type,
        ratio: production.ratio,
      })),
      input: res.request.input,
      resourceMax: res.request.resourceMax,
      allowedAlternateRecipes: res.request.allowedAlternateRecipes,
      blockedRecipes: res.request.blockedRecipes,
      blockedResources: res.request.blockedResources,
      sinkableResources: res.request.sinkableResources,
      blockedMachines: res.request.blockedMachines,
    };
    // if (returnData.request.blockedMachines && returnData.request.blockedMachines.length > 0) {
    //   console.log(returnData.request.blockedMachines);
    //   for (const machine of returnData.request.blockedMachines) {
    //     console.log(machine);
    //     const recipes = this.calculator.data.recipes.filter(
    //       (recipe) => recipe.producedIn === machine && !recipe.alternate
    //     );
    //     console.log(recipes);
    //     if (recipes.length > 0) {
    //       const classNames = recipes.map((recipe) => recipe.className);
    //       returnData.request.blockedRecipes.push(...classNames);
    //     }
    //   }
    //   delete returnData.request.blockedMachines;
    // }
    return returnData;
  };
}
