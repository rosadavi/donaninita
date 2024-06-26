const bd = require('../config/conexao');


const PedidoStatus = bd.sequelize.define('PedidoStatus', {
    idPedidoStatus: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeStatus: {
        type: bd.Sequelize.STRING(20),
    },
    descStatus: {
        type: bd.Sequelize.STRING
    },
    bolAtivo: {
        type: bd.Sequelize.TINYINT
    },
    idCliente: {
        type: bd.Sequelize.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = PedidoStatus;