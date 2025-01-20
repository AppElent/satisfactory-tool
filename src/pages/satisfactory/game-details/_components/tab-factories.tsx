import FactoryOverview from '@/components/satisfactory/factory-overview';

const TabFactories = () => {
  // const router = usePathRouter();
  // const params = useParams();

  // const handleFactoryAdd = async () => {
  //   const factory = await createFactory();
  //   console.log(factory);
  //   toast.success(`Factory ${factory.name} created`);
  //   router.push('factoryDetails', { factoryId: factory.id });
  // };

  // const handleFactoryDelete = async (id: string) => {
  //   console.log('Delete factory', id);
  //   const game = JSON.parse(JSON.stringify(item));
  //   game.factories = game.factories.filter((factory: any) => factory.id !== id);
  //   data.actions.update(game, game.id);
  //   toast.success('Factory deleted');
  // };

  return (
    <div>
      {/* <FloatingButton handleAdd={handleFactoryAdd} />
      {factories.map((factory: any) => {
        return (
          <Card key={factory.id}>
            <CardHeader title={factory.name} />
            <CardContent>
              <div>{factory.description}</div>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                color="primary"
                onClick={() => router.push('factoryDetails', { factoryId: factory.id })}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
      })} */}
      <FactoryOverview />
    </div>
  );
};

export default TabFactories;
