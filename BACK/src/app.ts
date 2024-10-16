import express from 'express';
import userRoutes from "./routes/userRoutes";

export const App = express();

App.use(express.json());

App.use('/users', userRoutes);



