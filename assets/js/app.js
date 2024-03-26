'use strict';

let Tarefas = [];

function AdicionarTarefa() {
    let tarefaInput = document.querySelector('#tarefa_input');
    let tarefa = tarefaInput.value;

    if (tarefa.length < 3) {
        tarefaInput.setCustomValidity('Digite uma tarefa com mais de 3 caracteres');
        tarefaInput.reportValidity();
    } else {
        Tarefas.push({ nome: tarefa, concluida: false });
        ExibirTarefa();
    }
}

function ExibirTarefa() {
    let lista = document.querySelector('.tabela');

    lista.innerHTML = '';

    Tarefas.forEach((tarefa, index) => {
        let itemLista = document.createElement('li');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener('change', () => MarcarTarefaComoConcluida(itemLista, checkbox, index));

        let textoTarefa = document.createElement('span');
        textoTarefa.textContent = tarefa.nome;
        if (tarefa.concluida) {
            textoTarefa.style.textDecoration = 'line-through';
        }

        let inputEditar = document.createElement('input');
        inputEditar.type = 'text';
        inputEditar.value = tarefa.nome;
        inputEditar.style.display = 'none';

        let botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.addEventListener('click', () => EditarTarefa(index, inputEditar));

        itemLista.appendChild(checkbox);
        itemLista.appendChild(textoTarefa);
        itemLista.appendChild(inputEditar);
        itemLista.appendChild(botaoEditar);

        lista.appendChild(itemLista);
    });
}

function MarcarTarefaComoConcluida(itemLista, checkbox, index) {
    Tarefas[index].concluida = checkbox.checked;
    if (Tarefas[index].concluida) {
        itemLista.querySelector('span').style.textDecoration = 'line-through';
        itemLista.querySelector('input[type="text"]').style.display = 'none';
    } else {
        itemLista.querySelector('span').style.textDecoration = 'none';
    }
}

function EditarTarefa(index, inputEditar) {
    inputEditar.style.display = 'inline-block';
    inputEditar.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            let novoTexto = inputEditar.value.trim();
            if (novoTexto.length >= 3) {
                Tarefas[index].nome = novoTexto;
                ExibirTarefa();
            } else {
                alert('Digite uma tarefa com mais de 3 caracteres.');
            }
        }
    });
}

function ResetarTarefas() {
    Tarefas = [];
    ExibirTarefa();
}