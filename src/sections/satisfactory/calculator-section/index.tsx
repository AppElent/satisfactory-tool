import {
  SatisfactoryCalculatorContextProvider,
  SatisfactoryCalculatorContextProviderProps,
} from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import Tabs from '@/libs/tabs';
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

// interface CalculatorSectionProps {
//   config: Calculator;
//   setConfig?: (config: Calculator) => Promise<void>;
//   saveResult: (result: SatisfactoryNetwork) => any;
//   options?: {
//     autoUpdate?: boolean;
//     autoSave?: boolean;
//   };
// }

const CalculatorSection = ({
  config,
  ...rest
}: Omit<SatisfactoryCalculatorContextProviderProps, 'children'>) => {
  return (
    <Box>
      <SatisfactoryCalculatorContextProvider
        config={config}
        {...rest}
      >
        {config && <Tabs tabs={tabsData} />}
      </SatisfactoryCalculatorContextProvider>
      {!config && <>Calculator configuration not found</>}
    </Box>
  );
};

export default CalculatorSection;
