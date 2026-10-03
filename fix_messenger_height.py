import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix left header
html = html.replace('min-height: 75px;', 'height: 85px;')
html = html.replace('src="js/chat.js?v=11"', 'src="js/chat.js?v=12"')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
