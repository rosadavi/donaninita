const modalCadastrado = document.querySelector('#modalCadastrado');
const fadeCadastrado = document.querySelector('#fadeCadastrado');
const cadastrar = document.querySelector('#cadastrarForm');

const arrCad = [modalCadastrado, fadeCadastrado];

cadastrar.addEventListener('submit', (evento) => {
    evento.preventDefault();
    arrCad.forEach(e => {
        e.classList.remove('hide');
    });
    setTimeout(() => {
        cadastrar.submit();
    }, 2000);
});