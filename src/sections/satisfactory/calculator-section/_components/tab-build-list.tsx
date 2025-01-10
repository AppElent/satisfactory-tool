import useSatisfactoryCalculator from '@/libs/satisfactory/calculator/use-satisfactory-calculator';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';

const TabBuildList = () => {
  const { result, calculate, error } = useSatisfactoryCalculator();

  useEffect(() => {
    if (calculate && !result) {
      calculate();
    }
  }, []);

  const emptyText =
    result?.nodes?.length === 0
      ? "Unfortunately we couldn't calculate any result.\nThis can be due to many things: missing resource required for the production line, not enough resources for the requested amount, disabled recipes required for the product, etc."
      : undefined;

  return (
    <>
      {error && <Typography>Error: {error}</Typography>}
      {emptyText && <Typography>{emptyText}</Typography>}
      {!emptyText && !error && (
        <Grid
          container
          spacing={1}
        >
          <Grid
            item
            xs={12}
          >
            <Card>
              <CardHeader
                title="Inputs"
                titleTypographyProps={{ variant: 'h5' }}
              />
              <CardContent>
                {result?.getInputs()?.map((node) => {
                  const product = satisfactoryData.getProduct(node.item);
                  return (
                    <div key={node.id}>
                      {+node.amount.toPrecision(3)} x {product?.getIconComponent()}{' '}
                      {satisfactoryData.getProduct(node.item)?.name}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Card>
              <CardHeader
                title="Outputs"
                titleTypographyProps={{ variant: 'h5' }}
              />
              <CardContent>
                {result?.getOutputs()?.map((node) => {
                  const product = satisfactoryData.getProduct(node.item);
                  return (
                    <div key={node.id}>
                      {+node.amount.toPrecision(3)} x {product?.getIconComponent()}
                      {product?.name}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Card>
              <CardHeader
                title="Recipes"
                titleTypographyProps={{ variant: 'h5' }}
              />
              <CardContent>
                {result?.getRecipes()?.map((node) => {
                  const recipe = satisfactoryData.getRecipe(node.item);
                  const machine = recipe?.getMachine();
                  return (
                    <div key={node.id}>
                      {+node.amount.toPrecision(3)} x {recipe?.getIconComponent()}
                      {recipe?.name} ({machine?.name} {machine?.getIconComponent()})
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TabBuildList;
