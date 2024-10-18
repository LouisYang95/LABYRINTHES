import express from 'express';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import shopRoutes from "./routes/shopRoutes";
import scheduleDailySeed from "./controller/CronTask"
import markRoutes from "./routes/markRoutes";

export const App = express();

App.use(express.json());

App.use('/mark', markRoutes);
App.use('/user', userRoutes);
App.use('/auth', authRoutes);
App.use('/shop', shopRoutes);

scheduleDailySeed()
