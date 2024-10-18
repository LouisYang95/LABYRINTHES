import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Top extends Model {}

Top.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Top",
    tableName: "top"
})

Top.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id"
})

export default Top;
