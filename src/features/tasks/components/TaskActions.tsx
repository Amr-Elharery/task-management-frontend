import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { TaskWithId } from '../types';

interface TaskActionsProps {
  task: TaskWithId;
  onView: (task: TaskWithId) => void;
  onEdit: (task: TaskWithId) => void;
  onDelete: (task: TaskWithId) => void;
}

export default function TaskActions({
  task,
  onView,
  onEdit,
  onDelete,
}: TaskActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
      >
        <MoreHorizontal className="size-4" />

        <span className="sr-only">Open task actions</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onView(task)}>
          <Eye className="mr-2 size-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(task)}>
          <Pencil className="mr-2 size-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onDelete(task)}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
