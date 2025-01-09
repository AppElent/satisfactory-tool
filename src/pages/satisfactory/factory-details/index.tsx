import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';

const FactoryDetails = () => {
  const data = useData<any>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const factory = useParamItem({
    items: game?.factories || [],
    id: 'factoryId',
  });
  const options = {
    gameDetails: {
      getLabel: (_params: any) => game?.name,
      // options: data.data?.map((game: any) => ({
      //   key: game.id,
      //   label: game.name,
      // })),
    },
    factoryDetails: {
      getLabel: (_params: any) => factory?.name,
      options:
        game?.factories.map((factory: any) => ({
          key: factory.id,
          label: factory.name,
        })) || [],
    },
  };
  return <DefaultPage options={options}>Factory Details</DefaultPage>;
};

export default FactoryDetails;
