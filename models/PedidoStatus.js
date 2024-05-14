const bd = require('../app');

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
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = PedidoStatus;