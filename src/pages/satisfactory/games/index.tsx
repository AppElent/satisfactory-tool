import FloatingButton from '@/components/default/floating-button';
import useRouter from '@/hooks/use-router';
import { useAuth } from '@/libs/auth';
import { useData } from '@/libs/data-sources';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { gameSchema } from '@/schemas/satisfactory/game';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const Games = () => {
  const games = useData('games');
  console.log('Games', games);
  const router = useRouter();
  const auth = useAuth({ redirectUnauthenticated: true });

  const handleAddGame = async () => {
    try {
      const template = gameSchema.getTemplate();
      template.owner = auth.user?.id || '';
      const createdGame = await games?.actions.set(template, template.id);
      console.log(createdGame);
      router.push(`${template.id}`);
      toast.success(`Game ${template.name} created`);
    } catch (e) {
      console.error(e);
      toast.error('Failed to create game');
    }
  };

  return (
    <DefaultPage>
      <Grid
        container
        spacing={2}
      >
        {games?.data?.map((game: any) => {
          console.log(game);
          return (
            <Grid
              item
              key={game.id}
              xs={12}
              md={6}
            >
              <Card>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                  >
                    {game.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                  >
                    {game.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                  >
                    Version:{' '}
                    {satisfactoryData.getVersions().find((version) => version.key === game.version)
                      ?.label || game.version}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => router.push(`${game.id}`)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <FloatingButton handleAdd={handleAddGame} />
    </DefaultPage>
  );
};

export default Games;
