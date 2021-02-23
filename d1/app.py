from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Hello, world!"
    
app.run(
    port=int(os.getenv('PORT', 8080)),
    host=os.getenv('IP','0.0.0.0'),
    debug=True
    )