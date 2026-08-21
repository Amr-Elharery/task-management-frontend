import { RouterProvider } from 'react-router/dom';
import router from './router';
import { Toaster } from '@/components/ui/toast';
import { AuthProvider } from './features/auth/context/authContext';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}
