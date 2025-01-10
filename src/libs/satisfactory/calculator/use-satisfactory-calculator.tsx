import { Calculator as CalculatorType } from '@/schemas/satisfactory/calculator';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Calculator from './calculator';
import SatisfactoryNetwork from './network/satisfactory-network';

interface SatisfactoryCalculatorContext
  extends Omit<SatisfactoryCalculatorContextProviderProps, 'children'> {
  result: SatisfactoryNetwork | undefined;
  dirty: boolean;
  loading: boolean;
  error: string | undefined;
  calculate: () => Promise<void>;
}

const SatisfactoryCalculatorContext = createContext<SatisfactoryCalculatorContext | undefined>(
  undefined
);

export interface SatisfactoryCalculatorContextProviderProps {
  config: CalculatorType;
  setConfig?: (config: CalculatorType) => void;
  setResult?: (result: SatisfactoryNetwork) => void;
  saveConfig?: (config: CalculatorType) => Promise<void>;
  saveResult?: (result: SatisfactoryNetwork) => Promise<void>;
  deleteConfig?: () => Promise<void>;
  createConfig?: (config: CalculatorType, id?: string) => Promise<void>;
  options?: {
    autoUpdate?: boolean;
    autoSave?: boolean;
  };
  children: React.ReactNode;
}

export const SatisfactoryCalculatorContextProvider = ({
  config,
  saveResult,
  children,
  ...rest
}: SatisfactoryCalculatorContextProviderProps) => {
  //   const [config, setConfig] = useState<CalculatorType>({});
  const [result, setResult] = useState<SatisfactoryNetwork>();
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  //const [calculatedConfig, setCalculatedConfig] = useState<CalculatorType>();

  // Clear result every time config changes
  useEffect(() => {
    setResult(undefined);
    setDirty(true);
  }, [config]);

  // Calculate result
  const calculate = useCallback(async () => {
    setLoading(true);
    const calculator = new Calculator(config);
    try {
      await calculator.calculate();

      setResult(calculator.result);
      setDirty(false);
      if (saveResult && calculator.result) {
        saveResult(calculator.result);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [config, saveResult]);

  // Auto calculate result based on config changes
  // useEffect(() => {
  //   if (options?.autoUpdate && calculate && dirty) {
  //     calculate();
  //   }
  // }, [config]);

  return (
    <SatisfactoryCalculatorContext.Provider
      value={{ dirty, loading, config, saveResult, result, calculate, error, ...rest }}
    >
      {children}
    </SatisfactoryCalculatorContext.Provider>
  );
};

const useSatisfactoryCalculator = (): SatisfactoryCalculatorContext => {
  const context = useContext(SatisfactoryCalculatorContext);
  //const { options, calculate, config, dirty } = context || {};

  if (!context) {
    throw new Error(
      'useSatisfactoryCalculator must be used within a SatisfactoryCalculatorContextProvider'
    );
  }

  return context as SatisfactoryCalculatorContext;
};

export default useSatisfactoryCalculator;
