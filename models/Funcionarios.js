const bd = require('../config/conexao');

const Funcionarios = bd.sequelize.define('Funcionarios', {
    idFuncionario: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeFuncionario: {
        type: bd.Sequelize.STRING(100)
    },
    cpf: {
        type: bd.Sequelize.STRING(11)
    },
    dataNasc: {
        type: bd.Sequelize.STRING(13)
    },
    telefoneFuncionario: {
        type: bd.Sequelize.STRING(20)
    },
    email: {
        type: bd.Sequelize.STRING
    },
    senha: {
        type: bd.Sequelize.STRING
    },
    bolAtivo: {
        type: bd.Sequelize.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Funcionarios;