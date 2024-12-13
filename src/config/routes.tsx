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
import Belts from '@/pages/satisfactory/codex/belts';
import Buildables from '@/pages/satisfactory/codex/buildables';
import Buildings from '@/pages/satisfactory/codex/buildings';
import Generators from '@/pages/satisfactory/codex/generators';
import Miners from '@/pages/satisfactory/codex/miners';
import Products from '@/pages/satisfactory/codex/products';
import Recipes from '@/pages/satisfactory/codex/recipes';
import Resources from '@/pages/satisfactory/codex/resources';
import Schematics from '@/pages/satisfactory/codex/schematics';
import RawData from '@/pages/satisfactory/raw-data';
import { Games } from '@mui/icons-material';
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
  products: <Products />,
  recipes: <Recipes />,
  rawData: <RawData />,
  generators: <Generators />,
  buildables: <Buildables />,
  buildings: <Buildings />,
  schematics: <Schematics />,
  belts: <Belts />,
  miners: <Miners />,
  resources: <Resources />,
  calculator: <Calculator />,
  games: <Games />,
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
