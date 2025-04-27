import { Clientes } from "../models/Clientes";

interface UsuarioCadastrarProps {
    nome: string;
    sobrenome: string;
    cep: string;
    bairro: string;
    rua: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
}

export default class UsuarioCadastrarService {
    async execute({
        nome,
        sobrenome,
        cep,
        bairro,
        rua,
        telefone,
        cpf,
        email,
        senha
    }: UsuarioCadastrarProps) {
        try {
            if (sobrenome?.trim()) {
                nome = `${nome} ${sobrenome}`;
            }

            await Clientes.create({
                nome_cliente: nome,
                telefone_cliente: telefone,
                endereco: `${cep} / ${bairro} / ${rua}`,
                cpf,
                email,
                senha
            });

            return {
                status: 201,
                message: "Novo usuário cadastrado com sucesso"
            };
        } catch (error: any) {
            // Retorna o erro para o controller tratar
            return {
                status: 500,
                message: "Erro ao cadastrar novo usuário",
                error: error.message
            };
        }
    }
}
