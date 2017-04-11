/*
    Funções da ficha de inserção de usuários.
*/

var sites=[];

// quando a página estiver pronta, faça...
$(document).ready(function(){

    // atualiza a lista de sites
    refreshSite();

    // recupera o ID a ser editado
    var userId=getUserId();

    if (userId > 0){
        var jsonUrl='/users/'+userId;

        // alimenta os campos do formulário
        $.getJSON(jsonUrl,function(data){
            $("input#input_name").val(data[0]['name']);
            $("input#input_address").val(data[0]['address']);
            $("input#input_email").val(data[0]['email']);
            $("input#input_cpf").val(data[0]['cpf']);
            $("input#input_phone").val(data[0]['phone']);
            // popula a lista de sites de um jeito feio pacas (aceito sugestões)
            site_list=data[0]['sites'].split(',');
            for (var site=0; site<site_list.length; site++){
                $("#input_site").val(site_list[site]);
                addSite();
                $("#input_site").val('');
            }
        });
    }

    // validação do CPF
    $('#input_cpf').focusout(function(){
        var $this=$(this);
        var cpf=$this.val();
        // informa visualmente que o CPF é inválido
        if ( ! validaCpf(cpf) & cpf.length>0 )
        {
            // "sujo" o valor para ele não passar no submit :-)
            $this.val("*"+cpf.replace("*",""));
            // e o pinto de vermelho
            $this.addClass('invalid');
        } else {
            // remove a classe em caso de CPF válido
            $this.removeClass('invalid');
        }
    });

    // envia os dados para a API (apenas se houver conteúdo em sites)
    $('#userForm').submit(function(){
        if ( sites.length>0 ){
            // recupera os valores e alimenta o objeto
            var userData={
                name: $("input#input_name").val(),
                address: $("input#input_address").val(),
                email: $("input#input_email").val(),
                cpf: $("input#input_cpf").val(),
                phone: $("input#input_phone").val(),
                sites: sites.toString()
            };
            // envia via AJAX os dados (em JSON)
            $.ajax({
                url: "/users/"+userId,
                type: "PUT",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(userData),
                dataType: "json",
                timeout: 4000,
                beforeSend: function(){
                    $("#submitButton").addClass('btn-success');
                    $("input").val("");
                    sites=[];
                    refreshSite();
                }
            });
        }
    });

    // lê o ID do usuário a partir da URL do navegador
    function getUserId(){
        // separa os elementos da URL em um array
        var splited_url=window.location.pathname.split('/');
        return splited_url[2];
    }
});
