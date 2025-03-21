// import {
//   SatisfactoryBelts,
//   SatisfactoryBuildable,
//   SatisfactoryBuildableRecipe,
//   SatisfactoryBuilding,
//   SatisfactoryGenerator,
//   SatisfactoryItem,
//   SatisfactoryMiner,
//   SatisfactoryRecipe,
//   SatisfactoryResource,
//   SatisfactorySchematic,
// } from '..';
import _ from 'lodash';
import BaseItem from './base-item';
import Belt, { SatisfactoryBelts } from './belt';
import Buildable, { SatisfactoryBuildable } from './buildable';
import BuildableRecipe from './buildable-recipe';
import Building, { SatisfactoryBuilding } from './building';
import Generator, { SatisfactoryGenerator } from './generator';
import Miner, { SatisfactoryMiner } from './miner';
import Product, { SatisfactoryItem } from './product';
import Recipe, { SatisfactoryBuildableRecipe, SatisfactoryRecipe } from './recipe';
import Resource, { SatisfactoryResource } from './resource';
import Schematic, { SatisfactorySchematic } from './schematic';
import data_v1000 from './v1000/data.json';
import data_v1000_F from './v1000_F/data.json';

export interface SatisfactoryVersionData {
  items: SatisfactoryItem[];
  recipes: SatisfactoryRecipe[];
  buildableRecipes: SatisfactoryBuildableRecipe[];
  resources: SatisfactoryResource[];
  belts: SatisfactoryBelts[];
  buildings: SatisfactoryBuilding[];
  buildables: SatisfactoryBuildable[];
  generators: SatisfactoryGenerator[];
  miners: SatisfactoryMiner[];
  schematics: SatisfactorySchematic[];
}

type SatisfactoryDataObject = {
  [key: string]: SatisfactoryVersionData;
};

const satisfactory_data: SatisfactoryDataObject = {
  v1000: data_v1000,
  v1000_F: data_v1000_F,
};

const satisfactoryVersions = [
  {
    label: 'Update 1.0',
    shortLabel: '1.0',
    tools: {
      api: '1.0.0',
      gui: '1.0',
    },
    key: 'v1000',
  },
  {
    label: 'Update 1.0 (Ficsmas)',
    shortLabel: '1.0 (F)',
    tools: {
      api: '1.0.0-ficsmas',
      gui: '1.0-ficsmas',
    },
    key: 'v1000_F',
  },
];

export interface SatisfactoryBaseItem {
  className: string;
  name: string;
  slug: string;
}

export class SatisfactoryData {
  [key: string]: any;
  private currentVersion: (typeof satisfactoryVersions)[0]['key'] = 'v1000';
  public version: (typeof satisfactoryVersions)[0] =
    satisfactoryVersions.find((v) => v.key === this.currentVersion) || satisfactoryVersions[0];

  public data: SatisfactoryVersionData;

  // data
  public products: Product[] = [];
  public buildings: Building[] = [];
  public recipes: Recipe[] = [];
  public buildableRecipes: Recipe[] = [];
  public resources: Resource[] = [];
  public belts: Belt[] = [];
  public buildables: Buildable[] = [];
  public generators: Generator[] = [];
  public miners: Miner[] = [];
  public schematics: Schematic[] = [];
  public excludeBuildProducts = [
    'Desc_CrystalShard_C', // power shard
    'Desc_AlienDNACapsule_C', // dna capsule
    'Desc_AlienProtein_C', // alien protein
    'Desc_GenericBiomass_C', // biomass
    'Desc_Biofuel_C', // biofuel
  ];

  constructor(versionKey?: string) {
    this.setVersion(versionKey);
    this.data = satisfactory_data[this.version.key];
    this.initData();
  }

  initData = () => {
    // Data
    this.data = satisfactory_data[this.version.key];
    this.recipes = _.sortBy(
      this.data.recipes.map((item: SatisfactoryRecipe) => new Recipe(item, this)),
      'name'
    );
    this.products = _.sortBy(
      this.data.items.map((item: SatisfactoryItem) => new Product(item, this)),
      'name'
    );
    this.buildables = _.sortBy(
      this.data.buildables.map((item: any) => new Buildable(item, this)),
      'name'
    );
    this.buildings = _.sortBy(
      this.data.buildings.map((item: any) => new Building(item, this)),
      'name'
    );

    this.buildableRecipes = _.sortBy(
      this.data.buildableRecipes.map((item: any) => new BuildableRecipe(item, this)),
      'name'
    );
    this.resources = _.sortBy(
      this.data.resources.map((item: any) => new Resource(item, this)),
      'name'
    );
    this.belts = _.sortBy(
      this.data.belts.map((item: any) => new Belt(item, this)),
      'name'
    );
    this.generators = _.sortBy(
      this.data.generators.map((item: any) => new Generator(item, this)),
      'name'
    );
    this.miners = _.sortBy(
      this.data.miners.map((item: any) => new Miner(item, this)),
      'name'
    );
    this.schematics = _.sortBy(
      this.data.schematics.map((item: any) => new Schematic(item, this)),
      'name'
    );
  };

  getSavedSatisfactoryVersion = () => {
    const savedVersion = localStorage.getItem('satisfactory_version');
    if (!savedVersion) {
      return this.currentVersion;
    }
    return savedVersion;
  };

  setVersion(version?: string) {
    // Get satisfactory_version from localStorage, if not set, use default
    let satisfactoryVersionKey = this.getSavedSatisfactoryVersion();
    // If version supplied and different from versionKey, set versionKey
    if (version && version !== satisfactoryVersionKey) {
      localStorage.setItem('satisfactory_version', version);
      satisfactoryVersionKey = version;
    }
    const versionObject = satisfactoryVersions.find((v) => v.key === satisfactoryVersionKey);
    if (!versionObject) {
      throw new Error('Version not found');
    }
    this.version = versionObject;
    console.log('SET NEW SATISFACTORY VERSION', versionObject);
    this.initData();
  }

  getVersions() {
    return satisfactoryVersions;
  }

  // Get functions
  getRecipe = (recipeClass: string) => this.recipes.find((r) => r.className === recipeClass);
  getProduct = (productClass: string) => this.products.find((p) => p.className === productClass);
  getBuilding = (buildingClass: string) =>
    this.buildings.find((b) => b.className === buildingClass);
  getBuildableRecipe = (recipeClass: string) =>
    this.buildableRecipes.find((r) => r.className === recipeClass);
  getResource = (resourceClass: string) =>
    this.resources.find((r) => r.className === resourceClass);
  getBelt = (beltClass: string) => this.belts.find((b) => b.className === beltClass);
  getBuildable = (buildableClass: string) =>
    this.buildables.find((b) => b.className === buildableClass);
  getGenerator = (generatorClass: string) =>
    this.generators.find((g) => g.className === generatorClass);
  getMiner = (minerClass: string) => this.miners.find((m) => m.className === minerClass);
  getSchematic = (schematicClass: string) =>
    this.schematics.find((s) => s.className === schematicClass);

  getItem(type: string, className: string) {
    return (this[type as string] as BaseItem[])?.find((item) => item.className === className);
  }

  // Get all products that have no recipe as input
  getEndProducts = () => {
    return this.products.filter(
      (p) =>
        !p.isEquipment &&
        !['ficsmas', 'consumable', 'equipment', 'ammo', 'other'].includes(p.tier) &&
        p.tier !== undefined &&
        p.tier !== '11' && // ammo
        p.getDefaultRecipes().length > 0 &&
        !this.recipes
          .filter((recipe) => !recipe.alternate) // also include alternates?
          .find((r) => r.ingredients.find((i) => i.item === p.className))
    );
  };

  resolveRecipe(product: string, recipeList: { product: string; recipe: string }[] = []) {
    // Check if product is a resource. If so, return undefined
    if (this.resources.find((r) => r.className === product)) return undefined;
    // Get a list of default recipes excluding alternate recipes and package recipes
    const defaultRecipes = this.recipes.filter((r) => !r.alternate && !r.slug.includes('package-'));
    // Check input object to see if there is a preferred recipe
    const fixedRecipe = recipeList.find((r) => r.product === product);
    return fixedRecipe
      ? this.recipes.find((r) => (r.className = fixedRecipe.recipe))
      : defaultRecipes.find((r) => r.products.some((p) => p.item === product));
  }

  isResource(product: string) {
    return this.resources.find((r) => r.className === product);
  }

  getResourceMax() {
    return this.resources.reduce((acc: { [key: string]: number }, resource) => {
      acc[resource.className] = resource.max;
      return acc;
    }, {});
  }

  toObject() {
    return {
      version: this.version,
      products: this.products.map((p) => p.toObject()),
      buildings: this.buildings.map((b) => b.toObject()),
      recipes: this.recipes.map((r) => r.toObject()),
      buildableRecipes: this.buildableRecipes.map((r) => r.toObject()),
      resources: this.resources.map((r) => r.toObject()),
      belts: this.belts.map((b) => b.toObject()),
      buildables: this.buildables.map((b) => b.toObject()),
      generators: this.generators.map((g) => g.toObject()),
      miners: this.miners.map((m) => m.toObject()),
      schematics: this.schematics.map((s) => s.toObject()),
    };
  }
}

const satisfactoryData = new SatisfactoryData();
export default satisfactoryData;
