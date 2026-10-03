import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=116"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
