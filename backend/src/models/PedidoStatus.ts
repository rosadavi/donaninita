import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const PedidoStatus = databaseConfig.define('PedidoStatus', {
    idPedidoStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeStatus: {
        type: DataTypes.STRING(20),
    },
    descStatus: {
        type: DataTypes.STRING
    },
    bolAtivo: {
        type: DataTypes.TINYINT
    },
    idCliente: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});