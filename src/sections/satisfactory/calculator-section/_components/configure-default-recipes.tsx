import RecipeOneliner from '@/components/satisfactory/recipe-oneliner';
import CheckboxList from '@/libs/forms/components/CheckboxList';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { createCalculatorSchema } from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureDefaultRecipesCard = () => {
  const { config } = useSatisfactoryCalculator();
  const fieldDefinitions = useMemo(() => createCalculatorSchema().getFieldDefinitions(), []);

  //   const alternateFieldDefinition = useMemo(() => {
  //     return {
  //       ...fieldDefinitions.allowedAlternateRecipes,
  //       options: (fieldDefinitions.allowedAlternateRecipes.options = satisfactoryData.recipes
  //         .filter((recipe) => {
  //           return recipe.alternate && !config.blockedMachines.includes(recipe.producedIn);
  //         })
  //         .map((recipe) => {
  //           return {
  //             key: recipe.className,
  //             label: recipe.name,
  //           };
  //         })),
  //     };
  //   }, [config.blockedMachines]);

  const defaultFieldDefinition = useMemo(() => {
    return {
      ...fieldDefinitions.blockedRecipes,
      options: (fieldDefinitions.blockedRecipes.options = satisfactoryData.recipes
        .filter((recipe) => {
          return !recipe.alternate && !config.blockedMachines.includes(recipe.producedIn);
        })
        .map((recipe) => {
          return {
            key: recipe.className,
            label: recipe.name,
            img: recipe.getIcon(),
            secondaryAction: <RecipeOneliner recipe={recipe} />,
          };
        })),
    };
  }, [config.blockedMachines]);

  return (
    <Card>
      <CardHeader
        title="Allowed default recipes"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <CheckboxList
          field={defaultFieldDefinition}
          options={{ inverted: true }}
        />
      </CardContent>
    </Card>
  );
};

export default ConfigureDefaultRecipesCard;
