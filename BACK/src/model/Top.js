"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
class Top extends sequelize_1.Model {
}
Top.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    timer: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: "Top",
    tableName: "top"
});
Top.belongsTo(User_1.default, {
    foreignKey: "user_id",
    targetKey: "id"
});
exports.default = Top;