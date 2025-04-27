import dotenv from 'dotenv';
dotenv.config(); // 保險起見，確保此檔案也會載入 .env

// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    console.log('🧩 查詢結果 user:', user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔐 密碼比對結果:', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    console.error('❌ Login error:', err); 
    res.status(500).json({ message: '登入錯誤！Login failed', error: err });
  }
};
