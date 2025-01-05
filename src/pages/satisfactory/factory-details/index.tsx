import DefaultPage from '@/pages/default/DefaultPage';

const FactoryDetails = () => {
  const options = {
    gameDetails: { getLabel: (_params: any) => 'test' },
    factoryDetails: { label: 'Factory 123' },
  };
  return <DefaultPage options={options}>Factory Details</DefaultPage>;
};

export default FactoryDetails;
