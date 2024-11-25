import express, { Request, Response } from 'express';
import { Produtos } from '../models/Produtos';

const usuario = express.Router();

usuario.get('/login', (req: Request, res: Response) => {
    res.render('public/login.handlebars');
});

usuario.get('/registrar', (req: Request, res: Response) => {
    res.render('public/registrar.handlebars');  
});

usuario.get('/', async (req: Request, res: Response) => {
    try {
        const produtos = await Produtos.findAll();
        res.render('public/index.handlebars', {produtos});
    } catch(error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send('Erro ao buscar produtos');
    }
});

export default usuario;