# rex_interface

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

This **interface** allows you to control **REX**, the following robot of the DVIC. YOu can find more info on its github here <https://github.com/Shkunn/TRACKIN_DVIC>

This is what the interface looks like :

![image](https://github.com/Polpii/rex_Interface/blob/main/pics/interface.png?raw=true)

You can use the interface to interact with REX with the different buttons:
* **FOLLOW ME**
* **WAIT**
* **GO HOME**
* **MANUAL MODE**
* **FIX ON**
* **UNFIX**
* **MAP BUILDER**

### HOW TO USE IT ?

There is four main modes. 
* If you want REX to follow you, you'll have to write the id of the person you want to follow next to **FIX ON** and then click on **FOLLOW ME**. If you want to follow another person, simply **UNFIX** and **FIX ON** someone else.
* After following someone, REX can return home autonomously by clicking on the **GO HOME** button
* If you want to control manually the robot you have to select **MANUAL MODE** and then arrows will appear to control REX
* IF you want REX to build a map in real time click on **MAP BUILDER** then click on the sh file on the desktop and you'll see a 3D map creation. WHile creating it, you can control him with the arrows of the **MANUAL MODE**

### HOW TO LAUNCH THE DEMO

You'll have to run four different codes in four bash:

**First the website:**
```
yarn serve
```

**RUN THE SERVERS**
To run the tree different servers you just have:
```
cd ws
npm install
cd ..
chmod +x launch_server.sh
./launch_server.sh
```

This will launch this three servers:
* SERVER/server.py
* SERVER/app_core.py --prototxt MobileNetSSD_deploy.prototxt --montageW 2 --montageH 2
* ./ws/websockify.js localhost:8081 172.21.72.168:5900 [options] SOURCE_ADDR:PORT TARGET_ADDR:PORT
