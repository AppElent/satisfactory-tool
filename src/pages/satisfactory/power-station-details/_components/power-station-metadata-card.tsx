import SubmitButton from '@/libs/forms/components/SubmitButton';
import TextField from '@/libs/forms/components/TextField';
import { createPowerStationSchema } from '@/schemas/satisfactory/powerStation';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';

interface PowerStationMetadataCardProps {
  deletePowerStation: () => void;
}

const PowerStationMetadataCard = ({ deletePowerStation }: PowerStationMetadataCardProps) => {
  const fieldDefinitions = createPowerStationSchema().getFieldDefinitions();
  console.log(fieldDefinitions);
  return (
    // <Box>
    //   <Stack direction="row">
    //     <Typography variant="h5">{powerStation.name}</Typography>
    //     <Typography variant="h6">{powerStation.id}</Typography>
    //   </Stack>
    //   <Stack direction="row">
    //     {/* <Typography variant="body1">{powerStation.description}</Typography> */}
    //   </Stack>
    // </Box>
    <Card>
      <CardHeader
        title="Metadata"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <TextField
          field={fieldDefinitions.name}
          muiTextFieldProps={{ fullWidth: true }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="error"
          size="small"
          onClick={() => deletePowerStation()}
        >
          Delete
        </Button>
        <SubmitButton size="small">Save</SubmitButton>
      </CardActions>
    </Card>
  );
};

export default PowerStationMetadataCard;
