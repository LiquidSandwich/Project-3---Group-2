'''
    login_test_no_mock.py
    - description here
'''

import os
import sys
import unittest

sys.path.append(os.path.abspath('../'))
from app import on_login
import models

INPUT = "input"
EXPECTED = 'expected'



class LoginTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                INPUT: 'sample_input',
                EXPECTED: 'sample_output'
            }

        ]

    def test_login(self):
        for test in self.success_test_params:
            # use on_login() with sample input
            
            # make assertions with self.assertEqual(p,p)
                
            pass

if __name__ == '__main__':
    unittest.main()