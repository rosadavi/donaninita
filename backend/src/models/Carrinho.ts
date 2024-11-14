import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Carrinhos = databaseConfig.define('Carrinho', {
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Produtos',
            key: 'idProduto'
        }
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Clientes',
            key: 'idCliente'
        }
    },
    imgProduto: {
        type: DataTypes.STRING
    },
    nomeProduto: {
        type: DataTypes.STRING
    },
    valorProduto: {
        type: DataTypes.DECIMAL(10, 2)
    },
    qtdProduto: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});