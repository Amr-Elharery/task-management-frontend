import httpClient from '@/shared/httpClient';
import type {
  AddTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  Task,
  TaskQuery,
  TaskWithId,
  UpdateTaskResponse,
} from '../types';

class TasksService {
  async addTask(task: Task): Promise<AddTaskResponse> {
    const response = await httpClient.post('/tasks', task);
    return response.data;
  }
  async getTasks(query: TaskQuery): Promise<GetTasksResponse> {
    if (query.status || query.priority) {
      const queryParams = new URLSearchParams();
      if (query.status) {
        queryParams.append('status', query.status);
      }
      if (query.priority) {
        queryParams.append('priority', query.priority);
      }
      const response = await httpClient.get(`/tasks?${queryParams.toString()}`);
      return response.data;
    }
    const response = await httpClient.get('/tasks');
    return response.data;
  }

  async searchTasksByTitle(title: string): Promise<GetTasksResponse> {
    const response = await httpClient.get(
      `/tasks/search?title=${encodeURIComponent(title)}`,
    );
    return response.data;
  }

  async getTask(id: string): Promise<GetTaskResponse> {
    const response = await httpClient.get(`/tasks/${id}`);
    return response.data;
  }
  async updateTask(id: string, task: Task): Promise<UpdateTaskResponse> {
    const response = await httpClient.put(`/tasks/${id}`, task);
    return response.data;
  }
  async deleteTask(id: string): Promise<void> {
    await httpClient.delete(`/tasks/${id}`);
  }
}

export default new TasksService();
