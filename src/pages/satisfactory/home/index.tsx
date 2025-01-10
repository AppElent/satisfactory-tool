import { paths } from '@/config/routing';
import useRouter from '@/hooks/use-router';
import DefaultPage from '@/pages/default/DefaultPage';
import { List, ListItemButton } from '@mui/material';

const Home = () => {
  const router = useRouter();
  const routes = paths.filter((p) => p.id && p.label && !p.path.startsWith(':'));
  return (
    <DefaultPage>
      <List>
        {routes.map((page) => (
          <ListItemButton
            key={page.id}
            onClick={() => router.push(page.to)}
          >
            {page.category ? `${page.category} - ` : ''} {page.label}
          </ListItemButton>
        ))}
      </List>
    </DefaultPage>
  );
};

export default Home;
