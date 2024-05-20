const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const Localstorage = require('node-localstorage').LocalStorage;
const localstorage = new Localstorage('/localstorage');

const Produtos = require('../models/Produtos');
const Clientes = require('../models/Clientes');
const Funcionarios = require('../models/Funcionarios');
const Carrinhos = require('../models/Carrinhos');
const Pedidos = require('../models/Pedidos');
const PedidoStatus = require('../models/PedidoStatus');

const asyncHandler = require('express-async-handler');

const fs = require('fs');

const directory = '/localstorage';

// Verifica se o diretório existe, senão, o cria
if (!fs.existsSync(directory)) {
    try {
        fs.mkdirSync(directory);
        console.log('Diretório criado com sucesso:', directory);
    } catch (err) {
        console.error('Erro ao criar diretório:', err);
    }
} else {
    console.log('O diretório', directory, 'já existe.');
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

router.get('/', async (req, res) => {
    const Produto = localstorage.getItem('carrinho');
    const parse = JSON.parse(Produto);
    const produtos = await Produtos.findAll();

    if(req.session.dominio == 'donaninita.com') {
        res.render('private/funcionario.handlebars');
    } else {
        res.render('public/index.handlebars', {produtos, parse});
    }
});

router.post('/carrinho/add', (req, res) => {
    const img = req.body.img;
    const id = req.body.id;
    const nome = req.body.nome;
    const valor = req.body.valor;
    const qtd = req.body.qtd;

    const produtosData = {
        img: img, 
        id: id,
        nome: nome,
        valor: valor,
        qtd: qtd
    };

    let carrinho = JSON.parse(localstorage.getItem('carrinho')) || [];
    carrinho.push(produtosData);
    localstorage.setItem('carrinho', JSON.stringify(carrinho));

    res.send('Produto adicionado com sucesso.');
});

router.post('/carrinho/addCliente', (req, res) => {
    const img = req.body.img;
    const id = req.body.id;
    const nome = req.body.nome;
    const valor = req.body.valor;
    const qtd = req.body.qtd;

    Carrinhos.create({
        idProduto: id,
        imgProduto: img,
        nomeProduto: nome,
        valorProduto: valor,
        qtdProduto: qtd,
        idCliente: req.session.userId
    });

    res.send('Produto adicionado com sucesso.');
});

router.post('/carrinho/remover', asyncHandler(async (req, res) => {
    const user = req.session.userId ? true : false;
    
    if(user) {
        Carrinhos.destroy({where: {nomeProduto: req.body.nomeProduto}}).then(() => console.log('Produto removido')).catch(e => console.log('Erro ao remover o produto' + e));
    } else {
        let novosProdutos = JSON.parse(localstorage.getItem('carrinho'));
        novosProdutos = novosProdutos.filter(obj => obj.nome !== req.body.nomeProduto);
        localstorage.setItem('carrinho', JSON.stringify(novosProdutos));
    }
    res.send('Produto removido.');
}));

router.get('/localstorage', (req, res) => {
    const Produto = localstorage.getItem('carrinho');
    const parse = JSON.parse(Produto);
    res.send(parse);
});

router.get('/login', (req, res) => {
    res.render('log/login.handlebars');
});

router.get('/registrar', (req, res) => {
    res.render('log/registrar.handlebars');
});

router.post('/cadastrado', (req, res) => {
    const dominio = req.body.email.split('@')[1];

    if (dominio == 'donaninita.com') {
        Funcionarios.create({
            nomeFuncionario: req.body.nome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNasc,
            telefone: req.body.telefone,
            email: req.body.email,
            senha: req.body.senha,
            boltAtivo: 1
        });
        res.redirect('/login');
    } else {
        Clientes.create({
            nomeCliente: req.body.nome,
            telefoneCliente: req.body.telefone,
            endereco: req.body.endereco,
            cpf: req.body.cpf,
            email: req.body.email,
            senha: req.body.senha,
            boltAtivo: 1,
            pontosFidelidade: 0
        });
        res.redirect('/login');
    }
});

router.post('/login', async(req, res) => {
    const {email, senha} = req.body;
    const dominio = req.body.email.split('@')[1];

    if(dominio == 'donaninita.com') {
        try {
            const user = await Funcionarios.findOne({where: {email}});

            if(user) {
                if(senha === user.senha) {
                    req.session.userId = user.idFuncionario;
                    req.session.dominio = dominio;
                    return res.redirect('/logado');
                }
            }
            res.send(user);
    
        } catch(e) {
            console.error('Erro ao autenticar usuário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    } else {
        try {
            const user = await Clientes.findOne({where: {email}});
    
            if(user) {
                if(senha === user.senha) {
                    req.session.userId = user.idCliente;
                    req.session.userEmail = user.email;
                    return res.redirect('/logado');
                }
            }
            res.send('Credenciais invalidas');
    
        } catch(e) {
            console.error('Erro ao autenticar usuário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }
});

router.get('/logado', async (req, res) => {
    if(req.session.dominio == 'donaninita.com') {
        try {
            if(req.session && req.session.userId) {
            const user = await Funcionarios.findByPk(req.session.userId);
                if(user) {
                    return res.redirect('/');
                }
            } else {
                res.redirect('/');
            }
        } catch(e) {
            console.error('Erro ao verificar sessão do usuário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    } else {
        try {
            if(req.session && req.session.userId) {
                const user = await Clientes.findByPk(req.session.userId);
    
                if(user) {
                    const produtos = await Produtos.findAll();
                    const carrinhos = await Carrinhos.findAll({where: {idCliente: req.session.userId}});
                    const clientes = await Clientes.findAll({where: {idCliente: req.session.userId}});

                    return res.render('private/cliente.handlebars', {produtos, carrinhos, clientes, user});
                }
            } else {
                res.redirect('/');
            }
        } catch(e) {
            console.error('Erro ao verificar sessão do usuário:', error);
            res.status(500).send('Erro interno do servidor');
        }
    }
});

router.get('/logout', (req, res) => {
    // Limpe a sessão do usuário
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        // Redirecione o usuário de volta para a página principal após o logout
        res.redirect('/');
    });
});

router.post('/comprar', async (req, res) => {
    const dataHoraCadastro = new Date().toLocaleString();
    const {valorPago, tipoPagamento, nome, telefone, rua} = req.body;

    try {

        if(!req.session.userId) {
            if(req.body.frete = 'entregar') {
                const clientes = await Clientes.create({
                    nomeCliente: nome,
                    telefoneCliente: telefone,
                    endereco: rua,
                    pontosFidelidade: 1
                });
                req.session.userId = clientes.idCliente;

                const pedidoStatus = await PedidoStatus.create({
                    nomeStatus: 'Na empresa',
                    descStatus: 'Pedido chegou para a Dona Ninita',
                    bolAtivo: 1
                });

                const pedidos = await Pedidos.create({
                    dataHoraCadastro,
                    valorFrete: 10.50,
                    idPedidoStatus: pedidoStatus.idPedidoStatus,
                    valorDesconto: 0.00,
                    valorAcrescimo: 10.50,
                    valorPago: Number(valorPago.replace('R$', '')),
                    tipoPagamento,
                    statusPedido: 'Em andamento',
                    idCliente: req.session.userId
                });

            } else {
                const clientes = await Clientes.create({
                    nomeCliente: nome,
                    telefoneCliente: telefone,
                    pontosFidelidade: 1
                });
                req.session.userId = clientes.idCliente;

                const pedidoStatus = await PedidoStatus.create({
                    nomeStatus: 'Na empresa',
                    descStatus: 'Pedido chegou para a Dona Ninita',
                    bolAtivo: 1
                });

                const pedidos = await Pedidos.create({
                    dataHoraCadastro,
                    valorFrete: 0.00,
                    idPedidoStatus: pedidoStatus.idPedidoStatus,
                    valorDesconto: 0.00,
                    valorAcrescimo: 0.00,
                    valorPago: Number(valorPago.replace('R$', '')),
                    tipoPagamento,
                    statusPedido: 'Em andamento',
                    idCliente: req.session.userId
                });
            }

        } else {
            const pedidoStatus = await PedidoStatus.create({
                nomeStatus: 'Na empresa',
                descStatus: 'Pedido chegou para a Dona Ninita',
                bolAtivo: 1
            });
    
            if(req.body.frete == 'entregar') {
                const pedidos = await Pedidos.create({
                    dataHoraCadastro,
                    valorFrete: 10.50,
                    idPedidoStatus: pedidoStatus.idPedidoStatus,
                    valorDesconto: 0.00,
                    valorAcrescimo: 10.50,
                    valorPago: Number(valorPago.replace('R$', '')),
                    tipoPagamento,
                    statusPedido: 'Em andamento',
                    idCliente: req.session.userId
                });
                
            } else {
                const pedidos = await Pedidos.create({
                    dataHoraCadastro,
                    valorFrete: 0.00,
                    idPedidoStatus: pedidoStatus.idPedidoStatus,
                    valorDesconto: 0.00,
                    valorAcrescimo: 0.00,
                    valorPago: Number(valorPago.replace('R$', '')),
                    tipoPagamento,
                    statusPedido: 'Em andamento',
                    idCliente: req.session.userId
                });
            }
        }
    
      } catch (error) {
        console.error('Erro ao criar PedidoStatus e Pedido:', error);
    }
});

module.exports = router;
