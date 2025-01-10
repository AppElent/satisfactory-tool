import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as data, default as data_normal } from './data.json' with { type: 'json' };
import minerData from './miners.json' with { type: 'json' };
import ratings from './ratings.json' with { type: 'json' };
import simple from './simple.json' with { type: 'json' };

// simple.json is found on https://github.com/KirkMcDonald/satisfactory-calculator/blob/master/data/data.json
// data.json is found on https://github.com/greeny/SatisfactoryTools/tree/master/data

const consumables = [
  'Bacon Agaric',
  'Beryl Nut',
  'Iodine-Infused Filter',
  'Paleberry',
  'Medicinal Inhaler',
];

const equipment = [
  'Blade Runners',
  'Boombox',
  'Chainsaw',
  'Cup',
  'Factory Cart™',
  'Gas Mask',
  'Hazmat Suit',
  'Hoverpack',
  'Jetpack',
  'Medicinal Inhaler',
  'Nobelisk Detonator',
  'Object Scanner',
  'Parachute',
  'Portable Miner',
  'Rebar Gun',
  'Rifle',
  'Xeno-Basher',
  'Xeno-Zapper',
  'Zipline',
];

const collectibles = [
  'Desc_Wood_C', // wood
  'Desc_WAT1_C', // somersloop
  'Desc_CrystalShard_C', // power shard
  'Desc_HatcherParts_C', // hatcher remains
  'Desc_HogParts_C', // hog remains
  'Desc_Leaves_C', // /leaves
  'Desc_Mycelia_C', // mycelia
  'Desc_Crystal_C', //blue power slug
  'Desc_Crystal_mk3_C', //purple power slug
  'Desc_Crystal_mk2_C', // yellow power slug
  'Desc_SpitterParts_C', // spitter remains
  'Desc_StingerParts_C', // stinger remains
];

const ficsmasRecipes = Object.keys(data.recipes).filter(
  (key) =>
    data.recipes[key].name.toLowerCase().includes('ficsmas') ||
    data.recipes[key].name.toLowerCase().includes('snowman') ||
    data.recipes[key].name.toLowerCase().includes('candy cane')
);

const isEquipment = (item) => {
  return equipment.includes(item.name);
};
const isCollectible = (item) => {
  return collectibles.includes(item.className);
};
const isFicsmas = (item) => {
  return data_normal.items[item.className] ? false : true;
};
const isConsumable = (item) => {
  return consumables.includes(item.name);
};
const isRadioactive = (item) => item.radioactiveDecay > 0;
const isFuel = (item) => item.energyValue > 0;
const isAmmo = (item) => getTier(item) === 'ammo';

const getTier = (item) => {
  const searchKey = item.liquid ? 'fluids' : 'items';
  const foundSimpleItem = simple[searchKey]?.find((i) => i.name === item.name);

  if (isFicsmas(item)) {
    return 'ficsmas';
  }

  if (!foundSimpleItem) {
    if (item.className === 'Desc_SpaceElevatorPart_10_C') {
      return '8';
    }
    return 'other';
  }

  switch (foundSimpleItem.tier) {
    case -1:
      return '0';
    case 0:
      return '1';
    case 11:
      return 'ammo';
    default:
      return foundSimpleItem.tier.toString();
  }
};
const getRating = (recipe) => {
  const foundRating = ratings.find((r) => r.recipe === recipe.name.replace('Alternate: ', ''));
  if (!foundRating) return undefined;
  return {
    score: foundRating?.rating || undefined,
    description: foundRating?.description || undefined,
  };
};

const getCategory = (item) => {
  if (isFicsmas(item)) {
    return 'ficsmas';
  }
  if (isEquipment(item)) {
    return 'equipment';
  }
  if (isAmmo(item)) {
    return 'ammo';
  }
  if (isConsumable(item)) {
    return 'consumable';
  }
  if (isFuel(item)) {
    return 'fuel';
  }
  return 'product';
};
const getTags = (item) => {
  const tags = [];
  if (isFicsmas(item)) {
    tags.push('ficsmas');
  }
  if (isCollectible(item)) {
    tags.push('collectible');
  }
  if (isEquipment(item)) {
    tags.push('equipment');
  }
  if (isConsumable(item)) {
    tags.push('consumable');
  }
  if (isAmmo(item)) {
    tags.push('ammo');
  }
  if (isRadioactive(item)) {
    tags.push('radioactive');
  }
  if (isFuel(item)) {
    tags.push('fuel');
  }
  if (getCategory(item) === 'product') {
    tags.push('product');
  }
  return tags;
};

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const parentDir = path.resolve(__dirname, '..');
console.log(__dirname, parentDir);

const noRecipeProducts = Object.keys(data.items)
  .filter((prod) => {
    return !Object.keys(data.recipes).some((recipe) => {
      return data.recipes[recipe].products.some((p) => p.item === prod);
    });
  })
  .map((pr) => {
    const product = data.items[pr];
    return product.name;
  });
// console.log(noRecipeProducts);

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
    category: getCategory(item),
    tags: getTags(item),
    isEquipment: isEquipment(item),
    isRadioactive: isRadioactive(item),
    isFuel: isFuel(item),
    isResource: Object.keys(data.resources).includes(item.className),
  };
});

// Find all unique tiers
const tiers = items
  .map((item) => item.tier)
  .filter((tier, index, self) => self.indexOf(tier) === index)
  .sort((a, b) => parseInt(a) - parseInt(b));
console.log(tiers);

// Show 5 random items from items
//console.log(items.sort(() => Math.random() - 0.5).slice(0, 5));

// const testvalues = Object.keys(data.recipes)
//   .filter((recipe) => data.recipes[recipe].forBuilding === data.recipes[recipe].inMachine)
//   .map((recipe) => {
//     return {
//       name: data.recipes[recipe].name,
//       forBuilding: data.recipes[recipe].forBuilding,
//       inMachine: data.recipes[recipe].inMachine,
//     };
//   });
// console.log(testvalues);

const getRecipeType = (recipe) => {
  if (recipe.forBuilding) {
    return 'building';
  }
  if (recipe.inMachine) {
    return 'product';
  }
  return 'handcrafting';
};

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
      type: getRecipeType(recipe),
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
  // manually filter some ficsmas recipes
  .filter((key) => !ficsmasRecipes.includes(key))
  .map((key) => {
    const recipe = data.recipes[key];
    return {
      ...recipe,
      producedIn: recipe.producedIn[0],
      cyclesMin: 60 / recipe.time,
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
      type: getRecipeType(recipe),
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
