import { useState } from 'react';

import tasksService from '../services/tasksService';
import type { AddTaskResponse, Task } from '../types';
import axios from 'axios';

interface UseCreateTaskResult {
  createTask: (task: Task) => Promise<AddTaskResponse>;
  isLoading: boolean;
  error: string;
}

export function useCreateTask(): UseCreateTaskResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const createTask = async (task: Task): Promise<AddTaskResponse> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await tasksService.addTask(task);

      return response;
    } catch (error) {
      let errorMessage: string = 'Failed to add task.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTask,
    isLoading,
    error,
  };
}
