import re
data = open('js/data.js', encoding='utf-8').read()
for m in re.finditer(r"id:\s*([0-9]+).*?name:\s*['\"]([^'\"]+)['\"].*?lieu:\s*['\"]([^'\"]+)['\"]", data):
    print(m.group(1), m.group(2), '->', m.group(3))
