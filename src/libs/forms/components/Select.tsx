import { FieldConfig } from '@/libs/forms';
import useFormField from '@/libs/forms/use-form-field';
import { MenuItem, Select as MUISelect, SelectProps } from '@mui/material';

interface CustomSelectProps {
  name?: string;
  field?: FieldConfig;
  muiSelectProps?: SelectProps;
}

const Select = ({ name, field: fieldConfig }: CustomSelectProps) => {
  if (!name && !fieldConfig) {
    throw new Error('Either name or field must be provided');
  }
  const fieldName = name || fieldConfig?.name;
  const data = useFormField(fieldName as string, fieldConfig);
  const { options, field, meta } = data;

  const selectOptions = fieldConfig?.options || [];

  return (
    <>
      <MUISelect
        name={`${fieldName}`}
        value={field.value || fieldConfig?.default || ''}
        onChange={field.onChange}
        error={meta.touched && Boolean(meta.error)}
        onClick={(e) => e.stopPropagation()}
        sx={{ width: '100%' }}
        size={'small'}
      >
        {selectOptions.map((option: any) => (
          <MenuItem
            key={options.key || option.value}
            value={option.key || option.value}
          >
            {option.value}
          </MenuItem>
        ))}
      </MUISelect>
      {/* <DTextField
        key={fieldName}
        margin="dense"
        name={fieldName}
        label={fieldConfig?.label || fieldName}
        value={field.value || ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        {...newProps?.muiTextFieldProps}
      /> */}
    </>
  );
};

export default Select;
