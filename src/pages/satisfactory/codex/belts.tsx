import ItemCard from '@/components/satisfactory/cards/item-card';
import Belt from '@/libs/satisfactory/data/belt';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Chip, Grid } from '@mui/material';
import DefaultPage from '../../default/DefaultPage';

const Belts = () => {
  return (
    <DefaultPage>
      <Grid
        container
        spacing={3}
      >
        {satisfactoryData.belts.map((item: Belt) => {
          return (
            <Grid
              item
              key={item.className}
              xs={6}
              sm={3}
              md={3}
            >
              {/* <BeltCard item={item} /> */}
              <ItemCard item={item}>
                <>
                  {' '}
                  <Chip
                    label={`${item.rate} / min`}
                    size="small"
                    color="primary"
                    sx={{ mb: 1 }}
                  />
                </>
              </ItemCard>
            </Grid>
          );
        })}
      </Grid>
    </DefaultPage>
  );
};

export default Belts;
