import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Button } from '@mui/material';
import TabTest from './_components/tab-test';

const tabsData = [
  {
    label: 'Test',
    value: 'test',
    component: <TabTest />,
  },
];

const Calculator = () => {
  const data = useData('calculator_configs');
  const router = useRouter();
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
      <Tabs tabs={tabsData} />
    </DefaultPage>
  );
};

export default Calculator;
