import {DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import MarkPosition from "./MarkPosition";
import User from "./User";
import Mark from "./Mark";

class MarkInteraction extends Model {}

MarkInteraction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mark_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interaction: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MarkInteraction",
    tableName: "mark_interactions",
  }
);

MarkPosition.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
})

MarkPosition.belongsTo(Mark, {
    foreignKey: "mark_id",
    targetKey: "id",
})

export default MarkInteraction;
