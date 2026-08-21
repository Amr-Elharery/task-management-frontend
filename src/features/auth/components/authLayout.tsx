import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-muted/40 lg:grid lg:grid-cols-2">
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

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
