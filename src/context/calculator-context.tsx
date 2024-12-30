import CalculatorClass from '@/libs/satisfactory/calculator';
import { createContext, useContext } from 'react';

// interface CalculatorContextProps {
//   config: Calculator;
//   result: any;
//   setConfig: (config: Calculator) => void;
//   setResult: (result: any) => void;
//   calculate: () => void;
// }

export const CalculatorContext = createContext<CalculatorClass>(new CalculatorClass());

export const useCalculatorContext = () => useContext(CalculatorContext);
