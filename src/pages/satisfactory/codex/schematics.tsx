import Pagination from '@/components/default/filters/pagination';
import SearchBar from '@/components/default/ui/search-bar';
import ItemCard from '@/components/satisfactory/cards/item-card';
import useFilter from '@/hooks/use-filter';
import BaseItem from '@/libs/satisfactory/data/base-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Box, Grid, Stack } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const Schematics = () => {
  const { data: filteredItems, ...filterOptions } = useFilter(satisfactoryData.schematics, {
    initialSortField: 'name',
    initialSortDirection: 'asc',
    initialRowsPerPage: 24,
    // initialPage: 0,
    updateInitialData: true,
    searchableFields: ['name'],
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
          placeholder={`Search schematics`}
        />
      </Stack>
      <Grid
        container
        spacing={3}
      >
        {filteredItems.map((item: BaseItem) => {
          return (
            <Grid
              item
              key={item.className}
              xs={6}
              sm={2}
              md={2}
            >
              <ItemCard item={item} />
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

export default Schematics;
