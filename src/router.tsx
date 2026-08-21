import { createBrowserRouter, redirect } from 'react-router';
import Layout from './components/layout';
import NotFound from './components/notFound';
import authRoutes from './features/auth/authRoutes';
import Home from './features/home';
import AuthGuard from './features/auth/guards/authGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        loader: () => redirect('/home'),
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <div>Dashboard</div>
          </AuthGuard>
        ),
      },
    ],
  },
  authRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
