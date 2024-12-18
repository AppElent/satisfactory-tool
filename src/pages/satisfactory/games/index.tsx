import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';
import TabFactories from './_components/tab-factories';
import TabGameInfo from './_components/tab-game-info';
import TabNotepad from './_components/tab-notepad';
import { useData } from '@/libs/data-sources';

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
];

const Games = () => {
  const games = useData('games');
  console.log('Games', games);
  return (
    <DefaultPage>
      <h1>Games</h1>
      <Tabs tabs={tabsData} />
    </DefaultPage>
  );
};

export default Games;
