// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('Header 不見啦, Authorization header missing');
    (err as any).status = 401;
    return next(err); // 改用 next(err)，讓 Express 處理
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    const err = new Error('Token 不見啦, Token missing');
    (err as any).status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    req.userId = decoded.id;
    next();
  } catch (err) {
    const error = new Error('未知的 token, Invalid token');
    (error as any).status = 403;
    return next(error);
    // middleware 只能呼叫 next()，或拋出錯誤，
    // 不能直接回傳 response
    // 因為 middleware 是在 controller 之前執行的
    // return res.status(403).json({ message: 'Invalid token' });
  }
};
