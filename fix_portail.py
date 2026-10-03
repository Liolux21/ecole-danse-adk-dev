import re

# 1. Add vitrine-data.js to portail.html
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<script type="module" src="js/data.js?v=54"></script>', '<script src="js/vitrine-data.js?v=3"></script>\n  <script type="module" src="js/data.js?v=54"></script>')

# 2. Change label in portail.html
html = html.replace("Email (sert d'identifiant de connexion)", "Email (sert uniquement pour les communications, l'identifiant ne change pas)")

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
