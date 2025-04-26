import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 之後會掛在這：app.use('/tasks', taskRoutes);

export default app;
