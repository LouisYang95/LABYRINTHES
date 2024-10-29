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
import selectedItemRoute from "./routes/selectedItemRoute";
import {WebSocketServer} from 'ws';
import http from 'http';
import {
    fetchGeneralTop,
    fetchTopByBadPoints,
    fetchTopByGoodPoints,
} from "./controller/topController";

export const App = express();

App.use(express.json());
App.use(cors());


App.use('/mark', markRoutes);
App.use('/user', userRoutes);
App.use('/auth', authRoutes);
App.use('/shop', shopRoutes);
App.use('/top', topRoutes);
App.use('/seed',seedRoutes);
App.use('/trap', trapRoutes);
App.use('/selected_item', selectedItemRoute);

scheduleDailySeed()

swaggerDocs(App);

const wss = new WebSocketServer({ port: 3100 });

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

async function broadcastData(fetchData: () => Promise<any>, eventType: string) {
    try {
        const data = await fetchData();
        const message = JSON.stringify({ eventType, data });
        wss.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    } catch (error) {
        console.error(`Erreur lors de la diffusion de ${eventType}:`, error);
    }
}

async function broadcastTopData() {
    await broadcastData(fetchGeneralTop, 'generalTop');
    await broadcastData(fetchTopByGoodPoints, 'goodPointsTop');
    await broadcastData(fetchTopByBadPoints, 'badPointsTop');
}

setInterval(broadcastTopData, 10000);
