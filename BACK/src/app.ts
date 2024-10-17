import express from 'express';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import scheduleDailySeed from "./controller/CronTask"

export const App = express();

App.use(express.json());

App.use('/users', userRoutes);
App.use('/auth', authRoutes);

scheduleDailySeed()
