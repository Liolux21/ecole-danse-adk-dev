import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=29"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=29"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=84"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
