import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Itens = databaseConfig.define('Itens', {
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    qtdItem: {
        type: DataTypes.INTEGER
    },
    valorItem: {
        type: DataTypes.DECIMAL(10, 2)
    }
},  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});