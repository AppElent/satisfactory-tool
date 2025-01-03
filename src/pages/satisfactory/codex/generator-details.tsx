import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import Generator from '@/libs/satisfactory/data/generator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const GeneratorDetails = () => {
  const items = satisfactoryData.generators;
  const item = useParamItem<Generator>({
    items: items || [],
    field: 'className',
  }) as Generator;
  return (
    <DefaultPage currentPage={item?.name}>
      <ItemOverview item={item}>
        <Typography
          variant="body1"
          component="p"
        >
          Power production: {item.powerProduction} MW
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default GeneratorDetails;
