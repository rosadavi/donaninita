const modalCadastrado = document.querySelector('#modalCadastrado');
const fadeCadastrado = document.querySelector('#fadeCadastrado');
const cadastrar = document.querySelector('#cadastrarForm');
const input = document.querySelectorAll('.input');

const arrCad = [modalCadastrado, fadeCadastrado];

cadastrar.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const input = cadastrar.querySelectorAll('input');
    input.forEach(e => {
        const senha = document.querySelector('#senha');
        const confirm = document.querySelector('#confirmeSenha');
        e.parentElement.children[1].innerHTML = '';   
        confirm.parentElement.children[1].innerHTML = '';
        if(e.value == '' && e.name != 'sobrenome') {
            e.parentElement.children[1].innerHTML = '*Campo Obrigatorio';
        } else if(senha.value !== confirm.value || senha.value == '' || confirm.value == '') {
            senha.parentElement.children[1].innerHTML = '*As senha nao coincidem';
            confirm.parentElement.children[1].innerHTML = '*As senha nao coincidem';
        } else {
            arrCad.forEach(e => {
                e.classList.remove('hide');
            });

            setTimeout(() => {
                cadastrar.submit();
            }, 2000);
        }
    });
});