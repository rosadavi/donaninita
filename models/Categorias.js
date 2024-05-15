const bd = require('../config/conexao');


const Categorias = bd.sequelize.define('Categorias', {
    idCategoria: {
        type: bd.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nomeCategoria: {
        type: bd.Sequelize.STRING(50),
    },
    bolAtivo: {
        type: bd.Sequelize.TINYINT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// Categorias.create({
//     idCategoria: 1,
//     nomeCategoria: "Mais Vendidos",
//     bolAtivo: 1
// });

// Categorias.create({
//     idCategoria: 2,
//     nomeCategoria: "Bolos",
//     bolAtivo: 1
// });

// Categorias.create({
//     idCategoria: 3,
//     nomeCategoria: "Biscoitos",
//     bolAtivo: 1
// });

// Categorias.create({
//     idCategoria: 4,
//     nomeCategoria: "Rabanadas",
//     bolAtivo: 0
// });


module.exports = Categorias;