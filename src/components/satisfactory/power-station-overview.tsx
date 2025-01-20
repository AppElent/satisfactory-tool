import usePathRouter from '@/hooks/use-path-router';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';
import { PowerStation } from '@/schemas/satisfactory/powerStation';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import FloatingButton from '../default/floating-button';

interface PowerStationOverviewProps {
  powerStations: PowerStation[];
  addPowerStation: () => void;
  deletePowerStation: (id: string) => void;
}

const PowerStationOverview = ({
  powerStations,
  addPowerStation,
  deletePowerStation,
}: PowerStationOverviewProps) => {
  const router = usePathRouter();
  let totalPower = 0;
  return (
    <Box>
      <FloatingButton handleAdd={addPowerStation} />
      <Grid
        container
        spacing={2}
      >
        {powerStations.map((powerStation) => {
          return (
            <Grid
              size={12}
              key={powerStation.id}
            >
              <Card>
                <CardHeader title={powerStation.name} />
                <CardContent>
                  {powerStation.generators?.map((generator, index) => {
                    const generatorObject = satisfactoryData.getGenerator(generator.type);
                    totalPower += (generatorObject?.powerProduction || 0) * generator.amount;
                    return (
                      <Typography key={index}>
                        {generator.amount}x {generatorObject?.name}
                      </Typography>
                    );
                  })}
                  <br />
                  Total power: {totalPower}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => deletePowerStation(powerStation.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      router.push('powerStationDetails', { powerStationId: powerStation.id })
                    }
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PowerStationOverview;
