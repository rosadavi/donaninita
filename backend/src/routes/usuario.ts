import express, { Request, Response } from 'express';
import { Produtos } from '../models/Produtos';
import UsuarioCadastrarController from '../controllers/UsuarioCadastrarController';
import UsusarioComprarController from '../controllers/UsuarioComprarController';
import UsuarioRastrearController from '../controllers/UsuarioRastrearController';

const usuario = express.Router();

usuario.get('/', async (req: Request, res: Response) => {
    try {
        const produtos = await Produtos.findAll();
        res.render('public/index.handlebars', {produtos});
    } catch(error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
});

usuario.get('/login', (req: Request, res: Response) => {
    res.render('public/login.handlebars');
});

usuario.get('/registrar', (req: Request, res: Response) => {
    res.render('public/registrar.handlebars');  
});

usuario.post('/cadastrado', (req: Request, res: Response) => {
    new UsuarioCadastrarController().handle(req, res);
    res.redirect("/login");
});

usuario.post('/comprar', (req: Request, res: Response) => {
    new UsusarioComprarController().handle(req, res);
    res.redirect("/");
});

usuario.post('/rastrear', (req: Request, res: Response) => {
    new UsuarioRastrearController().handle(req, res);
});

export default usuario;