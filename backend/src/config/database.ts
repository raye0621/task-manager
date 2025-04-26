// src/config/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './task-manager.sqlite', // 資料庫檔案
});

export default sequelize;
