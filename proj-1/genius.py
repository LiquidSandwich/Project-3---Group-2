import requests
import os
import random
from dotenv import load_dotenv, find_dotenv
from spot import get_artist_data

# Loads API keys from .env
load_dotenv(find_dotenv())

# Function that retrieves lyrics based on artist and song name
def get_lyrics(artist, song):
    
    # URL to access Genius Search API
    SEARCH_URL = 'https://api.genius.com/search'
    
    # URL that adds query to SEARCH_URL
    NEW_URL = SEARCH_URL + "?q=" + artist + " " + song
    
    # For authorization of Genius Search API
    headers = {
        'Authorization': 'Bearer {token}'.format(token=os.getenv('CLIENT_ACCESS')),
    }
    
    # Requests for data based on search and gets it through .json
    response = requests.get(NEW_URL, headers=headers)
    data=response.json()
    
    
    # If the data cannot be dynamically loaded, then print basic data
    # Prints dummy data in the event the API cannot dynamically load data sucessfully
    # Learned how to do this from this url: https://zetcode.com/python/requests/#:~:text=Python%20requests%20getting%20status&text=200%20is%20a%20standard%20response,resource%20could%20not%20be%20found.
    if str(response.status_code) == "404":
        
        # Prints dummy lyrics in the event the API can't dynamically load data
        lyrics = "https://genius.com/Good-kid-tell-me-you-know-lyrics"
        
        return {
            'lyrics': lyrics, 
        }
    else:
        
        # Function to get url to lyrics of song
        def get_lyric_url():
            return data['response']['hits'][0]['result']['url']
    
        # Returns lyrics
        return {
            'lyrics': get_lyric_url(), 
        }

