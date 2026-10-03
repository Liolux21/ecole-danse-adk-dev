import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("messenger.style.display = 'block';", "messenger.style.display = 'flex';")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
