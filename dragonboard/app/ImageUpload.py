import pyimgur
import os



CLIENT_ID = "cf2ef4b3e55ca0b"

def upload_image(img_path, timestamp):
    im = pyimgur.Imgur(CLIENT_ID)
    PATH = os.path.abspath(img_path)
    uploaded_image = im.upload_image(PATH, title=timestamp)
    return uploaded_image.link


print(upload_image('./AlvaroRausell.jpg',"Alvarooo"))