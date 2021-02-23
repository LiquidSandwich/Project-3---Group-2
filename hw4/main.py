from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def hello_world():
    print("Updated printline")
    lst=["Naruto", "Attack On Titan", "The Office", "The Mandalorian", "Breaking Bad"]
    url_lst = ["https://images-na.ssl-images-amazon.com/images/I/81g1x5bk2zL.jpg", 
    "https://img3.hulu.com/user/v3/artwork/9c91ffa3-dc20-48bf-8bc5-692e37c76d88?base_image_bucket_name=image_manager&base_image=747157b1-4581-414a-959f-c4956ebc3349&region=US&format=jpeg&size=952x536",
    "https://upload.wikimedia.org/wikipedia/en/5/58/TheOffice_S7_DVD.jpg", 
    "https://m.media-amazon.com/images/M/MV5BZDhlMzY0ZGItZTcyNS00ZTAxLWIyMmYtZGQ2ODg5OWZiYmJkXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg", 
    "https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"]
    return render_template(
        "index.html",
        tv_shows = lst,
        length = len(lst),
        url = url_lst
    )
    
app.run(
    port=int(os.getenv('PORT', 8080)),
    host=os.getenv('IP','0.0.0.0'),
    debug=True
    )