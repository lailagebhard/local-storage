
let form = document.getElementById("mediaTabela");
listarDados();

//definir array principal
form.addEventListener("submit", function () {
    let storage = (localStorage.MEDIAALUNOS) ? JSON.parse(localStorage.MEDIAALUNOS) : [];

    // pegar os dados do form

    let aluno = document.querySelector('.aluno').value;
    let notas = document.querySelector('.notas').value;

    let mediaAluno = {
        "aluno": aluno,
        "notas": notas
    }

    //adicionar informações no storage
    storage.push(mediaAluno);

    msgSuccess = "Cadastro efetuado com sucesso";

    //salvar no localStorage
    localStorage.setItem("MEDIAALUNOS", JSON.stringify(storage));

    alert(msgSuccess)

    //limpar os forms
    form.reset();
    listarDados();
    document.querySelector("button").value = "";

})

function listarDados() {

    let dados = JSON.parse(localStorage.getItem("MEDIAALUNOS"))
    let estrutura = "";

    console.log(dados)

    for (const key in dados) {

        let arrayNotas = dados[key].notas.split(",").map(n => parseInt(n)) //transforma as notas em array

        let media = arrayNotas.reduce(function(total, nota){
            return total + nota
        },0) / arrayNotas.length
        

        //tabela
        estrutura += `
            <tr>
            <td>${dados[key].aluno}</td>
            <td>${dados[key].notas}</td>
            <td>${media.toFixed(2)}</td>
            <td>${media > 7 ? "Aprovado" : "Reprovado"}</td>
            <td><a href="#" onclick="deleteItem(${key})">Deletar</a></td>
            </tr>
            `;
    }

    document.querySelector("table tbody").innerHTML = estrutura;

}

//delete

function deleteItem(id) {
    let dados = (localStorage.MEDIAALUNOS) ? JSON.parse(localStorage.MEDIAALUNOS) : [];
    dados.splice(id, 1);
    if (dados.length > 0) {
        localStorage.setItem("MEDIAALUNOS", JSON.stringify(dados));
    } else {
        localStorage.setItem("MEDIAALUNOS", "");
    }
    listarDados();

    return false
}

//controle de listagem
listarDados();