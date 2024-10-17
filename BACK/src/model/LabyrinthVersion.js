"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class LabyrinthVersion extends sequelize_1.Model {
}
LabyrinthVersion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database_1.default,
    modelName: "LabyrinthVersion",
    tableName: "labyrinth_versions"
});
exports.default = LabyrinthVersion;
