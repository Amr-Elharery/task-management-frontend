import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RotatingLines } from 'react-loader-spinner';

import TaskTableRow from './TaskTableRow';
import type { TaskWithId } from '../types';

interface TaskTableProps {
  tasks: TaskWithId[];
  isLoading: boolean;
  error: string;
  onView: (task: TaskWithId) => void;
  onEdit: (task: TaskWithId) => void;
  onDelete: (task: TaskWithId) => void;
}

export default function TaskTable({
  tasks,
  isLoading,
  error,
  onView,
  onEdit,
  onDelete,
}: TaskTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-75 items-center justify-center rounded-xl border bg-card">
        <RotatingLines width="50" strokeColor="#4fa94d" strokeWidth="4" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-75 items-center justify-center rounded-xl border bg-card">
        <p className="text-muted-foreground">Error loading tasks: {error}</p>
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="flex h-75 items-center justify-center rounded-xl border bg-card">
        <p className="text-muted-foreground">No tasks found.</p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <TaskTableRow
              key={task._id}
              task={task}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
