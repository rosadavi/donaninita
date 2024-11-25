import { databaseConfig } from "../database/config";
import { DataTypes } from "sequelize";

export const Funcionarios = databaseConfig.define('Funcionarios', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome_funcionario: {
        type: DataTypes.STRING(100)
    },
    cpf: {
        type: DataTypes.STRING(11)
    },
    data_nasc: {
        type: DataTypes.STRING(13)
    },
    telefone_funcionario: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    },
    bol_ativo: {
        type: DataTypes.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});