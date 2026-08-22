import { buttonVariants } from '@/components/ui/button';

import { Plus } from 'lucide-react';
import { Link } from 'react-router';

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your tasks and keep your work organized.
        </p>
      </div>

      <Link to="/tasks/create" className={buttonVariants({ size: 'lg' })}>
        <Plus />
        Create Task
      </Link>
    </div>
  );
}
