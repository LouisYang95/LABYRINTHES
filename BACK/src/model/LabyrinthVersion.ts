import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class LabyrinthVersion extends Model {
    public id!: number;
    public seed!: number;
    public is_active!: boolean;
}

LabyrinthVersion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    seed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "LabyrinthVersion",
    tableName: "labyrinth_versions"
})

export default LabyrinthVersion;
