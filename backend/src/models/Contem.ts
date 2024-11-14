import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Contem = databaseConfig.define('Contem', {
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idIgrediente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});