import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import Tabs from '@/libs/tabs';
import DefaultPage from '@/pages/default/DefaultPage';

const EndProducts = () => {
  const endProducts = satisfactoryData.getEndProducts();
  console.log(endProducts);
  return (
    <>
      {endProducts.map((product) => {
        const recipes = product.getRecipes().filter((r) => !r.alternate);
        return (
          <div key={product.name}>
            {product.name}
            <br />
            {recipes.map((recipe, index) => {
              return (
                <div key={recipe.className}>
                  {index + 1} - {recipe.name} - {recipe.getMachine()?.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const AllProducts = () => {
  const endProducts = satisfactoryData.products;
  console.log(endProducts);
  return (
    <>
      {endProducts.map((product) => {
        const recipes = product.getDefaultRecipes();
        return (
          <div key={product.name}>
            {product.name}
            <br />
            {recipes.map((recipe, index) => {
              return (
                <div key={recipe.className}>
                  {index + 1} - {recipe.name} - {recipe.getMachine()?.name}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const tabsData = [
  {
    label: 'End products',
    value: 'endproducts',
    component: <EndProducts />,
  },
  {
    label: 'All products',
    value: 'allproducts',
    component: <AllProducts />,
  },
];

const Statistics = () => {
  return (
    <DefaultPage>
      <Tabs tabs={tabsData} />
    </DefaultPage>
  );
};

export default Statistics;
