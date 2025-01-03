import useRouter from '@/hooks/use-router';
import BaseItem from '@/libs/satisfactory/data/base-item';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ItemCardProps {
  item: BaseItem;
  children?: React.ReactNode;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, children }) => {
  const router = useRouter();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        //height="200"
        sx={{ aspectRatio: '1 / 1', backgroundColor: '#d0d0d0' }}
        image={item.getImage()}
        alt={item.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
        >
          {item.name}
        </Typography>
        {children}
      </CardContent>
      <CardActions>
        <Button
          onClick={() => router.push(`${item.className}`)}
          size="small"
        >
          Show details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
