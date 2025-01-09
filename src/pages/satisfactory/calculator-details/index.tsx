import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import { Calculator } from '@/schemas/satisfactory/calculator';
import CalculatorSection from '@/sections/satisfactory/calculator-section';

const CalculatorDetails = () => {
  const data = useData<Calculator, Calculator[]>('calculator_configs');
  const item = useParamItem({
    items: data.data || [],
  });

  const setConfig = async (config: Calculator) => {
    data.actions.update(config, config.id);
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
          setConfig={setConfig}
          saveResult={(result) => {
            console.log('save result');
            console.log(result.toObject());
          }}
        />
      )}
    </DefaultPage>
  );
};

export default CalculatorDetails;
