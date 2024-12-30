import SatisfactoryNetwork from '@/libs/satisfactory/calculator/network/satisfactory-network';
import Recipe from '@/libs/satisfactory/data/recipe';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import CytoscapeGraph from '@/libs/satisfactory/visualization/cytoscape-graph';
import { useMemo } from 'react';

const TabTest = () => {
  const recipe = satisfactoryData.getRecipe('Recipe_SpaceElevatorPart_5_C') as Recipe;
  const network = useMemo(() => {
    return new SatisfactoryNetwork();
  }, []);
  console.log(network, recipe);
  network.fromRecipe(recipe);
  console.log(network.toCytoscape());
  return (
    <>
      <CytoscapeGraph network={network} />
    </>
  );
};

export default TabTest;
