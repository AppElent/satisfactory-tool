import BuildableRecipeOneliner from '@/components/satisfactory/buildable-recipe-oneliner';
import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import Generator from '@/libs/satisfactory/data/generator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Stack, Typography } from '@mui/material';

const GeneratorDetails = () => {
  const items = satisfactoryData.generators;
  const item = useParamItem<Generator>({
    items: items || [],
    field: 'className',
  }) as Generator;

  const options = {
    generatorDetails: {
      getLabel: (_params: any) => item?.name,
      options: items?.map((item) => ({
        key: item.className,
        label: item.name,
      })),
    },
  };

  return (
    <DefaultPage options={options}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          Power production: {item.powerProduction} MW
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems={'center'}
        >
          <Typography>Cost:</Typography>
          <BuildableRecipeOneliner
            recipe={item.getBuildable()?.getBuildableRecipe() as BuildableRecipe}
          />
        </Stack>
        <Typography variant="h6">Fuels:</Typography>
        {item.getFuels()?.map((fuel) => {
          return (
            <>
              {fuel?.name}
              <br />
            </>
          );
        })}
      </ItemOverview>
    </DefaultPage>
  );
};

export default GeneratorDetails;
