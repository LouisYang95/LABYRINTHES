import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import Objects from "./Objects";
import User from "./User";

class Marketplace extends Model {}

Marketplace.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    object_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Marketplace",
    tableName: "marketplace"
});

Marketplace.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
})

Marketplace.belongsTo(Objects, {
    foreignKey: 'object_id',
    targetKey: 'id'
})

export default Marketplace;