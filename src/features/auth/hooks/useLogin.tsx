import { useState } from 'react';
import axios from 'axios';

import authService from '../services/authService';
import { useAuth } from './useAuth';

import type { LoginResponse } from '../types/types';

interface UseLoginResult {
  login: (email: string, password: string) => Promise<LoginResponse>;

  isLoading: boolean;
  error: string;
}

export function useLogin(): UseLoginResult {
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResponse> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await authService.login(email, password);

      setUser(response.user);

      localStorage.setItem('task-manager-token', response.token);

      return response;
    } catch (error) {
      let errorMessage = 'An error occurred during login.';

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
    login,
    isLoading,
    error,
  };
}
