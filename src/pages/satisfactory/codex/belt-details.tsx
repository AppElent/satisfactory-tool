import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Belt from '@/libs/satisfactory/data/belt';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const BeltDetails = () => {
  const belts = satisfactoryData.belts;
  const item = useParamItem<Belt>({
    items: belts || [],
    field: 'className',
  }) as Belt;

  const options = {
    beltDetails: {
      getLabel: (_params: any) => item?.name,
      options: satisfactoryData.belts.map((belt) => ({
        key: belt.className,
        label: belt.name,
      })),
    },
  };

  return (
    <DefaultPage options={options}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          Belt rate: {item.rate}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default BeltDetails;
