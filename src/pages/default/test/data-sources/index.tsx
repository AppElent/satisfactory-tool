import JsonEditor from '@/components/default/json-editor';
import { db } from '@/config/firebase';
import BaseDataSource from '@/libs/data-sources/data-sources/BaseDataSource';
import FirestoreDataSource from '@/libs/data-sources/data-sources/FirestoreDataSource';
import LocalStorageDataSource from '@/libs/data-sources/data-sources/LocalStorageDataSource';
import useData from '@/libs/data-sources/useData';
import Tabs from '@/libs/tabs';
import { createDummySchema, Dummy, dummyYupSchema } from '@/schemas/dummy';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import DefaultPage from '../../DefaultPage';

const datasources = {
  Firestore: {
    'Collection - Realtime': new FirestoreDataSource(
      {
        target: 'dummy',
        targetMode: 'collection',
        subscribe: true,
        YupValidationSchema: dummyYupSchema,
        // mockOptions: { schema: dummyMockSchema },
      },
      { db }
    ),
    'Collection - Normal': new FirestoreDataSource(
      { target: 'dummy', targetMode: 'collection', YupValidationSchema: dummyYupSchema },
      { db }
    ),
    'Document - Realtime': new FirestoreDataSource(
      {
        target: 'dummy/01iQznR3TyhzhI5ct5cQ',
        targetMode: 'document',
        subscribe: true,
        YupValidationSchema: dummyYupSchema,
        // mockOptions: { schema: dummyMockSchema },
      },
      { db }
    ),
    'Document - Normal': new FirestoreDataSource(
      {
        target: 'dummy/01iQznR3TyhzhI5ct5cQ',
        targetMode: 'document',
        YupValidationSchema: dummyYupSchema,
        // mockOptions: { schema: dummyMockSchema },
      },
      { db }
    ),
    'Collection - With Filters': new FirestoreDataSource(
      {
        target: 'dummy',
        targetMode: 'collection',
        subscribe: true,
        YupValidationSchema: dummyYupSchema,
        targetFilter: {
          orderBy: [{ field: 'number', direction: 'desc' }],
          limit: 10,
          filters: [{ field: 'boolean', operator: '==', value: false }],
          pagination: { page: 1, pageSize: 5 },
        },
        // mockOptions: { schema: dummyMockSchema },
      },
      { db }
    ),
    // 'Collection - With Converter': new FirestoreDataSource(
    //   {
    //     target: 'dummy',
    //     targetMode: 'collection',
    //     subscribe: true,
    //     YupValidationSchema: dummyYupSchema,
    //   },
    //   { db, converter: dummyConverter }
    // ),
    // 'Document - With Converter': new FirestoreDataSource(
    //   {
    //     target: 'dummy/01iQznR3TyhzhI5ct5cQ',
    //     targetMode: 'document',
    //     subscribe: true,
    //     YupValidationSchema: dummyYupSchema,
    //   },
    //   { db, converter: dummyConverter }
    // ),
  },
  LocalStorage: {
    Realtime: new LocalStorageDataSource({
      target: 'dummy',
      subscribe: true,
      YupValidationSchema: dummyYupSchema,
    }),
    test2: new LocalStorageDataSource({
      target: 'dummy',
      subscribe: true,
      YupValidationSchema: dummyYupSchema,
    }),
    Normal: new LocalStorageDataSource({ target: 'dummy', YupValidationSchema: dummyYupSchema }),
  },
  Base: {
    Realtime: new BaseDataSource({
      target: 'dummy',
      subscribe: true,
      YupValidationSchema: dummyYupSchema,
      data: createDummySchema().getMockData(5),
    }),
  },
  // MockDataSource: {
  //   Normal: new MockDataSource(
  //     {
  //       target: 'dummy',
  //       subscribe: true,
  //       YupValidationSchema: dummyYupSchema,
  //       mockOptions: { schema: dummyMockSchema },
  //     },
  //     { count: 10 }
  //   ),
  // },
};

const DataSource = (props: any) => {
  const { datasourceName, dataSource: newDataSource } = props;
  const datasource = useData<Dummy>(datasourceName, { datasource: newDataSource });

  const handleAdd = async () => {
    const newItem = createDummySchema().generateMockData(); //getDummyTestData(1) as Dummy;
    await datasource.actions.add(newItem as Dummy); //TODO: fix this
  };

  const handleGetAll = async () => {
    const items = await datasource?.actions.getAll();
    console.log(items);
  };

  const handleGet = async () => {
    const item = await datasource?.actions.get();
    console.log(item);
  };

  return (
    <Card>
      <CardHeader title={`${datasourceName} `} />
      <div>
        <CardContent>
          Provider: {datasource.dataSource?.provider}
          <br />
          Loading: {datasource.loading ? 'true' : 'false'}
          <br />
          Error: {datasource.error ? `${datasource.error.message}` : 'false'}
          <br />
          Data:
          {datasource.data && (
            <>
              <JsonEditor data={datasource.data} />
            </>
          )}
        </CardContent>
        <CardActions>
          {!datasource.dataSource?.options?.subscribe && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => datasource.actions.fetchData()}
              >
                Fetch data dummy2
              </Button>
            </>
          )}
          {datasource.dataSource?.options?.targetMode === 'collection' && (
            <>
              <Button onClick={handleAdd}>Add Item</Button>
              <Button onClick={handleGetAll}>Get All Items</Button>
            </>
          )}
          {datasource.dataSource?.options?.targetMode !== 'collection' && (
            <>
              <Button onClick={handleGet}>Get item</Button>
            </>
          )}
        </CardActions>
      </div>
    </Card>
  );
};

const DataSourceTab = ({ tab: currentTab }: { tab: string }) => {
  //const { currentTab } = useCurrentTab();
  const dataSources = datasources[currentTab as keyof typeof datasources] as {
    [key: string]: FirestoreDataSource<any> | LocalStorageDataSource<any> | BaseDataSource<any>;
  };

  return (
    <Grid
      container
      spacing={3}
    >
      {dataSources &&
        Object.keys(dataSources).map((datasourceName) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              key={datasourceName}
            >
              <DataSource
                datasourceName={currentTab + ' - ' + datasourceName}
                dataSource={dataSources[datasourceName]}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

const DataOperations = () => {
  const tabsData = Object.keys(datasources).map((key) => {
    const component = <DataSourceTab tab={key} />;
    return { label: key, value: key, component };
  });
  return (
    <DefaultPage>
      <Tabs tabs={tabsData} />
    </DefaultPage>
  );
};

export default DataOperations;
