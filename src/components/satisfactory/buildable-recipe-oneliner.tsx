import BuildableRecipe from '@/libs/satisfactory/data/buildable-recipe';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Stack, Tooltip } from '@mui/material';

const BuildableRecipeOneliner = ({ recipe }: { recipe: BuildableRecipe }) => {
  console.log(recipe);
  const product = recipe.getOutput();
  return (
    <Stack
      direction="row"
      //   spacing={2}
      alignItems="center"
      flexWrap="wrap"
      //   width="100%"
    >
      {/* <Box>{recipe.name}</Box> */}
      <Stack
        direction="row"
        alignItems="center"
        //width={46 * 3} // 46px is the width of 1 item
        flexWrap="wrap"
        spacing={1}
      >
        {recipe.getIngredients().map((ingredient) => (
          <Box
            key={ingredient.product?.className}
            display="flex"
            alignItems="center"
          >
            {ingredient.amount}x{' '}
            <Tooltip title={ingredient.product?.name}>
              <img
                src={ingredient.product?.getIcon()}
                alt={ingredient.name}
                style={{ width: '24px', height: '24px', marginLeft: '4px' }}
              />
            </Tooltip>
          </Box>
        ))}
      </Stack>

      <Box>
        <ArrowForwardIcon />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        minWidth={'110px'}
        spacing={1}
      >
        <Box
          key={product.output?.className}
          display="flex"
          alignItems="center"
        >
          {product.amount}x{' '}
          <Tooltip title={product.output?.name}>
            <img
              src={product.output?.getIcon()}
              alt={product.name}
              style={{ width: '24px', height: '24px', marginLeft: '4px' }}
            />
          </Tooltip>
        </Box>
      </Stack>
    </Stack>
  );
};

export default BuildableRecipeOneliner;
