import json
import os
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
    return handle_get()


@mishak_milim.route('/word', methods=['POST', 'GET'])
def handle_words():
    if request.method == 'POST':
        return handle_post(request)
    elif request.method == 'GET':
        return handle_get()


def handle_post(post_request):
    if post_request.is_json:
        database_url = os.getenv('DATABASE_URL')
        print(f"handle_post database url: {database_url}")
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        data = post_request.get_json()
        cur.execute("insert into words (word) VALUES(%s)", (data['word'],))
        conn.commit()
        cur.close()
        conn.close()
        return {"message": f"word {data['word']} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}


def handle_get():
    database_url = os.getenv('DATABASE_URL')
    print(f"handle_get database url: {database_url}")
    conn = psycopg2.connect(database_url)
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


@mishak_milim.route('/')
def serve():
    return send_from_directory(mishak_milim.static_folder, 'index.html')


if __name__ == '__main__':
    mishak_milim.run(host='0.0.0.0')
