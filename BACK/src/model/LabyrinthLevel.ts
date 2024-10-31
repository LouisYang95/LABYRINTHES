import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";
import LabyrinthVersion from "./LabyrinthVersion";

class LabyrinthLevel extends Model {
    public id!: number;
    public labyrinth_version_id!: number;
    public level_number!: number;
}

LabyrinthLevel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    labyrinth_version_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "LabyrinthLevel",
    tableName: "labyrinth_levels"
})

LabyrinthLevel.belongsTo(LabyrinthVersion, {
    foreignKey: "labyrinth_version_id",
    targetKey: "id"
})

export default LabyrinthLevel;
