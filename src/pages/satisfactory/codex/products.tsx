import ItemCard from '@/components/satisfactory/cards/item-card';
import MultiSelectFilter from '@/libs/filters/components/mult-select-filter';
import Pagination from '@/libs/filters/components/pagination';
import SearchBarFilter from '@/libs/filters/components/search-bar';
import SortOptions from '@/libs/filters/components/sort-options';
import useFilter from '@/libs/filters/use-filter';
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
    initialFilters: [
      // {
      //   id: 'isResource',
      //   label: 'Is resource',
      //   type: 'boolean',
      //   value: null,
      // },
      {
        id: 'tier',
        label: 'Tier',
        type: 'multi-select',
        value: [],
        options: [
          { label: 'Tier 0', value: '0' },
          { label: 'Tier 1', value: '1' },
          { label: 'Tier 2', value: '2' },
          { label: 'Tier 3', value: '3' },
          { label: 'Tier 4', value: '4' },
          { label: 'Tier 5', value: '5' },
          { label: 'Tier 6', value: '6' },
          { label: 'Tier 7', value: '7' },
          { label: 'Tier 8', value: '8' },
          { label: 'Tier 9', value: '9' },
          { label: 'Tier 10', value: '10' },
          { label: 'Ammo', value: 'ammo' },
          { label: 'Ficsmas', value: 'ficsmas' },
          { label: 'Other', value: 'other' },
        ],
      },
      // {
      //   id: 'isFuel',
      //   label: 'Is fuel',
      //   type: 'select',
      //   value: '',
      //   options: [
      //     { label: 'Yes', value: 'true' },
      //     { label: 'No', value: 'false' },
      //   ],
      // },
      // {
      //   id: 'stackSize',
      //   label: 'Stack size',
      //   type: 'range',
      //   value: [0, 500],
      // },
    ],
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
        alignItems={'top'}
        justifyContent={'space-between'}
        sx={{ mb: 1 }}
      >
        <Box minWidth={250}>
          <SortOptions
            filter={filterOptions}
            options={sortOptions}
          />
        </Box>
        {/* <BooleanFilter
          id="isResource"
          filterOptions={filterOptions}
        /> */}
        <Box minWidth={250}>
          <MultiSelectFilter
            id="tier"
            filterOptions={filterOptions}
          />
        </Box>
        {/* <SelectFilter
          id="isFuel"
          filterOptions={filterOptions}
        /> */}
      </Stack>
      {/* <RangeFilter
        id="stackSize"
        filterOptions={filterOptions}
      /> */}
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
