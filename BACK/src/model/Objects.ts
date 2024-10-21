import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class Objects extends Model {}

Objects.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('good', 'bad'),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Objects",
    tableName: "objects"
})

export default Objects;