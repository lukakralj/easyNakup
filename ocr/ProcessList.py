from ListRecognition import get_list
from ImageUpload import upload_image
import argparse

def process_list(path,name):
    return list(get_list(upload_image(path,name)))

