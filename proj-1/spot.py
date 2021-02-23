import requests
import os
import random
from dotenv import load_dotenv, find_dotenv

# Loads API keys from .env
load_dotenv(find_dotenv())

# Authentification URL for Spotify
AUTH_URL = 'https://accounts.spotify.com/api/token'

# auth_response holds data needed to be authenticated on Spotify, such as grant type, client id and client secret
# Request for access token
# Client credentials flow for authorization completed by following guide here: https://stmorse.github.io/journal/spotify-api.html
auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': os.getenv('USER_CRED'),
    'client_secret': os.getenv('SPOT_KEY'),
})

# author_response_data holds the response from Spotiy Accounts Service
auth_response_data = auth_response.json()

# The access_token from the response is received and stored in access_token
access_token = auth_response_data['access_token']


# Function for gathering data on artist and their top tracks
def get_artist_data():
    
    # Good Kid, Last Dinosaurs, and Porter Robinson artist ID's respectivly
    artist_id = ["38SKxCyfrmNWqWunb9wGHP", "677sHrkjhB7IP4YwjzZyc4", "3dz0NnIZhtKKeXZxLOxCam"]
    
    # Generates random number from 0-2 as to randomize the artist chosen
    random_number = random.randint(0, 2)
    
    # A Spotify Url of a random artists top tracks
    # Spotify ID from artist_id is used tor retrieve the artists top tracks
    TOP_TRACKS_URL = 'https://api.spotify.com/v1/artists/' + artist_id[random_number] + '/top-tracks?market=US'
    
    # Header info to be used for following get
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token),
    }
    
    # Request is made using url and authorization header
    # data is then recieved by response.json()
    response = requests.get(TOP_TRACKS_URL, headers=headers)
    data = response.json()
    
    # If the data cannot be dynamically loaded, then print basic data
    # Prints dummy data in the event the API cannot dynamically load data sucessfully
    # Learned how to do this from this url: https://zetcode.com/python/requests/#:~:text=Python%20requests%20getting%20status&text=200%20is%20a%20standard%20response,resource%20could%20not%20be%20found.
    if str(response.status_code) == "404":
        
        artist="Good Kid"
        song_name="Tell Me You Know"
        image_url="https://i.scdn.co/image/ab67616d0000b273b320cc6ed979409ad43a392a"
        preview_url="https://p.scdn.co/mp3-preview/140447283456ba393662596d1887eec8b0368ed6?cid=29d33fdb998a4df5b1f7b5f0aefcada2"
        
        return {
            'artist': artist,
            'song': song_name,
            'song_image': image_url,
            'preview_url': preview_url,
        }
    else:

        # randome_number is filled with 0-9 to represent the index of a random top track
        random_number = random.randint(0, 9)
    
        # track info is held and used for following four functions
        track_info=data['tracks'][random_number]
    
        # Retrieves the artist's name
        def get_artist():
            return track_info['artists'][0]['name']
    
        # Retrieves the artist's song name
        def get_song_name():
            return track_info['name']
    
        # Retrieves the url of the album image
        def get_image_url():
            return track_info['album']['images'][0]['url']
    
        # Retrieves the preview url for the song (Not all songs have preview urls)
        def get_preview_url():
            return track_info['preview_url']
        
        # Returns artist info by calling above functions
        return {
            'artist': get_artist(),
            'song': get_song_name(),
            'song_image': get_image_url(),
            'preview_url': get_preview_url(),
        }