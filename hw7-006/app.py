import os
import datetime
import random
from flask import Flask, render_template

app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0

@app.route("/")
def index():
    professor = "Professor Agrawal"
    t = datetime.datetime.now()
    date = "Today is "+ t.strftime("%A") + " " + t.strftime("%B") + " " + t.strftime("%d") + ", " + t.strftime("%Y")
    number=random.randint(1,10)
    return render_template(
        "index.html",
        professor=professor,
        date = date,
        number=number
    )

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug = False
)

