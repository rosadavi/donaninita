const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const Pedidos = require('../models/Pedidos');
const { where } = require('sequelize');

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

module.exports = router;