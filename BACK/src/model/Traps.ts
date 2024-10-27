import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import Objects from "./Objects";
import LabyrinthVersion from "./LabyrinthVersion";
import LabyrinthLevel from "./LabyrinthLevel";
import User from "./User";

class Traps extends Model {
    public id!: number;
    public object_id!: number;
    public labyrinth_version_id!: number;
    public labyrinth_level_id!: number;
    public user_id!: number;
    public position_x!: number;
    public position_y!: number;
    public position_z!: number;
}

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
    labyrinth_level_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
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

Traps.belongsTo(LabyrinthLevel,{
    foreignKey: 'labyrinth_level_id',
    targetKey: 'id'
})

Traps.belongsTo(User,{
    foreignKey: 'user_id',
    targetKey: 'id'
})

export default Traps;
