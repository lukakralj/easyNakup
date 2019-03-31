from aiohttp import web
import socketio
import ProcessList as pl
import os
import sys
import time
from google.cloud import vision
from google.cloud.vision import types
from PIL import Image, ImageDraw

client = vision.ImageAnnotatorClient()



# creates a new Async Socket IO Server
sio = socketio.AsyncServer()
# Creates a new Aiohttp Web Application
app = web.Application()


if len(sys.argv) > 0:
    webcamIndex = sys.argv[0]
    print("Webcam index set to: " + webcamIndex)
else:
    print("No webcam index specified.")
    quit(1)

# Binds our Socket.IO server to our Web App
# instance
sio.attach(app)

@sio.on('auth')
async def auth(sid):
    savePath = "./scans/"
    filename = "faceID_" + getFileName() + ".jpg"
    saveTo = savePath + filename
    print("Scanning face...")
    os.system("ffmpeg -i /dev/video" + webcamIndex + " -frames 1 " + saveTo)
    success = True
    
    # TODO: add recognition
    mainAuth(saveTo, 1)

    print("Success: " + str(success))
    if (success):
        await sio.emit('auth_success')
    else:
        await sio.emit('auth_failed')

def detect_face(face_file, max_results=4):
    """Uses the Vision API to detect faces in the given file.

    Args:
        face_file: A file-like object containing an image with faces.

    Returns:
        An array of Face objects with information about the picture.
    """
    client = vision.ImageAnnotatorClient()

    content = face_file.read()
    image = types.Image(content=content)

    return client.face_detection(image=image, max_results=max_results).face_annotations

def mainAuth(input_filename, max_results):
    with open(input_filename, 'rb') as image:
        faces = detect_face(image, max_results)
        print(faces)


# we can define aiohttp endpoints just as we normally
# would with no change
async def index(request):
    with open('./../webApp/index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

# If we wanted to create a new websocket endpoint,
# use this decorator, passing in the name of the
# event we wish to listen out for
@sio.on('scan')
async def scan(sid):
    savePath = "./scans/"
    filename = "scan_" + getFileName() + ".jpg"
    saveTo = savePath + filename
    print("Scanning...")
    os.system("ffmpeg -i /dev/video" + webcamIndex + " -frames 1 " + saveTo)
    success = True
    list = []
    try:
        print("Scanning complete. Converting...")
        list = pl.process_list(saveTo, filename)
    except Exception as e:
        success = False
        print(e)

    print("Success: " + str(success))
    if (success):
        await sio.emit('scan_result',list)
    else:
        await sio.emit('scan_failed')

def getFileName():
    timeStruct = time.strptime(time.ctime())
    return \
        padLeft(timeStruct.tm_year) + \
        padLeft(timeStruct.tm_mon) + \
        padLeft(timeStruct.tm_mday) + "_" + \
        padLeft(timeStruct.tm_hour) + \
        padLeft(timeStruct.tm_min) + \
        padLeft(timeStruct.tm_sec)

def padLeft(num):
    if num < 10:
        return "0" + str(num)
    else:
        return str(num)

# We bind our aiohttp endpoint to our app
# router
app.router.add_get('/', index)

# We kick off our server
if __name__ == '__main__':
    web.run_app(app)