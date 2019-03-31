import pyimgur
import os



CLIENT_ID = "b47aa358815866d"

def upload_image(img_path, timestamp):
    im = pyimgur.Imgur(CLIENT_ID)
    PATH = os.path.abspath(img_path)
    uploaded_image = im.upload_image(PATH, title=timestamp)

    return uploaded_image.link


