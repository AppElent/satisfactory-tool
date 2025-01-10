import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import SatisfactoryNetwork from '@/libs/satisfactory/calculator/network/satisfactory-network';
import DefaultPage from '@/pages/default/DefaultPage';
import { Calculator } from '@/schemas/satisfactory/calculator';
import CalculatorSection from '@/sections/satisfactory/calculator-section';

const CalculatorDetails = () => {
  const data = useData<Calculator>('calculator_configs');
  const item = useParamItem({
    items: data.data || [],
  });

  const saveConfig = async (config: Calculator) => {
    data.actions.update(config, config.id);
  };

  const saveResult = async (result: SatisfactoryNetwork) => {
    console.log('RESULT', result);
  };

  const createConfig = async (config: Calculator, id?: string) => {
    data.actions.set(config, id);
  };

  const deleteConfig = async () => {
    data.actions.delete(item?.id);
  };

  const options = {
    calculatorDetails: {
      getLabel: (_params: any) => item?.name,
    },
  };

  return (
    <DefaultPage options={options}>
      {item && (
        <CalculatorSection
          config={item}
          saveConfig={saveConfig}
          saveResult={saveResult}
          createConfig={createConfig}
          deleteConfig={deleteConfig}
          options={{
            autoUpdate: true,
            autoSave: true,
          }}
        />
      )}
    </DefaultPage>
  );
};

export default CalculatorDetails;
