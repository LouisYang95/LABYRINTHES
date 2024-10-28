import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import User from "./User";

class Top extends Model {
    public id!: number;
    public user_id!: number;
    public timer!: number;
    public User!: User;
}

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
