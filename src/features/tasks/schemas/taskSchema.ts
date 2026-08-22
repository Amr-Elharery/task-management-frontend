import { z } from 'zod';

import { STATUSES, PRIORITIES } from '../types';

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required.')
    .max(100, 'Title must not exceed 100 characters.'),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required.')
    .max(1000, 'Description must not exceed 1000 characters.'),

  status: z.enum(STATUSES),

  priority: z.enum(PRIORITIES),

  dueDate: z
    .string()
    .min(1, 'Due date is required.')
    .refine(
      (value) => {
        const date = new Date(value);

        return !Number.isNaN(date.getTime());
      },
      {
        message: 'Invalid due date.',
      },
    )
    .refine(
      (value) => {
        const date = new Date(value);

        return date >= new Date();
      },
      {
        message: 'Due date cannot be in the past.',
      },
    ),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
