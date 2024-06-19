const formLogin = document.querySelector('#formLogin');

formLogin.addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((valor, chave) => {
        data[chave] = valor;
    });

    await login('/login', data);

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
