import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import TextField from '@/libs/forms/components/TextField';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import calculatorSchema, { Calculator } from '@/schemas/satisfactory/calculator';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

const ConfigureMetadataCard = () => {
  const { config } = useSatisfactoryCalculator();
  const configs = useData<Calculator>('calculator_configs');
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);
  const router = useRouter();

  // const openInSatisfactoryTools = async () => {
  //   console.log('open in satisfactory tools');
  //   if (config) {
  //     const calculator = new Calculator(config);
  //     const link = await calculator.saveSatisfactoryTools();
  //     window.open(link, '_blank');
  //   }
  // };

  // const getFromSatisfactoryTools = async () => {
  //   console.log('get from satisfactory tools');
  //   if (config) {
  //     const calculator = new Calculator(config);
  //     const newConfig = await calculator.getSatisfactoryToolsConfig(config.externalId as string);
  //     console.log(newConfig);
  //   }
  // };

  const cloneConfig = async () => {
    const template = calculatorSchema.getTemplate();
    const newConfig = {
      ...template,
      ...config,
      id: template.id,
      name: `${config?.name} (clone)`,
    };
    await configs?.actions?.set(newConfig, template.id);
    toast.success('Config cloned');
    router.push(`/app/satisfactory/calculator/${template.id}`);
  };

  return (
    <Card>
      <CardHeader
        title="Metadata"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <TextField field={fieldDefinitions.name} />
        {/* <Grid container>
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
        </Grid> */}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          onClick={cloneConfig}
          variant="contained"
        >
          Clone
        </Button>
      </CardActions>
    </Card>
  );
};

export default ConfigureMetadataCard;
