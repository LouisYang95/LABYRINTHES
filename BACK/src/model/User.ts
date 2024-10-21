import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public good_points!: number;
    public bad_points!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    good_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    bad_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "user"
})

export default User;