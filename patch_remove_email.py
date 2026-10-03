import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "document.getElementById('parent-name').textContent = (user.name || 'Parent') + ' [' + (user.email || 'Email introuvable') + ']';"
new_str = "document.getElementById('parent-name').textContent = user.name || 'Parent';"

content = content.replace(old_str, new_str)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed email display from parent dashboard header")
