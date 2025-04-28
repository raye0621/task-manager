// src/http/taskApi.ts
import axios from 'axios';
import { Task, TaskStatus } from '../types/task';
import { authStore } from '../store/authStore';

const API_URL = 'http://localhost:3001/tasks';

const getToken = () => {
  const token = authStore.getState().token;
  return token;
};

export const fetchTasksApi = async () => {
  const res = await axios.get<Task[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const createTaskApi = async (task: Partial<Task>) => {
  const res = await axios.post<Task>(API_URL, task, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const updateTaskStatusApi = async (taskId: number, status: TaskStatus) => {
  const res = await axios.put<Task>(`${API_URL}/${taskId}`, { status }, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};

export const deleteTaskApi = async (taskId: number) => {
  const res = await axios.delete(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.data;
};
