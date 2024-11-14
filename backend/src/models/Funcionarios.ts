import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Funcionarios = databaseConfig.define('Funcionarios', {
    idFuncionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeFuncionario: {
        type: DataTypes.STRING(100)
    },
    cpf: {
        type: DataTypes.STRING(11)
    },
    dataNasc: {
        type: DataTypes.STRING(13)
    },
    telefoneFuncionario: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    bolAtivo: {
        type: DataTypes.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});