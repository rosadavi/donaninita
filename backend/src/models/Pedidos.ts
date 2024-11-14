import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Pedidos = databaseConfig.define('Pedidos', {
    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPedidoStatus: {
        type: DataTypes.INTEGER,
        references: {
            model: 'PedidoStatus',
            key: 'id'
        }
    },
    dataHoraCadastro: {
        type: DataTypes.STRING(20)
    },
    dataHoraEntrega: {
        type: DataTypes.STRING(20)
    },
    valorFrete: {
        type: DataTypes.DECIMAL(10,2)
    },
    valorDesconto: {
        type: DataTypes.DECIMAL(10,2)
    },
    valorAcrescimo: {
        type: DataTypes.DECIMAL(10,2)
    },
    valorPago: {
        type: DataTypes.DECIMAL(10,2)
    },
    tipoPagamento: {
        type: DataTypes.STRING(40)
    },
    statusPedido: {
        type: DataTypes.STRING(40)
    },
    idCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Clientes',
            key: 'idCliente'
        }
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});