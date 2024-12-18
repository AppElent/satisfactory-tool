import SearchBar from '@/components/default/ui/search-bar';
import RecipeCard from '@/components/satisfactory/cards/recipe-card';
import useFilter from '@/hooks/use-filter';
import useRouter from '@/hooks/use-router';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Box, Grid, Pagination, Stack } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const BuildableRecipes = () => {
  const { data: filteredItems, ...filterOptions } = useFilter(satisfactoryData.buildableRecipes, {
    initialSortField: 'name',
    initialSortDirection: 'asc',
    initialRowsPerPage: 24,
    // initialPage: 0,
    updateInitialData: true,
    searchableFields: ['name', 'products', 'ingredients'],
    debounceTime: 100,
  });
  const router = useRouter();

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
              onClick={() => {
                router.push(`${recipe.className}`);
              }}
            >
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Pagination
          count={filterOptions.pages || 0}
          page={filteredItems?.length > 0 ? filterOptions.page - 1 : 0}
          onChange={(_e, newPage) => filterOptions.setPage(newPage - 1)}
        />
      </Box>
    </DefaultPage>
  );
};

export default BuildableRecipes;
