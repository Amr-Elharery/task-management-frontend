import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth/hooks/useAuth';

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
