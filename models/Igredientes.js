const bd = require('../config/conexao');


const Igredientes = bd.sequelize.define('Igredientes', {
    idIgrediente: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    nomeIgrediente: {
        type: bd.Sequelize.STRING(50)
    },
    descIgrediente: {
        type: bd.Sequelize.STRING(100)
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Igredientes;