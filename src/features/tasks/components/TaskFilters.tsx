import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { STATUSES, PRIORITIES } from '../types';

export type TaskStatus = 'all' | (typeof STATUSES)[number];

export type TaskPriority = 'all' | (typeof PRIORITIES)[number];

interface TaskFiltersProps {
  status: TaskStatus;
  priority: TaskPriority;
  onStatusChange: (status: TaskStatus) => void;
  onPriorityChange: (priority: TaskPriority) => void;
}

export default function TaskFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as TaskStatus)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>

          {STATUSES.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={priority}
        onValueChange={(value) => onPriorityChange(value as TaskPriority)}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All priorities</SelectItem>

          {PRIORITIES.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
