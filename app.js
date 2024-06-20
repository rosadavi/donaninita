// Carregando modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MemoryStore = require('session-memory-store')(session);


// Configuracoes

    // Sessao
    app.use(session({
        secret: "cursodenode",
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore()
    }));
    app.use(flash());

//Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });

// Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

// Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }, 
        helpers: {
            ifCond:(valor1, valor2, img, nome, idP, valor, qtd) => {
                if(valor1 == valor2) {
                    return `
                <div class="card">
                    <form action="/carrinho/add" method="POST" class="cardF">
                        <img src="${img}" alt="${nome}" class="imgProduto">
                        <input type="hidden" name="id" value="${idP}">
                        <input type="hidden" name="nome" value="${nome}">
                        <input type="hidden" name="valor" value="${valor}">
                        <input type="hidden" name="img" value="${img}">
                        <input type="hidden" name="qtd" value="${qtd}">

                        <section class="descricaoProdutos">
                            <p class="nomeProduto">${nome}</p>
                            <p class="valorProduto">${valor}</p>
                        </section>
                        <p class="textQtd">
                            Quantidade: 
                            <select name="qtd" class="qtdCard">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <button type="submit" class="adicionarProduto">Adicionar</button>
                    </form>
                </div>
                    `;
                }
            },
            ifCondUsuario:(valor1, valor2, img, nome, idP, valor, qtd) => {
                if(valor1 == valor2) {
                    return `
                <div class="card">
                    <form action="/carrinho/add/cliente" method="POST" class="cardFCliente">
                        <img src="${img}" alt="${nome}" class="imgProduto">
                        <input type="hidden" name="id" value="${idP}">
                        <input type="hidden" name="nome" value="${nome}">
                        <input type="hidden" name="valor" value="${valor}">
                        <input type="hidden" name="img" value="${img}">
                        <input type="hidden" name="qtd" value="${qtd}">

                        <section class="descricaoProdutos">
                            <p class="nomeProduto">${nome}</p>
                            <p class="valorProduto">${valor}</p>
                        </section>
                        <p class="textQtd">
                            Quantidade: 
                            <select name="qtd" class="qtdCard">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </p>
                        <button type="submit" class="adicionarProduto">Adicionar</button>
                    </form>
                </div>
                    `;
                }
            },
            ifTipoPagamento: (valor) => {
                if(valor == 1) {
                    return `<td>Debito</td>`;
                } else if(valor == 2) {
                    return `<td>Credito</td>`;
                } else if(valor == 3) {
                    return `<td>PIX</td>`;
                } else if(valor == 4) {
                    return `<td>Dinheiro</td>`;
                }
            },
            ifProduto: (valor) => {
                if(valor == 1) {
                    return `<td>Bisoito de Polvilho 500G</td>`;
                } else if (valor == 2) {
                    return `<td>Bolo de Chocolate com Ninho</td>`;
                } else if (valor == 3) {
                    return `<td>Bolo de Banana</td>`;
                } else if (valor == 4) {
                    return `<td>Rabanada de Nutella Unidade</td>`;
                } else if (valor == 5) {
                    return `<td>Bolo de Cenoura</td>`;
                } else if (valor == 6) {
                    return `<td>Bolo de Cenoura com Chocolate</td>`;
                } else if (valor == 7) {
                    return `<td>Bolo de Chocolate</td>`;
                } else if (valor == 8) {
                    return `<td>Bolo de Chocolate com Ninho</td>`;
                } else if (valor == 9) {
                    return `<td>Bolo de Coco Gelado</td>`;
                } else if (valor == 10) {
                    return `<td>Bolo de Laranja</td>`;
                } else if (valor == 11) {
                    return `<td>Bolo de Limao com Cobertura</td>`;
                } else if (valor == 12) {
                    return `<td>Bolo Napolitano</td>`;
                } else if (valor == 13) {
                    return `<td>Biscoito de Polvilho 500G</td>`;
                } else if (valor == 14) {
                    return `<td>Biscoito de Polvilho 1K</td>`;
                } else if (valor == 15) {
                    return `<td>Rabanada Tradicional</td>`;
                } else if (valor == 16) {
                    return `<td>Rabanada de Doce de Leite Unidade</td>`;
                } else if (valor == 17) {
                    return `<td>Rabanada de Nutella Unidade</td>`;
                } else if (valor == 18) {
                    return `<td>Rabanada de Leite Ninho</td>`;
                }
            }
        }
    }));
    app.set('view engine', 'handlebars');

// Public
    app.use(express.static(path.join(__dirname, '/public')));
    app.use((req, res, next) =>{
        next();
    });

// Rotas
    const index = require('./routes/usuario');
    const funcionario = require('./routes/funcionario');
    
    app.use('/', index);
    app.use('/', funcionario);

    const PORT = process.env.PORT || 3333;

// Conexao/testes de conexao
    const bd = require('./config/conexao');
    bd.sequelize.authenticate().then(()=>{console.log('Banco de dados conectado.');});
    app.listen(PORT, ()=>{
        console.log('Site rodando na porta "http://localhost:3333"');
    });
