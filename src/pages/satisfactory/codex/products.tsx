import Pagination from '@/components/default/filters/pagination';
import SearchBarFilter from '@/components/default/filters/search-bar-filter';
import SortOptionsFilter from '@/components/default/filters/sort-options-filter';
import ItemCard from '@/components/satisfactory/cards/item-card';
import useFilter from '@/hooks/use-filter';
import Product from '@/libs/satisfactory/data/product';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Box, Chip, Grid, Stack, styled, Tooltip, Typography } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'tier-asc', label: 'Tier (Low-High)' },
  { value: 'tier-desc', label: 'Tier (High-Low)' },
];

const TruncatedTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3,
});

const Products = () => {
  const { data: filteredItems, ...filterOptions } = useFilter(satisfactoryData.products, {
    initialSortField: 'name',
    initialSortDirection: 'asc',
    initialRowsPerPage: 24,
    // initialPage: 0,
    updateInitialData: true,
    searchableFields: ['name', 'description', 'products', 'ingredients'],
    debounceTime: 100,
  });

  return (
    <DefaultPage>
      <Stack
        spacing={2}
        mb={2}
      >
        <SearchBarFilter filter={filterOptions} />
      </Stack>
      <Stack
        direction={'row'}
        sx={{ mb: 1 }}
      >
        <SortOptionsFilter
          filter={filterOptions}
          options={sortOptions}
        />
      </Stack>
      <Grid
        container
        spacing={3}
      >
        {filteredItems.map((product: Product) => {
          const maxItemsToShow = 3;
          const usedForItems = product.getUsedFor();
          const itemsToShow = usedForItems.slice(0, maxItemsToShow);
          const hasMoreItems = usedForItems.length > maxItemsToShow;

          return (
            <Grid
              item
              key={product.className}
              xs={6}
              sm={2}
              md={2}
            >
              {/* <ProductCard product={product} /> */}
              <ItemCard item={product}>
                <>
                  {product.getProductionRate() > 0 && (
                    <Chip
                      label={`${product.getProductionRate()} / min`}
                      size="small"
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Chip
                    label={`Tier ${product.tier}`}
                    size="small"
                    sx={{ mb: 1, ml: 1 }}
                  />

                  <TruncatedTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {product.description}
                  </TruncatedTypography>
                  {itemsToShow.length > 0 && (
                    <Box mt={2}>
                      <Typography
                        variant="body2"
                        gutterBottom
                      >
                        Used in:
                      </Typography>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={1}
                      >
                        {itemsToShow.map((item, index) => (
                          <Tooltip
                            title={item.name}
                            key={index}
                          >
                            <Chip
                              key={index}
                              label={item.name}
                              size="small"
                            />
                          </Tooltip>
                        ))}
                        {hasMoreItems && (
                          <Chip
                            label={`+${usedForItems.length - maxItemsToShow} more`}
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                </>
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

export default Products;
