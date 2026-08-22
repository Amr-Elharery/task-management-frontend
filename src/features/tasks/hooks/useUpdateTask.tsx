import { useState } from 'react';
import axios from 'axios';

import tasksService from '../services/tasksService';
import type { Task, UpdateTaskResponse } from '../types';

interface UseUpdateTaskResult {
  updateTask: (id: string, task: Task) => Promise<UpdateTaskResponse>;

  isLoading: boolean;
  error: string;
}

export function useUpdateTask(): UseUpdateTaskResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const updateTask = async (
    id: string,
    task: Task,
  ): Promise<UpdateTaskResponse> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await tasksService.updateTask(id, task);

      return response;
    } catch (error) {
      let errorMessage = 'Failed to update task.';

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
    updateTask,
    isLoading,
    error,
  };
}
