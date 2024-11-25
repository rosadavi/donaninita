import { Carrinhos } from "../models/Carrinho";
import { Categorias } from "../models/Categorias";
import { Clientes } from "../models/Clientes";
import { Contem } from "../models/Contem";
import { Funcionarios } from "../models/Funcionarios";
import { Igredientes } from "../models/Igredientes";
import { Itens } from "../models/Itens";
import { Pedidos } from "../models/Pedidos";
import { PedidoStatus } from "../models/PedidoStatus";
import { Produtos } from "../models/Produtos";

const arr = [ Categorias, Clientes, Funcionarios, Igredientes, Produtos, Carrinhos, Contem, Itens, PedidoStatus, Pedidos ];

async function criarTabelas() {
    for (let i = 0; i < arr.length; i++) {
        await arr[i].sync({ force: true });
    }
}

criarTabelas();
