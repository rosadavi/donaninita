const bd = require('../app');

const Itens = bd.sequelize.define('Itens', {
    idProduto: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    qtd: {
        type: bd.Sequelize.INTEGER
    }
},  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});


module.exports = Itens;