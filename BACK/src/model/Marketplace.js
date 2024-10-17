"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Objects_1 = __importDefault(require("./Objects"));
const User_1 = __importDefault(require("./User"));
class Marketplace extends sequelize_1.Model {
}
Marketplace.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    object_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: "Marketplace",
    tableName: "marketplace"
});
Marketplace.belongsTo(User_1.default, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
Marketplace.belongsTo(Objects_1.default, {
    foreignKey: 'object_id',
    targetKey: 'id'
});
exports.default = Marketplace;
