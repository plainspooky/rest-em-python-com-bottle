/*
    Funções da página de visualização dos registros inseridos.
*/

// quando a página estiver pronta, faça...
$(document).ready(function(){
    // localização do método GET para "Usuários"
    var jsonUrl='/users';
    // lê e processa os dados dentro de uma tabela
    $.getJSON(jsonUrl,function(data){
        // cria <TBODY>
        var documentBody=$("<tbody></tbody>");
        // insere os dados do JSON em um objeto de tabela
        var documentData=$.map(data, function(value,i){
        return $("<tr id=\"id"+value['id']+"\"><td>"+value['id']+"</td>"+
            "<td><strong>"+value['name']+"</strong></td>"+
            "<td>"+value['cpf']+"</td>"+
            "<td>"+value['address']+"</td>"+
            "<td>"+value['phone']+"</td>"+
            "<td><a href=\"mailto:"+value['email']+"\">"+value['email']+"</a></td>"+
            "<td>"+formatSites(value['sites'])+"</td>"+
            "<td>"+deleteIcon(value['id'])+"</td>"+
            "</tr>");
        });
    // insere os dados em <TBODY>
    documentBody.html(documentData);
    // insere <TBODY> no DOM
    documentBody.appendTo('#userTable');
    });
});

// ícone do botão de remoção
function deleteIcon(user){
    return "<a href=\"#\" onClick=\"deleteUser("+user+")\"><span class=\"glyphicon glyphicon-trash\"></span></a>";
}

// remove um usuário
function deleteUser(user){
    if ( user>0 & confirm("Confirma a remoção?") ){
        $.ajax({
        url: '/users/'+user,
        type: 'DELETE',
        success: function(result) {
            alert("Registro "+user+" removido com sucesso.");
            $('#id'+user).fadeOut();
            }
        });
    }
}

// coloca cada site em uma linha
function formatSites(sites){
    formated='';
    siteList=sites.split(",");
    for (var i=0; i<siteList.length; i++){
        formated+="<a href=\"http://"+siteList[i]+"\" target=\"_blank\">"+siteList[i]+"</a><br/>";
    }
    return formated;
}
