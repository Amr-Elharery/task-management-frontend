import { TableCell, TableRow } from '@/components/ui/table';

import { type Task, type TaskWithId } from '../types';

import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';
import TaskActions from './TaskActions';

interface TaskTableRowProps {
  task: TaskWithId;
  onView: (task: TaskWithId) => void;
  onEdit: (task: TaskWithId) => void;
  onDelete: (task: TaskWithId) => void;
}

export default function TaskTableRow({
  task,
  onView,
  onEdit,
  onDelete,
}: TaskTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="max-w-[350px]">
          <p className="font-medium">{task.title}</p>

          <p className="mt-1 truncate text-sm text-muted-foreground">
            {task.description}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <TaskStatusBadge status={task.status} />
      </TableCell>

      <TableCell>
        <TaskPriorityBadge priority={task.priority} />
      </TableCell>

      <TableCell className="whitespace-nowrap text-muted-foreground">
        {new Date(task.dueDate).toLocaleDateString()}
      </TableCell>

      <TableCell>
        <TaskActions
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
