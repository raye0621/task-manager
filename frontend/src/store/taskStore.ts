// src/store/taskStore.ts
import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';
import {
  fetchTasksApi,
  createTaskApi,
  updateTaskStatusApi,
  deleteTaskApi,
} from '../http/taskApi';

interface TaskState {
  formattedTasks: Record<string, Task[]>;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  updateTaskStatus: (taskId: number, status: TaskStatus) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  formattedTasks: {},
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await fetchTasksApi();
      const formattedTasks = formatTasksByStatus(tasks);

      set({ formattedTasks });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      await createTaskApi(task);
      await useTaskStore.getState().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateTaskStatus: async (taskId, status) => {
    set({ loading: true, error: null });
    try {
      await updateTaskStatusApi(taskId, status);
      await useTaskStore.getState().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (taskId) => {
    set({ loading: true, error: null });
    try {
      await deleteTaskApi(taskId);
      await useTaskStore.getState().fetchTasks();
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

function formatTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
}
