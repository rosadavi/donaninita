const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const Pedidos = require('../models/Pedidos');
const Produtos = require('../models/Produtos');
const Itens = require('../models/Itens');
const { sequelize, Sequelize } = require('../config/conexao');
const { Op } = require('sequelize');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

router.post('/alterarStatus', async(req, res) => {
    try {
        const data = new Date();
        const horas = data.getHours();
        const minutos = data.getMinutes();
        const ano = data.getFullYear();
        const mes = data.getMonth();
        const dia = data.getDay();
        const cliente = await Pedidos.update(
            {
                statusPedido: req.body.statusPedido,
                dataHoraEntrega: `${dia}/${mes}/${ano} ${horas}:${minutos}`
            }, 
            {where: {
                idPedido: req.body.idPedido
            }}
        );
        res.json({ success: true, message: 'Status atualizado com sucesso' });
    } catch(e) {
        console.log('erro' + e);
    }
});

router.get('/vendas', async(req, res) => {
    if(req.session.dominio == null || req.session.dominio !== 'donaninita.com') {
        res.render('log/login.handlebars');
    } else {
        const vendas = await Pedidos.findAll({
            where: {
                statusPedido: 'Entregue'
            }}
        );
        res.render('private/vendas.handlebars', {vendas});
    }
});

router.get('/pedidos', async(req, res) => {
    if(req.session.dominio == null || req.session.dominio !== 'donaninita.com') {
        res.render('log/login.handlebars');
    } else {
        const pedidos = await Pedidos.findAll({
            where: {
                statusPedido: {
                    [Op.ne]: 'Entregue'
                }
            }}
        );
        res.render('private/pedidos.handlebars', {pedidos});
    }
});

router.post('/descpedido', async(req, res) => {
    const id = req.body.idPedido;
    const pedidos = await Pedidos.findAll();
    const itens = await Itens.findAll({where: {idPedido: id}});
    res.json({
        itens
    });
});

router.get('/cadastrados', async(req, res) => {
    if(req.session.dominio == null || req.session.dominio !== 'donaninita.com') {
        res.render('log/login.handlebars');
    } else {
        try {
            const Clientes = require('../models/Clientes');
            const cadastrados = await Clientes.findAll({
                where: {
                    cpf: {
                        [Op.not]: null
                    }
                }}
            );
            res.render('private/cadastrados.handlebars', {cadastrados});
        } catch(e) {
            console.log('error' + e);
        }
    }
});

module.exports = router;