%include('template/header.tpl', title='REST em Python')
        <div class="container" role="main">
            %include('template/title.tpl')
            Usuários cadastrados | <a href='/new'>Novo Usuário</a>
            <div>
                <h2 class="page-header">Usuários cadastrados</h2>
                <table class="table table-striped" id="userTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>E-mail</th>
                            <th>Sites</th>
                            <tr></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
%include('template/footer.tpl',js='show.js')
