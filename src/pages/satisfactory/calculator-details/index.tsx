import { CalculatorContext } from '@/context/calculator-context';
import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import CalculatorClass from '@/libs/satisfactory/calculator';
import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { useEffect, useMemo } from 'react';
import TabBuildList from './_components/tab-build-list';
import TabConfigure from './_components/tab-configure';

const tabsData = [
  {
    label: 'Configure',
    value: 'config',
    component: <TabConfigure />,
  },
  {
    label: 'Graph',
    value: 'graph',
    component: <></>,
  },
  {
    label: 'Build list',
    value: 'list',
    component: <TabBuildList />,
  },
];

const CalculatorDetails = () => {
  const data = useData<Calculator[]>('calculator_configs');
  const item = useParamItem({
    items: data.data || [],
  }) as Calculator;

  useEffect(() => {
    calculator.setConfig(item);
  }, [item]);

  const calculator = useMemo(() => new CalculatorClass(), []);

  console.log(calculator);

  return (
    <DefaultPage currentPage={item?.name}>
      <CalculatorContext.Provider value={calculator}>
        {item && <Tabs tabs={tabsData} />}
      </CalculatorContext.Provider>
      {!item && <>Calculator configuration not found</>}
    </DefaultPage>
  );
};

export default CalculatorDetails;
