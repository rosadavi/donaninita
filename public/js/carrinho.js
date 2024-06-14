const carrinhoIcon = document.querySelectorAll('.divCarrinho');
const carrinho = document.querySelector('#carrinho');
const carrinhoFide = document.querySelector('#carrinhoFide');
const fecharCarrinho = document.querySelector('.sairCarrinho');
const form = document.querySelector('#comprar');
const rastrearBtn = document.querySelector('.rastrearBtn');
const rastrear = document.querySelector('#rastrear');
const rastrearFade = document.querySelector('#rastrearFade');

const arr2 = [rastrear, rastrearFade];
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

rastrearBtn.addEventListener('click', ()=>{
    arr2.forEach(e => {
        e.classList.toggle('hide');
    })
});

rastrearFade.addEventListener('click', ()=>{
    arr2.forEach(e => {
        e.classList.toggle('hide');
    })
});