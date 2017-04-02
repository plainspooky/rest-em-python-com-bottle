%include('template/header.tpl', title='REST em Python')
        <div class="container" role="main">
            %include('template/title.tpl')
            <a href='/'>Usuários cadastrados</a> | <a href='/new'>Novo Usuário</a>
            <div>
                <h2 class="page-header">Editar Usuário</h2>
                %include('template/user_form.tpl')
            </div>
        </div>
%include('template/footer.tpl',js=['user.js','edit.js'])
