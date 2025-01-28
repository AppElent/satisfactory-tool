import CheckboxList from '@/libs/forms/components/CheckboxList';
import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { createCalculatorSchema } from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';

const ConfigureRecipesCard = () => {
  const { config } = useSatisfactoryCalculator();
  const fieldDefinitions = useMemo(() => createCalculatorSchema().getFieldDefinitions(), []);

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
          };
        })),
    };
  }, [config.blockedMachines]);

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
          };
        })),
    };
  }, [config.blockedMachines]);

  return (
    <Card>
      <CardHeader
        title="Recipe selection"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography variant="h6">Blocked default recipes</Typography>
            <CheckboxList field={defaultFieldDefinition} />
          </Grid>
          <Grid item>
            <Typography variant="h6">Allowed alternate recipes</Typography>
            <CheckboxList
              field={alternateFieldDefinition}
              options={{ inverted: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureRecipesCard;
