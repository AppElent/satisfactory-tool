import ItemOverview from '@/components/satisfactory/item-overview';
import RecipeOneliner from '@/components/satisfactory/recipe-oneliner';
import useParamItem from '@/hooks/use-param-item';
import Belt from '@/libs/satisfactory/data/belt';
import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Stack, Typography } from '@mui/material';

const BeltDetails = () => {
  const belts = satisfactoryData.belts;
  const item = useParamItem<Belt>({
    items: belts || [],
    field: 'className',
  }) as Belt;

  const options = {
    beltDetails: {
      getLabel: (_params: any) => item?.name,
      options: satisfactoryData.belts.map((belt) => ({
        key: belt.className,
        label: belt.name,
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
          Belt rate: {item.rate}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems={'center'}
        >
          <Typography>Cost:</Typography>
          <RecipeOneliner recipe={item.getBuildable()?.getBuildableRecipe() as BuildableRecipe} />
        </Stack>
      </ItemOverview>
    </DefaultPage>
  );
};

export default BeltDetails;
