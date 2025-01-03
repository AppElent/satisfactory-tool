import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import { useEffect } from 'react';

const TabBuildList = () => {
  const { result, calculate } = useSatisfactoryCalculator();

  useEffect(() => {
    // const calculate = async () => {
    //   await calculator.calculate();
    //   console.log(calculator.result);
    // };
    calculate();
  }, []);

  console.log(result);

  return (
    <>
      Build list
      {result?.nodes.map((node) => (
        <div key={node.id}>
          {node.item} {node.amount}
        </div>
      ))}
    </>
  );
};

export default TabBuildList;
