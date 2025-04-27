import { Clientes } from "../models/Clientes";
import { Pedidos } from "../models/Pedidos";
import { PedidoStatus } from "../models/PedidoStatus";

interface UsuarioComprarProps {
    idProduto: number;
    qtd: number;
    frete: string;
    tipoPagamento: number;
    nome: string;
    valorPago: string
}

export default class UsuarioComprarService {
    async execute({
        frete,
        tipoPagamento,
        nome,
        valorPago
    }: UsuarioComprarProps) {
        try {
            

            const status = await PedidoStatus.create({
                nome_status: "Pendente",
                desc_status: "Pedido pendente",
                bol_ativo: 1,
                id_cliente: 1
            });

            const user = await Clientes.create({                
                
                            nome_cliente: nome,
                            telefone_cliente: "teleonfe basico",
                            endereco: `endereco padrao`,
                            cpf: "cpf padrao",
                            email: "email padrao",
                            senha: "senhapadrao"
                        });

            const pedidos = await Pedidos.create({
                id_pedidoStatus: status.dataValues.id_pedido_status,
                data_hora_cadastro: (new Date()).toString(),
                data_hora_entrega: null,
                valor_frete: frete,
                valor_desconto: null,
                valor_acrecimo: null,
                valor_pago: valorPago,
                tipo_pagamento: tipoPagamento,
                status_pedido: "Pendente",
                id_cliente: user.dataValues.id_cliente
            }, {
                returning: true
            });

            console.log(pedidos);

            return {
                status: 201,
                data: pedidos,
                message: "Novo pedido cadastrado com sucesso"
            };
        } catch (error: any) {
            // Retorna o erro para o controller tratar
            return {
                status: 500,
                message: "Erro ao cadastrar novo pedido",
                error: error.message
            };
        }
    }
}
