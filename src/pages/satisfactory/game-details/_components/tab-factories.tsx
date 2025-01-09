import useRouter from '@/hooks/use-router';
import { Factory } from '@/schemas/satisfactory/factory';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';

interface TabFactoriesProps {
  factories: Factory[];
}

const TabFactories = ({ factories }: TabFactoriesProps) => {
  const router = useRouter();
  return (
    <div>
      {factories.map((factory: any) => {
        return (
          <Card key={factory.id}>
            <CardHeader title={factory.name} />
            <CardContent>
              <div>{factory.description}</div>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                color="primary"
                onClick={() => router.push(`factories/${factory.id}`)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default TabFactories;
