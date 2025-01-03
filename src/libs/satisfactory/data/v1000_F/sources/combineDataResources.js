import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import data from './data-ficsmas.json' with { type: 'json' };
import data_normal from './data.json' with { type: 'json' };
import equipment from './equipment.json' with { type: 'json' };
import minerData from './miners.json' with { type: 'json' };
import ratings from './ratings.json' with { type: 'json' };
import simple from './simple.json' with { type: 'json' };

// simple.json is found on https://github.com/KirkMcDonald/satisfactory-calculator/blob/master/data/data.json
// data.json is found on https://github.com/greeny/SatisfactoryTools/tree/master/data

const isEquipment = (item) => {
  return equipment.includes(item.name);
};
const isFicsmas = (item) => {
  return data_normal.items[item.className] ? false : true;
};
const isRadioactive = (item) => item.radioactiveDecay > 0;
const isFuel = (item) => item.energyValue > 0;
const getTier = (item) => {
  const isFicsmasItem = isFicsmas(item);
  const searchKey = item.liquid ? 'fluids' : 'items';
  const foundSimpleItem = simple[searchKey].find((i) => i.name === item.name);
  return foundSimpleItem
    ? foundSimpleItem.tier === -1
      ? '0'
      : foundSimpleItem.tier + ''
    : isFicsmasItem
      ? 'ficsmas'
      : '999';
};
const getRating = (recipe) => {
  const foundRating = ratings.find((r) => r.recipe === recipe.name.replace('Alternate: ', ''));
  if (!foundRating) return undefined;
  return {
    score: foundRating?.rating || undefined,
    description: foundRating?.description || undefined,
  };
};

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const parentDir = path.resolve(__dirname, '..');
console.log(__dirname, parentDir);

// products
const items = Object.keys(data.items).map((key) => {
  const item = data.items[key];
  return {
    className: item.className,
    name: item.name,
    slug: item.slug,
    description: item.description,
    sinkPoints: item.sinkPoints,
    stackSize: item.stackSize,
    energyValue: item.energyValue,
    liquid: item.liquid,
    tier: getTier(item),
    isEquipment: isEquipment(item),
    isRadioactive: isRadioactive(item),
    isFuel: isFuel(item),
    isResource: Object.keys(data.resources).includes(item.className),
  };
});

// Show 5 random items from items
//console.log(items.sort(() => Math.random() - 0.5).slice(0, 5));

const recipes = Object.keys(data.recipes)
  .filter((key) => !data.recipes[key].forBuilding)
  .filter((key) => data.recipes[key].inMachine)
  .map((key) => {
    const recipe = data.recipes[key];
    if (recipe.producedIn.length !== 1) {
      console.log(recipe, recipe.producedIn.length, recipe.producedIn[0]);
    }
    return {
      ...recipe,
      cyclesMin: 60 / recipe.time,
      producedIn: recipe.producedIn[0], //recipe.producedIn.length === 0 ? undefined : recipe.producedIn[0],
      ingredients: recipe.ingredients.map((i) => ({
        ...i,
        name: items.find((item) => item.className === i.item).name,
        amountMin: (60 / recipe.time) * i.amount,
      })),
      products: recipe.products.map((p) => ({
        ...p,
        name: items.find((item) => item.className === p.item).name,
        amountMin: (60 / recipe.time) * p.amount,
      })),
      rating: getRating(recipe),
    };
  });

// Unique list of buildings by getting all producedIn from recipes and make unique
const buildingKeys = recipes
  .map((recipe) => recipe.producedIn)
  .filter((building) => building)
  .filter((building, index, self) => self.indexOf(building) === index);

const buildings = buildingKeys.map((buildingKey) => {
  // const buildingKey = Object.keys(data.buildings).find(
  //   (key) => data.buildings[key].name === building.name
  // );
  const buildingData = data.buildings[buildingKey];
  return {
    className: buildingData.className,
    name: buildingData.name,
    slug: buildingData.slug,
    description: buildingData.description,
    metadata: buildingData.metadata,
  };
  //return found ? { ...building, ...data.buildings[found] } : building;
});

const buildables = Object.keys(data.buildings).map((key) => {
  const buildable = data.buildings[key];
  return {
    className: buildable.className,
    name: buildable.name,
    slug: buildable.slug,
    description: buildable.description,
    metadata: buildable.metadata,
  };
});

// Recipes for buildables
const buildableRecipes = Object.keys(data.recipes)
  .filter((key) => data.recipes[key].forBuilding || !data.recipes[key].inMachine)
  .map((key) => {
    const recipe = data.recipes[key];

    return {
      ...recipe,
      cyclesMin: 60 / recipe.time,
      producedIn: recipe.producedIn[0],
      ingredients: recipe.ingredients.map((i) => ({
        ...i,
        name: items.find((item) => item.className === i.item).name,
        amountMin: (60 / recipe.time) * i.amount,
      })),
      products: recipe.products.map((p) => ({
        ...p,
        name: items.find((item) => item.className === p.item)
          ? items.find((item) => item.className === p.item).name
          : buildables.find((building) => building.className === p.item).name,
        amountMin: (60 / recipe.time) * p.amount,
      })),
    };
  });

// all resource keys
const resources = Object.keys(data.resources).map((key) => {
  const resource = data.resources[key];
  const product = items.find((p) => p.className === key);
  return {
    className: key,
    name: product.name,
    slug: product.slug,
    max: resource.max,
    pingColor: resource.pingColor,
  };
});

// all belts
const belts = simple.belts.map((belt) => {
  return {
    className: belt.className,
    name: belt.name,
    rate: belt.rate,
    slug: belt.key_name,
  };
});

// power generators
const generators = Object.keys(data.generators).map((key) => {
  const generator = data.generators[key];
  const building = data.buildings[key];
  return {
    className: generator.className,
    name: building.name,
    slug: building.slug,
    fuel: generator.fuel,
    powerProduction: generator.powerProduction,
  };
});

const miners = Object.keys(data.miners).map((key) => {
  const miner = data.miners[key];
  const building = data.buildings[key];
  return {
    className: miner.className,
    name: building.name,
    slug: building.slug,
    allowedResources: miner.allowedResources,
    extractionRate: minerData[miner.className].rate,
  };
});

const schematics = Object.keys(data.schematics).map((key) => {
  const schematic = data.schematics[key];
  return {
    className: schematic.className,
    type: schematic.type,
    name: schematic.name,
    slug: schematic.slug,
    cost: schematic.cost,
    unlock: schematic.unlock,
    tier: schematic.tier,
    time: schematic.time,
    mam: schematic.mam,
    alternate: schematic.alternate,
  };
});

const obj = {
  items,
  recipes,
  buildableRecipes,
  resources,
  belts,
  buildings,
  buildables,
  generators,
  miners,
  schematics,
};

fs.writeFileSync(`${parentDir}/data.json`, JSON.stringify(obj, null, 2));
