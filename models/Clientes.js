const bd = require('../config/conexao');


const Clientes = bd.sequelize.define('Clientes', {
    idCliente: {
        type: bd.Sequelize.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nomeCliente: {
        type: bd.Sequelize.STRING(100)
    },
    telefoneCliente: {
        type: bd.Sequelize.STRING(55)
    },
    endereco: {
        type: bd.Sequelize.STRING(100)
    },
    cpf: {
        type: bd.Sequelize.STRING(255)
    },
    email: {
        type: bd.Sequelize.STRING(100)
    },
    senha: {
        type: bd.Sequelize.STRING(100)
    },
    bolAtivo: {
        type: bd.Sequelize.TINYINT
    },
    pontosFidelidade: {
        type: bd.Sequelize.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Clientes;