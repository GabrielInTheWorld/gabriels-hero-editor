# External imports 
from flask import Flask, request, g, current_app, jsonify, render_template
from flask_socketio import SocketIO
import sqlite3 as sql

# Environment-variables for the application-server
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
app.auto_reload = True
app.env = 'development'

# SocketIO-initialization
socketio = SocketIO(app)

# Connection to the database
DATABASE = 'flask-server/heroes.db'

# The database could be extracted as an own class.
# This feature was not implemented, because this is only a testing-area and won't be used in production.


# Gets the db-connection from the g-object in the flask-instance
def getDB():
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
        heroesData = {}
        for value in heroes:
            heroesData[value[0]] = value[1]
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
    if request.method == 'POST':
        try:
            paramName = request.json.get('name')
            createHero(paramName)
            broadcast('create', 'HERO')
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
            return sendSuccessful({hero[0]: hero[1]})
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
            # socketio.emit('update', {'data': paramId}, broadcast=True, namespace='/ws')
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
@app.route('/delete', methods=['DELETE'])
def routeDelete():
    if request.method == 'DELETE':
        try:
            paramId = request.json.get('id')
            deleteHero(paramId)
            broadcast('delete', paramId)
            return sendSuccessful('Deletion ok!')
        except Exception as e:
            return sendError(e)
    return 'delete'

# SocketIO
# Default method to recognize when a client connects
@socketio.on('connect', namespace='/ws')
def connect():
    print('Someone connected.')

# Default method for testing the websocket-connection
@socketio.on('send', namespace='/ws')
def myEvent(data):
    print(data)
    socketio.emit('broadcast', data, json=True, broadcast=True, namespace='/ws')

# Default method to recognize when a client disconnects
@socketio.on('disconnect', namespace='/ws')
def disconnect():
    print('Someone leaves the session.')

# General methods
# Method to return a 'successful'-message to the connected client sending a request
def sendSuccessful(message):
    return jsonify({'data': '200', 'message': message})

# Method to return an error to the connected client sending a request
def sendError(error):
    return jsonify({'data': '503', 'message': error})

# Method to send a broadcast-message to all connected clients
def broadcast(identifier, data):
    socketio.emit(identifier, data, json=True, broadcast=True, namespace='/ws')

# Main-method to start the server with websockets
if __name__ == '__main__':
    initialStartDB()
    socketio.run(app, '127.0.0.1', 8080)
