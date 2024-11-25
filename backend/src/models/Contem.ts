import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Contem = databaseConfig.define('Contem', {
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Produtos',
            key: 'id_produto'
        }
    },
    id_igrediente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Igredientes',
            key: 'id_igrediente'
        }
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});