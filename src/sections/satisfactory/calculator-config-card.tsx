import useRouter from '@/hooks/use-router';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';

interface CalculatorConfigCardProps {
  config: Calculator;
  deleteConfig: () => void;
}

const CalculatorConfigCard = ({ config, deleteConfig }: CalculatorConfigCardProps) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader title={config?.name} />
      <CardContent>ID: {config.id}</CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="error"
          onClick={() => deleteConfig()}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={() => router.push(`${config.id}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default CalculatorConfigCard;
