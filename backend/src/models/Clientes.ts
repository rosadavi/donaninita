import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Clientes = databaseConfig.define('Clientes', {
    idCliente: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nomeCliente: {
        type: DataTypes.STRING(100)
    },
    telefoneCliente: {
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
    bolAtivo: {
        type: DataTypes.TINYINT
    },
    pontosFidelidade: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});