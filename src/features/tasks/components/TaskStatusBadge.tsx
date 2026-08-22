import { Badge } from '@/components/ui/badge';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  'To Do': {
    label: 'To Do',
    className:
      'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
  },

  'In Progress': {
    label: 'In Progress',
    className:
      'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  },

  Done: {
    label: 'Done',
    className:
      'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  },
};

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
}
