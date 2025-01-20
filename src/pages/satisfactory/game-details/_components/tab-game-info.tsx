import useParamItem from '@/hooks/use-param-item';
import usePathRouter from '@/hooks/use-path-router';
import { useData } from '@/libs/data-sources';
import Select from '@/libs/forms/components/Select';
import SubmitButton from '@/libs/forms/components/SubmitButton';
import TextField from '@/libs/forms/components/TextField';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { createGameSchema, Game } from '@/schemas/satisfactory/game';
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const TabGameInfo = () => {
  const fieldDefinitions = createGameSchema().getFieldDefinitions();
  const games = useData<Game>('games');
  const game = useParamItem<Game>({
    items: games.data || [],
    id: 'gameId',
  });
  const router = usePathRouter();

  const versionOptions = satisfactoryData.getVersions().map((version) => {
    return { key: version.key, value: version.label };
  });

  const handleDeleteGame = async () => {
    try {
      await games?.actions.delete(game?.id);
      toast.success('Game deleted');
      router.push('gamesIndex');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete game');
    }
  };

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
      >
        <Card>
          <CardHeader title="Game info" />
          <CardContent>
            <TextField field={fieldDefinitions.name} />
            <Select
              field={fieldDefinitions.version}
              options={versionOptions}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              color="error"
              onClick={handleDeleteGame}
            >
              Delete
            </Button>
            <SubmitButton>Save</SubmitButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TabGameInfo;
