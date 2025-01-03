import useTabs from '@/hooks/use-tabs';
import { CustomForm } from '@/libs/forms';
import useCustomFormik from '@/libs/forms/use-custom-formik';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import { Calculator } from '@/schemas/satisfactory/calculator';
import { Tab, Tabs, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import ConfigureInputsCard from './configure-inputs-card';
import ConfigureMachinesCard from './configure-machines-card';
import ConfigureMetadataCard from './configure-metadata-card';
import ConfigureProductionCard from './configure-production-card';
import ConfigureRecipesCard from './configure-recipes-card';
import ConfigureResourcesCard from './configure-resources-card';

const tabsData = [
  {
    label: 'Metadata',
    value: 'metadata',
  },
  {
    label: 'Production',
    value: 'production',
  },
  {
    label: 'Resources',
    value: 'resources',
  },
  {
    label: 'Recipes',
    value: 'recipes',
  },
  {
    label: 'Inputs',
    value: 'inputs',
  },
  {
    label: 'Machines',
    value: 'machines',
  },
];

const TabConfigure = () => {
  // const data = useData<Calculator[]>('calculator_configs');
  // const item = useParamItem({
  //   items: data.data || [],
  // });
  const { config, saveConfig } = useSatisfactoryCalculator();
  const tabs = useTabs(tabsData);

  const formik = useCustomFormik({
    initialValues: config,
    onSubmit: async (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    console.log(formik.values);
    if (formik.dirty && formik.values?.id && !_.isEqual(formik.values, config)) {
      console.log('Saving config to storage');
      //data.actions.update(formik.values as Calculator[], formik.values.id); // TODO: fix typings
      if (saveConfig) {
        saveConfig(formik.values as Calculator);
      }
    }
  }, [formik.values, saveConfig]);

  const setResources = (resources: any) => {
    //data.actions.update({ resourceMax: resources }, formik.values.id);
    formik.setValues({ ...formik.values, resourceMax: resources });
  };

  return (
    <>
      <CustomForm
        formik={formik}
        options={{ debounce: 300, muiTextFieldProps: { size: 'small' } }}
      >
        <Typography variant="h6">Configure</Typography>
        <Tabs
          value={tabs.tab}
          onChange={tabs.handleTabChange}
        >
          <Tab
            label="Metadata"
            value="metadata"
          />
          <Tab
            label="Production"
            value="production"
          />
          <Tab
            label="Resources"
            value="resources"
          />
          <Tab
            label="Recipes"
            value="recipes"
          />
          <Tab
            label="Inputs"
            value="inputs"
          />
          <Tab
            label="Machines"
            value="machines"
          />
        </Tabs>
        {tabs.tab === 'metadata' && <ConfigureMetadataCard />}
        {tabs.tab === 'production' && <ConfigureProductionCard />}
        {tabs.tab === 'resources' && <ConfigureResourcesCard setResources={setResources} />}
        {tabs.tab === 'recipes' && <ConfigureRecipesCard />}
        {tabs.tab === 'inputs' && <ConfigureInputsCard />}
        {tabs.tab === 'machines' && <ConfigureMachinesCard />}
      </CustomForm>
    </>
  );
};

export default TabConfigure;
