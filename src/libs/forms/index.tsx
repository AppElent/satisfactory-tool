/* eslint-disable react-refresh/only-export-components */
import { AutocompleteProps, TextFieldProps } from '@mui/material';
import { CustomListProps } from './components/List';
import { TableProps } from './components/Table';

export interface FieldConfig {
  id?: string;
  name: string;
  label?: string;
  translationKey?: string;
  type?: string; // TODO: limit types
  options?: any[]; // TODO: set type to string[] OR { key: string, value: any }[]
  definition?: string;
  initialValue?: any;
  //render?: (config: FieldDefinitionConfig) => any;
  validation?: (value: any) => any; //Yup.AnySchema;
  default?: any;
  custom?: FieldOptions;
}

type MuiProps = {
  [key: `mui${string}Props`]: any;
};

// interface TableProps {
//   columns: {
//     [key: string]: FieldConfig;
//   };
//   editable?: boolean;
//   selectable?: boolean;
//   reorderable?: boolean;
//   title?: string;
// }

export interface FieldOptions extends MuiProps {
  muiTextFieldProps?: TextFieldProps;
  muiAutoCompleteProps?: AutocompleteProps<any, any, any, any>;
  autocompleteChipList?: {
    suggestions: string[];
  };
  list?: Omit<CustomListProps, 'name' | 'field'>;
  //editMode?: boolean;
  debounce?: number;
  table?: TableProps['tableOptions'];
  //[key: string]: any; //TODO: remove wildcard
}

export { default as CustomForm } from './custom-form';
export { default as useFormButton } from './use-form-button';
export { default as useFormField } from './use-form-field';
