"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
const LabyrinthVersion_1 = __importDefault(require("./LabyrinthVersion"));
const MarkPosition_1 = __importDefault(require("./MarkPosition"));
const MarkInteraction_1 = __importDefault(require("./MarkInteraction"));
class Mark extends sequelize_1.Model {
}
Mark.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    labyrinth_version_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: "Mark",
    tableName: "marks",
});
Mark.belongsTo(User_1.default, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "CASCADE"
});
Mark.belongsTo(LabyrinthVersion_1.default, {
    foreignKey: "labyrinth_version_id",
    targetKey: "id",
});
Mark.hasOne(MarkPosition_1.default, {
    foreignKey: "mark_id",
    onDelete: "CASCADE"
});
Mark.hasMany(MarkInteraction_1.default, {
    foreignKey: "mark_id",
    onDelete: "CASCADE"
});
exports.default = Mark;
