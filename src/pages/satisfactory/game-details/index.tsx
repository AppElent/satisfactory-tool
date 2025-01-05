import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';
import TabFactories from './_components/tab-factories';
import TabGameInfo from './_components/tab-game-info';
import TabNotepad from './_components/tab-notepad';
import TabTest from './_components/tab-test';

const tabsData = [
  {
    label: 'Game info',
    value: 'game_info',
    component: <TabGameInfo />,
  },
  {
    label: 'Factories',
    value: 'factories',
    component: <TabFactories />,
  },
  {
    label: 'Notepad',
    value: 'notepad',
    component: <TabNotepad />,
  },
  {
    label: 'Test',
    value: 'test',
    component: <TabTest />,
  },
];

const GameDetails = () => {
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

  return (
    <DefaultPage options={options}>
      {item && <Tabs tabs={tabsData} />}
      {!item && <div>Game not found</div>}
    </DefaultPage>
  );
};

export default GameDetails;
