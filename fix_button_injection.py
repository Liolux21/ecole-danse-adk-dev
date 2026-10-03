import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'(<div class="dash-header">\s*<h3>Gestion des Professeurs</h3>\s*)(<button class="btn btn-primary" onclick="openAddProfModal\(\)">\+ Ajouter un professeur</button>\s*</div>)'

replacement = r'<div class="dash-header" style="display: flex; justify-content: space-between; align-items: center;">\n              <h3 style="margin:0;">Gestion des Professeurs</h3>\n              <div style="display: flex; gap: 0.5rem;">\n                <button class="btn btn-primary" onclick="openAdminHours()">🕒 Heures Profs</button>\n                \2\n            </div>\n'

if 'openAdminHours()' not in html:
    html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
