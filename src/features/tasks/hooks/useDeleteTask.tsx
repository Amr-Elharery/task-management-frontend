import { useState } from 'react';
import type { DeleteTaskResponse } from '../types';
import tasksService from '../services/tasksService';
import axios from 'axios';

interface useDeleteTaskResult {
  deleteTask: (id: string) => Promise<DeleteTaskResponse>;
  isLoading: boolean;
  error: string;
}

export function useDeleteTask(): useDeleteTaskResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteTask = async (id: string): Promise<DeleteTaskResponse> => {
    try {
      setIsLoading(true);
      setError('');

      await tasksService.deleteTask(id);

      return { message: 'Task deleted successfully.' };
    } catch (error) {
      let errorMessage = 'Failed to delete task.';

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
    deleteTask,
    isLoading,
    error,
  };
}
