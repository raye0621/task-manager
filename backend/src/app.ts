import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './config/database';
import './models/user';
import './models/task';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 同步 DB
sequelize.sync({ force: false }) // force: true 每次啟動會清空重建，現在用 false TODO
  .then(() => {
    console.log('資料庫同步！Database synced.');
  })
  .catch((err) => {
    console.error('資料庫同步失敗！Database sync failed:', err);
  });

export default app;
