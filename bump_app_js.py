import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update app.js cache
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=110"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
