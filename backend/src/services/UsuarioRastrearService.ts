import { Clientes } from "../models/Clientes";
import { Pedidos } from "../models/Pedidos";

interface UsuarioRastrearProps {
    numero: string
}

export default class UsuarioRastrearService {
    async execute({
        numero
    }: UsuarioRastrearProps) {
        try {
            numero = numero.cod
        const cliente = await Clientes.findOne({
            where: { telefone_cliente: numero }
        });

        if (!cliente) {
            return { status: 404, message: 'Cliente não encontrado' };
        }

        const pedidos = await Pedidos.findAll({
            where: { id_cliente: cliente.id_cliente }
        });

        console.log(pedidos);

            return {
                status: 200,
                message: pedidos
            };
        } catch (error: any) {
            console.error('Erro ao buscar pedidos:', error);
        return {
            status: 500,
            message: 'Erro interno do servidor'
        };
        }
    }
}
