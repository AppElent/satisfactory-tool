import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import calculatorSchemaClass, {
  Calculator as CalculatorType,
} from '@/schemas/satisfactory/calculator';
import { Button, Card } from '@mui/material';

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
      {/* <Tabs tabs={tabsData} /> */}
      {data?.data?.map((config) => {
        return (
          <Card
            key={config.id}
            onClick={() => router.push(`${config.id}`)}
          >
            {config?.name}
          </Card>
        );
      })}
    </DefaultPage>
  );
};

export default Calculator;
