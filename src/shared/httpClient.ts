import axios from 'axios';
import config from '@/config/config';
import { toast } from '@/components/ui/toast';

const httpClient = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors globally
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.add({
      type: 'error',
      description: `HTTP Error: ${error.response?.status} - ${error.response?.data?.message || error.message}`,
    });
    return Promise.reject(error);
  },
);

export default httpClient;
