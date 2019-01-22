# Flask Server

This is a simple flask-server.
It serves to hold the heroes in database and process requests to get heroes, update or create a new one.

## Installation

If you haven't already installed flask, flask_sockets, eventlet, gevent, geventwebsocket, flask_uwsgi_websocket,
install it: `pip install flask flask_cors flask_sockets flask_uwsgi_websocket eventlet gevent gevent-websocket`.
See `requirements.txt` for further information.

## Using

After successful installation of flask and so on it can be used now.
Run the following command: `python server.py` in the directory /flask-server/.
Now the connection to the database and to the websocket should be available.