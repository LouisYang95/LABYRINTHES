"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
exports.App = (0, express_1.default)();
exports.App.use(express_1.default.json());
exports.App.use('/users', userRoutes_1.default);
exports.App.use('/auth', authRoutes_1.default);
