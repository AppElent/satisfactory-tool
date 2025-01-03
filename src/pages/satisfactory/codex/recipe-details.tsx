// @ts-nocheck

import ItemOverview from '@/components/satisfactory/item-overview';
import RecipeGraph from '@/components/satisfactory/recipe-graph';
import useParamItem from '@/hooks/use-param-item';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const RecipeDetails = () => {
  const items = satisfactoryData.recipes;
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
          Alternate: {item.alternate ? 'Yes' : 'No'} <br></br>
          Machine: {item.getMachine()?.name}
        </Typography>
      </ItemOverview>
      <RecipeGraph recipe={item} />
    </DefaultPage>
  );
};

export default RecipeDetails;
