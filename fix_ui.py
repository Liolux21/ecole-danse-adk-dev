import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix the title color to #9C5858
html = html.replace('color:var(--primary);', 'color:#9C5858;')

# Re-write the Annonces button to be 100% identical in structure to others
old_button = r'<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>'
new_button = r'<button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>'
html = re.sub(old_button, new_button, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html fixed')
