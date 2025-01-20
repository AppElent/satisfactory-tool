import PowerStationOverview from '@/components/satisfactory/power-station-overview';

type TabPowerStationsProps = React.ComponentProps<typeof PowerStationOverview>;

// & {}

const TabPowerStations = (props: TabPowerStationsProps) => {
  return (
    <div>
      <PowerStationOverview {...props} />
    </div>
  );
};

export default TabPowerStations;
