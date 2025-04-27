import { Request, Response } from 'express';
import UsuarioRastrearService from '../services/UsuarioRastrearService';

export default class UsuarioRastrearController {
    async handle(req: Request, res: Response) {

        const cod = req.body
        const usuarioRastrearService = new UsuarioRastrearService();
        
        const resultado = await usuarioRastrearService.execute({numero: cod});

        // Garante que só vai responder uma vez
        if (!res.headersSent) {
            return res.status(resultado.status).json(resultado);
        }
    }
}