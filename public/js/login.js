const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((valor, chave) => {
        data[chave] = valor;
    });

    const email = formLogin.querySelector('input[name="email"');
    const senha = formLogin.querySelector('input[name="senha"');

    email.parentElement.children[1].innerHTML = '';
    senha.parentElement.children[1].innerHTML = '';

    if(email.value == '' || senha.value == '') {
        email.parentElement.children[1].innerHTML = '*Campo Obrigatorio.';
        senha.parentElement.children[1].innerHTML = '*Campo Obrigatorio.';
        if(email.value != '') {
            email.parentElement.children[1].innerHTML = '';
        } else if (senha.value != '') {
            senha.parentElement.children[1].innerHTML = '';
        }
    } else {
        login('/login', data);
    }

});

async function login(url, data) {
    try {
        const response = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            alert('Credenciais Invalidas.');
        } else {
            formLogin.submit();
        }
    } catch(err) {    
        console.log('Erro ' + err);
    }
}
