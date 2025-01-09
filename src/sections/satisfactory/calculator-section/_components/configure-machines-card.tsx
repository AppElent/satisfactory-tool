import CheckboxList from '@/libs/forms/components/CheckboxList';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useMemo } from 'react';

const ConfigureMachinesCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);

  return (
    <Card>
      <CardHeader
        title="Machines"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Typography variant="subtitle1">Select all machines that can be used</Typography>
        <CheckboxList
          field={fieldDefinitions.blockedMachines}
          options={{ inverted: true }}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigureMachinesCard;
