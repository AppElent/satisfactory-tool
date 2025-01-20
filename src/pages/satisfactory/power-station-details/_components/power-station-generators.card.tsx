import Table, { TableProps } from '@/libs/forms/components/Table';
import { createPowerStationSchema } from '@/schemas/satisfactory/powerStation';
import { Card, CardContent, CardHeader } from '@mui/material';

// interface PowerStationGeneratorsCardProps {
//   powerStation: PowerStation;
// }

const PowerStationGeneratorsCard = () => {
  // const formik = useFormikContext();
  const fieldDefinitions = createPowerStationSchema().getFieldDefinitions();
  console.log(fieldDefinitions);

  // const fuelFieldDefinition = useMemo(() => {
  //   const definition = fieldDefinitions['generators.fuel'];
  //   const ps = formik.values as PowerStation;
  //   const generators = ps.generators as Generator[];
  //   console.log(values);
  //   if (values.type) {
  //     definition.options = satisfactoryData.getGenerator(values.type)?.fuel.map((f) => {
  //       const product = satisfactoryData.getProduct(f);
  //       return {
  //         key: product?.className,
  //         label: product?.name,
  //         img: product?.getIconComponent,
  //       };
  //     });
  //     definition.definition = 'autocomplete';
  //   }
  //   return definition;
  // }, [fieldDefinitions, formik.values]);

  const tableOptions: TableProps['tableOptions'] = {
    columns: {
      amount: fieldDefinitions['generators.amount'],
      type: fieldDefinitions['generators.type'],
      fuel: fieldDefinitions['generators.fuel'],
    },
  };

  return (
    <Card>
      <CardHeader
        title="Generators"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Table
          field={fieldDefinitions.generators}
          tableOptions={tableOptions}
        />
      </CardContent>
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small">Edit</Button>
      </CardActions> */}
    </Card>
  );
};

export default PowerStationGeneratorsCard;
