import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "user"
})

export default User;