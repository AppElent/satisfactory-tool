import RecipeOneliner from '@/components/satisfactory/recipe-oneliner';
import CheckboxList from '@/libs/forms/components/CheckboxList';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import calculatorSchema from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react';

const ConfigureAlternateRecipesCard = () => {
  const { config } = useSatisfactoryCalculator();
  const fieldDefinitions = useMemo(() => calculatorSchema.getFieldDefinitions(), []);

  const alternateFieldDefinition = useMemo(() => {
    return {
      ...fieldDefinitions.allowedAlternateRecipes,
      options: (fieldDefinitions.allowedAlternateRecipes.options = satisfactoryData.recipes
        .filter((recipe) => {
          return recipe.alternate && !config.blockedMachines.includes(recipe.producedIn);
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
        title="Allowed alternate recipes"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <CheckboxList field={alternateFieldDefinition} />
      </CardContent>
    </Card>
  );
};

export default ConfigureAlternateRecipesCard;
