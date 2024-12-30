import { FieldConfig } from '@/libs/forms';
import Table from '@/libs/forms/components/Table';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureProductionCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

  const products = useMemo(() => {
    return satisfactoryData.products.map((product) => ({
      key: product.className,
      value: product.name,
    }));
  }, []);

  // TODO: reference the field definitions from the schema
  const fieldConfig: FieldConfig = {
    ...fieldDefinitions.production,
    custom: {
      table: {
        columns: [
          {
            key: 'item',
            label: 'Item',
            type: 'autocomplete',
            fieldDefinition: fieldDefinitions['production.item'],
            options: products,
          },
          {
            key: 'amount',
            label: 'Amount',
            type: 'number',
            fieldDefinition: fieldDefinitions['production.amount'],
          },
          {
            key: 'mode',
            label: 'Mode',
            type: 'select',
            fieldDefinition: fieldDefinitions['production.mode'],
            // options: [
            //   {
            //     key: 'perMinute',
            //     value: 'Per minute',
            //   },
            //   {
            //     key: 'max',
            //     value: 'Max',
            //   },
            // ],
          },
        ],
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
