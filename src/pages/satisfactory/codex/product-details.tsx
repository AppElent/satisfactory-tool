import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Product from '@/libs/satisfactory/data/product';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const ProductDetails = () => {
  const items = satisfactoryData.products;
  const item = useParamItem<Product>({
    items: items || [],
    field: 'className',
  }) as Product;
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          {item.description}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default ProductDetails;
