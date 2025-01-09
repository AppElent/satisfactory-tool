import useParamItem from '@/hooks/use-param-item';
import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';

const Factories = () => {
  const data = useData<any>('games');
  const item = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const router = useRouter();

  const options = {
    gameDetails: {
      getLabel: (_params: any) => item?.name,
      // options: data.data?.map((game: any) => ({
      //   key: game.id,
      //   label: game.name,
      // })),
    },
  };
  return (
    <DefaultPage options={options}>
      {item?.factories.map((factory: any) => {
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
                onClick={() => router.push(`${factory.id}`)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </DefaultPage>
  );
};

export default Factories;
