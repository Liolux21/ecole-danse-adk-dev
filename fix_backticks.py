with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('`', '"')

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
