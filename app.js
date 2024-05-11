// Carregando modulos
const express = require('express');
const app = express();
const asyncHandler = require('express-async-handler');
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
        resave: true,
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
            useMongoClient: true,
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }, 
        helpers: {
            ifCond:(valor1, valor2, img, nome, idP, valor) => {
                if(valor1 == valor2) {
                    return `
                <div class="card">
                    <form action="/carrinho/add" method="POST" class="cardF">
                        <img src="${img}" alt="${nome}" class="imgProduto">
                        <input type="hidden" name="id" value="${idP}">
                        <input type="hidden" name="nome" value="${nome}">
                        <input type="hidden" name="valor" value="${valor}">
                        <input type="hidden" name="img" value="${img}">
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
            }
        }
    }));

// Sequelize
    const Sequelize = require('sequelize');
    const sequelize = new Sequelize('dona-ninita', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql', 
        port: 3308
    });

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    };

// Public
    app.use(express.static(path.join(__dirname, "/public")));
    app.use((req, res, next) =>{
        next();
    });

// Rotas
    const index = require('./routes/usuario');
    app.use('/', index);

// Conexao/testes de conexao
    sequelize.authenticate().then(()=>{console.log('Banco de dados conectado.');});
    app.listen(3333, ()=>{
        console.log('Site rodando na porta "http://localhost:3333"');
    });
