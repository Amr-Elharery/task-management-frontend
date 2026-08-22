import { createBrowserRouter, Outlet, redirect } from 'react-router';
import Layout from './components/layout';
import NotFound from './components/notFound';
import authRoutes from './features/auth/authRoutes';
import Home from './features/home';
import AuthGuard from './features/auth/guards/authGuard';
import Dashboard from './features/tasks';
import CreateTask from './features/tasks/pages/createTask';

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
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: 'tasks',
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: [
          {
            path: 'create',
            element: <CreateTask />,
          },
          {},
        ],
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
