// @ts-nocheck

import ItemCard from '@/components/satisfactory/cards/item-card';
import RecipeGraph from '@/components/satisfactory/recipe-graph';
import useParamItem from '@/hooks/use-param-item';
import BaseItem from '@/libs/satisfactory/data/base-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';

const RecipeDetails = () => {
  const items = satisfactoryData.recipes;
  const item = useParamItem<BaseItem>({
    items: items || [],
    field: 'className',
  }) as BaseItem;
  return (
    <DefaultPage currentPage={item?.name}>
      <RecipeGraph recipe={item} />
      <ItemCard item={item} />
    </DefaultPage>
  );
};

export default RecipeDetails;
