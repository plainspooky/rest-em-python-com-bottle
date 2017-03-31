#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import sqlite3
from bottle import request, response
from bottle import post, get, put, delete

__author__ = 'Giovanni Nunes'
__version__ = '1'

'''
    não esquecer de criar o banco de dados com:
    $ sqlite3 ./db/users.db < ./db/users.sql
'''
connection = sqlite3.connect('db/users.db')
cursor = connection.cursor()

@post('/users')
def creation():
    ''' insere um novo registro '''
    try:
        try:
            # recupera os dados enviados em JSON
            data = request.json
        except:
            # não há JSON, sinaliza erro
            raise ValueError

        if data is None:
            # o JSON está vazio, sinaliza erro
            raise ValueError

        try:
            # recupera as informações e ao mesmo tempo valida as chaves do JSON
            record = (data['name'],data['cpf'],data['address'],data['phone'],data['email'],data['sites'])
        except:
            # faltam chaves no JSON, sinaliza erro
            raise ValueError

    except ValueError:
        # algo diferente ao esperado foi recebido, retorna '400 Bad Request'
        response.status=400
        return

    try:
        # insere o registro no banco de dados de acordo com as regras que a
        # mãe do Robert'); DROP TABLE Students; -- espera que as pessoas usem.
        # ( consulte http://bobby-tables.com/python )
        cursor.execute('''INSERT INTO users(name,address,cpf,phone,email,sites) VALUES (?,?,?,?,?,?)''',record)
        connection.commit()
        # recupera o 'id' do registro que foi inserido
        cursor.execute('''SELECT last_insert_rowid() LIMIT 1''')
        last_id=cursor.fetchone()
    except:
        # algo aconteceu, retorna com '500 Internal Server Error'
        response.status=500
        return

    # retorna '200 success' com o ID do registro inserido
    response.status=200
    response.headers['Content-Type'] = 'application/json'
    return json.dumps({ 'id': last_id[0] })

@get('/users')
def retrieve():
    '''trata a recuperação a informação de todos usuários'''
    # consulta a base de dados
    cursor.execute('''SELECT id,name,address,cpf,phone,email,sites FROM users ORDER BY id''')
    json_output=[]
    for row in cursor.fetchall():
        json_output.append({ 'id':row[0], 'name':row[1], 'cpf':row[2], 'address':row[3], 'phone':row[4], 'email':row[5], 'sites':row[6]})
    # retorna o JSON contendo todos os itens
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache'
    return json.dumps(json_output)

@delete('/users/<user>')
def delete(user):
    '''trata a remoção de registros'''
    try:
        # consulta a base de dados antes de remover
        cursor.execute('''SELECT id FROM users WHERE id=? LIMIT 1''',(user))
        connection.commit()
        if len(cursor.fetchall())==0:
            # se o registro não existe, sinaliza erro
            raise KeyError
        else:
            # senão o remove do banco de dados
            cursor.execute('''DELETE FROM users WHERE id=? LIMIT 1''',(user))
            connection.commit()

    except KeyError:
        response.status=404
        return

    return

'''
    Código baseado no exemplo disponível em:
    https://www.toptal.com/bottle/building-a-rest-api-with-bottle-framework
'''
