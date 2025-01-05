import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Resource from '@/libs/satisfactory/data/resource';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const ResourceDetails = () => {
  const items = satisfactoryData.resources;
  const item = useParamItem<Resource>({
    items: items || [],
    field: 'className',
  }) as Resource;

  const switchOptions = satisfactoryData.resources.map((resource) => ({
    key: resource.className,
    label: resource.name,
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
          Max: {item.max}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default ResourceDetails;
