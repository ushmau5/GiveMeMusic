from flask import Flask
from flask_cors import CORS
from mp3py.api import api

app = Flask(__name__)
CORS(app)
api.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)