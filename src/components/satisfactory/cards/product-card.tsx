import Product from '@/libs/satisfactory/data/product';
import { Box, Card, CardContent, CardMedia, Chip, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface ProductCardProps {
  product: Product;
}

const TruncatedTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 3,
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const maxItemsToShow = 3;
  const usedForItems = product.getUsedFor();
  const itemsToShow = usedForItems.slice(0, maxItemsToShow);
  const hasMoreItems = usedForItems.length > maxItemsToShow;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        //height="200"
        sx={{ aspectRatio: '1 / 1' }}
        image={product.getImage()}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
        >
          {product.name}
        </Typography>
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;
