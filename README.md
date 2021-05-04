# Project-3---Group-2

## Heroku App:
[Nogginy](https://nogginy.herokuapp.com/)

## Install Requirements

Type these into your command prompt to install (If you get permission errors, use sudo pip install instead of pip install)

1. `npm install`
2. `pip install -r requirements.txt`
3. `npm i react-google-login`
4. `npm install dotenv`
5. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

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

2. If the host (the person that selects game settings) logs in and immediately leaves, any additional players in the room will not be able to continue with game. As a solve, all remaining players can refresh/log out and start game again.

## Linting
Below are the warnings/errors that were disabled and why they were disabled:

### Ignored pylint errors:
1. ### no-member
It marked database commands as errors, even though the commands work fine, and it seems to be picking up a false positive.

2. ### wrong-import-position
It is saying import models are in the wrong position, but it needs to be where it is to avoid circular import issues.

3. ### invalid-envar-default
It picks up a false positive at the bottom of the app.py for port, even though the code works fine without issue.

4. ### inconsistent-return-statements
The return statements work fine, and they are not meant to be consistent in the function mentioned. The function it is throwing an error towards is `get_new_game`

5. ### too-few-public-methods
Ignored after linting all other .py files, and it was ignored because it stated that models.py does not have enough public methods.
It is not meant to hold many methods, so this error was ignored. All other files did not receive this error except models.py.

### Ignored eslint errors:
1. ### no-console
Console statements were used to verify and debug code. There were not logging any sensitive information, so they were ignored.

2. ### react/jsx-filename-extension
Filename extension is allowed to be ".js." Also, it carried over from the previous project.

3. ### react/no-array-index-key
Ignored as a carryover from the previous project.

4. ### react-hooks/exhaustive-deps
Ignored as a carryover from the previous project.

5. ### import/prefer-default-export
This error was caused only by the `Socket.js` file. This file was used to prevent dependency cycles.

6. ### jsx-a11y/label-has-associated-control
It caused a false error claiming that a `<form>` tag was needed due to a labeling error.

7. ### import/no-cycle
There were no errors with dependencies among components. Dependency cycles were fixed for the components that had the potential to cause errors. Others were not edited.

8. ### no-nested-ternary
Greatly contributed to code readability and made no major effects on our app given the time he had. 
