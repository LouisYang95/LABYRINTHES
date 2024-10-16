"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = syncModels;
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
function syncModels() {
    database_1.default.sync();
    User_1.default.sync();
    return Promise.resolve();
}
