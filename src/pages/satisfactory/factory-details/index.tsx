import useParamItem from '@/hooks/use-param-item';
import useRouter from '@/hooks/use-router';
import { useData } from '@/libs/data-sources';
import { CustomForm } from '@/libs/forms';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import DefaultPage from '@/pages/default/DefaultPage';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { Factory } from '@/schemas/satisfactory/factory';
import { Game } from '@/schemas/satisfactory/game';
import { Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import CalculatorConfigCard from '../../../sections/satisfactory/calculator-config-card';
import FactoryMetadata from './_components/factory-metadata';

const FactoryDetails = () => {
  const router = useRouter();
  const data = useData<Game>('games');
  const game = useParamItem({
    items: data.data || [],
    id: 'gameId',
  });
  const factory = useParamItem({
    items: game?.factories || [],
    id: 'factoryId',
  }) as Factory;
  const options = {
    gameDetails: {
      getLabel: (_params: any) => game?.name,
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

  const createNewConfig = async () => {
    const config = calculatorSchema.getTemplate();
    //update factory with new config
    const newGame = JSON.parse(JSON.stringify(game));
    const newFactory = JSON.parse(JSON.stringify(factory));
    newFactory.production.push(config);
    console.log(newFactory);
    newGame.factories = newGame?.factories.map((f: Factory) => {
      if (f.id === factory.id) {
        return newFactory;
      }
      return f;
    });

    await data.actions.set(newGame, newGame?.id);
    console.log(config, data, newGame);
    router.push(`${config.id}`);
  };

  console.log('GANE', game);

  const formik = useCustomFormik({
    initialValues: factory,
    onSubmit: async (values) => {
      const newGame = JSON.parse(JSON.stringify(game));
      newGame.factories = newGame.factories.map((f: Factory) => {
        if (f.id === factory.id) {
          return values;
        }
        return f;
      });
      console.log('values', newGame, game);
      await data.actions?.update(newGame, game?.id);
      toast.success('Factory updated');
    },
    enableReinitialize: true,
  });

  return (
    <DefaultPage options={options}>
      <CustomForm formik={formik}>
        <Grid
          container
          spacing={2}
        >
          <Grid size={12}>
            <FactoryMetadata />
          </Grid>
          <Grid
            size={12}
            sx={{ mt: 5 }}
          >
            <Stack
              spacing={2}
              justifyContent={'space-between'}
              direction={'row'}
            >
              <Typography variant="h5">Production configurations:</Typography>
              <Button
                onClick={createNewConfig}
                variant="contained"
              >
                Create new production line
              </Button>
            </Stack>
          </Grid>
          {factory?.production?.map((production) => {
            return (
              <Grid
                size={12}
                key={production.id}
              >
                <CalculatorConfigCard config={production} />
              </Grid>
            );
          })}
        </Grid>
      </CustomForm>
    </DefaultPage>
  );
};

export default FactoryDetails;
