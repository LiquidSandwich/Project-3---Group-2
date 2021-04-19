'''
Python file for creating table player, which stores the users email, username, score,
and profile_image from google
'''
from app import DB


class Player(DB.Model):
    '''
    Table that holds id, email, username, score, and profile_image
    Email is unique
    '''
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(255), unique=True, nullable=False)
    username = DB.Column(DB.String(80), unique=False, nullable=False)
    score = DB.Column(DB.Integer, unique=False, nullable=False)
    profile_image = DB.Column(DB.String(255), unique=False, nullable=False)

    def __repr__(self):
        return '<Player %r>' % self.email
