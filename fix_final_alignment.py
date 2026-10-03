import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make both headers EXACTLY 75px
left_pattern = r'<div style="padding: 1rem; border-bottom: 1px solid var\(--border\); background: #fff; display: flex; justify-content: space-between; align-items: center;.*?">'
left_replacement = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); background: #fff; display: flex; justify-content: space-between; align-items: center; height: 75px; box-sizing: border-box;">'
html = re.sub(left_pattern, left_replacement, html)

right_pattern = r'<div style="padding: 1rem; border-bottom: 1px solid var\(--border\); display: flex; align-items: center; justify-content: space-between; height: \d+px; box-sizing: border-box;">'
right_replacement = '<div style="padding: 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; height: 75px; box-sizing: border-box;">'
html = re.sub(right_pattern, right_replacement, html)

# Align messages to right (me) and left (other) in CSS
with open('css/style.css', 'r', encoding='utf-8') as cssf:
    css = cssf.read()

css = re.sub(r'\.msg-row\.me \{\s*justify-content:.*?;?\s*\}', '.msg-row.me { justify-content: flex-end !important; }', css)
css = re.sub(r'\.msg-row\.other \{\s*justify-content:.*?;?\s*\}', '.msg-row.other { justify-content: flex-start !important; }', css)

with open('css/style.css', 'w', encoding='utf-8') as cssf:
    cssf.write(css)

# Remove the ugly banner and put a clean discreet text inside the chat area
banner_html = """      <!-- Warning Banner -->
      <div style="background: #F0D5D5; padding: 0.5rem; text-align: center; font-size: 0.75rem; color: #4A3E3E; border-bottom: 1px solid var(--border);">
        ⚠️ Toutes les communications sont visibles par l'administration.
      </div>"""
html = html.replace(banner_html, "")

# We will inject the disclaimer dynamically inside the chat area in chat.js
with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
