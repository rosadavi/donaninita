const carrinhoIcon = document.querySelectorAll('.divCarrinho');
const carrinho = document.querySelector('#carrinho');
const carrinhoFide = document.querySelector('#carrinhoFide');
const fecharCarrinho = document.querySelector('.sairCarrinho');
const form = document.querySelector('#comprar');

const arr = [carrinho, carrinhoFide];

carrinhoIcon.forEach(e => {
    e.addEventListener('click', ()=>{
        arr.forEach(e =>{
            e.classList.toggle('hide');
        });
    });
});

carrinhoFide.addEventListener('click', () => {
    arr.forEach(e =>{
        e.classList.toggle('hide');
    });
});

fecharCarrinho.addEventListener('click', () => {
    arr.forEach(e =>{
        e.classList.toggle('hide');
    });
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    
});