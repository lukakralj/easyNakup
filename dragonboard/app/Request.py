import requests
URL= "http://192.168.137.210:8080"
def send_post(sub_url,data):
    r = requests.post(f"{URL}{sub_url}",data)
    print(r.status_code, r.reason)

def get(data,sub_url):
    r = requests.get(f"{URL}{sub_url}")


def add_order(name,data):
    return send_post('/user/add',{"user": 'urmom',"email":'urmomgay690@gmail.com',"address":'town hall ',"orderJSON":"{\"shegay\":\"69 packs\"}"})


add_user(2)