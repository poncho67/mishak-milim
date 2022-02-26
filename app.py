from flask import Flask, render_template, send_from_directory, request, jsonify, make_response
from flask_cors import CORS, cross_origin

mishak_milim = Flask(__name__, static_folder='frontend/build', static_url_path='')
cors = CORS(mishak_milim)


@mishak_milim.route('/api')
@cross_origin()
def welcome():
    return "Welcome to the API!!!"


@mishak_milim.route('/api/generate/')
@cross_origin()
def generate_word():
    return "Word"


@mishak_milim.route('/')
def serve():
    return send_from_directory(mishak_milim.static_folder, 'index.html')


if __name__ == '__main__':
    mishak_milim.run(host='0.0.0.0')
