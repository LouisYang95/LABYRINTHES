import syncModels from "./model/syncModels";
import { App } from './app'
import {Express} from "express";

syncModels().then(() => {
    const hostname = "127.0.0.1";
    const port = 3000;
    const app: Express = App;
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })
})

