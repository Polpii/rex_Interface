#!/bin/bash

gnome-terminal --command="bash -c 'python3 SERVER/server.py; $SHELL'"

gnome-terminal --command="bash -c 'python3 SERVER/app_core.py --prototxt MobileNetSSD_deploy.prototxt --montageW 2 --montageH 2; $SHELL'"

gnome-terminal --command="bash -c './ws/websockify/websockify.js localhost:8081 172.21.72.126:5900; $SHELL'"