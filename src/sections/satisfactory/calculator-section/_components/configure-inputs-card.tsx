import Table from '@/libs/forms/components/Table';
import { createCalculatorSchema } from '@/schemas/satisfactory/calculator';
import { createProductionInputSchema } from '@/schemas/satisfactory/production-input';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureInputsCard = () => {
  //const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);
  const calculatorSchema = useMemo(() => createCalculatorSchema(), []);
  const productionInputSchema = useMemo(() => createProductionInputSchema(), []);
  const fieldDefinitions = useMemo(
    () => calculatorSchema.getFieldDefinitions(),
    [calculatorSchema]
  );

  // const fieldConfig: FieldConfig = {
  //   ...fieldDefinitions.input,
  //   custom: {
  //     ...fieldDefinitions.input.custom,
  //     // table: {
  //     //   columns: {
  //     //     item: fieldDefinitions['input.item'],
  //     //     amount: fieldDefinitions['input.amount'],
  //     //   },
  //     //   editable: true,
  //     //   title: 'Inputs',
  //     // },
  //   },
  // };

  const tableOptions = {
    getTemplate: productionInputSchema.getTemplate,
    columns: {
      item: fieldDefinitions['input.item'],
      amount: fieldDefinitions['input.amount'],
    },
    editable: true,
  };

  console.log(fieldDefinitions.input, fieldDefinitions);

  return (
    <Card>
      <CardHeader
        title="Inputs"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Table
          field={fieldDefinitions.input}
          tableOptions={tableOptions}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigureInputsCard;
