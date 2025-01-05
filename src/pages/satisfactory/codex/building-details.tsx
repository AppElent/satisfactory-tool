import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Building from '@/libs/satisfactory/data/building';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const BuildingDetails = () => {
  const items = satisfactoryData.buildings;
  const item = useParamItem<Building>({
    items: items || [],
    field: 'className',
  }) as Building;

  const switchOptions = satisfactoryData.buildings.map((building) => ({
    key: building.className,
    label: building.name,
  }));

  return (
    <DefaultPage
      currentPage={item?.name}
      switchOptions={switchOptions}
    >
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          {item.description}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default BuildingDetails;
