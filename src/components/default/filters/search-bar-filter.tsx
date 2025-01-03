import { OutlinedInputProps } from '@mui/material';
import SearchBar from '../ui/search-bar';

interface SearchBarFilterProps {
  filter: {
    inputQuery: string;
    setSearchQuery: (query: string) => void;
  };
  muiOutlinedInputProps?: OutlinedInputProps;
}

const SearchBarFilter = ({ filter, muiOutlinedInputProps }: SearchBarFilterProps) => {
  return (
    <SearchBar
      onClear={() => filter.setSearchQuery('')}
      value={filter.inputQuery}
      onChange={(e) => filter.setSearchQuery(e.target.value)}
      muiOutlinedInputProps={muiOutlinedInputProps}
    />
  );
};

export default SearchBarFilter;
