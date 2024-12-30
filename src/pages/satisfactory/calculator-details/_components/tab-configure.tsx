import useParamItem from '@/hooks/use-param-item';
import { useData } from '@/libs/data-sources';
import { CustomForm } from '@/libs/forms';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import ConfigureMetadataCard from './configure-metadata-card';
import ConfigureProductionCard from './configure-production-card';
import ConfigureResourcesCard from './configure-resources-card';

const TabConfigure = () => {
  const data = useData<Calculator[]>('calculator_configs');
  const item = useParamItem({
    items: data.data || [],
  });

  const formik = useCustomFormik({
    initialValues: item,
    onSubmit: async (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log(formik.values);
    if (formik.dirty && formik.values?.id && !_.isEqual(formik.values, item)) {
      console.log('Saving config to storage');
      data.actions.update(formik.values as Calculator[], formik.values.id); // TODO: fix typings
    }
  }, [formik.values, data.actions]);

  return (
    <>
      <CustomForm
        formik={formik}
        options={{ debounce: 300, muiTextFieldProps: { size: 'small' } }}
      >
        <Typography variant="h6">Configure</Typography>
        <ConfigureMetadataCard />
        <ConfigureProductionCard />
        <ConfigureResourcesCard />
        {/* <ConfigureRecipesCard /> */}
      </CustomForm>
    </>
  );
};

export default TabConfigure;
