import FactoryOverview from '@/components/satisfactory/factory-overview';
import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';

const Factories = () => {
  const data = useData<any>('games');
  const item = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });

  const options = {
    gameDetails: {
      getLabel: (_params: any) => item?.name,
    },
  };

  // const handleFactoryDelete = async (id: string) => {
  //   console.log('Delete factory', id);
  //   const game = JSON.parse(JSON.stringify(item));
  //   game.factories = game.factories.filter((factory: any) => factory.id !== id);
  //   data.actions.update(game, game.id);
  //   toast.success('Factory deleted');
  // };

  return (
    <DefaultPage options={options}>
      <FactoryOverview />
    </DefaultPage>
  );
};

export default Factories;
