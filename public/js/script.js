let qtd = 0;

const submitButton = document.querySelector('.submitButton');
const form = document.querySelector('form');
const table = document.querySelector('table');

submitButton.addEventListener('click', (ev) => {
    ev.preventDefault();

    const name = document.querySelector('#name');
    const quantity = document.querySelector('#quantity');

    const tr = document.createElement('tr');

    const prod = document.createElement('td');
    prod.innerText = name.value;
    prod.style.textAlign = 'left';

    const qty = document.createElement('td');
    qty.innerText = quantity.value;

    qtd += 1;

    const edit = document.createElement('td');
    edit.appendChild(editBtn(qtd));
    edit.appendChild(deleteBtn(qtd));


    tr.appendChild(prod);
    tr.appendChild(qty);
    tr.appendChild(edit);

    table.appendChild(tr);

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
