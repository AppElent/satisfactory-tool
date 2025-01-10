import ItemOverview from '@/components/satisfactory/item-overview';
import RecipeOneliner from '@/components/satisfactory/recipe-oneliner';
import useParamItem from '@/hooks/use-param-item';
import Buildable from '@/libs/satisfactory/data/buildable';
import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Stack, Typography } from '@mui/material';

const BuildableDetails = () => {
  const items = satisfactoryData.buildables;
  const item = useParamItem<Buildable>({
    items: items || [],
    field: 'className',
  }) as Buildable;

  const options = {
    buildableDetails: {
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
          {item.description}
          <br />
          Power: {item.metadata.powerConsumption} MW
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems={'center'}
        >
          <Typography>Cost:</Typography>
          <RecipeOneliner recipe={item.getBuildableRecipe() as BuildableRecipe} />
        </Stack>
      </ItemOverview>
    </DefaultPage>
  );
};

export default BuildableDetails;
