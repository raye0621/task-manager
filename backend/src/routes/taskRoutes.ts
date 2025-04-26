// src/routes/taskRoutes.ts
import express from 'express';
import { authenticateToken } from '../middlewares/auth';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';
import asyncHandler from '../middlewares/asyncHandler';

const router = express.Router();

// throw error，都能自動進到 errorHandler middleware
// async function 不自己 try/catch，或不用 asyncHandler 包住，Express 是 catch 不到錯誤的。
router.get('/', authenticateToken, asyncHandler(getTasks));
router.post('/', authenticateToken, asyncHandler(createTask));
router.put('/:id', authenticateToken, asyncHandler(updateTask));
router.delete('/:id', authenticateToken, asyncHandler(deleteTask));

export default router;
