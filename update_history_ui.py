import re

# 1. Update title color in portail.html
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()
html = html.replace('color:var(--gold);">Historique des annonces</h3>', 'color:var(--primary);">Historique des annonces</h3>')
with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update background in app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

app = re.sub(r'background:var\(--dark-2\); border:1px solid var\(--border\)', r'background:#ffffff; border:1px solid var(--border)', app)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("UI updated")
