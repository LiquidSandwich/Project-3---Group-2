# Project-3---Group-2

## Install Requirements

Type these into your command prompt to install (If you get permission errors, use sudo pip install instead of pip install)

1. `npm i react-google-login`
2. `npm install dotenv`

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

