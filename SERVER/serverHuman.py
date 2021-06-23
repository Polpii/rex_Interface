# force a mode else, the best mode is selected automatically from what's
# installed
async_mode = None

from flask import Flask, render_template
import socketio
import json
import numpy as np

sio = socketio.Server(async_mode='threading', cors_allowed_origins='*')
app = Flask(__name__)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

# sio = socketio.Server(cors_allowed_origins='*')


@app.route('/')
def index():
    return render_template('latency.html')


@sio.event
def ping_from_client(sid):
    
    myDict = {}
    
    # # Adding list as value
    myDict["Human_pose"] = {}

    A = ['407', '94', '709', '508']

    mat = np.array([])
    mat = np.append(mat, A)



    mat_tolist = mat.tolist()

    myDict["Human_pose"]["0"] = mat_tolist

    b = json.dumps(myDict)

    print("B: ", b)

    
    sio.emit('pong_from_server', b, room=sid)


if __name__ == '__main__':
    if sio.async_mode == 'threading':
        # deploy with Werkzeug
        # app.run(threaded=True)
        app.run(host='172.21.72.151', 
            port=5000)
        
        print("HELLOO")
    else:
        print('Unknown async_mode: ' + sio.async_mode)

    print("MANANAN")