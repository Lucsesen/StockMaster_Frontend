const submitButton = document.querySelector('.submitButton');
const form = document.querySelector('form');
const table = document.querySelector('table');
const url = 'http://localhost:3000/items'

document.addEventListener('DOMContentLoaded', () => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        data.forEach(p => {
            constTr(p.name, p.quantity, p.id )
        })
      })
      .catch(error => console.error('Erro ao buscar os itens:', error));
  });
  
  

submitButton.addEventListener('click', (ev) => {
    ev.preventDefault();

    const name = document.querySelector('#name');
    const quantity = document.querySelector('#quantity');

    // Chama a função passando os valores dos inputs
    createProduct(name.value, Number(quantity.value))
      .then(status => {
        console.log("Status da requisição:", status);
      })
      .catch(error => console.error("Erro ao criar o produto:", error));

    // Limpar os campos do formulário após adicionar a linha
    name.value = '';
    quantity.value = '';
});

function editBtn(qtd) {
    const edit = document.createElement('button');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-pen-to-square');
    edit.appendChild(i);
    
    edit.classList.add('edit-btn', qtd);
    edit.title = 'Editar';

    return edit;
}

function deleteBtn(qtd) {
    const del = document.createElement('button');
    const i = document.createElement('i');
    i.classList.add('fa-solid', 'fa-trash');
    del.appendChild(i);

    del.classList.add('delete-btn', qtd);
    del.title = 'Excluir';

    return del;
}

function constTr (name, quantity, id) {

    const tr = document.createElement('tr');
    tr.classList.add('product-tr',id)

    const prod = document.createElement('td');
    prod.innerText = name;
    prod.style.textAlign = 'left';

    const qty = document.createElement('td');
    qty.innerText = quantity;

    const edit = document.createElement('td');
    edit.appendChild(editBtn(id));
    edit.appendChild(deleteBtn(id));


    tr.appendChild(prod);
    tr.appendChild(qty);
    tr.appendChild(edit);

    table.appendChild(tr);

}

async function createProduct(name_, quantity_){

  const data = {name: name_, quantity: quantity_}

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  });

  const product = await response.json();
  console.log(product);
  constTr(product.name, product.quantity, product.id);
  return response.status;
}