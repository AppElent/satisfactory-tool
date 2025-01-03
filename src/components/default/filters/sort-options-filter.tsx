import { FormControlProps, TextFieldProps } from '@mui/material';
import SortOptions from './sort-options';

interface SortOptionsFilterProps {
  filter: {
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
    setSortField: (sortField: string | null) => void;
    setSortDirection: (sortDirection: 'asc' | 'desc') => void;
  };
  options: { value: string; label: string }[];
  muiFormControlProps?: FormControlProps;
  muiTextFieldProps?: TextFieldProps;
}

const SortOptionsFilter = ({ filter, ...rest }: SortOptionsFilterProps) => {
  const value = `${filter.sortField}-${filter.sortDirection}`;

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [sortField, sortDirection] = e.target.value.split('-');
    filter.setSortField(sortField);
    filter.setSortDirection(sortDirection as 'asc' | 'desc');
  };

  return (
    <SortOptions
      value={value}
      handleSortChange={handleSortChange}
      {...rest}
    />
  );
};

export default SortOptionsFilter;
