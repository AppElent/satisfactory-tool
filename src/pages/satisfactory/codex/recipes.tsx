import Pagination from '@/components/default/filters/pagination';
import SearchBar from '@/components/default/ui/search-bar';
import ItemCard from '@/components/satisfactory/cards/item-card';
import useFilter from '@/hooks/use-filter';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Box, Grid, Stack } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const Recipes = () => {
  const { data: filteredItems, ...filterOptions } = useFilter(satisfactoryData.recipes, {
    initialSortField: 'name',
    initialSortDirection: 'asc',
    initialRowsPerPage: 24,
    // initialPage: 0,
    updateInitialData: true,
    searchableFields: ['name', 'products', 'ingredients'],
    debounceTime: 100,
  });

  return (
    <DefaultPage>
      <Stack
        spacing={2}
        mb={2}
      >
        <SearchBar
          onClear={() => filterOptions.setSearchQuery('')}
          value={filterOptions.inputQuery}
          onChange={(e) => filterOptions.setSearchQuery(e.target.value)}
          placeholder={`Search recipes`}
        />
      </Stack>
      <Grid
        container
        spacing={3}
      >
        {filteredItems.map((recipe: Recipe) => {
          return (
            <Grid
              item
              key={recipe.className}
              xs={6}
              sm={2}
              md={2}
            >
              {/* <RecipeCard recipe={recipe} /> */}
              <ItemCard item={recipe}>
                <>{recipe.getRatingChip()}</>
              </ItemCard>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Pagination filter={filterOptions} />
      </Box>
    </DefaultPage>
  );
};

export default Recipes;
