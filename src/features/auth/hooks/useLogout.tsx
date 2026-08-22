import { useState } from 'react';
import axios from 'axios';

import authService from '../services/authService';
import { useAuth } from './useAuth';

interface UseLogoutResult {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string;
}

export function useLogout(): UseLogoutResult {
  const { logout: clearAuth } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const logout = async () => {
    try {
      setIsLoading(true);
      setError('');

      await authService.logout();
      localStorage.removeItem('task-manager-token');
      clearAuth();
    } catch (error) {
      let errorMessage = 'Failed to logout.';

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }

      setError(errorMessage);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
    error,
  };
}
