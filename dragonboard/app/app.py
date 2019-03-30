import tkinter as tk  
import processor

class Application(tk.Frame):       
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.master = master
        self.grid(sticky=tk.N+tk.S+tk.E+tk.W)
        
        self.createWidgets()
        self.scanText.set("SCAN")
        self.confirmButton.grid_forget()
        self.processor = processor.Processor(self)

    def createWidgets(self):
        screenW = self.master.winfo_screenwidth() - 10
        screenH = self.master.winfo_screenheight() - 70
        self.scanText = tk.StringVar()
        self.canvas = tk.Canvas(self, \
            width=int(screenW), \
            height=int(screenH * 0.85))

        self.infoLabel = self.canvas.create_text(150,150, text="Welcome!\nClick SCAN to start.")

        self.scanButton = tk.Button(self, textvariable=self.scanText, \
            height=2, width=int(screenW * 0.01), \
            command=self.onScanClick)  

        self.confirmButton = tk.Button(self, text='CONFIRM', \
            height=2, width=int(screenW * 0.01), \
            command=self.onConfirmClick)        

        self.quitButton = tk.Button(self, text='QUIT', \
            height=2, width=int(screenW * 0.01), \
            command=self.onQuitClick)   

        self.quitButton.grid(row=0, column=1, padx=10, pady=5, sticky=tk.E) 
        self.canvas.grid(row=1, column=0, columnspan=2, pady=10) 
        self.scanButton.grid(row=2, column=0, padx=10, pady=10) 
        self.confirmButton.grid(row=2, column=1, padx=10, pady=10)  

    def onScanClick(self):
        self.setInfoMessage("Scanning...")
        self.scanButton.configure(state="disabled")
        self.processor.scanImage()

    def displayList(self, rawData, displayText):
        # TODO: display list
        self.rawList = rawData
        self.setInfoMessage(displayText)
        self.scanText.set("CANCEL")
        self.scanButton.configure(state="active")
        self.scanButton.configure(command=self.onCancelClick)
        self.confirmButton.grid(row=2, column=1, padx=10, pady=10) 

    def onConfirmClick(self):
        # TODO: send
        self.onQuitClick()

    def onCancelClick(self):
        self.scanText.set("SCAN")
        self.scanButton.configure(command=self.onScanClick)
        self.confirmButton.grid_forget()
        self.setInfoMessage("Welcome!\nClick SCAN to start.")
         
    def onQuitClick(self):
        quit()

    def setInfoMessage(self, msg):
        self.canvas.itemconfigure(self.infoLabel, text=msg)

        

root = tk.Tk()
root.attributes("-fullscreen", True)
app = Application(root)               
app.master.title('Main application') 
app.mainloop() 