// import { Outlet, RouteObject } from 'react-router-dom';

// import PaperbaseLayout from '@/layouts/paperbase/Layout';
// import HomePage from '@/pages/home';
// import MyRecipeOverviewPage from '@/pages/recipes/my-recipe-overview';
// import RecipeDetailsPage from '@/pages/recipes/recipe-details';
// import RecipeOverviewPage from '@/pages/recipes/recipe-overview';
import appRoutes from '@/routes/appRoutes';
import { Home as HomeIcon } from '@mui/icons-material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Outlet, RouteObject } from 'react-router-dom';
//import { PathItem } from './paths';

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
              },
              {
                id: 'recipes',
                label: 'Recipes',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'recipes',
                category: 'codex',
              },
              {
                id: 'generators',
                label: 'Generators',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'generators',
                category: 'codex',
              },
              {
                id: 'buildables',
                label: 'Buildables',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'buildables',
                category: 'codex',
              },
              {
                id: 'buildings',
                label: 'Buildings',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'buildings',
                category: 'codex',
              },
              {
                id: 'schematics',
                label: 'Schematics',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'schematics',
                category: 'codex',
              },
              {
                id: 'belts',
                label: 'Belts',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'belts',
                category: 'codex',
              },
              {
                id: 'miners',
                label: 'Miners',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'miners',
                category: 'codex',
              },
              {
                id: 'resources',
                label: 'Resources',
                Icon: <BarChartIcon fontSize="inherit" />,
                path: 'resources',
                category: 'codex',
              },
            ],
          },
          {
            id: 'calculator',
            label: 'Calculator',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'calculator',
            category: 'gameplay',
          },
          {
            id: 'games',
            label: 'Games',
            Icon: <BarChartIcon fontSize="inherit" />,
            path: 'games',
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

// const routes2 = generateRouteObjects(routes);
// console.log('ROUTES', routes2);

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
