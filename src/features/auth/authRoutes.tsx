import { redirect } from 'react-router';
import AuthLayout from './components/authLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import GuestGuard from './guards/guestGuard';

const authRoutes = {
  path: '/auth',
  element: (
    <GuestGuard>
      <AuthLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: '',
      loader: () => redirect('/auth/login'),
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
  ],
};

export default authRoutes;
