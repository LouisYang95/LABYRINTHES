import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Objects from "./Objects";

class Inventory extends Model {
    public id!: number;
    public user_id!: number;
    public object_id!: number;
    public labyrinth_version_id!: number;
}

Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    object_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    labyrinth_version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Inventory",
    tableName: "inventory"
});

Inventory.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id"
})

Inventory.belongsTo(Objects, {
    foreignKey: "object_id",
    targetKey: "id"
})

export default Inventory;
