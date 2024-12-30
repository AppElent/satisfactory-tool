import TextField from '@/libs/forms/components/TextField';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureMetadataCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

  return (
    <Card>
      <CardHeader
        title="Metadata"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <TextField field={fieldDefinitions.name} />
      </CardContent>
    </Card>
  );
};

export default ConfigureMetadataCard;
