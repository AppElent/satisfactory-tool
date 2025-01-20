import { FieldConfig } from '@/libs/forms';
import Table from '@/libs/forms/components/Table';
import { createCalculatorSchema } from '@/schemas/satisfactory/calculator';
import { productionItemSchema } from '@/schemas/satisfactory/production-item';
import { Card, CardContent, CardHeader } from '@mui/material';

const ConfigureProductionCard = () => {
  //const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);
  const fieldDefinitions = createCalculatorSchema().getFieldDefinitions();
  console.log(fieldDefinitions);

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
        <Table
          field={fieldConfig}
          tableOptions={{ getTemplate: () => productionItemSchema.getTemplate() }}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigureProductionCard;
