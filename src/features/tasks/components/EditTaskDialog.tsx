import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import TaskForm from './TaskForm';

import { useUpdateTask } from '../hooks/useUpdateTask';

import type { Task, TaskWithId } from '../types';

interface EditTaskDialogProps {
  task: TaskWithId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: (task: TaskWithId) => void;
}

export default function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onUpdated,
}: EditTaskDialogProps) {
  const { updateTask, isLoading, error } = useUpdateTask();

  const handleSubmit = async (values: Task) => {
    if (!task) {
      return;
    }

    try {
      const response = await updateTask(task._id, values);

      onUpdated(response.task);

      onOpenChange(false);
    } catch {
      // Error is already handled by the hook.
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>

          <DialogDescription>Update the task details below.</DialogDescription>
        </DialogHeader>

        {task && (
          <TaskForm
            key={task._id}
            initialValues={{
              title: task.title,
              description: task.description,
              status: task.status,
              priority: task.priority,
              dueDate: task.dueDate,
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            serverError={error}
            submitLabel="Save Changes"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
