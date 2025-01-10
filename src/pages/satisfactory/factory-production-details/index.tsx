import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import SatisfactoryNetwork from '@/libs/satisfactory/calculator/network/satisfactory-network';
import DefaultPage from '@/pages/default/DefaultPage';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { Game } from '@/schemas/satisfactory/game';
import CalculatorSection from '@/sections/satisfactory/calculator-section';
import _ from 'lodash';

const FactoryProductionDetails = () => {
  const data = useData<Game>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const factory = useParamItem({
    items: game?.factories || [],
    id: 'factoryId',
  });
  const production = useParamItem({
    items: factory?.production || [],
    id: 'productionId',
  }) as Calculator;

  const saveConfig = async (config: Calculator) => {
    //data.actions.update(config, config.id);
    const factoryIndex = game?.factories?.findIndex((f) => f.id === factory?.id);
    const productionIndex = factory?.production?.findIndex((p) => p.id === config.id);
    const newGame = JSON.parse(JSON.stringify(game));
    _.set(newGame, `factories.[${factoryIndex}].production.[${productionIndex}]`, config);
    data.actions.update(newGame, newGame.id);
  };

  // const saveConfig = async (config: Calculator) => {
  //   data.actions.update(config, config.id);
  // };

  const saveResult = async (result: SatisfactoryNetwork) => {
    console.log(result);
  };

  const createConfig = async (config: Calculator, _id?: string) => {
    const newGame: Game = JSON.parse(JSON.stringify(game));
    newGame.factories.find((f) => f.id === factory?.id)?.production.push(config);
    data.actions.set(newGame, newGame.id);
  };

  const deleteConfig = async () => {
    data.actions.delete(game?.id);
  };

  const options = {
    gameDetails: {
      getLabel: (_params: any) => game?.name,
    },
    factoryDetails: {
      getLabel: (_params: any) => factory?.name,
    },
    factoryDetailsProduction: {
      getLabel: (_params: any) => production?.name,
      options: factory?.production?.map((production: any) => ({
        key: production.id,
        label: production.name,
      })),
    },
  };

  return (
    <DefaultPage options={options}>
      {game && (
        <CalculatorSection
          config={production}
          saveConfig={saveConfig}
          saveResult={saveResult}
          createConfig={createConfig}
          deleteConfig={deleteConfig}
        />
      )}
    </DefaultPage>
  );
};

export default FactoryProductionDetails;
