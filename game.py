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
        self.scores = {}
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

    def get_status(self) -> int:

        '''
        returns the current status of the game; 0: waiting, 1: running, 2: finished
        '''
        return self.status

    def set_status(self, status_num: str) -> None:
        '''
        set the status of the game
        '''
        self.status = status_num

    def get_player_type(self, email: str) -> str:
        '''
        gets a player's type
        '''
        for player in self.players:
            if email == player['email']:
                return player['type']
        return None

    def add_player(self, player_data: dict) -> None:
        '''
        Function for adding player, creates dictionary that holds player data
        '''

        player_type = 'player' if self.players else 'host'
        player = {
            'username': player_data['username'],
            'color': player_data['color'],
            'img': player_data['img'],
            'email': player_data['email'],
            'type': player_type
        }

        self.players.append(player)
        self.scores[player_data['username']]=0
        print(self.players)
    
    def get_host(self):
        if self.players:
            return self.players[0]['email']
        return None

    def remove_player(self, email: str) -> None:
        '''
        removes specified player from player list
        '''
        if self.players:
            for player in self.players:
                if player['email'] == email:
                    if player['type'] == 'host':
                        if len(self.players) == 1:
                            self.players = []
                            print("game resettttttttttttttttttt")
                        else:
                            del self.scores[player['username']]
                            self.players.remove(player)
                            self.players[0]['type'] = 'host'

                    else:
                        del self.scores[player['username']]
                        self.players.remove(player)
            print("UPDATED PLAYERS===================================================:")
            print(self.players)
    
    def player_exists(self, email: str) -> bool:
        '''
        Checks if the player exists in players
        Returns boolean value based on if players exists
        '''
        # if not self.players:
        #     return False
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
            'scores': self.scores,
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
        cat_str = '' if category in ('any', None) else '&category='+category
        dif_str = '' if difficulty in ('any', None) else '&difficulty='+difficulty
        url = '%s%s%s' % (TRIVIA_URL, cat_str, dif_str)

        response = requests.get(url)
        data = response.json()
        questions = data['results']
        for score in self.scores:
            self.scores[score] = 0
        for question in questions:
            choices = question['incorrect_answers'] + [question['correct_answer']]
            random.shuffle(choices)
            question_data = {
                'question': question['question'],
                'choices': choices,
                'correct_answer': question['correct_answer']
            }

            self.questions.append(question_data)
            
    def get_players(self) -> dict:
        '''
        Returns all active players
        '''
        return self.players
    
    def set_scores(self, name: str, score: int) -> None:
        '''
        Sets the scores for the leaderboard
        '''
        self.scores[name]=score
    
    def get_scores(self) -> dict:
        '''
        Returns a dictionary with users and scores
        '''
        return self.scores
        
    def updatePlayer(self, email, img) -> None:
        image = {}
        image = next(item for item in self.players if item['email'] == email)
        image['img'] = img
        print(image['img'])
        index = next((i for i, item in enumerate(self.players) if item["email"] == email), None)
        del self.players[index]
        self.players.insert(index, image)
        print(self.players)