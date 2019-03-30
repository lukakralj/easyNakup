import threading
import os
import time
import ocr.ProcessList as pl

class Processor():
    
    def __init__(self, app):
        self.app = app
        self.savePath = "./scans/"

    def scanImage(self):
        self.processThread = threading.Thread(target=self.run)
        self.processThread.start()

    def run(self):
        filename = "scan_" + self.getFileName() + ".jpg"
        saveTo = self.savePath + filename
        os.system("ffmpeg -i /dev/video2 -frames 1 " + saveTo)
        self.app.setInfoMessage("Scanning complete. Converting...")
        list = pl.process_list(self.savePath, filename)
        self.app.displayList(list)

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


