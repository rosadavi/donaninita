import { Request, Response } from 'express';
import UsuarioCadastrarService from '../services/UsuarioCadastrarService';

export default class UsuarioCadastrarController {
    async handle(req: Request, res: Response) {
        const usuarioCadastrarService = new UsuarioCadastrarService();

        const resultado = await usuarioCadastrarService.execute(req.body);

        // Garante que só vai responder uma vez
        if (!res.headersSent) {
            return res.status(resultado.status).json(resultado);
        }
    }
}
