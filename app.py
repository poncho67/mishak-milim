import json
import random

from flask import Flask, send_from_directory, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

mishak_milim = Flask(__name__, static_folder='frontend/build', static_url_path='')
mishak_milim.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://yaron:postgres@localhost:5432/milim"
mishak_milim.config['SQLALCHEMY_ENGINE_OPTIONS'] = False
db = SQLAlchemy(mishak_milim)
migrate = Migrate(mishak_milim, db)
cors = CORS(mishak_milim)



class WordsModel(db.Model):
    __tablename__ = 'words'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String())

    def __init__(self, word):
        self.word = word

    def __repr__(self):
        return f"<Word {self.word}>"


words = ["לילו", "שירו", "אוגר", "חתול", "כלב"]


@mishak_milim.route('/api/generate/')
@cross_origin()
def generate_word():

    n = random.randint(0, len(words) - 1)
    response = {
        'word': words[n]
    }
    return json.dumps(response)


@mishak_milim.route('/api')
@cross_origin()
def welcome():
    return "Welcome to the API!!!"


@mishak_milim.route('/word', methods=['POST', 'GET'])
def handle_cars():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_word = WordsModel(word=data['word'])
            db.session.add(new_word)
            db.session.commit()
            return {"message": f"word {new_word.word} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        all_words = WordsModel.query.all()
        n = random.randint(0, len(all_words) - 1)
        response = {
            'word': all_words[n].word
        }
        return json.dumps(response)


@mishak_milim.route('/')
def serve():
    return send_from_directory(mishak_milim.static_folder, 'index.html')


if __name__ == '__main__':
    mishak_milim.run(host='0.0.0.0')
