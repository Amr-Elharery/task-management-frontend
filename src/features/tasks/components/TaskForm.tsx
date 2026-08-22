import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { taskSchema, type TaskFormValues } from '../schemas/taskSchema';

import { STATUSES, PRIORITIES, type Task } from '../types';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { useEffect } from 'react';

interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (values: Task) => Promise<void>;
  isLoading?: boolean;
  serverError?: string;
  submitLabel?: string;
}

export default function TaskForm({
  initialValues,
  onSubmit,
  isLoading = false,
  serverError,
}: TaskFormProps) {
  const defaultValues: TaskFormValues = {
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '',
  };
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),

    defaultValues: initialValues ?? defaultValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: TaskFormValues) => {
    await onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <FieldGroup>
        {serverError && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>

              <FieldContent>
                <Input
                  {...field}
                  id="title"
                  placeholder="Enter task title"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                />

                <FieldDescription>
                  Give your task a short descriptive title.
                </FieldDescription>

                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>

              <FieldContent>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Describe the task..."
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                  rows={5}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                />

                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </FieldContent>
            </Field>
          )}
        />

        {/* Status + Priority */}
        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Status</FieldLabel>

                <FieldContent>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      {STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </FieldContent>
              </Field>
            )}
          />

          {/* Priority */}
          <Controller
            name="priority"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Priority</FieldLabel>

                <FieldContent>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>

                    <SelectContent>
                      {PRIORITIES.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </FieldContent>
              </Field>
            )}
          />
        </div>

        <Controller
          name="dueDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>

              <FieldContent>
                <Input
                  {...field}
                  id="dueDate"
                  type="datetime-local"
                  disabled={isLoading}
                  aria-invalid={fieldState.invalid}
                />

                <FieldDescription>
                  Choose when this task should be completed.
                </FieldDescription>

                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Task'}
        </Button>
      </div>
    </form>
  );
}
