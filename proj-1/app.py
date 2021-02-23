import os
from flask import Flask, render_template
from spot import get_artist_data
from genius import get_lyrics

# Creates instance of Flask class, creates application
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Endpoint for the application
@app.route('/')

def hello_world():
    
    # Fetches artist data from function in spot.py
    artist_data=get_artist_data()
    
    # Fetches lyrics based on artist and song name from artist data
    genius_data=get_lyrics(artist_data['artist'], artist_data['song'])
    
    # Checks to see if url is of type None (Empty)
    if artist_data['preview_url'] is None:
        url="Empty"
    else:
        url=artist_data['preview_url']
    
    # For index.html, gives data to render HTML
    return render_template(
        "index.html",
        artist=artist_data['artist'],
        song=artist_data['song'],
        song_image=artist_data['song_image'],
        preview_url=url,
        lyrics=genius_data['lyrics'],
    )

# Runs application server
# debug for debugging and reloading
app.run(
    port=int(os.getenv('PORT', 8080)),
    host=os.getenv('IP','0.0.0.0'),
    debug=True
    )