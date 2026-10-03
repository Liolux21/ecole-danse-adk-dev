import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove white-space: pre-wrap from modal-dynamic-content parent
html = html.replace(
    'id="modal-dynamic-content" style="color: var(--text-light); line-height: 1.5; white-space: pre-wrap;"',
    'id="modal-dynamic-content" style="color: var(--text-light); line-height: 1.5;"'
)

# 2. Add white-space: pre-wrap to the <p> containing ${data.content}
html = html.replace(
    '<p style="font-size: 0.95rem; line-height: 1.5; margin: 0; color: var(--text-light); text-align: justify;">${data.content}</p>',
    '<p style="font-size: 0.95rem; line-height: 1.5; margin: 0; color: var(--text-light); text-align: justify; white-space: pre-wrap;">${data.content}</p>'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
