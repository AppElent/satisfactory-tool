import ItemCard from '@/components/satisfactory/cards/item-card';
import useParamItem from '@/hooks/use-param-item';
import BaseItem from '@/libs/satisfactory/data/base-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';

const BuildableDetails = () => {
  const items = satisfactoryData.buildables;
  const item = useParamItem<BaseItem>({
    items: items || [],
    field: 'className',
  }) as BaseItem;
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemCard item={item} />
    </DefaultPage>
  );
};

export default BuildableDetails;