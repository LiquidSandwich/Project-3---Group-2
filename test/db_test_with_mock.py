'''
    db_test_with_mock.py
    - add description here
'''

import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../'))
import models
# import some function from app.py
from app import add_to_db



SOME_INPUT = "some_input"
EXPECTED_OUTPUT = "expected_output"

# declare constants here if needed

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                SOME_INPUT: "",
                EXPECTED_OUTPUT: ""
            },
            
            # TODO add another test case here

        ]
        
        # example of models instance
        #initial_player = models.Player(username=INITIAL_USERNAME, score=INITIAL_SCORE)
        self.initial_db_mock = []
    
    def mocked_db_session_add(self, value):
        self.initial_db_mock.append(value)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_player_query_filter_by_first(self):
        return self.initial_db_mock

    def test_add_user(self):
        for test in self.success_test_params:
            with patch( 'app.db.session.add', self.mocked_db_session_add):
                with patch( 'app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Player.query.filter_by') as mocked_query:
                        mocked_query.first = self.mocked_player_query_filter_by_first
                        #test function in app.py here with input constant 
                        
                        exp_output = test[EXPECTED_OUTPUT]
                        
                        # make assertsions here // self.assertEqual(val, val)
                        


if __name__ == '__main__':
    unittest.main()                        
