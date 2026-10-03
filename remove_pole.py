import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('Tous les pôles', 'Tous les styles')
html = html.replace('Pôle (Style de danse)', 'Style de danse')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
