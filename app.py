'''
Server for Nogginy Quiz Game
Helps store and change user information
'''

import os
from flask import Flask, send_from_directory, json, request, jsonify
from flask_socketio import SocketIO
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

GAME = Game()

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
            add_to_db(data)

        if not GAME.player_exists(email):
            player = {
                'username': data['name'],
                'color': 'white',
                'img': data['imageUrl'],
                'email': email,
            }
            GAME.add_player(player)
            player_type = GAME.get_player_type(email)
            return {'status': 200, 'playerType': player_type}
            
            
@APP.route('/api/v1/player', methods=['GET'])
def get_type():
    if 'email' in request.args:
        email = request.args['email']
        if GAME.player_exists(email):
            player_type = GAME.get_player_type(email)
            print('The playr typpe isssssssssss' + player_type)
            results = {'player_type': player_type}
            return jsonify(results)

@APP.route('/api/v1/leave', methods=['POST'])
def leave_game():
    '''
    When a user chooses to leave the game, this removes them from the list of players
    '''
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        email = data['email']
        GAME.remove_player(email)
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
        GAME.set_mode(mode)
        SOCKETIO.emit('modeSet', broadcast=True)
        return {'status': 200, 'msg': 'OK'}
    return {'status': 400, 'error': 'Bad request!'}


@APP.route('/api/v1/new', methods=['POST'])
def get_new_game():
    '''
       adds user-specified settings to game and returns game data
    '''
    if request.method == 'POST':
        data = request.get_json()
        GAME.reset()
        GAME.set_game(data)
        game_data = GAME.get_game()
        SOCKETIO.emit('startGame', {'settings': game_data}, broadcast=True)
        return {'status': 200}

@SOCKETIO.on('message_logged')
def on_message(data):
    '''
        emits chat message to all users
    '''

    print(data)
    # add logged in user's name to current list of usernames
    usernames = GAME.get_usernames()
    print('usernames: ')
    print(usernames)
    data['usernames'] = usernames
    SOCKETIO.emit('message_logged', data, broadcast=True, include_self=False)

if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
