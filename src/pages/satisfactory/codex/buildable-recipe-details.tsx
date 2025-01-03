import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const BuildableRecipeDetails = () => {
  const items = satisfactoryData.buildableRecipes;
  const item = useParamItem<Recipe>({
    items: items || [],
    field: 'className',
  }) as Recipe;
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          Is alternate: {item.alternate ? 'Yes' : 'No'}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default BuildableRecipeDetails;
