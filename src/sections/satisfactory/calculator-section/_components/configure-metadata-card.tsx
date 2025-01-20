import usePathRouter from '@/hooks/use-path-router';
import SubmitButton from '@/libs/forms/components/SubmitButton';
import TextField from '@/libs/forms/components/TextField';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

const ConfigureMetadataCard = () => {
  const { config, deleteConfig, createConfig } = useSatisfactoryCalculator();
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);
  const router = usePathRouter();

  const handleDelete = async () => {
    if (config && deleteConfig) {
      await deleteConfig();
      toast.success('Config deleted');
      // remove last ID from URL
      const path = window.location.pathname.split('/');
      path.pop();
      router.push(path.join('/'));
    }
  };

  const cloneConfig = async () => {
    const template = calculatorSchema.getTemplate();
    const newConfig = {
      ...template,
      ...config,
      id: template.id,
      name: `${config?.name} (clone)`,
    };

    await createConfig?.(newConfig, template.id);
    toast.success('Config cloned');
    router.push('calculatorDetails', { calculatorId: template.id });
  };

  return (
    <Card>
      <CardHeader
        title="Metadata"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <TextField field={fieldDefinitions.name} />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {deleteConfig && (
          <Button
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
        {createConfig && (
          <Button
            onClick={cloneConfig}
            variant="outlined"
          >
            Clone
          </Button>
        )}
        <SubmitButton>Save</SubmitButton>
      </CardActions>
    </Card>
  );
};

export default ConfigureMetadataCard;
