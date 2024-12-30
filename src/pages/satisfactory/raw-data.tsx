import JsonEditor from '@/components/default/json-editor';
import DefaultPage from '../default/DefaultPage';
import satisfactoryData from '@/libs/satisfactory/data/satisfactory-data';

const RawData = () => {
  return (
    <DefaultPage>
      <JsonEditor data={satisfactoryData.toObject()} />
    </DefaultPage>
  );
};

export default RawData;
