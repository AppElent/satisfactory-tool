import SatisfactoryNetwork from '@/libs/satisfactory/calculator/network/satisfactory-network';
import { SatisfactoryCalculatorContextProvider } from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import Tabs from '@/libs/tabs';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { Box } from '@mui/material';
import TabBuildList from './_components/tab-build-list';
import TabConfigure from './_components/tab-configure';
import TabGraph from './_components/tab-graph';

const tabsData = [
  {
    label: 'Configure',
    value: 'config',
    component: <TabConfigure />,
  },
  {
    label: 'Graph',
    value: 'graph',
    component: <TabGraph />,
  },
  {
    label: 'Build list',
    value: 'list',
    component: <TabBuildList />,
  },
];

interface CalculatorSectionProps {
  config: Calculator;
  setConfig?: (config: Calculator) => Promise<void>;
  saveResult: (result: SatisfactoryNetwork) => any;
}

const CalculatorSection = ({ config, setConfig, saveResult }: CalculatorSectionProps) => {
  return (
    <Box>
      <SatisfactoryCalculatorContextProvider
        config={config}
        saveConfig={setConfig}
        saveResult={saveResult}
      >
        {config && <Tabs tabs={tabsData} />}
      </SatisfactoryCalculatorContextProvider>
      {!config && <>Calculator configuration not found</>}
    </Box>
  );
};

export default CalculatorSection;
