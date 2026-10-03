import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

tags = set(re.findall(r'\"tag\": \"(.*?)\"', js))
print(tags)
