import cv2
from imutils import build_montages
from datetime import datetime
import numpy as np
import imagezmq
import argparse
import imutils
from flask import Flask, render_template, Response

app = Flask(__name__)

def gen_frames():  # generate frame by frame from camera
    # construct the argument parser and parse the arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-p", "--prototxt", required=True,
        help="path to Caffe 'deploy' prototxt file")
    ap.add_argument("-mW", "--montageW", required=True, type=int,
        help="montage frame width")
    ap.add_argument("-mH", "--montageH", required=True, type=int,
        help="montage frame height")
    args = vars(ap.parse_args())

    # initialize the ImageHub object
    imageHub = imagezmq.ImageHub()

    # initialize the dictionary which will contain  information regarding
    # when a device was last active, then store the last time the check
    # was made was now
    lastActive = {}
    lastActiveCheck = datetime.now()
    # stores the estimated number of Pis, active checking period, and
    # calculates the duration seconds to wait before making a check to
    # see if a device was active
    ESTIMATED_NUM_PIS = 4
    ACTIVE_CHECK_PERIOD = 10
    ACTIVE_CHECK_SECONDS = ESTIMATED_NUM_PIS * ACTIVE_CHECK_PERIOD
    # assign montage width and height so we can view all incoming frames
    # in a single "dashboard"
    mW = args["montageW"]
    mH = args["montageH"]

    while True:
        # Capture frame-by-frame
        (rpiName, frame) = imageHub.recv_image()
        imageHub.send_reply(b'OK')

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed')
def video_feed():
    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='172.21.72.133', 
            port=4444)
