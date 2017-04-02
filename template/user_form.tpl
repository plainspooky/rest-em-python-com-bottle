<form id="userForm">
    <div class="row">
    %for field in form:
        <div class="form-group col-md-4">
        <%
            # valores iniciais
            field_type='text'
            field_pattern=''

            # verifica o tipo do campo
            # deveria ser uma função mas só uso aqui...
            if field['required']:
                if field['type']=='email':
                    field_type='email'
                    field_pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                elif field['type']=='tel':
                    field_type='tel'
                    field_pattern='\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$'
                elif field['type']=='url':
                    field_type='url'
                    field_pattern='^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$'
                else:
                    field_type='text'
                    del field_pattern
        %>
        %end
        %end
        <%
            field_value=''
            # acrecenta a mensagem se obrigatório à dica
            field_tip=field['tip']
            if field['required']:
                field_tip+=' (obrigatório)'
        %>
        %end
            <label for="input_{{field['field']}}" class="control-label">{{field['label']}}</label>
            <input class="form-control"
                id="input_{{field['field']}}"
                maxlength="{{field['size']}}"
                type="{{field_type}}"
                value="{{field_value}}"
                placeholder="{{field_tip}}"
            %if field['required']:
                required="required"
            %end
            %if defined('field_pattern'):
                pattern="{{field_pattern}}"
            %end
            />
            <span class="help-block">Máximo de {{field['size']}} caracter(es).</span>
        </div>
    %end
    </div>
    <div class='row'>
        <div class="form-group col-md-4">
            <label for="input_site" class="control-label">Insira um site</label>
            <input class="form-control" id="input_site" maxlength="64" type="text"
                value="" placeholder="insira aqui cada um dos sites a verificar">
            <span class="help-block">Máximo de 64 caracter(es).</span>
            <a href="#" onClick="addSite()" class="btn btn-success" id="addSite"><span class="glyphicon glyphicon-plus"></span> Novo Site</a>
        </div>
        <div class="form-group col-md-8">
            <label class="control-label">Lista de sites</label>
            <div id="input_sites" class="list-of-sites"></div>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-sm-offset-3 col-sm-6">
            <button type="submit" class="btn btn-lg btn-default btn-block" id="submitButton"><span class="glyphicon glyphicon-send"></span> Enviar</button>
        </div>
    </div>
</form>
