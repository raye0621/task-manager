// src/routes/authRoutes.ts
import express from 'express';
import { login } from '../controllers/authController';
import asyncHandler from '../middlewares/asyncHandler';

const router = express.Router();

router.post('/login', asyncHandler(login));

export default router;
