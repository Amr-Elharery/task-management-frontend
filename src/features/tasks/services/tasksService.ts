import httpClient from '@/shared/httpClient';
import type {
  AddTaskResponse,
  GetTaskResponse,
  GetTasksResponse,
  Task,
  TaskQuery,
  UpdateTaskResponse,
} from '../types';

class TasksService {
  async addTask(task: Task): Promise<AddTaskResponse> {
    const response = await httpClient.post('/tasks', task);
    return response.data;
  }

  async getTasks(query: TaskQuery = {}): Promise<GetTasksResponse> {
    const params = new URLSearchParams();

    if (query.page) {
      params.append('page', query.page.toString());
    }

    if (query.limit) {
      params.append('limit', query.limit.toString());
    }

    if (query.search) {
      params.append('search', query.search);
    }

    if (query.status) {
      params.append('status', query.status);
    }

    if (query.priority) {
      params.append('priority', query.priority);
    }

    const response = await httpClient.get(`/tasks?${params.toString()}`);

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
