import { useAuth } from '@/features/auth/hooks/useAuth';
import AuthButtons from './components/authButtons';
import { buttonVariants } from '../ui/button';
import { Link } from 'react-router';

export default function Header() {
  const { isAuthenticated, logout, user, isLoading } = useAuth();

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
        <Link
          to="/home"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          Task Manager
        </Link>

        <nav>
          {isLoading ? (
            <div className="h-10 w-40 animate-pulse rounded-md bg-muted" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:block">
                Welcome,{' '}
                <span className="font-medium text-foreground">
                  {user?.name}
                </span>
              </span>

              <Link
                to="/dashboard"
                className={buttonVariants({ variant: 'outline' })}
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={logout}
                className={buttonVariants({
                  variant: 'destructive',
                  className: 'hover:text-destructive',
                })}
              >
                Logout
              </button>
            </div>
          ) : (
            <AuthButtons />
          )}
        </nav>
      </div>
    </header>
  );
}
