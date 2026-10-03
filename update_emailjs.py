import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('"service_jooqt2m"', '"service_ADK"')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
