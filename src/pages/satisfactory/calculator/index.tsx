import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import calculatorSchemaClass, {
  Calculator as CalculatorType,
} from '@/schemas/satisfactory/calculator';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';

// const tabsData = [
//   {
//     label: 'Test',
//     value: 'test',
//     component: <TabTest />,
//   },
// ];

const Calculator = () => {
  const data = useData<CalculatorType>('calculator_configs');
  const router = useRouter();
  console.log(data);
  // const calculator = new CalculatorClass(satisfactoryData);

  // const [request, setRequest] = useState<any>();
  // const [, setResult] = useState<any[]>();

  const createNewConfig = async () => {
    const config = calculatorSchemaClass.getTemplate();
    const newItem = await data.actions.add(config);
    console.log(config, data, newItem);
    router.push(`${config.id}`);
  };

  return (
    <DefaultPage>
      <Button onClick={createNewConfig}>Create config</Button>
      <Grid
        container
        spacing={2}
      >
        {/* <Tabs tabs={tabsData} /> */}
        {data?.data?.map((config) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              key={config.id}
            >
              <Card onClick={() => router.push(`${config.id}`)}>
                <CardHeader title={config?.name} />
                <CardContent>ID: {config.id}</CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button onClick={() => router.push(`${config.id}`)}>Edit</Button>
                </CardActions>
              </Card>
              {/* <Card
            key={config.id}
            onClick={() => router.push(`${config.id}`)}
          >
            {config?.name}
          </Card> */}
            </Grid>
          );
        })}
      </Grid>
    </DefaultPage>
  );
};

export default Calculator;
