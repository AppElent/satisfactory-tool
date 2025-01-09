import { FieldConfig } from '@/libs/forms';
import Table from '@/libs/forms/components/Table';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { productionInputSchema } from '@/schemas/satisfactory/production-input';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureInputsCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);

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

  console.log(fieldConfig, fieldDefinitions);

  return (
    <Card>
      <CardHeader
        title="Inputs"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Table
          field={fieldConfig}
          tableOptions={{ getTemplate: () => productionInputSchema.getTemplate() }}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigureInputsCard;
