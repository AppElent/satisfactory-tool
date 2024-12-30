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
