import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import { Calculator } from '@/schemas/satisfactory/calculator';
import CalculatorSection from '@/sections/satisfactory/calculator-section';
// import TabBuildList from './_components/tab-build-list';
// import TabConfigure from './_components/tab-configure';
// import TabGraph from './_components/tab-graph';

// const tabsData = [
//   {
//     label: 'Configure',
//     value: 'config',
//     component: <TabConfigure />,
//   },
//   {
//     label: 'Graph',
//     value: 'graph',
//     component: <TabGraph />,
//   },
//   {
//     label: 'Build list',
//     value: 'list',
//     component: <TabBuildList />,
//   },
// ];

const CalculatorDetails = () => {
  const data = useData<Calculator, Calculator[]>('calculator_configs');
  const item = useParamItem({
    items: data.data || [],
  });

  const setConfig = async (config: Calculator) => {
    data.actions.update(config, config.id);
  };

  // useEffect(() => {
  //   calculator.setConfig(item);
  // }, [item]);

  // const calculator = useMemo(() => new CalculatorClass(), []);

  // console.log(calculator);

  return (
    //
    //   <SatisfactoryCalculatorContextProvider config={item}>
    //     {item && <Tabs tabs={tabsData} />}
    //   </SatisfactoryCalculatorContextProvider>
    //   {!item && <>Calculator configuration not found</>}
    // </DefaultPage>
    <DefaultPage currentPage={item?.name}>
      {item && (
        <CalculatorSection
          config={item}
          setConfig={setConfig}
          saveResult={(result) => {
            console.log('save result');
            console.log(result);
          }}
        />
      )}
    </DefaultPage>
  );
};

export default CalculatorDetails;
