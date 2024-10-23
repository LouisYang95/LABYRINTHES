import express from 'express';
import cors from 'cors';
import swaggerDocs from "./swagger";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import shopRoutes from "./routes/shopRoutes";
import scheduleDailySeed from "./controller/CronTask"
import markRoutes from "./routes/markRoutes";
import topRoutes from "./routes/topRoutes";
import seedRoutes from "./routes/labyrinthRoute";
import trapRoutes from "./routes/trapRoutes";

export const App = express();

App.use(express.json());
App.use(cors());


App.use('/mark', markRoutes);
App.use('/user', userRoutes);
App.use('/auth', authRoutes);
App.use('/top', topRoutes);
App.use('/seed',seedRoutes);
App.use('/trap', trapRoutes);

scheduleDailySeed()

swaggerDocs(App);
