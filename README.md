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

![image](https://github.com/Polpii/rex_Interface/blob/main/pics/screen_no_map.png?raw=true)

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
* If you want REX to build a map in real time click on **MAP BUILDER** then click on the sh file on the desktop and you'll see a 3D map creation. While creating it, you can control him with the arrows of the **MANUAL MODE**

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
* ./ws/websockify/websockify.js localhost:8081 172.21.72.168:5900 [options] SOURCE_ADDR:PORT TARGET_ADDR:PORT

Once youre on th interface you can connect yourself to the Jetson Nano by clicking on the **Map Builder**. You'll see this page: 

![image](https://github.com/Polpii/rex_Interface/blob/main/pics/screen_map_builder.png?raw=true)

On the right of the screen there is two application that will run two different scripts. The arrow one will launch the **following** mode. You'll have to enter the password and hit Enter. Then click on **DISCONNECT**, reload your page and tadaa:   

![image](https://github.com/Polpii/rex_Interface/blob/main/pics/stream_follow.png?raw=true)

Then you'll be able to use all the fonctionnalities of the Interface explained here : [REX GITHUB](https://github.com/Shkunn/TRACKIN_DVIC)

If you want to use the **MAP BUILDER** mode you have click on the **MAP BUILDER** button to see the Jetson Nano desktop (if you don't reload and click again).
Then click on the **atom** under the arrow, write the password and then click on the **RUN** button ! 

You will see a 3D pointcloud representing your environement !

You now know everything, ENJOY !
