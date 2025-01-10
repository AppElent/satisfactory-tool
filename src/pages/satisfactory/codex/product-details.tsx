import ItemOverview from '@/components/satisfactory/item-overview';
import RecipeOneliner from '@/components/satisfactory/recipe-oneliner';
import RecipeRatingChip from '@/components/satisfactory/recipe-rating-chip';
import { getPath } from '@/config/paths';
import useParamItem from '@/hooks/use-param-item';
import Product from '@/libs/satisfactory/data/product';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductProps {
  title: string;
  recipes: Recipe[];
}

const RecipeOverview = ({ title, recipes }: ProductProps) => {
  // Sort recipes, when name starts with Alternate, show last
  recipes.sort((a, b) => {
    const aName = a.name.startsWith('Alternate') ? 'zzz' : a.name;
    const bName = b.name.startsWith('Alternate') ? 'zzz' : b.name;
    return aName.localeCompare(bName);
  });
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <List dense={true}>
          {recipes.map((recipe) => (
            <ListItem
              key={recipe.className}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <ListItemText>
                <Link to={getPath('recipeDetails')?.to.replace(':id', recipe.className)}>
                  {recipe.name}
                </Link>
                {recipe.rating && <RecipeRatingChip rating={recipe.rating} />}
              </ListItemText>

              <ListItemIcon>
                <RecipeOneliner recipe={recipe} />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const ProductDetails = () => {
  const items = satisfactoryData.products;
  const item = useParamItem<Product>({
    items: items || [],
    field: 'className',
  }) as Product;

  const options = {
    productDetails: {
      getLabel: (_params: any) => item?.name,
      options: items.map((product) => ({
        key: product.className,
        label: product.name,
      })),
    },
  };

  return (
    <DefaultPage options={options}>
      <Grid
        container
        spacing={2}
      >
        <Grid size={12}>
          <ItemOverview item={item}>
            <Typography
              variant="body1"
              component="p"
            >
              {item.description}
              <br />
              Stack size: {item.stackSize} <br />
              Tier: {item.tier} <br />
              Is resource: {item.isResource ? 'Yes' : 'No'} <br />
              Sink points: {item.sinkPoints} <br />
              <br />
              Tags:{' '}
              {item.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  color="primary"
                  size="small"
                />
              ))}
            </Typography>
          </ItemOverview>
        </Grid>
        <Grid size={12}>
          <RecipeOverview
            title="Crafting"
            recipes={item.getRecipes()}
          />
        </Grid>
        <Grid size={12}>
          <RecipeOverview
            title="Used for"
            recipes={item.getUsedFor()}
          />
        </Grid>
      </Grid>
    </DefaultPage>
  );
};

export default ProductDetails;
