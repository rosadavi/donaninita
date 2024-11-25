import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Carrinhos = databaseConfig.define('Carrinho', {
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Produtos',
            key: 'id_produto'
        }
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Clientes',
            key: 'id_cliente'
        }
    },
    img_produto: {
        type: DataTypes.STRING
    },
    nome_produto: {
        type: DataTypes.STRING
    },
    valor_produto: {
        type: DataTypes.DECIMAL(10, 2)
    },
    qtd_produto: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});