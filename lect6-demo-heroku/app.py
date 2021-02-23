import os

from flask import Flask, render_template
from nyt import get_article_data

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def hello_world():
    """ Returns root endpoint HTML """

    keyword_query = 'Movie' # Change it to something you're interested in!
    article_data = get_article_data(keyword_query)

    return render_template(
        "index.html",
        topic=keyword_query,
        headlines=article_data['headlines'],
        snippets=article_data['snippets'],
    )

@app.route('/search/<user_text>')
def show_user_text(user_text):
    print(user_text)
    keyword_query = user_text
    article_data = get_article_data(keyword_query)
    headlines=article_data['headlines']
    snippets=article_data['snippets']
    return { 
         'headlines': headlines,
         'snippets': snippets
    }
    
app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)
