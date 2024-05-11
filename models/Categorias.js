const bd = require('../app');

const Categorias = bd.sequelize.define('Categorias', {
    idCategoria: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: bd.Sequelize.STRING(45),
    },
    ativo: {
        type: bd.Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// Categorias.create({
//     idCategoria: 1,
//     nomeCategoria: "Mais Vendidos",
//     ativo: 1
// });

// Categorias.create({
//     idCategoria: 2,
//     nomeCategoria: "Bolos",
//     ativo: 1
// });

// Categorias.create({
//     idCategoria: 3,
//     nomeCategoria: "Biscoitos",
//     ativo: 1
// });

// Categorias.create({
//     idCategoria: 4,
//     nomeCategoria: "Rabanadas",
//     ativo: 0
// });


module.exports = Categorias;