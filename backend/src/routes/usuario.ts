import express, { Request, Response } from 'express';

const usuario = express.Router();

usuario.get('/login', (req: Request, res: Response) => {
    res.render('public/login.handlebars');
});

export default usuario;