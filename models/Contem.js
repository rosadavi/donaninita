const bd = require('../config/conexao');


const Contem = bd.sequelize.define('Contems', {
    idProduto: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idIgrediente: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

Contem.create({
    idProduto: 120,
    idIgrediente: 120
});

module.exports = Contem;