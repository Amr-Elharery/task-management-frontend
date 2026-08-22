export interface Task {
  title: string;
  description: string;
  status: (typeof STATUSES)[number];
  priority: (typeof PRIORITIES)[number];
  dueDate: string;
}

export interface TaskWithId extends Task {
  _id: string;
}

export const STATUSES = ['To Do', 'In Progress', 'Done'] as const;
export const PRIORITIES = ['Low', 'Medium', 'High'] as const;

export interface AddTaskResponse {
  message: string;
  task: Task;
}

export interface GetTasksResponse {
  message: string;
  data: {
    tasks: TaskWithId[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalTasks: number;
    };
  };
}

export interface GetTaskResponse {
  message: string;
  task: TaskWithId;

}

export interface UpdateTaskResponse {
  message: string;
  task: TaskWithId;
}

export interface DeleteTaskResponse {
  message: string;
}

export interface TaskQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: (typeof STATUSES)[number];
  priority?: (typeof PRIORITIES)[number];
}