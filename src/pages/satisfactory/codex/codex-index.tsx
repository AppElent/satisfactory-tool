import paths from '@/config/paths';
import useRouter from '@/hooks/use-router';
import DefaultPage from '@/pages/default/DefaultPage';
import { List, ListItemButton } from '@mui/material';

const CodexIndex = () => {
  const router = useRouter();
  const codexRoutes = paths.filter((path) => path.category === 'codex');
  console.log(codexRoutes, paths);
  return (
    <DefaultPage>
      <List>
        {codexRoutes.map((page) => (
          <ListItemButton
            key={page.id}
            onClick={() => router.push(page.to)}
          >
            {page.label}
          </ListItemButton>
        ))}
      </List>
    </DefaultPage>
  );
};

export default CodexIndex;
