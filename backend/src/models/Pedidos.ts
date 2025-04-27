import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Pedidos = databaseConfig.define('Pedidos', {
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pedidoStatus: {
        type: DataTypes.INTEGER,
        references: {
            model: 'PedidoStatus',
            key: 'id_pedido_status'
        }
    },
    data_hora_cadastro: {
        type: DataTypes.STRING(20)
    },
    data_hora_entrega: {
        type: DataTypes.STRING(20)
    },
    valor_frete: {
        type: DataTypes.STRING(100)
    },
    valor_desconto: {
        type: DataTypes.DECIMAL(10,2)
    },
    valor_acrescimo: {
        type: DataTypes.DECIMAL(10,2)
    },
    valor_pago: {
        type: DataTypes.DECIMAL(10,2)
    },
    tipo_pagamento: {
        type: DataTypes.STRING(40)
    },
    status_pedido: {
        type: DataTypes.STRING(40)
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Clientes',
            key: 'id_cliente'
        }
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});