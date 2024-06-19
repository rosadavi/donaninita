const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const Produtos = require('../models/Produtos');
const Clientes = require('../models/Clientes');
const Funcionarios = require('../models/Funcionarios');
const Carrinhos = require('../models/Carrinhos');
const Pedidos = require('../models/Pedidos');
const PedidoStatus = require('../models/PedidoStatus');
const Itens = require('../models/Itens');

const asyncHandler = require('express-async-handler');
const { where } = require('sequelize');

let arrPedidos = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

router.get('/', async (req, res) => {

    if(req.session.dominio == 'donaninita.com') {
        const pedidos = await Pedidos.findAll();
        res.render('private/pedidos.handlebars', {pedidos});
    } else {
        const produtos = await Produtos.findAll();

        res.render('public/index.handlebars', {produtos, arrPedidos});
    }
});

router.post('/query', async(req, res) => {
    try {
        const status = await Pedidos.findAll({
            attributes: ['statusPedido'],
            where: { idPedido: req.body.cod }
        });

        const itens = await Itens.findAll({
            where: { idPedido: req.body.cod}
        });

        const idProduto = itens.map(item => item.idProduto);
        
        const produtos = await Produtos.findAll({
            where: {idProduto: idProduto}
        });

        const nomeProduto = produtos.map(item => item.nomeProduto);
        const stringNomeProduto = nomeProduto.join(' --- ');
        
        const qtdItem = itens.map(item => item.qtdItem);
        const stringQtdItem = qtdItem.join(' --- ');

        const valorItem = itens.map(item => item.valorItem);
        const stringValorItem = valorItem.join(' --- ');

        res.json({ 
            status: status[0].statusPedido,
            nomeProduto: stringNomeProduto,
            qtdItem: stringQtdItem,
            valorItem: stringValorItem
        });
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ error: 'Erro ao buscar pedido' });
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

    // let carrinho = JSON.parse(localstorage.getItem('carrinho')) || [];
    // carrinho.push(produtosData);
    // localstorage.setItem('carrinho', JSON.stringify(carrinho));

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
        // let novosProdutos = JSON.parse(localstorage.getItem('carrinho'));
        // novosProdutos = novosProdutos.filter(obj => obj.nome !== req.body.nomeProduto);
        // localstorage.setItem('carrinho', JSON.stringify(novosProdutos));
    }
    res.send('Produto removido.');
}));

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
            dataNasc: req.body.dataNasc,
            telefoneFuncionario: req.body.telefone,
            email: req.body.email,
            senha: req.body.senha,
            bolAtivo: 1
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
            bolAtivo: 1,
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
                } else {
                    res.status(400).json({error: 'Credenciais invalidas.'});
                }
            } else {
                res.status(400).json({error: 'Credenciais invalidas.'});
            }    
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
                } else {
                    res.status(400).json({error: 'Credenciais invalidas.'});
                }
            } else {
                res.status(400).json({error: 'Credenciais invalidas.'});
            }
    
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
                    const pedidos = await Pedidos.findAll({where: {idCliente: req.session.userId}});

                    return res.render('private/cliente.handlebars', {produtos, carrinhos, clientes, user, pedidos});
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
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        res.redirect('/');
    });
});

router.post('/comprar', async (req, res) => {
    const dataHoraCadastro = new Date().toLocaleString();
    const {valorPago, tipoPagamento, nome, telefone, rua, qtd, valorProduto, login} = req.body;
    let arr = [];
    if(Array.isArray(req.body.idProduto)) {
        arr = req.body.idProduto;
    } else {
        arr.push(req.body.idProduto);
    }

    try {

        if(!req.session.userId) {
            if(req.body.frete = 'entregar') {
                const clientes = await Clientes.create({
                    nomeCliente: nome,
                    telefoneCliente: telefone,
                    endereco: rua,
                    pontosFidelidade: 1
                });

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
                    statusPedido: 'Chegou para Dona Ninita',
                    idCliente: clientes.idCliente
                });

                for (let i = 0; i < arr.length; i++) {
                    const idProduto = req.body.idProduto[i];
                    const qtdItem = req.body.qtd[i];
                    const valorProduto = req.body.valorProduto[i];
        
                    await Itens.create( {
                        idProduto,
                        idPedido: pedidos.idPedido,
                        qtdItem: qtdItem,
                        valorItem: valorProduto
                    });
                }

                arrPedidos.push(pedidos.idPedido);

            } else {
                const clientes = await Clientes.create({
                    nomeCliente: nome,
                    telefoneCliente: telefone,
                    pontosFidelidade: 1
                });

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
                    statusPedido: 'Chegou para Dona Ninita',
                    idCliente: clientes.idCliente
                });

                for (let i = 0; i < arr.length; i++) {
                    const idProduto = req.body.idProduto[i];
                    const qtdItem = req.body.qtd[i];
                    const valorProduto = req.body.valorProduto[i];
        
                    await Itens.create( {
                        idProduto,
                        idPedido: pedidos.idPedido,
                        qtdItem,
                        valorItem: valorProduto
                    });
                }

                arrPedidos.push(pedidos.idPedido);
            }
            res.redirect('/');
        } else {
            const pedidoStatus = await PedidoStatus.create({
                nomeStatus: 'Na empresa',
                descStatus: 'Pedido chegou para a Dona Ninita',
                bolAtivo: 1,
                idCliente: req.session.userId
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
                    statusPedido: 'Chegou para Dona Ninita',
                    idCliente: req.session.userId
                });

                for (let i = 0; i < arr.length; i++) {
                    const idProduto = req.body.idProduto[i];
                    const qtdItem = req.body.qtd[i];
                    const valorProduto = req.body.valorProduto[i];
        
                    await Itens.create( {
                        idProduto,
                        idPedido: pedidos.idPedido,
                        qtdItem,
                        valorItem: valorProduto
                    });
                }

            } else {
                const pedidos = await Pedidos.create({
                    dataHoraCadastro,
                    valorFrete: 0.00,
                    idPedidoStatus: pedidoStatus.idPedidoStatus,
                    valorDesconto: 0.00,
                    valorAcrescimo: 0.00,
                    valorPago: Number(valorPago.replace('R$', '')),
                    tipoPagamento,
                    statusPedido: 'Chegou para Dona Ninita',
                    idCliente: req.session.userId
                });

                for (let i = 0; i < arr.length; i++) {
                    const idProduto = req.body.idProduto[i];
                    const qtdItem = req.body.qtd[i];
                    const valorProduto = req.body.valorProduto[i];
        
                    await Itens.create( {
                        idProduto,
                        idPedido: pedidos.idPedido,
                        qtdItem,
                        valorItem: valorProduto
                    });
                }
            }
            res.redirect('/logado');
        }
        
      } catch (error) {
        console.error('Erro ao criar PedidoStatus e Pedido:', error);
    }
});

module.exports = router;
