'''
Server for Nogginy Quiz Game
Helps store and change user information
'''

import os
from flask import Flask, send_from_directory, json, request, jsonify
from flask_socketio import SocketIO, join_room, leave_room
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from game import Game

load_dotenv(find_dotenv())  # Loads env variables from .env

# Create instance of flask class and stores in static folder.
APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

# Gets rid of warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)


GAMES = {
    'one': Game(),
    'two': Game(),
    'three': Game()
}

# GAME = Game()

# Created down here to avoid cirular import issues
import models

# Intializes tables and databases if not already done
DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    '''
    Returns
    '''
    return send_from_directory('./build', filename)

@APP.route('/api/v1/login', methods=['POST'])
def login_request():
    '''
    When a user logs in, this function is run
    '''
    if request.method == 'POST':
        data = request.get_json()
        print(data)

        # Fills list with all user's emails
        users = []
        all_people = models.Player.query.all()
        for person in all_people:
            users.append(person.email)

        print(users)
        email = data['email']
        # Checks if email is already in database
        if email not in users:
            print('THIS SHOULD NOT EXECUTE')
            add_to_db(data)
        return {'status': 200}

@APP.route('/api/v1/join', methods=['POST'])
def join():
    '''
    Handles when a user joins a game
    Sends in player data based on DB data
    Adds player to game
    '''
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        room = data['room']
        users = []
        all_people = models.Player.query.all()
        for person in all_people:
            users.append(person.email)
        if not GAMES[room].player_exists(email):
            player = {
                'username': data['name'],
                'color': 'white',
                'email': email,
            }
            if email not in users:
                player['img'] = data['img']
            else:
                user = DB.session.query(models.Player).filter_by(email=data['email'])
                player['img'] = user[0].profile_image
                print('IF WE GET HERE IT WORKS')
                SOCKETIO.emit('updateUser', player)
            GAMES[room].add_player(player)
            player_type = GAMES[room].get_player_type(email)
            return {'status': 200, 'playerType': player_type}

    return {'error': 400}

@SOCKETIO.on('join')
def join_game_room(room):
    '''
    Socket event that lets user join room
    '''
    join_room(room)


@APP.route('/api/v1/player', methods=['GET'])
def get_type():
    '''
    Returns whether the user is a host or not
    '''
    if 'email' in request.args:
        email = request.args['email']
        room = request.args['room']
        if GAMES[room].player_exists(email):
            player_type = GAMES[room].get_player_type(email)
            print('The playr typpe isssssssssss' + player_type)
            results = {'player_type': player_type}
            return jsonify(results)

@SOCKETIO.on('leave')
def leave(data):
    '''
    Socket event that handles when players leave
    Updates the host of that room when the original host leaves
    '''
    email = data['email']
    room = data['room']
    print('%s just left Room %s' % (email, room))
    leave_room(room)
    GAMES[room].remove_player(email)
    host_email = GAMES[room].get_host()
    if host_email:
        SOCKETIO.emit('updated_host', host_email, to=room)


@APP.route('/api/v1/leave', methods=['POST'])
def leave_game():
    '''
    When a user chooses to leave the game, this removes them from the list of players
    '''
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        email = data['email']
        room = data['room']
        GAMES[room].remove_player(email)
        host_email = GAMES[room].get_host()
        if host_email:
            print("host email: " + str(host_email))
            SOCKETIO.emit('updated_host', host_email, to=room)
        return 'Successfully removed from game!'
    return 'Bad Request, could not exit.'

def add_to_db(data):
    '''
    When called, it adds the user to the database.
    '''

    new_user = models.Player(email=data['email'],
                             username=data['name'],
                             score=0,
                             profile_image=data['imageUrl'])
    DB.session.add(new_user)
    DB.session.commit()


@APP.route('/api/v1/new/mode', methods=['POST'])
def set_game_mode():
    '''
        Sets game mode amd returns status
    '''
    if request.method == 'POST':
        data = request.get_json()
        mode = data['mode']
        room = data['room']
        GAMES[room].set_mode(mode)
        SOCKETIO.emit('modeSet', to=room)
        return {'status': 200, 'msg': 'OK'}
    return {'status': 400, 'error': 'Bad request!'}


@APP.route('/api/v1/new', methods=['POST'])
def get_new_game():
    '''
       adds user-specified settings to game and returns game data
    '''
    if request.method == 'POST':
        data = request.get_json()
        room = data['room']
        GAMES[room].reset()
        GAMES[room].set_game(data)
        game_data = GAMES[room].get_game()
        SOCKETIO.emit('startGame', {'settings': game_data}, to=room)
        return {'status': 200}

@SOCKETIO.on('message_logged')
def on_message(data):
    '''
        emits chat message to all users
    '''

    print(data)
    # add logged in user's name to current list of usernames
    room = data['room']
    usernames = GAMES[room].get_usernames()
    print('usernames: ')
    print(usernames)
    data['usernames'] = usernames
    SOCKETIO.emit('message_logged', data, to=room)

@SOCKETIO.on('leaderboard')
def leaderboard(data):
    '''
        update and retrieve leaderboard
    '''
    print("DATA"+str(data))
    room = data['room']
    GAMES[room].set_scores(data['username'], data['correctQuestions'])
    lb_data = GAMES[room].get_scores()
    print("LB_DATA"+str(lb_data))
    sorted_dict = {}
    sorted_keys = sorted(lb_data, key=lb_data.get, reverse=True)
    for key in sorted_keys:
        sorted_dict[key] = lb_data[key]
    print(lb_data)
    SOCKETIO.emit('leaderboard',
                  {'users': list(sorted_dict.keys()), 'scores':list(sorted_dict.values())}, to=room)

@SOCKETIO.on('image_change')
def on_image_change(data):
    '''
    Socket event that updates the users profile image
    DB is updated to then hold the users new profile image
    '''
    print(data)
    room = data[2]
    user = DB.session.query(models.Player).filter_by(email=data[1])
    print(user[0])
    user[0].profile_image = data[0]
    GAMES[room].updatePlayer(data[1], data[0])
    DB.session.commit()
    print(user[0].profile_image)

if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
