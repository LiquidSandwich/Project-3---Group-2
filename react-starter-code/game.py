import os
import requests
import random
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())  # Loads env variables from .env

TRIVIA_TOKEN = os.getenv('DATABASE_URL')
TRIVIA_URL = 'https://opentdb.com/api.php?amount=10'

class Game:
    
    def __init__(self):
            self.players = []
            self.questions = []
            self.color = 'default'
            self.mode = 'single'
            self.status = 0
    
    def reset(self):
        self.questions = []
        self.status = 0
        
    
    def add_player(self, player_data: dict) -> None:
        player_type = 'player' if self.mode == 'single' or not self.players else 'host' 
        player = {
            'username' : player_data['username'],
            'color': player_data['color'],
            'img': player_data['img'],
            'type': player_type
        }
        
        self.players.append(player);
        print(self.players)
        
    def player_exists(self, email: str) -> bool:
        for player in self.players:
            if player['email'] == email:
                return True
        return False
    
    def get_game(self) -> dict:
        return {
            'players': self.players,
            'questions': self.questions,
            'color': self.color,
            'mode': self.mode,
            'status': 1
        }
    
    def set_game(self, settings: dict) -> None:
        self.mode = settings['mode']
        self.color = settings['color']
        self.set_questions(settings['category'], settings['difficulty'])
    
    def set_questions(self, category: str, difficulty: str) -> None:
        url = '%s&%s&%s' % (TRIVIA_URL, category, difficulty)
        response = requests.get(url)
        data = response.json()
        questions = data['results']
        for q in questions:
            choices = q['incorrect_answers'] + [q['correct_answer']]
            random.shuffle(choices)
            question_data = {
                'question': q['question'],
                'choices': choices,
                'correct_answer': q['correct_answer']
            }
            
            self.questions.append(question_data)
        
        

        