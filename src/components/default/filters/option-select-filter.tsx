import OptionSelect from './option-select';

interface OptionSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

const OptionSelectFilter = ({ options, onChange, value, label }: OptionSelectProps) => {
  return (
    <OptionSelect
      label={label}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};

export default OptionSelectFilter;
