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
    return map(lambda line: {"quantity": ' '.join(line.split(' ')[0:-1]),"item":line.split(' ')[-1]},lst.split('\n')[:-1])

def get_list(url):
    return sanitise_list(fetch_raw_list(url))
