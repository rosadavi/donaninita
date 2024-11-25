import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Igredientes = databaseConfig.define('Igredientes', {
    id_igrediente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nome_igrediente: {
        type: DataTypes.STRING(50)
    },
    desc_igrediente: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});