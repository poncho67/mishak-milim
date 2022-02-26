from flask import Flask, render_template, send_from_directory, request, jsonify, make_response
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
cors = CORS(app)


@app.route('/api')
@cross_origin()
def welcome():
    return "Welcome to the API!!!"


@app.route('/api/generate/')
@cross_origin()
def generate_word():
    return "Word"


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
