import requests
URL= "http://192.168.137.210:8080"
def send_post(sub_url,data):
    r = requests.post(f"{URL}{sub_url}",data)
    return r.status_code

def get(data,sub_url):
    return requests.get(f"{URL}{sub_url}")


def add_order(name,user_info,order):
    return send_post('/user/add',{"user": user_info.name,"city":user_info.city,"country":user_info.country,"address":user_info.address,"orderJSON":order})


