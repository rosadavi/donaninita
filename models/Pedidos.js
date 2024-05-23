const bd = require('../config/conexao');

const Pedidos = bd.sequelize.define('Pedidos', {
    idPedido: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPedidoStatus: {
        type: bd.Sequelize.INTEGER,
        references: {
            model: 'PedidoStatus',
            key: 'id'
        }
    },
    dataHoraCadastro: {
        type: bd.Sequelize.STRING(20)
    },
    dataHoraEntrega: {
        type: bd.Sequelize.STRING(20)
    },
    valorFrete: {
        type: bd.Sequelize.DECIMAL(10,2)
    },
    valorDesconto: {
        type: bd.Sequelize.DECIMAL(10,2)
    },
    valorAcrescimo: {
        type: bd.Sequelize.DECIMAL(10,2)
    },
    valorPago: {
        type: bd.Sequelize.DECIMAL(10,2)
    },
    tipoPagamento: {
        type: bd.Sequelize.STRING(40)
    },
    statusPedido: {
        type: bd.Sequelize.STRING(40)
    },
    idCliente: {
        type: bd.Sequelize.INTEGER,
        references: {
            model: 'Clientes',
            key: 'idCliente'
        }
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = Pedidos;