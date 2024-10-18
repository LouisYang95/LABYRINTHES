import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import Objects from "./Objects";
import LabyrinthVersion from "./LabyrinthVersion";

class Traps extends Model {}

Traps.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    object_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    labyrinth_version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position_x: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position_y: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position_z: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Trap",
    tableName: "trap"
})

Traps.belongsTo(Objects, {
    foreignKey: 'object_id',
    targetKey: 'id'
})

Traps.belongsTo(LabyrinthVersion, {
    foreignKey: 'labyrinth_version_id',
    targetKey: 'id'
})

export default Traps;