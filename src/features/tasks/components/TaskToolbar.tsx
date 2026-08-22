import { SearchX } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import TaskSearch from './TaskSearch';
import TaskFilters, { type TaskStatus, type TaskPriority } from './TaskFilters';

interface TaskToolbarProps {
  search: string;
  status: TaskStatus;
  priority: TaskPriority;

  onSearchChange: (value: string) => void;
  onStatusChange: (status: TaskStatus) => void;
  onPriorityChange: (priority: TaskPriority) => void;
}

export default function TaskToolbar({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TaskToolbarProps) {
  const hasFilters = search !== '' || status !== 'all' || priority !== 'all';

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onPriorityChange('all');
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <TaskSearch value={search} onChange={onSearchChange} />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <TaskFilters
              status={status}
              priority={priority}
              onStatusChange={onStatusChange}
              onPriorityChange={onPriorityChange}
            />

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                className="gap-2"
              >
                <SearchX className="size-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
