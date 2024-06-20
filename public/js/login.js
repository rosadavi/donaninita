const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((valor, chave) => {
        data[chave] = valor;
    });

    const input = formLogin.querySelectorAll('input');
    input.forEach(e => {
        e.parentElement.children[1].innerHTML = '';   
        if(e.value == '') {
            e.parentElement.children[1].innerHTML = '*Campo Obrigatorio';
        } else {
            // setTimeout(async () => {
            //     await login('/login', data);
            // }, 2000);
            alert('ok');
        }
    });
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
