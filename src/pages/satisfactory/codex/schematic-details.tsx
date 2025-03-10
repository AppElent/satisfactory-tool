import ItemOverview from '@/components/satisfactory/item-overview';
import useParamItem from '@/hooks/use-param-item';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import Schematic from '@/libs/satisfactory/data/schematic';
import DefaultPage from '@/pages/default/DefaultPage';
import { Typography } from '@mui/material';

const SchematicDetails = () => {
  const items = satisfactoryData.schematics;
  const item = useParamItem<Schematic>({
    items: items || [],
    field: 'className',
  }) as Schematic;

  const options = {
    schematicDetails: {
      getLabel: (_params: any) => item?.name,
      options: items.map((schematic) => ({
        key: schematic.className,
        label: schematic.name,
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
          {item.type}
        </Typography>
      </ItemOverview>
    </DefaultPage>
  );
};

export default SchematicDetails;
