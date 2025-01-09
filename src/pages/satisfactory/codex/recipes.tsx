// import SearchBar from '@/components/default/ui/search-bar';
import ItemCard from '@/components/satisfactory/cards/item-card';
import BooleanFilter from '@/libs/filters/components/boolean-filter';
import Pagination from '@/libs/filters/components/pagination';
import SearchBar from '@/libs/filters/components/search-bar';
import SortOptions from '@/libs/filters/components/sort-options';
import useFilter from '@/libs/filters/use-filter';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Box, Grid, Stack } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
];

const Recipes = () => {
  const { data: filteredItems, ...filterOptions } = useFilter(satisfactoryData.recipes, {
    initialSortField: 'name',
    initialSortDirection: 'asc',
    initialRowsPerPage: 24,
    initialFilters: [
      {
        id: 'alternate',
        label: 'Alternate',
        type: 'boolean',
        value: null,
      },
    ],
    // initialPage: 0,
    updateInitialData: true,
    searchableFields: ['name', 'products', 'ingredients'],
    debounceTime: 100,
  });

  return (
    <DefaultPage>
      <Stack
        // spacing={2}
        mb={1}
      >
        <SearchBar filter={filterOptions} />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'flex-end'}
        justifyContent={'space-between'}
        sx={{ mb: 1 }}
      >
        <Box>
          <SortOptions
            filter={filterOptions}
            options={sortOptions}
            muiFormControlProps={{ sx: { minWidth: 250 } }}
          />
        </Box>
        <Box>
          <BooleanFilter
            id="alternate"
            filterOptions={filterOptions}
          />
        </Box>
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
