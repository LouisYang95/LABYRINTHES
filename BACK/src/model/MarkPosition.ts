import {DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import LabyrinthVersion from "./LabyrinthVersion";
import Mark from "./Mark";

class MarkPosition extends Model {}

MarkPosition.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    labyrinth_version_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position_x: {
      type: DataTypes.FLOAT,
      allowNull: false,
      },
    position_y: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    position_z: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "MarkPosition",
    tableName: "mark_positions",
  }
);

MarkPosition.belongsTo(
    LabyrinthVersion, {
      foreignKey: "labyrinth_version_id",
      targetKey: "id"
    }
)

export default MarkPosition;
