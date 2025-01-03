import { Calculator as CalculatorType } from '@/schemas/satisfactory/calculator';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Calculator from './calculator';
import SatisfactoryNetwork from './network/satisfactory-network';

interface UseSatisfactoryCalculatorReturn {
  config: CalculatorType;
  saveConfig?: (config: CalculatorType) => Promise<void>;
  saveResult?: (result: SatisfactoryNetwork) => Promise<void>;
  result: SatisfactoryNetwork | undefined;
  dirty: boolean;
  calculate: () => Promise<void>;
}

const SatisfactoryCalculatorContext = createContext<UseSatisfactoryCalculatorReturn | undefined>(
  undefined
);

interface SatisfactoryCalculatorContextProviderProps {
  config: CalculatorType;
  saveConfig?: (config: CalculatorType) => Promise<void>;
  saveResult?: (result: SatisfactoryNetwork) => Promise<void>;
  children: React.ReactNode;
}

export const SatisfactoryCalculatorContextProvider = ({
  config,
  saveConfig,
  saveResult,
  children,
}: SatisfactoryCalculatorContextProviderProps) => {
  //   const [config, setConfig] = useState<CalculatorType>({});
  const [result, setResult] = useState<SatisfactoryNetwork>();
  const [dirty, setDirty] = useState(false);

  // Clear result every time config changes
  useEffect(() => {
    setResult(undefined);
    setDirty(true);
  }, [config]);

  // Calculate result
  const calculate = useCallback(async () => {
    const calculator = new Calculator(config);
    await calculator.calculate();

    setResult(calculator.result);
    setDirty(false);
    if (saveResult && calculator.result) {
      //const saveObject = calculator.result.toObject();
      //const calculatorTest = new SatisfactoryNetwork(saveObject.nodes, saveObject.edges);
      console.log(calculator.result.toObject());
      saveResult(calculator.result);
    }
  }, [config, saveResult]);

  return (
    <SatisfactoryCalculatorContext.Provider
      value={{ dirty, config, saveConfig, saveResult, result, calculate }}
    >
      {children}
    </SatisfactoryCalculatorContext.Provider>
  );
};

interface UseSatisfactoryCalculatorProps {
  options?: {
    autoUpdate?: boolean;
  };
}

const useSatisfactoryCalculator = (
  props: UseSatisfactoryCalculatorProps = {
    options: {
      autoUpdate: false,
    },
  }
): UseSatisfactoryCalculatorReturn => {
  const context = useContext(SatisfactoryCalculatorContext);

  if (!context) {
    throw new Error(
      'useSatisfactoryCalculator must be used within a SatisfactoryCalculatorContextProvider'
    );
  }

  useEffect(() => {
    if (props.options?.autoUpdate) {
      context.calculate();
    }
  }, [props.options?.autoUpdate, context.config]);
  //   const [config, setConfig] = useState<CalculatorType>(initialConfig);
  //   const [result, setResult] = useState<SatisfactoryNetwork>();
  //   //   const [network, setNetwork] = useState<SatisfactoryNetwork>();

  //   const calculate = useCallback(async () => {
  //     return setResult(new SatisfactoryNetwork());
  //   }, []);

  return context as UseSatisfactoryCalculatorReturn;
};

export default useSatisfactoryCalculator;
