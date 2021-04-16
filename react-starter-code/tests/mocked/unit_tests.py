import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
from flask_sqlalchemy import SQLAlchemy

currentdir = os.path.dirname(os.path.realpath(__file__))
parentdir = os.path.dirname(currentdir)
superparentdir = os.path.dirname(parentdir)

sys.path.append(superparentdir)

from app import add_to_db, models


KEY_INPUT = "input"
KEY_EMAIL = "email"
KEY_IMAGE_URL = "image"
KEY_EXPECTED = "expected"
INITIAL_USERNAME = '#1Gamer'
INITIAL_EMAIL = 'Gamer@gmail.com'
INITIAL_IMAGE_URL = 'https://lh6.googleusercontent.com/-3RQkbqiJxoc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclaboCeQuAi-0K-8egRx_P-GTY8_A/s96-c/photo.jpg'

class AddNewUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'Sam',
                KEY_EMAIL: "sam@gmail.com",
                KEY_IMAGE_URL: "https://lh6.googleusercontent.com/-3RQkbqiJxoc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclaboCeQuAi-0K-8egRx_P-GTY8_A/s96-c/photo.jpg",
                KEY_EXPECTED: "[<Player 'Gamer@gmail.com'>, <Player 'sam@gmail.com'>]",
            },
            {
                KEY_INPUT: 'Carl',
                KEY_EMAIL: "CarlLocks@gmail.com",
                KEY_IMAGE_URL: "https://lh3.googleusercontent.com/a-/AOh14Gj61dCskueTkWKUO2zUpzgaShFvEo2U9My_O8sB0A=s96-c",
                KEY_EXPECTED: "[<Player 'Gamer@gmail.com'>, <Player 'sam@gmail.com'>, <Player 'CarlLocks@gmail.com'>]",
            },
            {
                KEY_INPUT: 'Paul',
                KEY_EMAIL: "PaulyD@gmail.com",
                KEY_IMAGE_URL: "https://lh6.googleusercontent.com/-3RQkbqiJxoc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclaboCeQuAi-0K-8egRx_P-GTY8_A/s96-c/photo.jpg",
                KEY_EXPECTED: "[<Player 'Gamer@gmail.com'>, <Player 'sam@gmail.com'>, <Player 'CarlLocks@gmail.com'>, <Player 'PaulyD@gmail.com'>]",
            },
            
        ]
        
        initial_person = models.Player(email=INITIAL_EMAIL, username=INITIAL_USERNAME, score=0, profile_image=INITIAL_IMAGE_URL)
        self.initial_db_mock = [initial_person]
        
    def mocked_db_session_add(self, email):
        self.initial_db_mock.append(email)
    
    def mocked_db_session_commit(self):
        pass
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    
                    data = [test[KEY_EMAIL], test[KEY_INPUT], test[KEY_IMAGE_URL]]
                    add_to_db(data)
                    
                    actual_result = str(self.initial_db_mock)
                    
                    expected_result = test[KEY_EXPECTED]
                        
                    self.assertEqual(len(actual_result), len(expected_result))
                    self.assertEqual(actual_result, expected_result)
                    
if __name__ == '__main__':
    unittest.main()