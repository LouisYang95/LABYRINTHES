"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const LabyrinthVersion_1 = __importDefault(require("./LabyrinthVersion"));
class MarkPosition extends sequelize_1.Model {
}
MarkPosition.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mark_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    labyrinth_version_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    position_x: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    position_y: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    position_z: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    modelName: "MarkPosition",
    tableName: "mark_positions",
});
MarkPosition.belongsTo(LabyrinthVersion_1.default, {
    foreignKey: "labyrinth_version_id",
    targetKey: "id"
});
exports.default = MarkPosition;