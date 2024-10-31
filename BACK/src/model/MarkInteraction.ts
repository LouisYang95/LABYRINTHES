import {DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

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
    interaction_type: {
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

MarkInteraction.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
})

export default MarkInteraction;
