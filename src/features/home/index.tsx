import { Link } from 'react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div className="min-h-full">
      <section className="relative overflow-hidden border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
              Simple. Focused. Productive.
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Organize your work.
              <span className="block text-primary">Get things done.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Manage your tasks, track your progress, and stay focused on what
              matters most.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {isLoading ? (
                <div className="h-10 w-40 animate-pulse rounded-md bg-muted" />
              ) : isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className={buttonVariants({ size: 'lg' })}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth/register"
                    className={buttonVariants({ size: 'lg' })}
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/auth/login"
                    className={buttonVariants({
                      size: 'lg',
                      variant: 'outline',
                    })}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {isAuthenticated && user && (
              <p className="mt-5 text-sm text-muted-foreground">
                Welcome back, {' '}
                <span className="font-medium text-foreground">{user.name}</span>.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
