import ItemCard from '@/components/satisfactory/cards/item-card';
import BaseItem from '@/libs/satisfactory/data/base-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Grid } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const Generators = () => {
  return (
    <DefaultPage>
      <Grid
        container
        spacing={3}
      >
        {satisfactoryData.generators.map((item: BaseItem) => {
          return (
            <Grid
              item
              key={item.className}
              xs={6}
              sm={3}
              md={3}
            >
              <ItemCard item={item} />
            </Grid>
          );
        })}
      </Grid>
    </DefaultPage>
  );
};

export default Generators;
