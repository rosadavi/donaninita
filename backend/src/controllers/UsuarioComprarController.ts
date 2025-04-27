import { Request, Response } from 'express';
import UsuarioComprarService from '../services/UsuarioComprarService';

export default class UsusarioComprarController {
    async handle(req: Request, res: Response) {
        const usuarioComprarService = new UsuarioComprarService();

        const resultado = await usuarioComprarService.execute(req.body);

        // Garante que só vai responder uma vez
        if (!res.headersSent) {
            return res.status(resultado.status).json(resultado);
        }
    }
}
