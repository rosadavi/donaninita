const modalCadastrado = document.querySelector('#modalCadastrado');
const fadeCadastrado = document.querySelector('#fadeCadastrado');
const cadastrar = document.querySelector('#cadastrarForm');
const input = document.querySelectorAll('.input');

const arrCad = [modalCadastrado, fadeCadastrado];
let array = [];

cadastrar.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const input = cadastrar.querySelectorAll('input');
    const senha = document.querySelector('#senha');
    const confirm = document.querySelector('#confirmeSenha');
    
    array = [];

    input.forEach(e => {
        e.parentElement.children[1].innerHTML = '';   
        
        if(e.value == '' && e.name != 'sobrenome') {
            e.parentElement.children[1].innerHTML = '*Campo Obrigatorio';
            array.push('erro');
        }
    });

    senha.parentElement.children[1].innerHTML = '';
    confirm.parentElement.children[1].innerHTML = '';

    if(senha.value !== confirm.value) {
        senha.parentElement.children[1].innerHTML = '*Senhas nao coincidem';
        confirm.parentElement.children[1].innerHTML = '*Senhas nao conicidem';
        array.push('erro');
    }

    if(array.length == 0) {
        cadastrar.submit();
    }

    console.log(array);
});