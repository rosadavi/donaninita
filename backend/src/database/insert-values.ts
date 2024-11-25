import { Categorias } from "../models/Categorias";
import { Produtos } from "../models/Produtos";

Categorias.create({
    id_categoria: 1,
    nome_categoria: "Mais Vendidos",
    bol_ativo: 1
});

Categorias.create({
    id_categoria: 2,
    nome_categoria: "Bolos",
    bol_ativo: 1
});

Categorias.create({
    id_categoria: 3,
    nome_categoria: "Biscoitos",
    bol_ativo: 1
});

Categorias.create({
    id_categoria: 4,
    nome_categoria: "Rabanadas",
    bol_ativo: 0
});

// mais vendidos

Produtos.create({
    nome_produto: 'Biscoito de Polvilho 500G',
    valor_produto: 30.00,
    id_categoria_fk: 1,
    imagem_produto: "/static/img/biscoitos/biscoitoPolvilho.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Chocolate com Ninho',
    valor_produto: 30.00,
    id_categoria_fk: 1,
    imagem_produto: "/static/img/bolos/boloChocolateNinho.jpg"
});

Produtos.create({
    nome_produto: 'Rabanada de Nutella (Unidade)',
    valor_produto: 8.00,
    id_categoria_fk: 1,
    imagem_produto: "/static/img/rabanadas/rabanadaNutella.jpg"
});

// bolos

Produtos.create({
    nome_produto: 'Bolo de Banana',
    valor_produto: 28.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloBanana.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Cenoura',
    valor_produto: 28.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloCenoura.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Cenoura com Chocolate',
    valor_produto: 30.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloCenouraChocolate.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Chocolate',
    valor_produto: 28.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloChocolate.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Chocolate com Ninho',
    valor_produto: 30.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloChocolateNinho.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Coco Gelado',
    valor_produto: 28.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloCocoGelado.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Laranja',
    valor_produto: 28.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloLaranja.jpg"
});

Produtos.create({
    nome_produto: 'Bolo de Limao com Cobertura',
    valor_produto: 30.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloLimaoCobertura.jpg"
});

Produtos.create({
    nome_produto: 'Bolo Napolitano',
    valor_produto: 30.00,
    id_categoria_fk: 2,
    imagem_produto: "/static/img/bolos/boloNapolitano.jpg"
});

// biscoitos

Produtos.create({
    nome_produto: 'Biscoito de Polvilho 500G',
    valor_produto: 30.00,
    id_categoria_fk: 3,
    imagem_produto: "/static/img/biscoitos/biscoitoPolvilho.jpg"
});

Produtos.create({
    nome_produto: 'Biscoito de Polvilho 1KG',
    valor_produto: 55.00,
    id_categoria_fk: 3,
    imagem_produto: "/static/img/biscoitos/biscoitoPolvilho.jpg"
});

// rabanadas

Produtos.create({
    nome_produto: 'Rabanada Tradicional (Unidade)',
    valor_produto: 8.00,
    id_categoria_fk: 4,
    imagem_produto: "/static/img/rabanadas/rabanadaTradicional.jpg"
});

Produtos.create({
    nome_produto: 'Rabanada de Nutella (Unidade)',
    valor_produto: 8.00,
    id_categoria_fk: 4,
    imagem_produto: "/static/img/rabanadas/rabanadaNutella.jpg"
});

Produtos.create({
    nome_produto: 'Rabanada de Doce de Leite (Unidade)',
    valor_produto: 8.00,
    id_categoria_fk: 4,
    imagem_produto: "/static/img/rabanadas/rabanadaDoceLeite.jpg"
});

Produtos.create({
    nome_produto: 'Rabanada de Leite Ninho (Unidade)',
    valor_produto: 8.00,
    id_categoria_fk: 4,
    imagem_produto: "/static/img/rabanadas/rabanadaLeiteNinho.jpg"
});