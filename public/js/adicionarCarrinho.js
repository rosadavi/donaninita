const arrCards = document.querySelectorAll('.card');

window.addEventListener('load', ()=> {
    const carrinho = document.querySelector('.produtos');
    if(carrinho.children.length !== 0) {
        const qtdProduto = document.querySelectorAll('.qtd');
        const valorProduto = document.querySelectorAll('.precoProduto');
        const qtdProdutoN = document.querySelectorAll('.qtdN');
        const totalN = document.querySelector('.totalN');
        qtdProduto.forEach(e => {
            e.textContent = carrinho.children.length;
            if(e.textContent > 0) {
                const total = document.querySelector('.total');
                const fazrPedido = document.querySelector('#fazerPedido');
                const mensagemCarrinho = document.querySelector('.mensagemCarrinho');
                const frete = document.querySelector('.frete');
                total.classList.remove('hide');
                fazrPedido.classList.remove('hide');
                mensagemCarrinho.classList.add('hide');
                frete.classList.remove('hide');
            }
        });
        arrCards.forEach(e => {
            const nome = e.querySelectorAll('.nomeProduto');
            const nomeProduto = document.querySelectorAll('.nomeProdutoCarrinho');
            nome.forEach(e => {
                nomeProduto.forEach(nome => {
                    if(e.textContent == nome.textContent) {
                        const btn = e.parentElement.parentElement.children[7];
                        btn.classList.add('adicionadoCor');
                        btn.textContent = 'Adicionado';
                        btn.setAttribute('disabled', 'disabled');
                    }
                });
            });
        });
        let total = 0;
        for(let i = 0; i < carrinho.children.length; i++) {
            total =+ Number(valorProduto[i].textContent.replace('R$', '')) * Number(qtdProdutoN[i].value) + total;
        }
        totalN.innerHTML = `R$ ${total.toFixed(2)}`;
    } 
});

function adicionarCarrinho(data) {
    const btn = data.btn;
    const frete = document.querySelector('.frete');
    const carrinho = document.querySelector('.produtos');
    const qtdProduto = document.querySelectorAll('.qtd');
    const total = document.querySelector('.total');
    const fazrPedido = document.querySelector('#fazerPedido');
    const mensagemCarrinho = document.querySelector('.mensagemCarrinho');


    btn.textContent = 'Adicionado';
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add('adicionadoCor');
    qtdProduto.forEach(e => {
        e.textContent++;
        if(e.textContent > 0) {
            total.classList.remove('hide');
            fazrPedido.classList.remove('hide');
            mensagemCarrinho.classList.add('hide');
            frete.classList.remove('hide');
        }
    });
    carrinho.innerHTML += `

    <div class="container">
    
        <div class="imagemProduto">
            <img src="${data.img}" alt="${data.nome}">
        </div>
        <span class="descProduto">
            <p class="nomeProdutoCarrinho">${data.nome}</p>
            <p class="precoProduto">R$ ${data.valor}</p>
            <div class="qtdProdutosCarrinho">
                <span><i class="bi bi-dash menos"></i></span>
                <input type="number" disabled name="qtdN" class="qtdN" value="${data.qtd}">
                <span><i class="bi bi-plus mais"></i></span>
            </div>
        </span>
        <div class="removeItem">
            <i class="bi bi-trash3 lixo"></i>
        </div>
    </div>
    
    `;

    total.children[1].innerHTML = `R$ ${(Number(total.children[1].textContent.replace('R$', '')) + data.qtd * data.valor).toFixed(2)}`;

}

const frete = document.querySelectorAll('input[name="frete"]');
frete.forEach(e => {
    e.addEventListener('click', () => {
        const total = document.querySelector('.total');
        if(e.value == 'entregar') {
            if(!total.classList.contains('aplicado')) {
                total.children[1].innerHTML = `R$ ${(Number(total.children[1].textContent.replace('R$', '')) + 10.50).toFixed(2)}`;
                total.classList.add('aplicado');
            }
        }
        if(e.value == 'buscar') {
            if(total.classList.contains('aplicado')) {
                total.children[1].innerHTML = `R$ ${(Number(total.children[1].textContent.replace('R$', '')) - 10.50).toFixed(2)}`;
                total.classList.remove('aplicado');
            }
        }
    });
});

function diminuirQuantidadeProduto() {
    const total = document.querySelector('.total');
    const fazrPedido = document.querySelector('#fazerPedido');
    const mensagemCarrinho = document.querySelector('.mensagemCarrinho');
    const qtdProduto = document.querySelectorAll('.qtd');
    const frete = document.querySelector('.frete');
    
    qtdProduto.forEach(e => {
        e.textContent--;
        if(e.textContent > 0) {
            total.classList.remove('hide');
            fazrPedido.classList.remove('hide');
            mensagemCarrinho.classList.add('hide');
            frete.classList.remove('hide');
        } else {
            total.classList.add('hide');
            fazrPedido.classList.add('hide');
            mensagemCarrinho.classList.remove('hide');
            frete.classList.add('hide');
        }
    });
}

document.addEventListener('click', (e) => {
    const el = e.target;

    if(el.classList.contains('lixo')) {
        remover(el.parentElement.parentElement);
    }
    if(el.classList.contains('mais')) {
        adicionarQuantidade(el.parentElement.parentElement.children[1]);
    }
    if(el.classList.contains('menos')) {
        diminuirQuantidade(el.parentElement.parentElement.children[1]);
    }
});

function remover(container) {
    const valor = Number(container.children[1].children[1].textContent.replace('R$', ''));
    const qtd = Number(container.children[1].children[2].children[1].value);
    const novoTot = valor * qtd;
    const total = document.querySelector('.totalN') ;

    total.innerText = `R$ ${(Number(total.textContent.replace('R$', '')) - novoTot).toFixed(2)}`;
    removerProduto(container);
}

function diminuirQuantidade(quantidade) {
    const total = document.querySelector('.total');
    const valorProduto = Number(quantidade.parentElement.parentElement.children[1].textContent.replace('R$', ''));

    total.children[1].innerText = `R$ ${(Number(total.children[1].textContent.replace('R$', '')) - valorProduto).toFixed(2)}`;
    if(quantidade.value > 1) {
        const qtd = Number(quantidade.value);
        quantidade.value = qtd - 1;
    } else {
        removerProduto(quantidade.parentElement.parentElement.parentElement);
    }
}

function removerProduto(container) {
    const nomeProduto = container.children[1].children[0].textContent;

    arrCards.forEach(e => {
        const nome = e.querySelectorAll('.nomeProduto')
        nome.forEach(nome => {
            if(nome.textContent == nomeProduto) {
                const btn = nome.parentElement.parentElement.children[7];
                btn.classList.remove('adicionadoCor');
                btn.textContent = 'Adicionar';
                btn.removeAttribute('disabled', 'disabled');
            }
        });
    });
    container.remove();
    diminuirQuantidadeProduto();
    removerItem('/carrinho/remover', {nomeProduto});
}

function adicionarQuantidade(quantidade) {
    const total = document.querySelector('.total');
    const valorProduto = Number(quantidade.parentElement.parentElement.children[1].textContent.replace('R$', ''));
    const qtd = Number(quantidade.value);

    quantidade.value = qtd + 1;
    total.children[1].innerText = `R$ ${(Number(total.children[1].textContent.replace('R$', '')) + valorProduto).toFixed(2)}`;
}

async function removerItem(url, data) {
    try {
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            throw new Error();
        }
    } catch(e) {
        console.log('erro aqui ' + e);
    }
}

async function alterarQtd(url, data) {
    try {
        const response = await fetch (url, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            console.log('erro aqui ' + e);
        }
    } catch(error) {
        console.log('erro ao alterar a quantidade de produtos ', error);
    }
}