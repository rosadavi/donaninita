const fadeHidePedido = document.querySelector('#fadeHidePedido');
const alterarPedido = document.querySelector('#alterarPedido');
const sairP = document.querySelector('.sairP');
const verStatus = document.querySelector('.statusVer');
const verF = document.querySelector('.verF');
const fadeHideF = document.querySelector('#fadeHideF');
const verDivF = document.querySelector('#ver');
const sairDesc = document.querySelectorAll('.sairDesc');

const arr4 = [fadeHidePedido, alterarPedido];
const arr5 = [fadeHideF, verDivF];

verStatus.addEventListener('click', () => {
    arr4.forEach(e => {
        e.classList.toggle('hide');
    });
});

sairP.addEventListener('click', () => {
    arr4.forEach(e => {
        e.classList.toggle('hide');
    });
});

fadeHidePedido.addEventListener('click', () => {
    arr4.forEach(e => {
        e.classList.toggle('hide');
    });
});

verF.addEventListener('click', () => {
    arr5.forEach(e => {
        e.classList.toggle('hide');
    });
});

sairDesc.forEach(e => {
    e.addEventListener('click', () => {
    arr5.forEach(e => {
        e.classList.toggle('hide');
    });
    });
});

fadeHideF.addEventListener('click', () => {
    arr5.forEach(e => {
        e.classList.toggle('hide');
    });
});

