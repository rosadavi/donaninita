const fazerPedido = document.querySelector('#comprar');

fazerPedido.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        fazerPedido.submit();
    } catch(e) {
        console.log(' Erro ao fazer pedido ' + e);
    } finally {
        resetarCarrinho();
    }
});

function resetarCarrinho() {
    const hiddenInputs = fazerPedido.querySelectorAll('input[type="hidden"]');
    const container = document.querySelectorAll('.container');

    hiddenInputs.forEach(e => {
        e.value = '';
    });
    container.forEach(e => {
        const valor = Number(e.children[1].children[1].textContent.replace('R$', ''));
        const qtd = Number(e.children[1].children[2].children[1].value);
        const novoTot = valor * qtd;
        const total = document.querySelector('.totalN');
        const produto = e.children[1].children[0].textContent;
        const produtosAtualizados = produtosNoCarrinho.filter(produtos => produtos.produto != produto);
        produtosNoCarrinho = produtosAtualizados;
        const dados = JSON.stringify(produtosNoCarrinho);
    
        inputProdutos.value = dados;
        total.value = `R$ ${(Number(total.value.replace('R$', '')) - novoTot).toFixed(2)}`;

        const nomeProduto = e.children[1].children[0].textContent;

        arrCards.forEach(el => {
            const nome = el.querySelectorAll('.nomeProduto')
            nome.forEach(nome => {
                if(nome.textContent == nomeProduto) {
                    const btn = nome.parentElement.parentElement.children[8];
                    btn.classList.remove('adicionadoCor');
                    btn.textContent = 'Adicionar';
                    btn.removeAttribute('disabled', 'disabled');
                }
            });
        });
        e.remove();
        diminuirQuantidadeProduto();
        removerItem('/carrinho/remover', {nomeProduto});
    });
}