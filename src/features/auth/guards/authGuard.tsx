import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return;
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isLoading && isAuthenticated) {
    return <>{children}</>;
  }
}
