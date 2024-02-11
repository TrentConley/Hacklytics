import requests
url = "http://18.188.69.104:5000"

res = requests.post(url + '/upload/testname', json={"mytext":"test"})
print(res)