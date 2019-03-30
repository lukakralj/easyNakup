import requests
import subprocess
import json


def fetch_raw_list(url):
    cmd = ['gcloud', 'ml','vision','detect-document', url]
    result = subprocess.Popen(cmd, 
           stdout=subprocess.PIPE, 
           stderr=subprocess.STDOUT)
    return((json.loads(result.communicate()[0].decode("utf-8"))['responses'][0]['fullTextAnnotation']['text']))

def sanitise_list(lst):
    toReturn = []
    lines = lst.split("\n")
    for line in lines:
        tokens = line.split(' ')
        quantity = -1
        item = ""
        for tkn in tokens:
            try:
                quantity = int(tkn)
            except ValueError as e:
                item += tkn + " "
        
        if (quantity == -1):
            quantity = 1
        
        item.strip()
        if (len(item) > 0):
            toReturn.append({"quantity":quantity, "item": item})
    return toReturn



def get_list(url):
    return sanitise_list(fetch_raw_list(url))
