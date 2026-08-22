import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-2">
      {/* Branding */}
      <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="text-xl font-semibold">Task Manager</div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">
            Organize your work.
            <br />
            Get things done.
          </h1>

          <p className="mt-4 text-primary-foreground/70">
            Manage your tasks, track your progress, and stay focused on what
            matters.
          </p>
        </div>

        <p className="text-sm text-primary-foreground/60">
          More tasks, More organized
        </p>
      </div>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Mobile Branding */}
        <div className="bg-primary px-5 py-10 text-primary-foreground sm:px-8 sm:py-8 lg:hidden">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Task Manager
            </h1>

            <p className="mt-2 max-w-md text-sm text-primary-foreground/70 sm:text-base">
              Manage your tasks, track your progress, and stay focused on what
              matters.
            </p>

            <p className="mt-4 text-xs text-primary-foreground/50">
              More tasks, More organized
            </p>
          </div>
        </div>

        {/* Form */}
        <main className="flex lg:flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
