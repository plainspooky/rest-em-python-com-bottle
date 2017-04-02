/*
    Funções da ficha de inserção de usuários.
*/

var sites=[];

// quando a página estiver pronta, faça...
$(document).ready(function(){

    // atualiza a lista de sites
    refreshSite();

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
                url: "/users",
                type: "POST",
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
});
