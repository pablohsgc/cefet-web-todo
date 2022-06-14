const listaTarefasEl = document.querySelector("#lista-tarefas");
const botaoIncluirTarefaEl = document.querySelector("#incluir-nova-tarefa");
const nomeNovaTarefaEl = document.querySelector("#nova-tarefa-nome");
const selectCategoriasEl = document.querySelector("#nova-tarefa-categoria");
const selectFiltroEl = document.querySelector("#filtro-de-categoria");

//exercicio 0
let tarefas = [];

function Tarefa(nome,categoria,realizada=false){
    this.nome = nome;
    this.categoria = categoria;
    this.realizada = realizada
}

tarefas.push(new Tarefa("Comprar leite","compras",false));
tarefas.push(new Tarefa("Escutar chimbinha","lazer",true));

function defineTarefaComoRealizada(item,tarefa){// exercicio 5
    if(tarefa.realizada){
        item.classList.remove("marcado");
        tarefa.realizada = false;
    }else{
        item.classList.add("marcado");
        tarefa.realizada = true;
    }
}

//exercicio 1
function insereTarefaNaPagina(tarefa){
    let liTarefa = document.createElement("li");

    liTarefa.innerHTML = tarefa.nome;
    
    liTarefa.classList.add("item-tarefa");
    
    if(tarefa.realizada)
        liTarefa.classList.add("marcado");

    liTarefa.classList.add(`categoria-${tarefa.categoria}`);

    listaTarefasEl.append(liTarefa);

    liTarefa.addEventListener("click",() => {
        defineTarefaComoRealizada(liTarefa,tarefa); //exercicio 5
    });
}

listaTarefasEl.innerHTML = "";
for(let tarefa of tarefas){
    insereTarefaNaPagina(tarefa);
}

//exercicio 2

function incluiTarefa(){
    let categoria = selectCategoriasEl.options[selectCategoriasEl.selectedIndex].value;
    let tarefa = new Tarefa(nomeNovaTarefaEl.value,categoria,false);

    tarefas.push(tarefa);
    insereTarefaNaPagina(tarefa);

    nomeNovaTarefaEl.value = "";
}

botaoIncluirTarefaEl.onclick = () => {
    incluiTarefa();
}   

//exercicio 3

function adicionaFiltro(categoria){
    let itens = document.querySelectorAll("li");
    
    for(item of itens){
        if(!item.classList.contains(`categoria-${categoria}`)){
            item.classList.add("retido-no-filtro");
        }
    }
}

function removeFiltro(){
    let itens = document.querySelectorAll("li");

    for(item of itens){
        if(item.classList.contains("retido-no-filtro")){
            item.classList.remove("retido-no-filtro");
        }
    }
}

selectFiltroEl.addEventListener("change",() => {
    let categoria = selectFiltroEl.options[selectFiltroEl.selectedIndex].value;
    
    if(categoria === "") 
        removeFiltro();
    else{
        removeFiltro();
        adicionaFiltro(categoria);
    }
});

//exercicio 4
nomeNovaTarefaEl.addEventListener("keyup",(e) => {
    if(e.key === 'Enter'){
        incluiTarefa();
        nomeNovaTarefaEl.focus();
    }
});