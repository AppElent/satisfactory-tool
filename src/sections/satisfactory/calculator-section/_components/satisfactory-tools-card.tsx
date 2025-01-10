import JsonEditor from '@/components/default/json-editor';
import CustomTextField from '@/libs/forms/components/TextField';
import Calculator from '@/libs/satisfactory/calculator';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const SatisfactoryToolsCard = () => {
  const { config } = useSatisfactoryCalculator();
  //const [toolsConfig, setToolsConfig] = useState<string>();
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);
  const [json, setJson] = useState<string>('');

  const openInSatisfactoryTools = async () => {
    if (config) {
      const calculator = new Calculator(config);
      const link = await calculator.saveSatisfactoryTools();
      window.open(link, '_blank');
    }
  };

  const getFromSatisfactoryTools = async () => {
    try {
      if (config) {
        const calculator = new Calculator(config);
        const newConfig = await calculator.getSatisfactoryToolsConfig(config.externalId as string);
        setJson(JSON.stringify(newConfig, null, 2));
        toast.success('Succesfully fetched Tools data');
      }
    } catch (e) {
      console.error(e);
      toast.error('Error getting data from satisfactory tools');
    }
  };

  return (
    <Card>
      <CardHeader
        title="Satisfactory Tools"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <FormControl fullWidth>
          <CustomTextField field={fieldDefinitions.externalId} />
        </FormControl>

        {json && (
          <>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Satisfactory Tools Data"
                multiline
                onChange={(e) => setJson(e.target.value)}
                rows={10}
                value={json}
                variant="outlined"
              />
            </FormControl>
            <JsonEditor data={JSON.parse(json)} />
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          disabled={!config.externalId}
          onClick={getFromSatisfactoryTools}
        >
          Get data from Satisfactory tools
        </Button>
        <Button
          onClick={openInSatisfactoryTools}
          variant="contained"
        >
          Open in Satisfactory Tools
        </Button>
      </CardActions>
    </Card>
  );
};

export default SatisfactoryToolsCard;
