import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useDeleteTask } from '../hooks/useDeleteTask';
import type { TaskWithId } from '../types';

interface DeleteTaskDialogProps {
  task: TaskWithId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (taskId: string) => void;
}

export default function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onDeleted,
}: DeleteTaskDialogProps) {
  const { deleteTask, isLoading, error } = useDeleteTask();

  const handleDelete = async () => {
    if (!task) {
      return;
    }

    try {
      await deleteTask(task._id);

      onDeleted(task._id);
      onOpenChange(false);
    } catch {}
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete task?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-medium text-foreground">"{task?.title}"</span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-destructive text-white hover:bg-destructive/70"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
