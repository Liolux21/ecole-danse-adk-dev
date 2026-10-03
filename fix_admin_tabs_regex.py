import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the menu using regex
# Look for data-tab="profs"
pattern = r'(<button class="dash-tab" data-tab="profs">.*?Professeurs</button>)'
replacement = r'\1\n          <button class="dash-tab" data-tab="admin-hours">🕒 Heures Profs</button>'

if 'data-tab="admin-hours"' not in html:
    html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
