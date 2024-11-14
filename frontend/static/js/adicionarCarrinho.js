const arrCards = document.querySelectorAll('.card');
// const inputProdutos = document.querySelector('#produtos');
// let produtosNoCarrinho = [];

window.addEventListener('load', ()=> {
    const carrinho = document.querySelector('.produtos');
    const endereco = document.querySelector('.endereco');
    if(endereco.classList.contains('logado')) {
        for(let i = 0; i < endereco.children.length; i++) {
            endereco.children[i].remove();
        }
        for(let i = 0; i < endereco.children.length; i++) {
            endereco.children[i].remove();
        }
        for(let i = 0; i < endereco.children.length; i++) {
            endereco.children[i].remove();
        }
    }
    if(carrinho.children.length !== 0) {
        const qtdProduto = document.querySelectorAll('.qtd');
        const valorProduto = document.querySelectorAll('.precoProduto');
        const qtdProdutoN = document.querySelectorAll('.qtdN');
        const totalN = document.querySelector('.totalN');
        const padrao = document.querySelector('.padrao');
        const nomeProduto = document.querySelectorAll('.nomeProdutoCarrinho');
        const pagamento = document.querySelector('.pagamento');

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
                padrao.classList.remove('hide');
                pagamento.classList.remove('hide');
            }
        });
        arrCards.forEach(e => {
            const nome = e.querySelectorAll('.nomeProduto');
            nome.forEach(e => {
                nomeProduto.forEach(nome => {
                    if(e.textContent == nome.textContent) {
                        const btn = e.parentElement.parentElement.children[8];
                        btn.classList.add('adicionadoCor');
                        btn.textContent = 'Adicionado';
                        btn.setAttribute('disabled', 'disabled');
                    }
                });
            });
        });
        let totalCarregado = 0;
        let totalAtual = 0;
        for(let i = 0; i < carrinho.children.length; i++) {
            if(carrinho.children[i].classList.contains('container')) {
                totalCarregado += Number(carrinho.children[i].children[1].children[1].textContent.replace('R$', '')) * Number(carrinho.children[i].children[1].children[2].children[1].value);
            } else {
                totalAtual += Number(carrinho.children[i].children[3].children[1].children[1].textContent.replace('R$', '')) * Number(carrinho.children[i].children[3].children[1].children[2].children[1].value);
            }
        }
        let totalInput = totalCarregado + totalAtual;
        totalN.value = `R$ ${totalInput.toFixed(2)}`;
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
    const endereco = document.querySelector('.endereco');
    const padrao = document.querySelector('.padrao');
    const pagamento = document.querySelector('.pagamento');

    endereco.classList.remove('hide');
    padrao.classList.remove('hide');
    pagamento.classList.remove('hide');

    // produtosNoCarrinho.push({produto: data.nome, qtdProduto: data.qtd});
    // const dados = JSON.stringify(produtosNoCarrinho);
    // inputProdutos.value = dados;

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

    <div>
    <div>
    <input type="hidden" name="idProduto" value="${data.id}" id="${data.id}">
    <input type="hidden" name="qtd" value="${data.qtd}" id="${data.id}">
    <input type="hidden" name="valorProduto" value="${data.valor}" id="${data.id}">
    </div>
    
    <div class="container">
        <div class="imagemProduto">
            <img src="${data.img}" alt="${data.nome}">
        </div>
        <span class="descProduto">
            <p class="nomeProdutoCarrinho">${data.nome}</p>
            <p class="precoProduto">R$ ${data.valor}</p>
            <div class="qtdProdutosCarrinho">
                <span><i class="bi bi-dash menos"></i></span>
                <input type="number" disabled name="qtd" class="qtdN" value="${data.qtd}" id="${data.id}">
                <span><i class="bi bi-plus mais"></i></span>
            </div>
        </span>
        <div class="removeItem">
            <i class="bi bi-trash3 lixo"></i>
        </div>
    </div>    
    </div>

    
    `;
    let totalCarregado = 0;
    let totalAtual = 0;
    for(let i = 0; i < carrinho.children.length; i++) {
        if(carrinho.children[i].classList.contains('container')) {
            totalCarregado += Number(carrinho.children[i].children[1].children[1].textContent.replace('R$', '')) * Number(carrinho.children[i].children[1].children[2].children[1].value);
        } else {
            totalAtual += Number(carrinho.children[i].children[1].children[1].children[1].textContent.replace('R$', '')) * Number(carrinho.children[i].children[1].children[1].children[2].children[1].value);
        }
    }
    let totalInput = totalCarregado + totalAtual;
    total.children[1].value = `R$ ${totalInput.toFixed(2)}`;
}

const frete = document.querySelectorAll('input[name="frete"]');
const sairCarrinhoModal = document.querySelector('.sairB');
const sairCarrinhoModalFade = document.querySelector('#carrinhoFide');
sairCarrinhoModalFade.addEventListener('click', () => {
    const total = document.querySelector('.total');
    frete.forEach(e => {
        if(total.classList.contains('aplicado')) {
            total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) - 10.50).toFixed(2)}`;
            total.classList.remove('aplicado'); 
        }
        e.checked = false;
    });
});
sairCarrinhoModal.addEventListener('click', () => {
    const total = document.querySelector('.total');
    const endereco = document.querySelector('.endereco');

    frete.forEach(e => {
        if(total.classList.contains('aplicado')) {
            total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) - 10.50).toFixed(2)}`;
            total.classList.remove('aplicado'); 
        }
        e.checked = false;
        if(e.checked == false) {
            for(let i = 0; i < endereco.children.length; i++) {
                endereco.children[i].remove();
            }
            for(let i = 0; i < endereco.children.length; i++) {
                endereco.children[i].remove();
            }
            for(let i = 0; i < endereco.children.length; i++) {
                endereco.children[i].remove();
            }
        }
    });
});
frete.forEach(e => {
    const total = document.querySelector('.total');
    if(!total.classList.contains('aplicado')) {
        total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) + 10.50).toFixed(2)}`;
        total.classList.add('aplicado');
    }
    if(total.classList.contains('aplicado')) {
        total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) - 10.50).toFixed(2)}`;
        total.classList.remove('aplicado');
    }
    if(e.value == 'entregar') {
        const total = document.querySelector('.total');
        const endereco = document.querySelector('.endereco');
        if(!endereco.classList.contains('logado')) {
            if(e.value == 'entregar') {
                if(!total.classList.contains('aplicado')) {
                    total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) + 10.50).toFixed(2)}`;
                    total.classList.add('aplicado');
                }
                if(e.checked == true) {
                    endereco.innerHTML = `  
                    <section>
                        <label for="cep">CEP: </label>
                        <input type="number" name="cep" id="cep" placeholder="Apenas numeros" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="cidade">Cidade: </label>
                        <input required type="text" name="cidade" id="cidade" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="bairro">Bairro: </label>
                        <input required type="text" name="bairro" id="bairro" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="rua">Rua: </label>
                        <input required type="text" name="rua" id="rua" autocomplete="off" style="border: 2px solid black;">
                    </section>
                `;
    
                const cep = document.querySelector('#cep');
                cep.addEventListener('focusout', async () => {
                    if (cep.value.length == 0) {
    
                    } else if(cep.value.length < 8 ) {
                        alert('CEP muito pequeno, verifique e tente novamente.');
                    } else if(cep.value.length > 8){
                        alert('CEP muito grande, verifique e tente novamente.');
                    } else {
                        const localidade = document.querySelector('#cidade');
                        const bairro = document.querySelector('#bairro');
                        const logradouro = document.querySelector('#rua');
                  
                        const url = `https://viacep.com.br/ws/${cep.value}/json/`;
                    
                        try {
                        const response = await fetch(url);
                
                        if(!response.ok) {
                            throw new Error(response.status);
                        }
                
                        const dados = await response.json();
                
                        if(dados.erro) {
                            alert('CEP nao encontrado.');
                            logradouro.value = '';
                            localidade.value = '';
                            bairro.value = '';
                        } else {
                            logradouro.value = dados.logradouro;
                            localidade.value = dados.localidade;
                            bairro.value = dados.bairro;
                        }
                
                        } catch(e) {
                            if(TypeError == 'Failed to Fetch') {
                                alert(e);
                            }
                        }
                    }
                });
                }
    
            }
            if(e.value == 'buscar') {
                if(endereco.children.length != 0) {
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                }
            }
        }
    }
    e.addEventListener('click', () => {
        const total = document.querySelector('.total');
        const endereco = document.querySelector('.endereco');
        if(!endereco.classList.contains('logado')) {
            if(e.value == 'entregar') {
                if(endereco.children.length == 0) {
                    endereco.innerHTML = `  
                    <section>
                        <label for="cep">CEP: </label>
                        <input type="number" name="cep" id="cep" placeholder="Apenas numeros" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="cidade">Cidade: </label>
                        <input required type="text" name="cidade" id="cidade" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="bairro">Bairro: </label>
                        <input required type="text" name="bairro" id="bairro" autocomplete="off" style="border: 2px solid black;">
                    </section>
                    <section>
                        <label for="rua">Rua: </label>
                        <input required type="text" name="rua" id="rua" autocomplete="off" style="border: 2px solid black;">
                    </section>
                `;
    
                const cep = document.querySelector('#cep');
                cep.addEventListener('focusout', async () => {
                    if (cep.value.length == 0) {
    
                    } else if(cep.value.length < 8 ) {
                        alert('CEP muito pequeno, verifique e tente novamente.');
                    } else if(cep.value.length > 8){
                        alert('CEP muito grande, verifique e tente novamente.');
                    } else {
                        const localidade = document.querySelector('#cidade');
                        const bairro = document.querySelector('#bairro');
                        const logradouro = document.querySelector('#rua');
                  
                        const url = `https://viacep.com.br/ws/${cep.value}/json/`;
                    
                        try {
                        const response = await fetch(url);
                
                        if(!response.ok) {
                            throw new Error(response.status);
                        }
                
                        const dados = await response.json();
                
                        if(dados.erro) {
                            alert('CEP nao encontrado.');
                            logradouro.value = '';
                            localidade.value = '';
                            bairro.value = '';
                        } else {
                            logradouro.value = dados.logradouro;
                            localidade.value = dados.localidade;
                            bairro.value = dados.bairro;
                        }
                
                        } catch(e) {
                            if(TypeError == 'Failed to Fetch') {
                                alert(e);
                            }
                        }
                    }
                });
                }
    
            }
            if(e.value == 'buscar') {
                if(endereco.children.length != 0) {
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                    for(let i = 0; i < endereco.children.length; i++) {
                        endereco.children[i].remove();
                    }
                }
            }
        }
        if(e.value == 'entregar') {
            if(!total.classList.contains('aplicado')) {
                total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) + 10.50).toFixed(2)}`;
                total.classList.add('aplicado');
            }
        }
        if(e.value == 'buscar') {
            if(total.classList.contains('aplicado')) {
                total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) - 10.50).toFixed(2)}`;
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
    const endereco = document.querySelector('.endereco');
    const padrao = document.querySelector('.padrao');
    const pagamento = document.querySelector('.pagamento');
    
    qtdProduto.forEach(e => {
        e.textContent--;
        if(e.textContent > 0) {
            total.classList.remove('hide');
            fazrPedido.classList.remove('hide');
            mensagemCarrinho.classList.add('hide');
            frete.classList.remove('hide');
            endereco.classList.remove('hide');
            padrao.classList.remove('hide');
            pagamento.classList.remove('hide');
        } else {
            total.classList.add('hide');
            fazrPedido.classList.add('hide');
            mensagemCarrinho.classList.remove('hide');
            frete.classList.add('hide');
            endereco.classList.add('hide');
            padrao.classList.add('hide');
            pagamento.classList.add('hide');
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
    const total = document.querySelector('.totalN');
    const produto = container.children[1].children[0].textContent;
    // const produtosAtualizados = produtosNoCarrinho.filter(produtos => produtos.produto != produto);
    // produtosNoCarrinho = produtosAtualizados;
    // const dados = JSON.stringify(produtosNoCarrinho);

    // inputProdutos.value = dados;
    total.value = `R$ ${(Number(total.value.replace('R$', '')) - novoTot).toFixed(2)}`;
    removerProduto(container);
}

function diminuirQuantidade(quantidade) {
    const total = document.querySelector('.total');
    const valorProduto = Number(quantidade.parentElement.parentElement.children[1].textContent.replace('R$', ''));

    total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) - valorProduto).toFixed(2)}`;
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
                const btn = nome.parentElement.parentElement.children[8];
                btn.classList.remove('adicionadoCor');
                btn.textContent = 'Adicionar';
                btn.removeAttribute('disabled', 'disabled');
            }
        });
    });
    if(container.parentElement.classList.contains('produtos')) {
        removerCarregado(container, container.children[1].children[2].children[1].id);
        container.remove();
    } else {
        container.parentElement.remove();
    }
    diminuirQuantidadeProduto();
    removerItem('/carrinho/remover', {nomeProduto});
}

function removerCarregado(container, id) {
    const div = container.parentElement.parentElement.children[0];
    for(let i = 0; i < div.children.length; i++) {
        if(div.children[i].id == id) {
            div.children[i].remove();
        }
    }
}

function adicionarQuantidade(quantidade) {
    const total = document.querySelector('.total');
    const valorProduto = Number(quantidade.parentElement.parentElement.children[1].textContent.replace('R$', ''));
    const qtd = Number(quantidade.value);

    quantidade.value = qtd + 1;
    total.children[1].value = `R$ ${(Number(total.children[1].value.replace('R$', '')) + valorProduto).toFixed(2)}`;
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