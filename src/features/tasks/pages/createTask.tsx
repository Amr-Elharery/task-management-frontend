import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import TaskForm from '../components/TaskForm';
import { useCreateTask } from '../hooks/useCreateTask';

import type { TaskFormValues } from '../schemas/taskSchema';

export default function CreateTask() {
  const navigate = useNavigate();

  const { createTask, isLoading, error } = useCreateTask();

  const handleSubmit = async (values: TaskFormValues) => {
    try {
      await createTask(values);

      navigate('/dashboard');
    } catch {
      // Error is already handled by the hook.
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 lg:px-8">
      <Link
        to="/dashboard"
        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Task</CardTitle>

          <CardDescription>
            Create a new task and keep your work organized.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TaskForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            serverError={error}
          />
        </CardContent>
      </Card>
    </div>
  );
}
