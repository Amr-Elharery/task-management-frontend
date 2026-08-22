import { useCallback, useEffect, useState } from 'react';

import tasksService from '../services/tasksService';
import type { GetTasksResponse, TaskQuery } from '../types';

interface UseGetTasksResult {
  data: GetTasksResponse | null;
  isLoading: boolean;
  error: string;
  refetch: () => void;
}

export function useGetTasks(query: TaskQuery = {}): UseGetTasksResult {
  const [data, setData] = useState<GetTasksResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await tasksService.getTasks(query);

      setData(response);
    } catch (error) {
      setError('Failed to fetch tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [query.page, query.limit, query.search, query.status, query.priority]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchTasks,
  };
}
