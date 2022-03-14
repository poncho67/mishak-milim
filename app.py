import json
import random

import psycopg2
from flask import Flask, send_from_directory, request
from flask_cors import CORS, cross_origin

mishak_milim = Flask(__name__, static_folder='frontend/build', static_url_path='')
cors = CORS(mishak_milim)

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


def handle_post(post_request):
    if post_request.is_json:
        conn = psycopg2.connect("postgresql://yaron:postgres@localhost:5432/milim")
        cur = conn.cursor()
        data = post_request.get_json()
        cur.execute("insert into words (word) VALUES(%s)", (data['word'],))
        conn.commit()
        cur.close()
        conn.close()
        return {"message": f"word {data['word']} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}


def handle_get(get_request):
    conn = psycopg2.connect("postgresql://yaron:postgres@localhost:5432/milim")
    cur = conn.cursor()
    sql = "SELECT word FROM words ORDER BY RANDOM() LIMIT 1"
    cur.execute(sql)
    row = cur.fetchall()
    response = {
        'word': row[0][0]
    }
    cur.close()
    conn.close()
    return json.dumps(response)


@mishak_milim.route('/word', methods=['POST', 'GET'])
def handle_words():
    if request.method == 'POST':
        return handle_post(request)
    elif request.method == 'GET':
        return handle_get(request)


@mishak_milim.route('/')
def serve():
    return send_from_directory(mishak_milim.static_folder, 'index.html')


if __name__ == '__main__':
    mishak_milim.run(host='0.0.0.0')
