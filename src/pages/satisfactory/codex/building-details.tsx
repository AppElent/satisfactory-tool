import BuildableRecipeOneliner from '@/components/satisfactory/buildable-recipe-oneliner';
import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import Building from '@/libs/satisfactory/data/building';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Stack, Typography } from '@mui/material';

const BuildingDetails = () => {
  const items = satisfactoryData.buildings;
  const item = useParamItem<Building>({
    items: items || [],
    field: 'className',
  }) as Building;

  const options = {
    buildingDetails: {
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
      </ItemOverview>
    </DefaultPage>
  );
};

export default BuildingDetails;
