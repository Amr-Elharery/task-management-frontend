import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';

import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';

import type { TaskWithId } from '../types';

interface ViewTaskDialogProps {
  task: TaskWithId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewTaskDialog({
  task,
  open,
  onOpenChange,
}: ViewTaskDialogProps) {
  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pr-8">{task.title}</DialogTitle>

          <DialogDescription>Task details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Description</h3>

            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <Separator />

          {/* Status & Priority */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Status</h3>

              <TaskStatusBadge status={task.status} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Priority</h3>

              <TaskPriorityBadge priority={task.priority} />
            </div>
          </div>

          <Separator />

          {/* Due Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Due Date</h3>

            <p className="text-sm text-muted-foreground">
              {new Date(task.dueDate).toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
