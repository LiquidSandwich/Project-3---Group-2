# TicTacToe Application- Install Requirements, Setup instructions, Technical Issues, Known Problems, Improvements for Future

This README should explain all that's needed to run the application locally, technical issues, known problems of the application, and improvements for the future.


## Install Requirements
Type these into your command prompt to install (If you get permission errors, use sudo pip install instead of pip install)

1. `pip install flask`
2. `npm install`
3. `pip install -r requirements.txt`
4. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the react-starter directory

## Setting Up and Running
1. Clone the Repository
2. Cd into react-starter and run `python app.py` in the terminal
3. Open another terminal. Cd into react-starter again and run `npm run start`
4. To see if its working, preview the web page in browser '/'

## Technical Issues
These are the technical issues I found and how I solved it:

### 1. Could not give players their player type properly.
SOLVE: From going to office hours, I learned that I could save the users in app.py and give them their roles in terms of strings, where when a player logs in, they would receive their player tag.
The first person to log in is Player X, the second one is Player O, and the rest after are spectaters. Once I had this data in app.py, I created the event 'login', and sent that data to Board.js.
In Board.js, I created a state that holds the player and a boolean along with a useEffect that emits when a 'login' occurs. For players X and O, they get their states set to true and are stored using setPlayer.
Everyone else who logs in gets their value set to false. Not only did I manage to figure out how to store the usernames, but I managed to now give them access permissions with the Tic Tac Toe board based on their player state boolean.

### 2. Board would reset for every user when any user logged in.
SOLVE: The WarningBanner was causing the board to completly reset when a user logged in. As a fix, I instead used an inline if in the return statement of Login.js. If status is false, then button would display login.
If the status is false, then it would display the board with a logout button. By using the inline if statement, it would no longer reset the board for every user. While their board might appear blank at first,
any user that makes a move will update the board for everyone. This website assisted in the issue of conditional rendering: https://reactjs.org/docs/conditional-rendering.html

## Known Problems
### 1. Sometimes list will not update properly when logging in.
SOLVE: What I noticed is when the server starts up, wait a couple of seconds. If you run the application with multiple users too quickly, to server might not pick up that a user logged in, causing an error in the list.
To reset, refresh every tab and start the server up again. This has always fixed the issue for me

### 2. If a user closes their tab instead of logging out, the every player after will be stuck in a role loop.
SLIGHT SOLVE: (Update: Now when a user disconnects, the count decreases by one but VERY SLOWLY) If I had more time, I would look into seeing if there is a way to detect if a user closed their tab, and then by detecting that, decrease the counter. Users would still have to logout and log back in for their new role,
but at least they would not be stuck in spectater until the app restarts. So again, as of now, one MUST logout in order for the app to continue functioning.

## Improvments for the Future
Below are improvement(s)/additional feature(s) that I would like to be implemented in the future

### 1. Find a way to decrease global counter in app.py when a user closes the app/tab (Update: Found a way to decrease during close tab, but I still want to find a more efficient solution).

This would be done be detecting when a user 'disconnects' (close their tab). Once this is detected, in the server, the counter would decrease by one. This way, the app will be able to run and know exactly when a user disconnects,
whether they logout or close the tab/application. This improvement is vital because the app breaks if a user does not log out. In order to ensure the app works better, having a method of knowing when a user disconnects by closing the
application is something that would not only make this app better, but allow it to run more effectivly.