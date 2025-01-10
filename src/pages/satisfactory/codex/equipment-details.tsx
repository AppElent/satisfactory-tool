import BuildableRecipeOneliner from '@/components/satisfactory/buildable-recipe-oneliner';
import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import Product from '@/libs/satisfactory/data/product';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Stack, Typography } from '@mui/material';

const EquipmentDetails = () => {
  const items = satisfactoryData.products.filter((item) => item.isEquipment);
  const item = useParamItem<Product>({
    items: items || [],
    field: 'className',
  }) as Product;

  const options = {
    equipmentDetails: {
      getLabel: (_params: any) => item?.name,
      options: items.map((product) => ({
        key: product.className,
        label: product.name,
      })),
    },
  };

  console.log(item, item.getBuildableRecipes());

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
          <BuildableRecipeOneliner recipe={item.getBuildableRecipes()[0] as BuildableRecipe} />
        </Stack>
      </ItemOverview>
    </DefaultPage>
  );
};

export default EquipmentDetails;
