import Mermaid from '@/libs/mermaid';
import Recipe from '@/libs/satisfactory/data/recipe';

const RecipeGraph = ({ recipe }: { recipe: Recipe }) => {
  let graphString = `%%{init: { "flowchart": { "useWidth": 300} } }%%
    
    graph LR;
    
    %% options %%
    classDef output fill:#0f0
    
    %% create nodes %%`;
  graphString += `
            ${recipe.className}(["${recipe.getMachine()?.name}"]);`;
  recipe.products.forEach((product) => {
    graphString += `
            ${product.item}["${product.name}"];`;
  });
  recipe.ingredients.forEach((ingredient) => {
    graphString += `
            ${ingredient.item}["${ingredient.name}"];`;
  });
  recipe.products.forEach((product) => {
    graphString += `
            ${recipe.className} --> ${product.item};`;
  });
  recipe.ingredients.forEach((ingredient) => {
    graphString += `
            ${ingredient.item} --> ${recipe.className};`;
  });

  //   console.log(recipe);
  //   recipe.nodes.forEach((node) => {
  //     graphString += `
  //       ${node.id}["${node.id}"]`;
  //   });
  //   object.edges.forEach((edge) => {
  //     graphString += `
  //       ${edge.source}-->|"${edge.itemsPerMinute}"|${edge.target}`;
  //   });
  //   return graphString;
  return <Mermaid chart={graphString} />;
};

export default RecipeGraph;
