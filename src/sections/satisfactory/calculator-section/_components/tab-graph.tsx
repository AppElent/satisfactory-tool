import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import CytoscapeGraph from '@/libs/satisfactory/visualization/cytoscape-graph';
import { useEffect } from 'react';

const TabGraph = () => {
  const { result, calculate } = useSatisfactoryCalculator();

  useEffect(() => {
    // const calculate = async () => {
    //   await calculator.calculate();
    //   console.log(calculator.result);
    // };
    calculate();
  }, []);

  console.log(result);

  return <>{result && <CytoscapeGraph network={result} />}</>;
};

export default TabGraph;
