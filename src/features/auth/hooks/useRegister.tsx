import { useState } from 'react';
import axios from 'axios';

import authService from '../services/authService';
import type { RegisterResponse } from '../types/types';

interface UseRegisterResult {
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<RegisterResponse>;
  isLoading: boolean;
  error: string;
}

export function useRegister(): UseRegisterResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    try {
      setIsLoading(true);
      setError('');

      return await authService.register(name, email, password);
    } catch (error) {
      let errorMessage = 'An error occurred during registration.';

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }

      setError(errorMessage);

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
}
