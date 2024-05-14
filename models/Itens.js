const bd = require('../app');

const Itens = bd.sequelize.define('Itens', {
    idProduto: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idPedido: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    qtdItem: {
        type: bd.Sequelize.INTEGER
    },
    valorItem: {
        type: bd.Sequelize.DECIMAL(10, 2)
    }
},  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


module.exports = Itens;