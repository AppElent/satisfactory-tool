import { useCalculatorContext } from '@/context/calculator-context';
import { useEffect } from 'react';

const TabBuildList = () => {
  const calculator = useCalculatorContext();
  console.log(calculator);

  useEffect(() => {
    const calculate = async () => {
      await calculator.calculate();
      console.log(calculator.result);
    };
    calculate();
  }, []);

  console.log(calculator.result);

  return (
    <>
      Build list
      {calculator?.result?.nodes.map((node) => (
        <div key={node.id}>
          {node.item} {node.amount}
        </div>
      ))}
    </>
  );
};

export default TabBuildList;
