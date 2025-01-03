import { FieldConfig } from '@/libs/forms';
import Table from '@/libs/forms/components/Table';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureProductionCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

  const fieldConfig: FieldConfig = {
    ...fieldDefinitions.production,
    custom: {
      ...fieldDefinitions.production.custom,
      table: {
        columns: {
          item: fieldDefinitions['production.item'],
          amount: fieldDefinitions['production.amount'],
          mode: fieldDefinitions['production.mode'],
        },
        editable: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Production"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Table field={fieldConfig} />
      </CardContent>
    </Card>
  );
};

export default ConfigureProductionCard;
