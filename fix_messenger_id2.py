import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('id="global-messenger-container" id="global-messenger-container"', 'id="global-messenger-container"')
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=115"', html)
html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=8"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
