import useKeyboardShortcut from '@/hooks/use-keyboard-shortcut';
import useParamItem from '@/hooks/use-param-item';
import usePathRouter from '@/hooks/use-path-router';
import { useData } from '@/libs/data-sources';
import { CustomForm } from '@/libs/forms';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import DefaultPage from '@/pages/default/DefaultPage';
import { Game } from '@/schemas/satisfactory/game';
import { PowerStation, powerStationYupSchema } from '@/schemas/satisfactory/powerStation';
import { Grid2 as Grid } from '@mui/material';
import { toast } from 'react-toastify';
import PowerStationGeneratorsCard from './_components/power-station-generators.card';
import PowerStationMetadataCard from './_components/power-station-metadata-card';

const PowerStationDetails = () => {
  const data = useData<Game>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const powerStation = useParamItem({
    items: game?.powerStations || [],
    id: 'powerStationId',
  }) as PowerStation;
  useKeyboardShortcut('s', () => formik.handleSubmit());
  const router = usePathRouter();

  const options = {
    gameDetails: {
      getLabel: (_params: any) => game?.name,
    },
    powerStationDetails: {
      getLabel: (_params: any) => powerStation?.name,
    },
  };

  const formik = useCustomFormik({
    validationSchema: powerStationYupSchema,
    initialValues: powerStation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const powerStations = (game?.powerStations || []).map((item) =>
        item.id === values.id ? values : item
      );

      data?.actions?.update({ powerStations }, game?.id);
    },
  });

  const deletePowerStation = async () => {
    try {
      const powerStations = (game?.powerStations || []).filter(
        (item) => item.id !== powerStation?.id
      );
      await data?.actions?.update({ powerStations }, game?.id);
      router.push('gameDetails', { gameId: game?.id });
      toast.success('Power station deleted');
    } catch (error) {
      toast.error('Failed to delete power station');
      console.error(error);
    }
  };

  return (
    <DefaultPage options={options}>
      <CustomForm formik={formik}>
        <Grid
          container
          spacing={2}
        >
          <Grid size={12}>
            <PowerStationMetadataCard deletePowerStation={deletePowerStation} />
          </Grid>
          <Grid size={12}>
            <PowerStationGeneratorsCard />
          </Grid>
        </Grid>
      </CustomForm>
    </DefaultPage>
  );
};

export default PowerStationDetails;
