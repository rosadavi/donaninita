import { databaseConfig } from '../database/config';
import { DataTypes } from 'sequelize';

export const Produtos = databaseConfig.define('Produtos', {
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome_produto: {
        type: DataTypes.STRING(60),
            allowNull: false
    },
    valor_produto: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    id_categoria_fk: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categorias',
            key: 'id_categoria'
        }
    },
    imagem_produto: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});