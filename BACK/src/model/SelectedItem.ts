import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Inventory from "./Inventory";

class SelectedItem extends Model {
    public id!: number;
    public user_id!: number;
    public inventory_id!: number;
}

SelectedItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inventory_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "SelectedItem",
    tableName: "selected_item"
});

SelectedItem.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id"
})

SelectedItem.belongsTo(Inventory, {
    foreignKey: "inventory_id",
    targetKey: "id"
})

export default SelectedItem;
