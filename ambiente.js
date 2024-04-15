'use strict';

let tarefas = [];

function carregarTarefasDoLocalStorage() {
    if (localStorage.getItem('tarefas')) {
        tarefas = JSON.parse(localStorage.getItem('tarefas'));
        renderizarTarefas();
    }
}

function adicionarTarefa() {
    let inputTarefa = document.querySelector('#tarefa');
    let tarefa = inputTarefa.value.trim(); 
    if (tarefa !== '') {
        tarefas.push({ nome: tarefa, concluida: false });
        inputTarefa.value = '';
        renderizarTarefas();
        salvarTarefasNoLocalStorage(); 
    } else {
        alert('Por favor, insira uma tarefa válida.');
    }
}


function salvarTarefasNoLocalStorage() {
    let tarefasString = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasString);
}

function renderizarTarefas() {
    let lista = document.querySelector('#listaTarefas');
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        if (!document.querySelector('#ocultar').checked || !tarefa.concluida) {
            let itemLista = document.createElement('li');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarefa.concluida;
            checkbox.addEventListener('change', function () {
                marcarComoConcluida(index, this.checked);
            });

            let descricaoTarefa = document.createElement('span');
            descricaoTarefa.textContent = tarefa.nome;
            if (tarefa.concluida) {
                descricaoTarefa.style.textDecoration = 'line-through';
            }

            let botaoEditar = document.createElement('button');
            botaoEditar.textContent = 'Editar';
            botaoEditar.classList.add('edit')
            botaoEditar.addEventListener('click', function () {
                editarTarefa(index, descricaoTarefa);
            });

            let botaoDeletar = document.createElement('button');
            botaoDeletar.textContent = 'Deletar';
            botaoDeletar.classList.add('del');
            botaoDeletar.addEventListener('click', function () {
                deletarTarefa(index);
            });

            itemLista.appendChild(checkbox);
            itemLista.appendChild(descricaoTarefa);
            itemLista.appendChild(botaoEditar);
            itemLista.appendChild(botaoDeletar);
            lista.appendChild(itemLista);
        }
    });
}

function marcarComoConcluida(index, concluida) {
    tarefas[index].concluida = concluida;
    renderizarTarefas();
    salvarTarefasNoLocalStorage(); 
}

function editarTarefa(index, elementoDescricao) {
    let inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = tarefas[index].nome;

    elementoDescricao.innerHTML = '';
    elementoDescricao.appendChild(inputEdicao);
    
    inputEdicao.focus();

    inputEdicao.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            tarefas[index].nome = inputEdicao.value;
            renderizarTarefas();
            salvarTarefasNoLocalStorage(); 
        }
    });

    inputEdicao.addEventListener('keyup', function(event) {
        if (event.key === 'Escape') {
            renderizarTarefas();
        }
    });
}

function deletarTarefa(index) {
    tarefas.splice(index, 1);
    renderizarTarefas();
    salvarTarefasNoLocalStorage(); 
}

document.querySelector('#ocultar').addEventListener('change', function() {
    renderizarTarefas();
});


carregarTarefasDoLocalStorage();






