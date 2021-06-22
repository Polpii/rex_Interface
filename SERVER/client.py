# import socket

# # Define the IP address and the Port Number
# # IP    = "172.21.72.133"
# # IP    = "192.168.1.71"
# IP = "172.21.72.151"
# PORT  = 5000

# listeningAddress = (IP, PORT)

# # Create a datagram based server socket that uses IPv4 addressing scheme
# datagramSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# datagramSocket.bind(listeningAddress)

# while(True):
#     localization, sourceAddress = datagramSocket.recvfrom(128)
#     print((localization.decode()))

import socket
import json

# Define the IP address and the Port Number
IP    = "172.21.72.151"
# IP    = "192.168.1.71"
PORT  = 5000

listeningAddress = (IP, PORT)

datagramSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
datagramSocket.bind(listeningAddress)

while 1:
    localization, sourceAddress = datagramSocket.recvfrom(10000)
    str_msg = localization.decode('utf-8')
    print("STR MSG: ", str_msg)

    json_msg = json.loads(str_msg)
