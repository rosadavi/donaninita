import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Categorias = databaseConfig.define('Categorias', {
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome_categoria: {
        type: DataTypes.STRING(50),
    },
    bol_ativo: {
        type: DataTypes.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});