import PowerStationOverview from '@/components/satisfactory/power-station-overview';
import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import DefaultPage from '@/pages/default/DefaultPage';
import { Game } from '@/schemas/satisfactory/game';
import { createPowerStationSchema } from '@/schemas/satisfactory/powerStation';
import { useCallback } from 'react';

const PowerStations = () => {
  const data = useData<Game>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });

  const createPowerStation = useCallback(() => {
    const template = createPowerStationSchema().getTemplate();
    // const gameCopy = JSON.parse(JSON.stringify(item));
    // if (!gameCopy.powerStations) {
    //   gameCopy.powerStations = [];
    // }
    const powerStations = game?.powerStations || [];
    powerStations.push(template);
    // console.log(gameCopy, template);

    // gameCopy.powerStations.push(template);
    data.actions.update({ powerStations }, game?.id);
  }, [game, data.actions]);

  const deletePowerStation = useCallback(
    (id: string) => {
      //const gameCopy = JSON.parse(JSON.stringify(item));
      const powerStations = game?.powerStations?.filter((ps: any) => ps.id !== id) || [];
      //gameCopy.powerStations = gameCopy.powerStations.filter((ps: any) => ps.id !== id);
      data.actions.update({ powerStations }, game?.id);
    },
    [game, data.actions]
  );

  const options = {
    gameDetails: {
      getLabel: (_params: any) => game?.name,
    },
  };
  return (
    <DefaultPage options={options}>
      <PowerStationOverview
        powerStations={game?.powerStations || []}
        addPowerStation={createPowerStation}
        deletePowerStation={deletePowerStation}
      />
    </DefaultPage>
  );
};

export default PowerStations;
