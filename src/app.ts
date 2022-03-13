import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import globalRouter from './routes';

dotenv.config();

const app = express();

// global middlewares
app.use(express.json());
app.use(cors());

// bind global router to all routes
app.use('/', globalRouter);

export default app;