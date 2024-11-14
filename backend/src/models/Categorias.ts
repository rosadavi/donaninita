import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Categorias = databaseConfig.define('Categorias', {
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: DataTypes.STRING(50),
    },
    bolAtivo: {
        type: DataTypes.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});