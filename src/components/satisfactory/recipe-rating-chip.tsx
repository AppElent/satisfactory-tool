import { SatisfactoryRecipe } from '@/libs/satisfactory/data/recipe';
import { Chip, Tooltip } from '@mui/material';

const getRatingColor = (rating: string) => {
  switch (rating) {
    case 'S':
      return 'success';
    case 'A':
      return 'success';
    case 'B':
      return 'info';
    case 'C':
      return 'warning';
    case 'D':
      return 'error';
    default:
      return 'default';
  }
};

const RecipeRatingChip = ({ rating }: { rating: SatisfactoryRecipe['rating'] }) => {
  if (!rating) {
    return null;
  }
  const color = getRatingColor(rating.score);
  return (
    <Tooltip title={`${rating?.description}`}>
      <Chip
        sx={{ ml: 1 }}
        color={color}
        label={`${rating.score}-tier`}
        size="small"
      />
    </Tooltip>
  );
};

export default RecipeRatingChip;
