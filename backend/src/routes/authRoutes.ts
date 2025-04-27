import express from 'express';
import { login } from '../controllers/authController';
import asyncHandler from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(login)); // ✅ 重點在這行

export default router;
