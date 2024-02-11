import requests
url = "http://18.188.69.104:5000"

res = requests.get(url + '/debug')
print(res)