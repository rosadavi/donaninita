import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Itens = databaseConfig.define('Itens', {
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Produtos',
            key: 'id_produto'
        }
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    qtd_item: {
        type: DataTypes.INTEGER
    },
    valor_item: {
        type: DataTypes.DECIMAL(10, 2)
    }
},  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});