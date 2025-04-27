// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Task from '../models/task';

export const getTasks = async (req: AuthRequest, res: Response) => {
  const { status } = req.query;

  const whereClause: any = { userId: req.userId };
  if (status) {
    whereClause.status = status;
  }

  const tasks = await Task.findAll({ where: whereClause });
  res.json(tasks);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const task = await Task.create({
    title,
    description,
    status: status || 'todo',
    userId: req.userId,
  });

  res.status(201).json(task);
};


export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await Task.findOne({ where: { id, userId: req.userId } });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;

  await task.save();

  res.json(task);
};


export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id, userId: req.userId } });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await task.destroy();

  res.json({ message: 'Task deleted successfully' });
};

