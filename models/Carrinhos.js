const bd = require('../app');

const Carrinhos = bd.sequelize.define('Carrinhos', {
    idProduto: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    imgProduto: {
        type: bd.Sequelize.STRING
    },
    nomeProduto: {
        type: bd.Sequelize.STRING
    },
    valorProduto: {
        type: bd.Sequelize.DECIMAL(10, 2)
    },
    qtdProduto: {
        type: bd.Sequelize.INTEGER
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Carrinhos;