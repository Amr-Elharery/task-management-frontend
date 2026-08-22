import { useEffect, useState } from 'react';

import tasksService from '../services/tasksService';

import type { GetTasksResponse, TaskQuery } from '../types';
import axios from 'axios';

interface UseGetTasksParams {
  isSearch?: boolean;
  search?: string;
  status?: TaskQuery['status'];
  priority?: TaskQuery['priority'];
}

interface UseGetTasksResult {
  data: GetTasksResponse | null;
  isLoading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

export function useGetTasks({
  isSearch = false,
  search = '',
  status,
  priority,
}: UseGetTasksParams = {}): UseGetTasksResult {
  const [data, setData] = useState<GetTasksResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = isSearch
        ? await tasksService.searchTasksByTitle(search.trim())
        : await tasksService.getTasks({
            status,
            priority,
          });

      setData(response);
    } catch (error) {
      let errorMessage: string = 'Failed to fetch tasks.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isSearch, search, status, priority]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTasks,
  };
}
