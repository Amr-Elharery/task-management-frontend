import axios from 'axios';
import config from '@/config/config';

const httpClient = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle errors globally
// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     toast.add({
//       type: 'error',
//       title: 'Unexpected Error',
//       description: `HTTP Error: ${error.response?.status} - ${error.response?.data?.error || error.error}`,
//     });
//     return Promise.reject(error);
//   },
// );

export default httpClient;
