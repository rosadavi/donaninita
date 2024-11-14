document.addEventListener('DOMContentLoaded', ()=>{
    const alterarStatusForm = document.querySelector('#alterarStatusForm');

    alterarStatusForm.addEventListener('submit', async(e)=>{
        e.preventDefault();
        const formData = new FormData(alterarStatusForm);
        const data = {
            idPedido: formData.get('idPedido'),
            statusPedido: formData.get('status')
        };
        try {
            const response = await fetch('/alterarStatus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
    
            const result = await response.json();
    
            if (result.success) {
              alert(result.message);
              location.reload();
            } else {
              alert('Erro ao atualizar o status');
            }
          } catch (error) {
            alert('Erro ao atualizar o status');
            console.error('Erro:', error);
          }
    });
});