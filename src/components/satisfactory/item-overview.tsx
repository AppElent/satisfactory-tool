import BaseItem from '@/libs/satisfactory/data/base-item';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

interface ItemOverviewProps {
  item: BaseItem;
  children?: React.ReactNode;
}

const ItemOverview = ({ item, children }: ItemOverviewProps) => {
  return (
    <Card>
      {/* <CardHeader title={item.name} /> */}
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Box
              display="flex"
              justifyContent="center"
            >
              {item.getImageComponent()}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
          >
            <Typography
              variant="h4"
              component="h1"
            >
              {item.name}
            </Typography>
            <Typography
              variant="body1"
              component="p"
            >
              Slug: {item.slug}
            </Typography>
            {children}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ItemOverview;
