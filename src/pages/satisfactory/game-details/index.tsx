import useKeyboardShortcut from '@/hooks/use-keyboard-shortcut';
import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import { CustomForm } from '@/libs/forms';
import SubmitButton from '@/libs/forms/components/SubmitButton';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import { useTabs } from '@/libs/tabs';
import TabsHeader from '@/libs/tabs/tabs-header';
import DefaultPage from '@/pages/default/DefaultPage';
import { createGameSchema, gameYupSchema } from '@/schemas/satisfactory/game';
import { createPowerStationSchema } from '@/schemas/satisfactory/powerStation';
import { Box, Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import TabFactories from './_components/tab-factories';
import TabGameInfo from './_components/tab-game-info';
import TabNotepad from './_components/tab-notepad';
import TabPowerStations from './_components/tab-power-stations';

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
        // component: <TabGameInfo />,
      },
      {
        label: 'Factories',
        value: 'factories',
        // component: <TabFactories factories={item?.factories} />,
      },
      {
        label: 'Power stations',
        value: 'powerstations',
        // component: <TabFactories factories={item?.factories} />,
      },
      {
        label: 'Notepad',
        value: 'notepad',
        // component: <TabNotepad />,
      },
    ],
    [item]
  );

  const tabs = useTabs(tabsData);

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
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const cleanedValues = createGameSchema().clean(values);
        await data.actions.update(cleanedValues, item.id);
        toast.success('Game saved successfully');
      } catch (e) {
        console.error(e);
        toast.error('Error updating game');
      }
    },
  });

  const createPowerStation = useCallback(() => {
    const template = createPowerStationSchema().getTemplate();
    // const gameCopy = JSON.parse(JSON.stringify(item));
    // if (!gameCopy.powerStations) {
    //   gameCopy.powerStations = [];
    // }
    const powerStations = item.powerStations || [];
    powerStations.push(template);
    // console.log(gameCopy, template);

    // gameCopy.powerStations.push(template);
    data.actions.update({ powerStations }, item.id);
    toast.success(`Power station created`);
  }, [item, data.actions]);

  const deletePowerStation = useCallback(
    (id: string) => {
      //const gameCopy = JSON.parse(JSON.stringify(item));
      const powerStations = item.powerStations.filter((ps: any) => ps.id !== id);
      //gameCopy.powerStations = gameCopy.powerStations.filter((ps: any) => ps.id !== id);
      data.actions.update({ powerStations }, item.id);
      toast.success('Power station deleted');
    },
    [item, data.actions]
  );

  // const setPowerStation = useCallback((station: PowerStation) => {
  //   const gameCopy: Game = JSON.parse(JSON.stringify(item));
  //   // if station.id exists, update it
  //   gameCopy.powerStations = (gameCopy.powerStations || []).map((s) => {
  //     if (s.id === station.id) {
  //       return station;
  //     }
  //     return s;
  //   });
  //   data.actions.update(gameCopy, item.id);
  // }, []);

  useKeyboardShortcut('s', () => {
    console.log('SAVE USING CTRL-S', formik.values);
    if (formik.dirty) {
      formik.handleSubmit();
    } else {
      toast.info('No changes to save');
    }
  });

  return (
    <DefaultPage options={options}>
      <CustomForm formik={formik}>
        {item && (
          <Box>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between' }}
              spacing={2}
            >
              <TabsHeader
                tabs={tabsData}
                currentTab={tabs.tab}
                handleTabChange={tabs.handleTabChange}
              />

              <Box>
                <SubmitButton>Save</SubmitButton>
              </Box>
            </Stack>
            {tabs.tab === 'game_info' && <TabGameInfo />}
            {tabs.tab === 'factories' && <TabFactories />}
            {tabs.tab === 'notepad' && <TabNotepad />}
            {tabs.tab === 'powerstations' && (
              <TabPowerStations
                powerStations={item?.powerStations || []}
                addPowerStation={createPowerStation}
                deletePowerStation={deletePowerStation}
              />
            )}
            {/* {tabs.tab === 'test' && <TabTest />} */}
          </Box>
        )}
      </CustomForm>
      {!item && <div>Game not found</div>}
    </DefaultPage>
  );
};

export default GameDetails;
