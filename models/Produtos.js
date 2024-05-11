const bd = require('..');

const Produtos = bd.sequelize.define('Produtos', {
    idProduto: {
        type: bd.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
    },
    nomeProduto: {
        type: bd.Sequelize.STRING,
            allowNull: false
    },
    valorProduto: {
        type: bd.Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    idCategoria: {
        type: bd.Sequelize.INTEGER,
        references: {
            model: 'Categoria',
            key: 'id'
        }
    },
    imagemProduto: {
        type: bd.Sequelize.STRING(100)
    }
},  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

// mais vendidos

// Produtos.create({
//     nomeProduto: 'Biscoito de Polvilho 500G',
//     valorProduto: 30.00,
//     idCategoria: 1,
//     imagemProduto: "/img/biscoitos/biscoitoPolvilho.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Chocolate com Ninho',
//     valorProduto: 30.00,
//     idCategoria: 1,
//     imagemProduto: "/img/bolos/boloChocolateNinho.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Rabanada de Nutella (Unidade)',
//     valorProduto: 8.00,
//     idCategoria: 1,
//     imagemProduto: "/img/rabanadas/rabanadaNutella.jpg"
// });

// bolos

// Produtos.create({
//     nomeProduto: 'Bolo de Banana',
//     valorProduto: 28.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloBanana.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Cenoura',
//     valorProduto: 28.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloCenoura.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Cenoura com Chocolate',
//     valorProduto: 30.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloCenouraChocolate.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Chocolate',
//     valorProduto: 28.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloChocolate.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Chocolate com Ninho',
//     valorProduto: 30.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloChocolateNinho.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Coco Gelado',
//     valorProduto: 28.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloCocoGelado.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Laranja',
//     valorProduto: 28.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloLaranja.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo de Limao com Cobertura',
//     valorProduto: 30.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloLimaoCobertura.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Bolo Napolitano',
//     valorProduto: 30.00,
//     idCategoria: 2,
//     imagemProduto: "/img/bolos/boloNapolitano.jpg"
// });

// biscoitos

// Produtos.create({
//     nomeProduto: 'Biscoito de Polvilho 500G',
//     valorProduto: 30.00,
//     idCategoria: 3,
//     imagemProduto: "/img/biscoitos/biscoitoPolvilho.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Biscoito de Polvilho 1KG',
//     valorProduto: 55.00,
//     idCategoria: 3,
//     imagemProduto: "/img/biscoitos/biscoitoPolvilho.jpg"
// });

// rabanadas

// Produtos.create({
//     nomeProduto: 'Rabanada Tradicional (Unidade)',
//     valorProduto: 8.00,
//     idCategoria: 4,
//     imagemProduto: "/img/rabanadas/rabanadaTradicional.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Rabanada de Nutella (Unidade)',
//     valorProduto: 8.00,
//     idCategoria: 4,
//     imagemProduto: "/img/rabanadas/rabanadaNutella.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Rabanada de Doce de Leite (Unidade)',
//     valorProduto: 8.00,
//     idCategoria: 4,
//     imagemProduto: "/img/rabanadas/rabanadaDoceLeite.jpg"
// });

// Produtos.create({
//     nomeProduto: 'Rabanada de Leite Ninho (Unidade)',
//     valorProduto: 8.00,
//     idCategoria: 4,
//     imagemProduto: "/img/rabanadas/rabanadaLeiteNinho.jpg"
// });


module.exports = Produtos;