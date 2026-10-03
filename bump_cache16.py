import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/chat.js\?v=\d+"', 'src="js/chat.js?v=17"', html)
html = re.sub(r'href="css/style.css\?v=\d+"', 'href="css/style.css?v=203"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
