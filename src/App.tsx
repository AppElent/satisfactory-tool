import ScrollToTop from '@/components/default/scroll-to-top';
import '@/config/firebase';
import { db } from '@/config/firebase';
import routes from '@/config/routes';
import { FirebaseAuthProvider } from '@/libs/auth';
import FirestoreDataSource from '@/libs/data-sources/data-sources/FirestoreDataSource';
import LocalStorageDataSource from '@/libs/data-sources/data-sources/LocalStorageDataSource';

import theme from '@/theme/paperbase/theme';
import './App.css';
import config from './config';
import { getPath } from './config/paths';
import Dashboard from './Dashboard';
import { Game, gameYupSchema } from './schemas/satisfactory/game';

const firebaseProvider = new FirebaseAuthProvider({
  login: getPath('login').to,
  logout: '/logout',
});

const dataSources = {
  games: new FirestoreDataSource<Game>(
    {
      target: 'satisfactory_games',
      targetMode: 'collection',
      YupValidationSchema: gameYupSchema,
      subscribe: true,
      targetFilter: {
        filters: [
          { field: 'owner', operator: '==', value: () => firebaseProvider.getCurrentUser()?.id },
        ],
        orderBy: [{ field: 'name', direction: 'asc' }],
      },
    },
    { db }
  ),
  settings: new LocalStorageDataSource({ target: 'settings', targetMode: 'document' }),
  calculator_configs: new LocalStorageDataSource({
    target: 'calculator_configs',
    targetMode: 'collection',
    defaultData: [],
    subscribe: true,
  }),

function App() {
  console.log('App config', firebaseProvider, dataSources, routes, config);
  return (
    <>
      <ScrollToTop />

      <Dashboard
        theme={theme}
        authProvider={firebaseProvider}
        routes={routes}
        dataSources={dataSources}
      />
    </>
  );
}

export default App;
