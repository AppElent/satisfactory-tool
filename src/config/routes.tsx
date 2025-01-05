import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import PaperbaseLayout from '@/layouts/paperbase/Layout';
import NotFound from '@/pages/default/404';
import SignIn from '@/pages/default/SignIn';
import TestAuthProviders from '@/pages/default/test/auth-providers';
import DataSources from '@/pages/default/test/data-sources/index';
import FileUploads from '@/pages/default/test/file-uploads';
import Forms from '@/pages/default/test/forms';
import Translations from '@/pages/default/test/translations';
import Calculator from '@/pages/satisfactory/calculator';
import CalculatorDetails from '@/pages/satisfactory/calculator-details';
import BeltsDetail from '@/pages/satisfactory/codex/belt-details';
import Belts from '@/pages/satisfactory/codex/belts';
import BuildableDetails from '@/pages/satisfactory/codex/buildable-details';
import BuildableRecipeDetails from '@/pages/satisfactory/codex/buildable-recipe-details';
import BuildableRecipes from '@/pages/satisfactory/codex/buildable-recipes';
import Buildables from '@/pages/satisfactory/codex/buildables';
import BuildingDetails from '@/pages/satisfactory/codex/building-details';
import Buildings from '@/pages/satisfactory/codex/buildings';
import Equipment from '@/pages/satisfactory/codex/equipment';
import EquipmentDetails from '@/pages/satisfactory/codex/equipment-details';
import GeneratorDetails from '@/pages/satisfactory/codex/generator-details';
import Generators from '@/pages/satisfactory/codex/generators';
import MinerDetails from '@/pages/satisfactory/codex/miner-details';
import Miners from '@/pages/satisfactory/codex/miners';
import ProductDetails from '@/pages/satisfactory/codex/product-details';
import Products from '@/pages/satisfactory/codex/products';
import RecipeDetails from '@/pages/satisfactory/codex/recipe-details';
import Recipes from '@/pages/satisfactory/codex/recipes';
import ResourceDetails from '@/pages/satisfactory/codex/resource-details';
import Resources from '@/pages/satisfactory/codex/resources';
import SchematicDetails from '@/pages/satisfactory/codex/schematic-details';
import Schematics from '@/pages/satisfactory/codex/schematics';
import GameDetails from '@/pages/satisfactory/game-details';
import Games from '@/pages/satisfactory/games';
import RawData from '@/pages/satisfactory/raw-data';
import Statistics from '@/pages/satisfactory/statistics';
import { CustomRouteObject, routes as routesImport } from './routing';

const routeElements: { [key: string]: JSX.Element } = {
  home: (
    <PaperbaseLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </PaperbaseLayout>
  ),
  homeIndex: <>Home</>,
  // Satisfactory pages
  satisfactoryIndex: <>TEST</>,
  productsIndex: <Products />,
  productDetails: <ProductDetails />,
  recipesIndex: <Recipes />,
  recipeDetails: <RecipeDetails />,
  equipmentIndex: <Equipment />,
  equipmentDetails: <EquipmentDetails />,
  rawData: <RawData />,
  generatorsIndex: <Generators />,
  generatorDetails: <GeneratorDetails />,
  buildablesIndex: <Buildables />,
  buildableDetails: <BuildableDetails />,
  buildableRecipesIndex: <BuildableRecipes />,
  buildableRecipeDetails: <BuildableRecipeDetails />,
  buildingsIndex: <Buildings />,
  buildingDetails: <BuildingDetails />,
  schematicsIndex: <Schematics />,
  schematicDetails: <SchematicDetails />,
  beltsIndex: <Belts />,
  beltDetails: <BeltsDetail />,
  minersIndex: <Miners />,
  minerDetails: <MinerDetails />,
  resourcesIndex: <Resources />,
  resourceDetails: <ResourceDetails />,
  calculatorIndex: <Calculator />,
  calculatorDetails: <CalculatorDetails />,
  gamesIndex: <Games />,
  gameDetails: <GameDetails />,
  statistics: <Statistics />,
  // Test pages
  testDataSources: <DataSources />,
  testFileUploads: <FileUploads />,
  testAuthProviders: <TestAuthProviders />,
  testForms: <Forms />,
  testTranslations: <Translations />,
  // Default pages
  login: <SignIn mode="signin" />,
  signup: <SignIn mode="signup" />,
  terms: <div>Terms</div>,
  privacy: <div>Privacy</div>,
  '404': <NotFound />,
};

function generateRouteObjects(routes: CustomRouteObject[]): RouteObject[] {
  return routes.map(
    ({
      id: _id,
      Icon: _Icon,
      translationKey: _translationKey,
      category: _category,
      children,
      ...route
    }) => {
      const routeObject: RouteObject = {
        ...route,
        element: route.element ? route.element : routeElements[_id],
      };
      if (children) {
        routeObject.children = generateRouteObjects(children);
      }
      return routeObject;
    }
  );
}

const routes = generateRouteObjects(routesImport);

export default routes;
