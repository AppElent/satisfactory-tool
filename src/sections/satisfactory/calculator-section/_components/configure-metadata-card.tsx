import TextField from '@/libs/forms/components/TextField';
import Calculator from '@/libs/satisfactory/calculator';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useMemo } from 'react';

const ConfigureMetadataCard = () => {
  const { config } = useSatisfactoryCalculator();
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

  const openInSatisfactoryTools = async () => {
    console.log('open in satisfactory tools');
    if (config) {
      const calculator = new Calculator(config);
      const link = await calculator.saveSatisfactoryTools();
      window.open(link, '_blank');
    }
  };

  const getFromSatisfactoryTools = async () => {
    console.log('get from satisfactory tools');
    if (config) {
      const calculator = new Calculator(config);
      const newConfig = await calculator.getSatisfactoryToolsConfig(config.externalId as string);
      console.log(newConfig);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Metadata"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
          >
            <TextField field={fieldDefinitions.name} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              onClick={openInSatisfactoryTools}
              variant="contained"
            >
              Open in Satisfactory Tools
            </Button>
          </Grid>
          <Grid item>
            <TextField field={fieldDefinitions.externalId} />
            <Button
              onClick={getFromSatisfactoryTools}
              variant="contained"
            >
              Get from Satisfactory Tools
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureMetadataCard;
