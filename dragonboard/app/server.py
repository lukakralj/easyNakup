from aiohttp import web
import socketio
import ProcessList as pl
import os
import time

# creates a new Async Socket IO Server
sio = socketio.AsyncServer()
# Creates a new Aiohttp Web Application
app = web.Application()



# Binds our Socket.IO server to our Web App
# instance
sio.attach(app)

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
    os.system("ffmpeg -i /dev/video2 -frames 1 " + saveTo)
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