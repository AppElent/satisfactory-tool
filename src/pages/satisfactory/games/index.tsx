import FloatingButton from '@/components/default/floating-button';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';

const Games = () => {
  const games = useData('games');
  console.log('Games', games);

  const handleAddGame = () => {
    console.log('clicked');
  };

  return (
    <DefaultPage>
      <h1>Games</h1>

      <FloatingButton handleAdd={handleAddGame} />
    </DefaultPage>
  );
};

export default Games;
