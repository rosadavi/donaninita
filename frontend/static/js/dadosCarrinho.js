const cards = document.querySelectorAll('.cardF');
cards.forEach(form => {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const img = form.querySelector('input[name="img"]').value;
    const valor = form.querySelector('input[name="valor"]').value;
    const nome = form.querySelector('input[name="nome"]').value;
    const id = form.querySelector('input[name="id"]').value;
    const qtd = form.querySelector('.qtdCard').value;
    const btn = form.querySelector('button');

    await enviarDados('/carrinho/add', { img, valor, nome, id, qtd, btn });
  });
});

const cardsCliente = document.querySelectorAll('.cardFCliente');
cardsCliente.forEach(form => {
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const img = form.querySelector('input[name="img"]').value;
    const valor = form.querySelector('input[name="valor"]').value;
    const nome = form.querySelector('input[name="nome"]').value;
    const id = form.querySelector('input[name="id"]').value;
    const qtd = form.querySelector('.qtdCard').value;
    const btn = form.querySelector('button');
    
    await enviarDados('/carrinho/addCliente', { img, valor, nome, id, qtd, btn });
  });
});

async function enviarDados(url, data) {
  try {
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });

    // if (response.ok) {
    //   adicionarCarrinho(data);
    // } else {
    //   throw new Error('Erro ao adicionar o produto ao carrinho.');
    // }
    adicionarCarrinho(data);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}
