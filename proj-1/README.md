# Listen In and Tune Up Application- Install Requirements, Setup instructions, Technical Issues, Known Problems, Improvements for Future

This README should explain all that's needed to run the application, technical issues, known problems of the application, and improvements for the future.

## Install Requirements
Type these into your command prompt to install (If you get permission errors, use `sudo pip install` instead of `pip install`)
1. `pip install flask`
2. `pip install python-dotenv`
3. `pip install requests`
4. `npm install -g heroku`

## Setup
### 1. Set up Spotify Developer Account

You will need this in order to obtain client id and client secret, which are needed in order to use Spotify Api.
Once you setup your account and sign in, head to the dashboard, click on create an app, go into the newly created app, and the client id and client secret should be displayed in front of you.
Note: In order to see client secret, click on "Show Client Secret" and DO NOT SHARE any of this information with anyone else.

### 2. Set up Genius Developer Account

You will need this in order to display the lyrics on the page. The only thing you will need is the Client Access Token, which can be found like so:

1. Go to this website: https://genius.com/developers
2. Click on create API client
3. Type in your app name where it says "App Name" and "App Website URL"(When you deploy to Heroku, you'll have a website URL)
4. Once finished, you will see Client Id, Client Secret, and "Generate Access Token" under Client Access Token
5. Click on "Generate Access Token" and save that token for the next step.

### 3. Create a `.env` file in your directory

This file will be used to store your client id and client secret keys from Spotify and your client access token from Genius
Example of how to store key `export SPOT_KEY='YOUR_KEY'`
Once this is done, you'll be able to use your key in your code without actually showing your key to others
In total, you should have three different export lines (Feel free to change variable names, as these are names for the sake of the example. BUT THEY HAVE TO MATCH WITH YOUR `.env` FILE):
1. `export CLIENT_ID='YOUR_CLIENT_ID'`
2. `export CLIENT_SECRET='YOUR_SECRET_KEY'`
3. `export CLIENT_ACCESS='YOUR_ACCESS_TOKEN'`

### 4. Download this repo

This can be done by typing this into the command line: `git clone https://github.com/NJIT-CS490-SP21/project1-mjm236`

### 5. Check to make sure your keys are in the `.env` file and that the variable names for the keys match with your code

Once your keys are properly placed in the `.env` file, run app.py and preview the running application.

### 6. Set up and Deploy Heroku account (Don't deploy until you finish your application)

You will need this in order to display/share application with the public. Follow these steps to properly deploy on Heroku. If you did not finish your application yet, only do step 1 for now.
It's recommended that you finish your application before you deploy it. If you application is finished, then follow the rest of the steps.
1. Create account on Heroku
2. Create two files on your local respository, `requirements.txt` and `Procfile`, as they are needed by Heroku
3. In the command prompt, type `pip freeze > requirements.txt`. This will fill the file with all your used dependecies/libraries you are using/importing.
4. In `Procfile`, type in the command the Heroku will use to run the web application. For example, this application uses `web: python app.py`
5. Add all files to git using `git add ..`
6. Commit those files
7. Login in to Heroku through the command prompt: `heroku login -i`
8. Once logged in, create a Heroku application: `heroku create`
9. Go to https://dashboard.heroku.com/apps and look for the application you created. The application url should also be in the command prompt after you type `heroku create`
10. Click on your created application and go to settings. Scroll down until you see "Config Vars".
11. Click on "Reveal Congig Vars" and on the left side, put in the variable names you made in your `.env` file
12. On the right side, input the key associated for the variable name.
13. The variable names and keys should match as they do in your `.env`. This is so Heroku can run your application using your keys without anyone being able to see your keys
14. Once done, go back to your command prompt and push the commited code to git: `git push heroku main`
15. After, type `heroku open` to see your application and click the link.

## Technical Issues
These are the technical issues I found and how I solved it:

### 1. Could not fetch artist name properly in spot.py. 
SOLVE: In order to solve this issue, I slowly walked through the data, starting from `data['tracks']`.
I then followed this documentation to understand the tracks objects and to understand what was held in each object: https://developer.spotify.com/documentation/web-api/reference/#object-trackobject.
Once I dug through `data['tracks']`, I realized the artist's name was deep inside data[tracks] and needed an index of 0 to reach the artist's name. 
Since I did this debugging process, I can now retrieve every artists name consistently.

### 2. `TOP_TRACKS_URL` was not passing through properly, stating that I was missing the country query even though I had it inputted in.
SOLVE: I noticed that the URL was not being passed through even though I was putting in the correct query.
In order to fix this, I inputted the query manually as so: `'/top-tracks?market=US'``.
By doing it this way, I could gurantee that the query worked.
This demo reminded me that I could manually input queries: https://www.youtube.com/watch?v=kO6Bv8fkFOo&feature=youtu.be

### 3. preview_url text was not displaying at all on html.
SOLVE: Before I made the preview_url appear as an audio player, the text itself was not showing up on the page.
Initially, I thought it was not appearing because some of the songs do not have preview_url.
I then realized that songs with preview_url's weren't showing up either.
In order to fix this, I went to check my spot.py code.
From checking the code, I realized that my function `get_preview_url()` was typed as `get_previeiw_url()` in the return statement of the `get_artist_data()` function.
I then changed it to its correct name, and it worked properly and displayed through html.

### 4. Wrong lyrics were displaying for each song
SOLVE: Realized I was calling the `get_artist_data()` function from spot.py in genius.py, when I should have been sending retrieved artist data from app.py to genius.py.
If I call the function `get_artist_data()` in genius.py, I will get a RANDOM artist and song, not the artist and song from app.py.
I solved this by calling the function in genius.py `get_lyrics()` in app.py but with two parameters like such: `get_lyrics(artist_data['artist'], artist_data['song'])`.
This way, genius.py would get the same data that app.py retrieved.
This method fixed the issue and now the lyrics match the song.

## Known Problems
### 1. There is one known problem that rarely occurs. Sometimes, when trying to display the application on a browser, it will print the function calls instead of the artist information.
In order to stop it from occuring, check spot.py code and make sure all the function calls match with what is in the return statement. If it does, simply restart the application. 
That has always fixed the issue.

## Improvements for Future
Below are improvements/additional features that I would like to be implemented in the future

### 1. Display the artist's album of the current song on the side of the page with a list of the songs on that album being displayed

This would be done using Spotify API, as there is a way to get the artists albums using this url: https://api.spotify.com/v1/artists/{id}/albums.
Then I would extract data on the album, such as the album name, the singles on the album, and the album image so it can be displayed.
The data would be extracted in a function called `get_album_info()` in the spot.py file, then app.py would call for that data and send it to the index.html file so it can be displayed. 
This way, users could see the other songs on the album and check it out for themselves.

### 2. Have more artists to search through

This would be done by adding more artist id's into the `artist_id` list in spot.py. I would find these artist id's by following this documentation: https://support.tunecore.com/hc/en-us/articles/360040325651-How-to-Find-my-Spotify-Artist-ID.
Once the id for the artist is found, I would manually add it to the `artist_id` list.
