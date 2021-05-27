from flask import Flask, redirect, url_for, request, jsonify
import socket
from flask_cors import CORS

# IP   = "172.21.72.149";
IP   = "172.21.72.151";
PORT = 5000

app = Flask(__name__)
CORS(app)

@app.route('/<coordinates>')
def navigation(coordinates):
    byte_message = coordinates.encode()
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as opened_socket:
        opened_socket.sendto(byte_message, (IP, PORT))
    return jsonify(hello='world')

if __name__ == '__main__':
    app.run(debug=True)
