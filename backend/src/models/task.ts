// src/models/task.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: TaskStatus;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('todo', 'in-progress', 'done'),
      allowNull: false,
      defaultValue: 'todo',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
  }
);

// 設定關聯
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

export default Task;
