import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the HTML block
old_card = """          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👟 Cours enseignés :</strong> ${coursesNames || '-'}</div>
          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👟 Cours suivis :</strong> ${takenCourses || '-'}</div>"""

new_card = """          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👩‍🏫 Cours enseignés :</strong> ${coursesNames || '-'}</div>"""
js = js.replace(old_card, new_card)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
