const carrinhoIcon = document.querySelectorAll('.divCarrinho');
const carrinho = document.querySelector('#carrinho');
const carrinhoFide = document.querySelector('#carrinhoFide');
const fecharCarrinho = document.querySelector('.sairCarrinho');
const form = document.querySelector('#comprar');
const rastrearBtn = document.querySelector('.rastrearBtn');
const rastrear = document.querySelector('#rastrear');
const rastrearFade = document.querySelector('#rastrearFade');
const sairR = document.querySelector('.sairR');
const burger = document.querySelectorAll('.burger');
const fadeHide = document.querySelector('#fadeHide');
const nav = document.querySelector('nav');
const closeB = document.querySelectorAll('.close');

const arr3 = [fadeHide, nav]

burger.forEach(e => {
    e.addEventListener('click', () => {
        arr3.forEach(el => {
            el.classList.toggle('hide');
        });
        e.classList.toggle('hide');
        if(e.classList.contains('hide')) {
            closeB.forEach(ele => {
                ele.classList.toggle('hide');
            });
        } else {
            closeB.forEach(ele => {
                ele.classList.toggle('hide');
            });
        }
    });
});

closeB.forEach(e => {
    e.addEventListener('click', () => {
        arr3.forEach(el => {
            el.classList.toggle('hide');
        });
        e.classList.toggle('hide');
        burger.forEach(e => {
            e.classList.toggle('hide');
        });
    });
});

fadeHide.addEventListener('click', () => {
    arr3.forEach( e => {
        e.classList.toggle('hide');
    });
    burger.forEach(el => {
        el.classList.toggle('hide');
        if(!el.classList.contains('hide')) {
            closeB.forEach(ele => {
                ele.classList.toggle('hide');
            });
        }
    })
});

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
    });
});

rastrearFade.addEventListener('click', ()=>{
    arr2.forEach(e => {
        e.classList.toggle('hide');
    });
});

sairR.addEventListener('click', ()=>{
    arr2.forEach(e => {
        e.classList.toggle('hide');
    });
});