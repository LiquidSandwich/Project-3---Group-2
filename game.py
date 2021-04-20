'''
Python file that sets up trivia app
'''

import os
import random
import requests
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # Loads env variables from .env

TRIVIA_TOKEN = os.getenv('DATABASE_URL')
TRIVIA_URL = 'https://opentdb.com/api.php?amount=10'


class Game:

    '''
    Class named game
    Holds functions for creating game,
    holding game data, game functionality
    '''

    def __init__(self):
        self.players = []
        self.questions = []
        self.color = 'default'
        self.mode = 'single'
        self.status = 0

    def reset(self):
        '''
        Function for resetting game
        It empties question array and sets status to 0
        '''
        self.questions = []
        self.status = 0

    def set_mode(self, mode: str) -> None:
        '''
        Sets the mode of the game
        '''
        self.mode = mode

    def add_player(self, player_data: dict) -> None:
        '''
        Function for adding player, creates dictionary that holds player data
        '''
        player_type = 'player' if self.mode == 'single' or not self.players else 'host'
        player = {
            'username': player_data['username'],
            'color': player_data['color'],
            'img': player_data['img'],
            'email': player_data['email'],
            'type': player_type
        }

        self.players.append(player)
        print(self.players)

    def player_exists(self, email: str) -> bool:
        '''
        Checks if the player exists in players
        Returns boolean value based on if players exists
        '''
        for player in self.players:
            if player['email'] == email:
                return True
        return False

    def get_game(self) -> dict:
        '''
        Returns dictionary filled with game data and settings
        '''
        return {
            'players': self.players,
            'questions': self.questions,
            'color': self.color,
            'mode': self.mode,
            'status': 1
        }

    def set_game(self, settings: dict) -> None:
        '''
        Sets up game by setting color and by calling set questions
        '''
        self.color = settings['color']
        self.set_questions(settings['category'], settings['difficulty'])

    def set_questions(self, category: str, difficulty: str) -> None:
        '''
        Function for setting the questions
        By using the data of the difficulty and category,
        it sets up the 10 questions with both incorrect and correct answers
        '''
        cat_str = '' if category == 'any' or category == None else '&category='+category
        dif_str = '' if difficulty == 'any' or difficulty == None else '&difficulty='+difficulty
        url = '%s%s%s' % (TRIVIA_URL, cat_str, dif_str)
        
        response = requests.get(url)
        data = response.json()
        questions = data['results']
        for question in questions:
            choices = question['incorrect_answers'] + [question['correct_answer']]
            random.shuffle(choices)
            question_data = {
                'question': question['question'],
                'choices': choices,
                'correct_answer': question['correct_answer']
            }

            self.questions.append(question_data)
