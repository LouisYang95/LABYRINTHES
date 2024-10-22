import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class Objects extends Model {
    public id!: number;
    public name!: string;
    public type!: string;
    public price!: number;
    public description!: string;
}

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
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Objects",
    tableName: "objects"
})

export default Objects;
