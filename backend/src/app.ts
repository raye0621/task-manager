import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './config/database';
import './models/user';
import './models/task';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 同步 DB
sequelize
  .sync({ force: false }) // force: true 每次啟動會清空重建，現在用 false TODO
  .then(() => {
    console.log('資料庫同步！Database synced.');
  })
  .catch((err) => {
    console.error('資料庫同步失敗！Database sync failed:', err);
  });

app.use('/login', authRoutes);
app.use('/tasks', taskRoutes);

// 打錯路由會回傳一個 { message: 'Not Found' }，而不是 Express 預設的 HTML 404 頁面。
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// 最後放 errorHandler
app.use(errorHandler);

export default app;

// ✅ 現在的 app.ts 完整流程是這樣：
// 1	初始化 dotenv、cors、json parser	
// 2	sequelize.sync() 資料庫連接與同步	
// 3	app.use('/login', authRoutes) 掛上登入路由	
// 4	app.use('/tasks', taskRoutes) 掛上任務路由	
// 5	處理 404 Not Found 的請求	
// 6	掛上統一的錯誤處理器 errorHandler
