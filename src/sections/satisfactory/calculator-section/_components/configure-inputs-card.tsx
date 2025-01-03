import { FieldConfig } from '@/libs/forms';
import Table from '@/libs/forms/components/Table';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureInputsCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

  const fieldConfig: FieldConfig = {
    ...fieldDefinitions.input,
    custom: {
      ...fieldDefinitions.input.custom,
      table: {
        columns: {
          item: fieldDefinitions['input.item'],
          amount: fieldDefinitions['input.amount'],
        },
        editable: true,
        title: 'Inputs',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Inputs"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Table field={fieldConfig} />
      </CardContent>
    </Card>
  );
};

export default ConfigureInputsCard;
