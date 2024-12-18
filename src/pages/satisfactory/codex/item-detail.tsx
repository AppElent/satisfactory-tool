import ItemCard from '@/components/satisfactory/cards/item-card';
import BaseItem from '@/libs/satisfactory/data/base-item';
import DefaultPage from '@/pages/default/DefaultPage';

interface ItemDetailProps {
  item: BaseItem;
}

const ItemDetail = ({ item }: ItemDetailProps) => {
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemCard item={item} />
    </DefaultPage>
  );
};

export default ItemDetail;
