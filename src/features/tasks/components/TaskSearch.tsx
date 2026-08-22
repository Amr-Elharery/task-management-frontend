import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TaskSearch({ value, onChange }: TaskSearchProps) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tasks..."
        className="h-10 pl-9 pr-9"
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onChange('')}
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
        >
          <X className="size-4" />

          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}
