import httpClient from '@/shared/httpClient';
import type { LoginResponse, RegisterResponse } from '../types/types';

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await httpClient.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    const response = await httpClient.post('/auth/register', {
      name,
      email,
      password,
    });

    return response.data;
  }

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  }

  async getCurrentUser(): Promise<RegisterResponse> {
    const response = await httpClient.get('/user/me');

    return response.data;
  }
}

export default new AuthService();
