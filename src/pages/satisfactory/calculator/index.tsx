import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import calculatorSchemaClass, {
  Calculator as CalculatorType,
} from '@/schemas/satisfactory/calculator';
import CalculatorConfigCard from '@/sections/satisfactory/calculator-config-card';
import { Button, Grid2 as Grid } from '@mui/material';
import { toast } from 'react-toastify';

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

  const deleteConfig = async (id: string) => {
    try {
      await data.actions.delete(id);
      toast.success('Config deleted');
    } catch (e: any) {
      console.error(e);
      toast.error('Error deleting config');
    }
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
              size={12}
              key={config.id}
            >
              <CalculatorConfigCard
                config={config}
                deleteConfig={() => deleteConfig(config.id)}
              />
            </Grid>
          );
        })}
      </Grid>
    </DefaultPage>
  );
};

export default Calculator;
