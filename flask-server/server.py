# External imports 
from gevent import monkey
from flask import Flask, request, g, current_app, jsonify, render_template
from flask_sockets import Sockets
from flask_uwsgi_websocket import GeventWebSocket
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
import sqlite3 as sql
import json
import os, sys

# Environment-variables for the application-server
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
app.auto_reload = True
app.env = 'development'
sockets = Sockets(app)

# List for the client-connection
wsList = []

# CORS-enabled
CORS(app)

# The database could be extracted as an own class.
# This feature was not implemented, because this is only a testing-area and won't be used in production.


# Gets the db-connection from the g-object in the flask-instance
def getDB():
    # Get the path of the started script to set the path of the database relative to it.
    dirname = os.path.split(os.path.abspath(sys.argv[0]))[0]
    DATABASE = os.path.join(dirname, 'heroes.db')
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sql.connect(DATABASE)
    db.row_factory = sql.Row
    return db

# Creates a new hero-object in the database
def createHero(name):
    with app.app_context():
        db = getDB()
        try:
            cursor = db.cursor()
            cursor.execute('insert into Heroes (name) values (?)', [name])
            db.commit()
        except Exception as e:
            print('Something went wrong while inserting new hero...', e)

# Returns all heroes from the database
def getAllHeroes():
    with app.app_context():
        db = getDB()
        try:
            cursor = db.cursor()
            cursor.execute('Select * from Heroes')
            result = cursor.fetchall()
            return result
        except Exception as e:
            print('Something went while getting all heroes from database...', e)

# Returns a specific hero from the database
def getHero(id):
    with app.app_context():
        db = getDB()
        try:
            cursor = db.cursor()
            cursor.execute('Select * from Heroes where id = ?', [id])
            result = cursor.fetchone()
            return result
        except Exception as e:
            print('Something went wrong while getting a hero...', e)

# Updates a specific hero with a dedicated id
def updateHero(id, name):
    with app.app_context():
        db = getDB()
        try:
            cursor = db.cursor()
            cursor.execute('Update heroes set name = ? where id = ?', (name, id))
            db.commit()
            return True
        except Exception as e:
            print('Could not update  hero: ', e)
            return False

# Deletes a hero with the passed id
def deleteHero(id):
    with app.app_context():
        db = getDB()
        try:
            cursor = db.cursor()
            cursor.execute('delete from Heroes where id = ?', [id])
            db.commit()
        except Exception as e:
            print('Something went wrong while deleting...', e)

# Initial point for the app
# This would initialize the database and 
# creates the table for heroes, if it doesn't exist already 
@app.before_first_request
def initialStartDB():
    with app.app_context():
        db = getDB()
        try:
            db.cursor().execute('create table if not exists Heroes(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))')
            db.commit()
        except Exception as e:
            print("Something went wrong while creating table:", e)

# Closes the database when all clients has gone
@app.teardown_appcontext
def closeConnection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Route to get all heroes stored in the database
# Only GET-method
@app.route('/heroes', methods=['GET'])
def routeAllHeroes():
    try:
        heroes = getAllHeroes()
        heroesData = []
        for value in heroes:
            heroesData.append({'id': value[0], 'name': str(value[1])})
        return sendSuccessful(heroesData)
    except Exception as e:
        print('Error: ', e)
        return sendError(e)

# Route to create a new hero with a given name
# If the creation is successful,
# the server sends a broadcast-message to all connected clients,
# so the clients could update themselves
# Only POST-method
@app.route('/create', methods = ['POST'])
def routeCreate():
    print('Create method')
    if request.method == 'POST':
        try:
            paramName = request.json.get('name')
            createHero(paramName)
            broadcast('update', 'HERO')
            return sendSuccessful('Ok')
        except Exception as e:
            print('Something went wrong while parsing params...', e)
            return sendError(e)
    return 'create'

# Route to get a specific hero from database
# Only GET-method
@app.route('/heroes/<id>', methods=['GET'])
def routeGet(id):
    if request.method == 'GET':
        try:
            hero = getHero(id)
            print('hero:', hero)
            if hero is not None:
                return sendSuccessful({'id': hero[0], 'name': hero[1]})
            else:
                return sendError('No hero.')
        except Exception as e:
            return sendError(e)
    else:
        return 'HERO'

# Route to update a hero
# If the update is successful, 
# the server sends a broadcast-message to all connected clients,
# so they can update themselves
# Only PUT-method
@app.route('/update', methods=['PUT'])
def routeUpdate():
    if request.method == 'PUT':
        paramId = request.json.get('id')
        paramName = request.json.get('name')
        successful = updateHero(paramId, paramName)
        if successful:
            print('successful')
            broadcast('update', paramId)
            return sendSuccessful('Ok')
        else:
            return sendError('Something failed...')
    return 'update'

# Route to delete a hero by a given id
# If the deletion is successful,
# the server sends a broadcast-message to all connected clients,
# so the clients could update themselves
# Only DELETE-method
@app.route('/delete/<id>', methods=['DELETE'])
def routeDelete(id):
    if request.method == 'DELETE':
        try:
            deleteHero(id)
            broadcast('update', str(id))
            return sendSuccessful('Deletion ok!')
        except Exception as e:
            return sendError(e)
    return 'delete'

# Function to handle websocket-registration
# While a websocket is not closed it will be added to the list of clients,
# otherwise it will be removed from this.
@sockets.route('/ws')
def handleWebsocket(ws):
    global wsList
    wsList.append(ws)
    while not ws.closed:
        message = ws.receive()
        ws.send(message)

# Funtion to send a broadcast-message to all connected clients
def broadcast(type, message):
    print('sending broadcast message:', message)
    global wsList
    for ws in wsList:
        if not ws.closed:
            ws.send(json.dumps({'type': type, 'message': message}))
        else:
            wsList.remove(ws)

# General methods
# Method to return a 'successful'-message to the connected client sending a request
def sendSuccessful(message):
    return jsonify({'data': '200', 'message': message})

# Method to return an error to the connected client sending a request
def sendError(error):
    return jsonify({'data': '503', 'message': error})

# Main-method to start the server with websockets
if __name__ == '__main__':
    initialStartDB()
    httpServer = WSGIServer(('', 8000), app, handler_class=WebSocketHandler)
    httpServer.serve_forever()
