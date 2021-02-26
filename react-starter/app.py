import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

userList=[]
ctr=0
@socketio.on('click')
def on_match(data):
    print(str(data))
    socketio.emit('click',  data, broadcast=True, include_self=False)

@socketio.on('login')
def on_login(data):
    global ctr
    if ctr == 0:
        userList.insert(ctr, {data: "X"})
    elif ctr == 1:
        userList.insert(ctr, {data: "O"})
    else:
        userList.insert(ctr, {data: "Spectater"})
    print(userList)
    print(ctr)
    print(str(data))
    socketio.emit('login',  [userList, data, ctr] , broadcast=True, include_self=True)
    ctr = ctr + 1
    
@socketio.on('updateList')
def on_updateList(data):
    socketio.emit('updateList',  data, broadcast=True, include_self=False)
    
@socketio.on('outcome')
def on_outcome(data):
    res = ""
    if data[0] == True:
        res = data[1] + " has won the match!!!"
        socketio.emit('outcome',  res, broadcast=True, include_self=True)
    else:
        res = "Draw, no one wins :(" 
        socketio.emit('outcome',  res, broadcast=True, include_self=True)
    
    
# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)