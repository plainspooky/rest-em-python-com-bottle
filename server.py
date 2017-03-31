#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
from bottle import error, route, run, static_file, template
from api import users

__author__ = 'Giovanni Nunes'
__version__ = '1'

@route('/')
def index():
    '''
        página principal e listagem dos registros inseridos (lista simples)
    '''
    return template('template/show.tpl')

@route('/new')
def new_user():
    '''
        formulário de inserção de usuários
    '''
    # o formulário é definido através de um arquovo JSON que é enviado ao
    # template que o "desenha" em HTML+Bootstrap CSS
    with open('static/json/users.json', 'r') as f:
        form_structure = json.load(f)
    return template('template/user.tpl',form=form_structure)

@route('/static/<fname:path>')
def static(fname):
    '''
        provê os arquivos estáticos utilizados pela aplicação
    '''
    return static_file(fname, root='static')

@error(400)
def error400(error):
    '''
        página para o erro 400
    '''
    return template('template/400.tpl')

@error(404)
def error404(error):
    '''
        página para o erro 404
    '''
    return template('template/404.tpl')

if __name__ == '__main__':
    '''
        executa o servidor HTTP em todas as interfaces de rede
    '''
    run(host="0.0.0.0", port=9000, debug=True)
