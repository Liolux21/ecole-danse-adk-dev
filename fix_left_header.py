import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_left_header = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center;">\n          <h3 style="margin:0; font-size: 1.1rem; color: var(--gold);">Conversations</h3>'
new_left_header = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center; height: 85px; box-sizing: border-box;">\n          <h3 style="margin:0; font-size: 1.1rem; color: var(--gold);">Conversations</h3>'

html = html.replace(old_left_header, new_left_header)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
