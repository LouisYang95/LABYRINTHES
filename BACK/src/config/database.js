"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(DB_NAME !== null && DB_NAME !== void 0 ? DB_NAME : "", DB_USER !== null && DB_USER !== void 0 ? DB_USER : "", DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql"
});
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
exports.default = sequelize;
