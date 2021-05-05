from game import Game
import models

GAMES = {
    'one': Game(),
    'two': Game(),
    'three': Game()
}

data = {
    'name': 'jk533',
    'room': 'one',
    'mode': 'single',
    'color': 'pink',
    'imageUrl': 'https://www.forbes.com/advisor/wp-content/uploads/2021/04/dogecoin.jpeg.jpg',
    'email': 'abc123@mailo.com',
    'id': '1234567890'
}


def login(data):
    '''
    When a user logs in, this function is run
    '''
    # Fills list with all user's emails
    # users = []
    # all_people = models.Player.query.all()
    # for person in all_people:
    #     users.append(person.email)

    # print(users)
    room = data['room']
    email = data['email']
    # Checks if email is already in database
    # if email not in users:
    #     add_to_db(data)

    if not GAMES[room].player_exists(email):
        player = {
            'username': data['name'],
            'color': 'white',
            'img': data['imageUrl'],
            'email': email,
            'id': data['id']
        }
        GAMES[room].add_player(player)
        player_type = GAMES[room].get_player_type(email)
        
        

    print(GAMES[room].get_game())

login(data)
