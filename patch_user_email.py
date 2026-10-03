import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_logic = 'const userEmail = (user.email || "").toLowerCase().trim();'
new_logic = 'const userEmail = (user.email || user.id || "").toLowerCase().trim();'

content = content.replace(old_logic, new_logic)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched userEmail extraction')
