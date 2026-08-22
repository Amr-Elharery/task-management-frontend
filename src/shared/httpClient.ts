import axios from 'axios';
import config from '@/config/config';

const httpClient = axios.create({
  baseURL: config.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token to headers
httpClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('task-manager-token');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
