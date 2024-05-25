const cep = document.querySelector('#cep');
cep.addEventListener('focusout', async () => {
    if (cep.value.length == 0) {

    } else if(cep.value.length < 8 ) {
        alert('CEP muito pequeno, verifique e tente novamente.');
    } else if(cep.value.length > 8){
        alert('CEP muito grande, verifique e tente novamente.');
    } else {
        const localidade = document.querySelector('#cidade');
        const logradouro = document.querySelector('#rua');
  
        const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    
        try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(response.status);
        }

        const dados = await response.json();

        if(dados.erro) {
            alert('CEP nao encontrado.');
            logradouro.value = '';
            localidade.value = '';
        } else {
            logradouro.value = dados.logradouro;
            localidade.value = dados.bairro;
        }

        } catch(e) {
            if(TypeError == 'Failed to Fetch') {
                alert(e);
            }
        }
    }
});