export const card = (id_categoria_fk: number, id_categoria: number, imagem_produto: string, nome_produto: string, id_produto: number, valor_produto: number) => {
    if (id_categoria_fk === id_categoria) {
        return `
            <div class="card">
                <form action="/carrinho/add/cliente" method="POST" class="cardFCliente">
                    <img src="${imagem_produto}" alt="${nome_produto}" class="imgProduto">
                    <input type="hidden" name="id" value="${id_produto}">
                    <input type="hidden" name="nome" value="${nome_produto}">
                    <input type="hidden" name="valor" value="${valor_produto}">
                    <input type="hidden" name="img" value="${imagem_produto}">
                    <section class="descricaoProdutos">
                        <p class="nomeProduto">${nome_produto}</p>
                        <p class="valorProduto">${valor_produto}</p>
                    </section>
                    <p class="textQtd">
                        Quantidade: 
                        <select name="qtd" class="qtdCard">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                    <button type="submit" class="adicionarProduto">Adicionar</button>
                </form>
            </div>
        `;
    }
};
