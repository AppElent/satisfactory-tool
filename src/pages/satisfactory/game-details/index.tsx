import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import { CustomForm } from '@/libs/forms';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';
import { gameSchema, gameYupSchema } from '@/schemas/satisfactory/game';
import { useMemo } from 'react';
import TabFactories from './_components/tab-factories';
import TabGameInfo from './_components/tab-game-info';
import TabNotepad from './_components/tab-notepad';
import TabTest from './_components/tab-test';

const GameDetails = () => {
  const data = useData<any>('games');
  const item = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });

  const tabsData = useMemo(
    () => [
      {
        label: 'Game info',
        value: 'game_info',
        component: <TabGameInfo />,
      },
      {
        label: 'Factories',
        value: 'factories',
        component: <TabFactories factories={item?.factories} />,
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
    ],
    [item]
  );

  const options = {
    gameDetails: {
      getLabel: (_params: any) => item?.name,
      options: data.data?.map((game: any) => ({
        key: game.id,
        label: game.name,
      })),
    },
  };

  const formik = useCustomFormik({
    initialValues: item,
    validationSchema: gameYupSchema,
    onSubmit: async (values) => {
      console.log('onSubmit', values);
    },
  });

  console.log(
    gameSchema.getFieldDefinitions(),
    gameSchema.getTemplate(),
    gameSchema.getFieldTemplate('powerStations')
  );

  return (
    <DefaultPage options={options}>
      <CustomForm formik={formik}>{item && <Tabs tabs={tabsData} />}</CustomForm>
      {!item && <div>Game not found</div>}
    </DefaultPage>
  );
};

export default GameDetails;
