import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const PedidoStatus = databaseConfig.define('PedidoStatus', {
    id_pedido_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome_status: {
        type: DataTypes.STRING(20),
    },
    desc_status: {
        type: DataTypes.STRING
    },
    bol_ativo: {
        type: DataTypes.TINYINT
    },
    id_cliente: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});