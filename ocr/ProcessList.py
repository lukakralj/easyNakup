from ListRecognition import get_list
from ImageUpload import upload_image
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-i',dest="image")
img_path = parser.parse_args().image

def process_list(path):
    return list(get_list(upload_image(path,'Hellooo')))