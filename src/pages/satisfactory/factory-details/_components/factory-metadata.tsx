import SubmitButton from '@/libs/forms/components/SubmitButton';
import TextField from '@/libs/forms/components/TextField';
import { factorySchema } from '@/schemas/satisfactory/factory';
import { Card, CardActions, CardContent, CardHeader, Grid2 as Grid } from '@mui/material';

const FactoryMetadata = () => {
  const fieldDefinitions = factorySchema.getFieldDefinitions();
  console.log('fieldDefinitions', fieldDefinitions);
  return (
    <Card>
      <CardHeader title="Factory Metadata" />
      <CardContent>
        <Grid container>
          <Grid size={12}>
            <TextField
              field={fieldDefinitions.name}
              // name={`factories.${index}.name`}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              field={fieldDefinitions.description}
              // name={`factories.${index}.name`}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <SubmitButton>Save</SubmitButton>
      </CardActions>
    </Card>
  );
};

export default FactoryMetadata;
