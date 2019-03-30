import threading
import os
import time

class Processor():
    
    def __init__(self, app):
        self.app = app
        self.savePath = "./scans/"

    def scanImage(self):
        self.processThread = threading.Thread(target=self.run)
        self.processThread.start()

    def run(self):
        file = self.savePath + "scan_" + self.getFileName() + ".jpg"
        line= ""
        for i in (0,3):
            dev = "/dev/video" + str(i)
            os.system("ffmpeg -i " + dev + " -frames 1 " + file + " > log.txt")
            log = os.open("./log.txt")
            lines = log.readlines()
            if (lines[len(lines)-1] == dev + ": No such device"):
                print("Failed for: " + dev)
                log.close()
                pass
            else:
                log.close()
                break

        self.app.displayList(lines)

    def getFileName(self):
        timeStruct = time.strptime(time.ctime())
        return \
            self.padLeft(timeStruct.tm_year) + \
            self.padLeft(timeStruct.tm_mon) + \
            self.padLeft(timeStruct.tm_mday) + "_" + \
            self.padLeft(timeStruct.tm_hour) + \
            self.padLeft(timeStruct.tm_min) + \
            self.padLeft(timeStruct.tm_sec)

    def padLeft(self, num):
        if num < 10:
            return "0" + str(num)
        else:
            return str(num)


