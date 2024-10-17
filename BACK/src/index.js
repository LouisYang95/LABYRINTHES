"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const syncModels_1 = __importDefault(require("./model/syncModels"));
const app_1 = require("./app");
(0, syncModels_1.default)().then(() => {
    const hostname = "127.0.0.1";
    const port = 3000;
    const app = app_1.App;
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
});
