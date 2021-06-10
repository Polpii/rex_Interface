#!/bin/bash

gnome-terminal --command="bash -c 'python3 SERVER/server.py; $SHELL'"

gnome-terminal --command="bash -c 'python3 SERVER/app_core.py --prototxt MobileNetSSD_deploy.prototxt --montageW 2 --montageH 2; $SHELL'"

gnome-terminal --command="bash -c './../websockify-js/websockify/websockify.js localhost:8081 172.21.72.168:5900; $SHELL'"