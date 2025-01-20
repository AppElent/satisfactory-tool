import useParamItem from '@/hooks/use-param-item';
import usePathRouter from '@/hooks/use-path-router';
import { useData } from '@/libs/data-sources';
import { createFactorySchema } from '@/schemas/satisfactory/factory';
import { Game } from '@/schemas/satisfactory/game';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import FloatingButton from '../default/floating-button';

const FactoryOverview = () => {
  const data = useData<Game>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const router = usePathRouter();

  const handleFactoryAdd = async () => {
    const factoryTemplate = createFactorySchema().getTemplate();
    const gameCopy = JSON.parse(JSON.stringify(game));
    gameCopy.factories.push(factoryTemplate);
    const factory = await data.actions.set(gameCopy, gameCopy.id);
    console.log(factory);
    toast.success(`Factory ${factory.name} created`);
    router.push('factoryDetails', { factoryId: factory.id });
  };

  const handleFactoryDelete = async (id: string) => {
    console.log('Delete factory', id);
    const gameCopy = JSON.parse(JSON.stringify(game));
    gameCopy.factories = gameCopy.factories.filter((factory: any) => factory.id !== id);
    data.actions.update(gameCopy, gameCopy.id);
    toast.success('Factory deleted');
  };
  return (
    <Box>
      <FloatingButton handleAdd={handleFactoryAdd} />
      <Grid
        container
        spacing={2}
      >
        {game?.factories.map((factory: any) => {
          return (
            <Grid
              key={factory.id}
              size={12}
            >
              <Card key={factory.id}>
                <CardHeader title={factory.name} />
                <CardContent>
                  <div>{factory.description}</div>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    color="error"
                    onClick={() => handleFactoryDelete(factory.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => router.push('factoryDetails', { factoryId: factory.id })}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FactoryOverview;
