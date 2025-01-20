import Notepad from '@/libs/forms/components/Notepad';
import { createGameSchema } from '@/schemas/satisfactory/game';

const TabNotepad = () => {
  const fieldDefinitions = createGameSchema().getFieldDefinitions();
  return (
    // <Notepad
    //   placeholder={'Scribble here...'}
    //   sx={{
    //     flexGrow: 1,
    //     minHeight: '60vh',
    //   }}
    //   name="scribble"
    //   value={data}
    //   onChange={(v: string) => {
    //     if (v !== data) {
    //       setData(v);
    //     }
    //   }}
    // />
    <Notepad
      field={fieldDefinitions.notes}
      sx={{
        flexGrow: 1,
        minHeight: '60vh',
      }}
    />
  );
};

export default TabNotepad;
