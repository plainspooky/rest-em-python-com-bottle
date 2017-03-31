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

// acrescenta um novo site na lista
function addSite(){
    var $this=$("#input_site");
    var site=$this.val();
    if ( /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$/.test(site) ){
        sites.push(site);
        $this.val("");
        return refreshSite();
    }
}

// remove um site da lista
function delSite(id){
    sites.splice(id,1);
    return refreshSite();
}

// atualiza o conteúdo de sites
function refreshSite(){
    var $this=$("#input_sites");
    // limpa o conteúdo já existente
    var data="";
    for (var i=0; i<sites.length; i++){
        data+='<a class="btn btn-default" onClick="delSite('+i+')"><span class="glyphicon glyphicon-remove"></span> '+sites[i]+'</a> '
    }
    return $this.html(data);
}

// função de validação de CPF retirada do site da Receita Federal
function validaCpf(cpf){
    soma=0;
    resto=0;
	if (cpf == "00000000000") return false;
    for (var i=1; i<=9; i++) soma+=parseInt(cpf.substring(i-1,i))*(11-i);
    resto=(soma*10)%11;
    if ((resto==10) || (resto==11)) resto=0;
    if (resto!=parseInt(cpf.substring(9,10))) return false;
    soma=0;
    for (i=1;i<=10;i++) soma=soma+parseInt(cpf.substring(i-1, i))*(12-i);
    resto=(soma*10)%11;
    if ((resto==10)||(resto==11)) resto=0;
    if (resto!=parseInt(cpf.substring(10,11))) return false;
    return true;
}
