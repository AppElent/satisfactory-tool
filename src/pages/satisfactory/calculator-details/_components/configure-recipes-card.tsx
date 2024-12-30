import CheckboxList from '@/libs/forms/components/CheckboxList';
import calculatorSchemaClass from '@/schemas/satisfactory/calculator';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';

const ConfigureRecipesCard = () => {
  const fieldDefinitions = useMemo(() => calculatorSchemaClass.getFieldDefinitions(), []);

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
            <CheckboxList field={fieldDefinitions.blockedRecipes} />
          </Grid>
          <Grid item>
            <Typography variant="h6">Allowed alternate recipes</Typography>
            <CheckboxList field={fieldDefinitions.allowedAlternateRecipes} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConfigureRecipesCard;
