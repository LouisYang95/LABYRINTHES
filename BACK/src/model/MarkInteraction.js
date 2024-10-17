"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
class MarkInteraction extends sequelize_1.Model {
}
MarkInteraction.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mark_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    interaction: {
        type: sequelize_1.DataTypes.ENUM("like", "dislike"),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "MarkInteraction",
    tableName: "mark_interactions",
});
MarkInteraction.belongsTo(User_1.default, {
    foreignKey: "user_id",
    targetKey: "id",
});
exports.default = MarkInteraction;
