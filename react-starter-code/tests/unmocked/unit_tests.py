import unittest

KEY_INPUT = "input"
EXPECTED_OUTPUT = "expected"
USERS = "users"


class CheckIfEmailInListTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "guest@example.com",
                EXPECTED_OUTPUT: True,
                USERS: ["guest@example.com"]
            },
            {
                KEY_INPUT: "guest@example.com",
                EXPECTED_OUTPUT: False,
                USERS: []
            },
            {
                KEY_INPUT: "guest@example.com",
                EXPECTED_OUTPUT: True,
                USERS: ["noinfoatallforyoupal@gmail.com", "guest@example.com"]
            },
        ]
        
    def test_add_to_userlist_success(self):
        for test in self.success_test_params:
            
            
            if test[KEY_INPUT] not in test[USERS]:
                actual_result = False
            else:
                actual_result = True
            
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertNotEqual(actual_result, None)
            self.assertEqual(actual_result, expected_result)
            
KEY_INPUT = "input"
EXPECTED_OUTPUT = "expected"
USERS = "users"


class AddToUsersTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: [],
                EXPECTED_OUTPUT: ["guest@example.com"],
                USERS: ["guest@example.com"],
            },
            {
                KEY_INPUT: [],
                EXPECTED_OUTPUT: ["guest@example.com", "noinfoatallforyoupal@gmail.com"],
                USERS: ["guest@example.com", "noinfoatallforyoupal@gmail.com"],
            },
            {
                KEY_INPUT: [],
                EXPECTED_OUTPUT: ["guest@example.com", "noinfoatallforyoupal@gmail.com", "admin@example.com"],
                USERS: ["guest@example.com", "noinfoatallforyoupal@gmail.com", "admin@example.com"],
            },
        ]
        
    def test_add_to_userlist_success(self):
        for test in self.success_test_params:
            
            
            for person in test[USERS]:
                test[KEY_INPUT].append(person)
                
            actual_result = test[KEY_INPUT]
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertNotEqual(actual_result, None)
            self.assertEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()