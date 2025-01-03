import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Miner from '@/libs/satisfactory/data/miner';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const MinerDetails = () => {
  const items = satisfactoryData.miners;
  const item = useParamItem<Miner>({
    items: items || [],
    field: 'className',
  }) as Miner;
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          Extraction rate: {item.extractionRate}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default MinerDetails;
