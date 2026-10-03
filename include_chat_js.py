import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Insert chat.js before app.js
html = html.replace(
    '<script type="module" src="js/app.js?v=',
    '<script type="module" src="js/chat.js?v=1"></script>\n  <script type="module" src="js/app.js?v='
)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
