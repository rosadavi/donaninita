const rastrearForm = document.querySelector('.rastrearForm');

rastrearForm.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const formData = new FormData(rastrearForm);
    const data = {
        cod: formData.get('cod')
    };
    try {
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(response.ok) {
            const result = await response.json();
            const descStatus = document.querySelector('.descStatus');
            descStatus.innerHTML = `
            <br>
               <strong>Produto(s)</strong>: ${result.nomeProduto} <br>
               <hr>
               <strong>Quantidade</strong>: ${result.qtdItem} <br>
               <hr>
               <strong>Valor</strong>: ${result.valorItem} <br>
               <hr>
               <strong>Status do Pedido</strong>: ${result.status} <br>
            `;
        } else {
            alert('Pedido invalido');
            console.log('Erro', response.statusText);
        }
    } catch(err) {
        alert('Erro ao rastrear pedido');
        console.log('Erro', err);
    }
});