import TextField from '@/libs/forms/components/TextField';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useMemo } from 'react';

const ConfigureResourcesCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);
  const fieldKeys = Object.keys(fieldDefinitions).filter((key) => key.startsWith('resourceMax.'));

  return (
    <Card>
      <CardHeader
        title="Resources"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container>
          {fieldKeys.map((key) => {
            const field = fieldDefinitions[key];
            return (
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
                key={key}
              >
                <TextField
                  key={key}
                  field={field}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureResourcesCard;
