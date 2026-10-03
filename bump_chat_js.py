import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=2"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=111"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
