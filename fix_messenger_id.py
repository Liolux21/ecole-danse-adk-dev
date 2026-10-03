import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('class="global-messenger-container" style="display:none;', 'id="global-messenger-container" class="global-messenger-container" style="display:none;')
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=114"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
