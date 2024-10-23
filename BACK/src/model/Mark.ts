import {DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import LabyrinthVersion from "./LabyrinthVersion";
import MarkPosition from "./MarkPosition";
import MarkInteraction from "./MarkInteraction";
import LabyrinthLevel from "./LabyrinthLevel";

class Mark extends Model {}

Mark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
        allowNull: false
    },
    labyrinth_version_id:{
      type: DataTypes.INTEGER,
        allowNull: false
    },
    labyrinth_level_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Mark",
    tableName: "marks",
  });

Mark.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE"
})

Mark.belongsTo(LabyrinthVersion,{
  foreignKey: "labyrinth_version_id",
  targetKey: "id",
})

Mark.belongsTo(LabyrinthLevel,{
    foreignKey: "labyrinth_level_id",
    targetKey: "id",
})

Mark.hasOne(MarkPosition, {
    foreignKey: "mark_id",
    onDelete: "CASCADE"
});

Mark.hasMany(MarkInteraction, {
    foreignKey: "mark_id",
    onDelete: "CASCADE"
});
export default Mark;
