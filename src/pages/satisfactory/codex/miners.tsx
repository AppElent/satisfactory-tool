import ItemCard from '@/components/satisfactory/cards/item-card';
import BaseItem from '@/libs/satisfactory/data/base-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Grid } from '@mui/material';
import _ from 'lodash';
import DefaultPage from '../../default/DefaultPage';

const Miners = () => {
  return (
    <DefaultPage>
      <Grid
        container
        spacing={3}
      >
        {_.sortBy(satisfactoryData.miners, 'name').map((item: BaseItem) => {
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
    </DefaultPage>
  );
};

export default Miners;
