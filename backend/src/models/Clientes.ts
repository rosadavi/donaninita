import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Clientes = databaseConfig.define('Clientes', {
    id_cliente: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nome_cliente: {
        type: DataTypes.STRING(100)
    },
    telefone_cliente: {
        type: DataTypes.STRING(55)
    },
    endereco: {
        type: DataTypes.STRING(100)
    },
    cpf: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    senha: {
        type: DataTypes.STRING(100)
    },
    bol_ativo: {
        type: DataTypes.TINYINT
    },
    pontos_fidelidade: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});