import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Igredientes = databaseConfig.define('Igredientes', {
    idIgrediente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nomeIgrediente: {
        type: DataTypes.STRING(50)
    },
    descIgrediente: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});