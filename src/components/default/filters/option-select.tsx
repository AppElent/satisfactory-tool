import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

interface OptionSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const OptionSelect: React.FC<OptionSelectProps> = ({ label, value, options, onChange }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default OptionSelect;
