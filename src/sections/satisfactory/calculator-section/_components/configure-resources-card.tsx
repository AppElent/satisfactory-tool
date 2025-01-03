import TextField from '@/libs/forms/components/TextField';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useMemo } from 'react';

interface ConfigureResourcesCardProps {
  setResources: (resources: any) => void;
}

const ConfigureResourcesCard = ({ setResources }: ConfigureResourcesCardProps) => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);
  const fieldKeys = Object.keys(fieldDefinitions).filter((key) => key.startsWith('resourceMax.'));

  return (
    <Card>
      <CardHeader
        title="Resources"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('set to max');
            const resources = satisfactoryData.getResourceMax();
            console.log(resources);
            setResources(resources);
          }}
        >
          Set to max
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log('set to 0');
            // Iterate resources and crete
            const resources = satisfactoryData.resources.reduce(
              (acc: { [key: string]: string }, resource) => {
                acc[resource.className] = '0';
                return acc;
              },
              {}
            );
            console.log(resources);
            setResources(resources);
          }}
        >
          Set to 0
        </Button>
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
