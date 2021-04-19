# Project-3---Group-2

## Install Requirements

Type these into your command prompt to install (If you get permission errors, use sudo pip install instead of pip install)

1. `npm install`
2. `pip install -r requirements.txt`
3. `npm i react-google-login`
4. `npm install dotenv`

## Setting up
You will need to load your clientID key from a .env file, which is why you will need to install dotenv.
In order to do this, create a .env file and type your key in like so (Your clientID does NOT need to be surrounded by quotation marks):
`REACT_APP_GOOGLE_ID=YOUR_CLIENT_ID GOES HERE`

VERY IMPORTANT TO NOTE: The .env file MUST be in the root directory of the project.
In this case, it needs to be in the react-starter-code directory, NOT outside of it.
Unfortunatly, it must be in the directory, so make sure NOT to submit your .env file.
It is added to the .gitignore file, so that it cannot be submitted to the github.


## Technical Issues

1. Cookies CANNOT be disabled or blocked in any way, or app will not be able to function.
Make sure that you don't have any third-party extensions blocking cookies.

## Linting
Below are the warnings/errors that were disabled and why they were disabled:

1. # no-member
Ignored because it marked database commands as errors, even thought the commands work fine and it seems to be picking up a false positive

2. # wrong-import-position
Ignored because it is saying import models is in the wrong position, but it needs to be where it is to avoid circular import issues

3. # invalid-envar-default
Ignored because it is picking up a false positive at the bottom of app,py for port, even though the code works fine without issue.

4. # inconsistent-return-statements
Ignored because the return statements work fine and they are not meant to be consistent in the function mentioned. The function it is throwing an error towards is `get_new_game`

5. # too-few-public-methods
Ignored after linting all other .py files and it was ignored because it was stating that models.py does not have enough public methods.
It's not meant to hold many methods, so this error was ignored. All other files did not receive this error except models.py.

