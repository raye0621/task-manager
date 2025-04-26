// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Task from '../models/task';

export const getTasks = async (req: AuthRequest, res: Response) => {
  // TODO : 查詢任務
};

export const createTask = async (req: AuthRequest, res: Response) => {
  // TODO : 新增任務
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  // TODO : 更新任務
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  // TODO : 刪除任務
};
