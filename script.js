function mostrarUsers() {
  let table = document.querySelector(".table");
  let modal = document.querySelector(".controller-modal");

  let inputPesquisa = document.querySelector(".pesquisar");

  inputPesquisa.style.display = "";
  modal.style.display = "none";
  table.style.display = "";

  $.ajax({
    method: "GET", //method
    url: "http://localhost:8080/users", //url
    success: function (response) {
      $("#tableresults > tbody > tr").remove();

      for (var i = 0; i < response.length; i++) {
        $("#tableresults > tbody ").append(
          "<tr><td>" +
            response[i].id +
            "</td><td>" +
            response[i].nome +
            "</td><td>" +
            response[i].idade +
            "</td><td>" +
            response[i].cpf +
            '</td><td><button type="button" onclick="editar(' +
            response[i].id +
            ') " class="btn btn-warning">Editar</button></td><td><button type="button" class="btn btn-danger" onclick="excluir(' +
            response[i].id +
            ')">Excluir</button></td></tr>'
        );
      }
    },
  });
}
function pesquisarNome() {
  var nome = $("#nome").val();

  if (nome === "") {
    alert("Por favor, Digite um usuario");
  }

  if (nome != null && nome.trim() != "") {
    $.ajax({
      method: "GET", //method
      url: "http://localhost:8080/buscarPorNome", //url
      data: "name=" + nome, //dados em json

      success: function (response) {
        if ((nome = !response.length || nome.trim() == "")) {
          alert("Usuario não encontrado!");
        }
        $("#tableresults > tbody > tr").remove();
        //como setar os dados que ta vindo do JSON dentro das linhas da tabela
        for (var i = 0; i < response.length; i++) {
          $("#tableresults > tbody ").append(
            "<tr id= " +
              response[i].id +
              "><td>" +
              response[i].id +
              "</td><td>" +
              response[i].nome +
              "</td><td>" +
              response[i].idade +
              "</td><td>" +
              response[i].cpf +
              '</td><td><button type="button" onclick="editar(' +
              response[i].id +
              ') " class="btn btn-warning">Editar</button></td><td><button type="button" class="btn btn-danger"onclick="excluir(' +
              response[i].id +
              ')">Excluir</button></td></tr>'
          );
        }
      },
    });
  }
}
function editar(id) {
  let modal = document.querySelector(".controller-modal");
  let table = document.querySelector(".table");
  let inputPesquisa = document.querySelector(".pesquisar");

  inputPesquisa.style.display = "none";
  modal.style.display = "block";
  table.style.display = "none";

  $.ajax({
    method: "GET", //method
    url: "http://localhost:8080/buscaruserid", //url
    data: "iduser=" + id, //dados em json

    success: function (response) {
      $("#id").val(response.id);
      $("#name").val(response.nome);
      $("#age").val(response.idade);
      $("#cpf").val(response.cpf);
    },
  }).fail(function (xhr, status, errorThrown) {
    alert("erro ao buscar id do usuario");
  });
}
function excluir(id) {
  if (confirm("Deseja realmente deletar o usuario?")) {
    $.ajax({
      method: "DELETE", //method
      url: "http://localhost:8080/delete", //url
      data: "iduser=" + id, //dados em json

      success: function (response) {
        doSuccessToast({
          title: "Sucesso ao Deletar",
          body: `Usuario ${id}, deletado com sucesso!`,
        });
        $("#" + id).remove();
     
      },
    }).fail(function (xhr, status, errorThrown) {
      doAlertToast({
        title: "Erro ao Deletar",
        body: "Ops, não foi possivel deletar",
      });
  
    });
  }
}

function salvar() {
  var id = $("#id").val();
  var name = $("#name").val();
  var age = $("#age").val();
  var cpf = $("#cpf").val();

  if (name == "" || age == "") {
    doAlertToast({
      title: "Erro ao Salvar",
      body: "Ops, preencha os campos vazios",
    });

  } else {
    $.ajax({
      method: "POST", //method
      url: "http://localhost:8080/salvar", //url
      data: JSON.stringify({ id: id, nome: name, idade: age, cpf: cpf }), //dados em json
      contentType: "application/json; charset=utf-8",

      success: function (response) {
        doSuccessToast({
          title: "Sucesso ao Salvar",
          body: `Usuario ${name}, salvo com sucesso!`,
        });


        $("#id").val(response.id);
        $("#name").val(response.nome);
        $("#age").val(response.idade);
        $("#cpf").val(response.cpf);

  
        fecharModalUser();
      },
    
    }).fail(function (XHR, status, error) {});
  }

}

function fecharModalUser() {
  let modal = document.querySelector(".controller-modal");
  let table = document.querySelector(".table");
  let inputPesquisa = document.querySelector(".pesquisar");

  inputPesquisa.style.display = "";
  modal.style.display = "none";
  table.style.display = "";
}

function mostrarModalUser() {
  let modal = document.querySelector(".controller-modal");
  let table = document.querySelector(".table");
  let inputPesquisa = document.querySelector(".pesquisar");

  inputPesquisa.style.display = "none";
  modal.style.display = "block";
  table.style.display = "none";

  document.getElementById("formCadastroUser").reset();
}
function cancelar() {
  this.fecharModalUser();
}
