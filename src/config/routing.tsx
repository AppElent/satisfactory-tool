import appRoutes from '@/routes/appRoutes';
import { Home as HomeIcon } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { JSX } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

export type CustomRouteObject = RouteObject & {
  id: string;
  label: string;
  Icon: JSX.Element;
  translationKey?: string;
  category?: string;
  children?: CustomRouteObject[] | any;
};

export const routes: CustomRouteObject[] = [
  {
    id: 'home',
    label: 'Home',
    Icon: <HomeIcon fontSize="inherit" />,
    path: 'app',
    children: [
      {
        id: 'homeIndex',
        index: true,
      },

      {
        id: 'satisfactory',
        label: 'Satisfactory',
        Icon: <BarChartIcon fontSize="inherit" />,
        // category: 'satisfactory',
        path: 'satisfactory',
        element: <Outlet />,
        children: [
          {
            id: 'satisfactoryIndex',
            index: true,
          },
          {
            id: 'satisfactoryCodex',
            label: 'Codex',
            Icon: <BarChartIcon fontSize="inherit" />,
            // category: 'satisfactory',
            path: 'codex',
            element: <Outlet />,
            children: [
              {
                id: 'codexIndex',
                index: true,
              },
              {
                id: 'products',
                label: 'Products',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'products',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'productsIndex',
                    index: true,
                  },
                  {
                    id: 'productDetails',
                    label: 'Product Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'recipes',
                label: 'Recipes',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'recipes',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'recipesIndex',
                    index: true,
                  },
                  {
                    id: 'recipeDetails',
                    label: 'Recipe Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'equipment',
                label: 'Equipment',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'equipment',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'equipmentIndex',
                    index: true,
                  },
                  {
                    id: 'equipmentDetails',
                    label: 'Equipment Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'generators',
                label: 'Generators',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'generators',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'generatorsIndex',
                    index: true,
                  },
                  {
                    id: 'generatorDetails',
                    label: 'Generator Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'buildables',
                label: 'Buildables',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'buildables',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'buildablesIndex',
                    index: true,
                  },
                  {
                    id: 'buildableDetails',
                    label: 'Buildable Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'buildableRecipes',
                label: 'Buildable Recipes',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'buildable-recipes',
                element: <Outlet />,
                children: [
                  {
                    id: 'buildableRecipesIndex',
                    index: true,
                  },
                  {
                    id: 'buildableRecipeDetails',
                    label: 'Buildable Recipe Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'buildings',
                label: 'Buildings',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'buildings',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'buildingsIndex',
                    index: true,
                  },
                  {
                    id: 'buildingDetails',
                    label: 'Building Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'schematics',
                label: 'Schematics',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'schematics',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'schematicsIndex',
                    index: true,
                  },
                  {
                    id: 'schematicDetails',
                    label: 'Schematic Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'belts',
                label: 'Belts',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'belts',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'beltsIndex',
                    index: true,
                  },
                  {
                    id: 'beltDetails',
                    label: 'Belt Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'miners',
                label: 'Miners',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'miners',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'minersIndex',
                    index: true,
                  },
                  {
                    id: 'minerDetails',
                    label: 'Miner Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
              {
                id: 'resources',
                label: 'Resources',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'resources',
                category: 'codex',
                element: <Outlet />,
                children: [
                  {
                    id: 'resourcesIndex',
                    index: true,
                  },
                  {
                    id: 'resourceDetails',
                    label: 'Resource Details',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: ':id',
                  },
                ],
              },
            ],
          },
          {
            id: 'calculator',
            label: 'Calculator',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'calculator',
            category: 'gameplay',
            element: <Outlet />,
            children: [
              {
                id: 'calculatorIndex',
                index: true,
              },
              {
                id: 'calculatorDetails',
                label: 'Calculator Details',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: ':calculatorId',
              },
            ],
          },
          {
            id: 'games',
            label: 'Games',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'games',
            category: 'gameplay',
            element: <Outlet />,
            loginRequired: true,
            children: [
              {
                id: 'gamesIndex',
                index: true,
              },
              {
                id: 'gameDetails',
                label: 'Game Details',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: ':gameId',
                element: <Outlet />,
                children: [
                  {
                    id: 'gameDetailsIndex',
                    index: true,
                  },
                  {
                    id: 'factories',
                    label: 'Factories',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: 'factories',
                    element: <Outlet />,
                    children: [
                      {
                        id: 'factoriesIndex',
                        index: true,
                      },
                      {
                        id: 'factoryDetails',
                        label: 'Factory Details',
                        getLabel: (params: any) => params.factoryId,
                        Icon: <BarChartIcon fontSize="inherit" />,
                        path: ':factoryId',
                        component: <Outlet />,
                        children: [
                          {
                            id: 'factoryDetailsIndex',
                            index: true,
                          },
                          {
                            id: 'factoryDetailsProduction',
                            label: 'Production',
                            Icon: <BarChartIcon fontSize="inherit" />,
                            path: ':productionId',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'powerStations',
                    label: 'Power Stations',
                    Icon: <BarChartIcon fontSize="inherit" />,
                    path: 'power-stations',
                    element: <Outlet />,
                    children: [
                      {
                        id: 'powerStationsIndex',
                        index: true,
                      },
                      {
                        id: 'powerStationDetails',
                        label: 'Power Station Details',
                        Icon: <BarChartIcon fontSize="inherit" />,
                        path: ':powerStationId',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'statistics',
            label: 'Statistics',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'statistics',
            category: 'gameplay',
          },
          {
            id: 'rawData',
            label: 'Raw data',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'raw-data',
            category: 'gameplay',
          },
        ],
      },
      // {
      //   path: 'recipes/:id',
      //   element: <RecipeDetailsPage />,
      // },
      ...appRoutes,
    ],
  },
  //   ...defaultRoutes,
];

export const paths = getAllPaths(routes);

// Function to create a flat list of all paths with custom properties
function getAllPaths(routes: CustomRouteObject[], parentPath: string = ''): any[] {
  return routes.flatMap((route) => {
    const currentPath = route.path
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : parentPath;
    const { children, ...routeInfo } = route;
    const currentRoute = { ...routeInfo, to: currentPath };
    const childrenPaths = children ? getAllPaths(children, currentPath) : [];
    return [currentRoute, ...childrenPaths];
  });
}

export default routes;
