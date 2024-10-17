"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = syncModels;
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const Objects_1 = __importDefault(require("./Objects"));
const Marketplace_1 = __importDefault(require("./Marketplace"));
const Inventory_1 = __importDefault(require("./Inventory"));
const LabyrinthVersion_1 = __importDefault(require("./LabyrinthVersion"));
const Top_1 = __importDefault(require("./Top"));
const Mark_1 = __importDefault(require("./Mark"));
const MarkPosition_1 = __importDefault(require("./MarkPosition"));
const MarkInteraction_1 = __importDefault(require("./MarkInteraction"));
const Traps_1 = __importDefault(require("./Traps"));
function syncModels() {
    database_1.default.sync({ alter: true });
    User_1.default.sync();
    Objects_1.default.sync();
    Marketplace_1.default.sync();
    Inventory_1.default.sync();
    LabyrinthVersion_1.default.sync();
    Top_1.default.sync();
    Traps_1.default.sync();
    Mark_1.default.sync();
    MarkInteraction_1.default.sync();
    MarkPosition_1.default.sync();
    return Promise.resolve();
}
