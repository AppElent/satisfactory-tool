import { Chip } from '@mui/material';

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

const RecipeRatingChip = ({ rating }: { rating: string }) => {
  const color = getRatingColor(rating);
  return (
    <Chip
      sx={{ ml: 1 }}
      color={color}
      label={rating}
      size="small"
    />
  );
};

export default RecipeRatingChip;
