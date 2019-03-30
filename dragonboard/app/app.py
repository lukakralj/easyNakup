import tkinter as tk  

class Application(tk.Frame):       
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.master = master
        self.grid(sticky=tk.N+tk.S+tk.E+tk.W)
                    
        self.createWidgets()

    def createWidgets(self):
        screenW = self.master.winfo_screenwidth()
        screenH = self.master.winfo_screenheight()
        self.canvas = tk.Canvas(self, \
            bg="red", \
            width=int(screenW * 0.95), \
            height=int(screenH * 0.85))

        self.scanButton = tk.Button(self, text='Scan', \
            height=2, width=int(screenW * 0.01), \
            command=self.quit)         

        self.quitButton = tk.Button(self, text='Quit', \
            height=2, width=int(screenW * 0.01), \
            command=self.quit)   

        self.quitButton.grid(row=0, column=2, padx=10, pady=5, sticky=tk.E) 
        self.canvas.grid(row=1, column=1, columnspan=2, padx=37, pady=10) 
        self.scanButton.grid(row=2, column=1, padx=10, pady=10)     
         

root = tk.Tk()
root.attributes("-fullscreen", True)
app = Application(root)               
app.master.title('Sample application') 
app.mainloop() 