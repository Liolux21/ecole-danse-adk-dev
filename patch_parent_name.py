import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "document.getElementById('parent-name').textContent = user.name;"
new_str = "document.getElementById('parent-name').textContent = (user.name || 'Parent') + ' [' + (user.email || 'Email introuvable') + ']';"

content = content.replace(old_str, new_str)

# Also let's loosen the hack in data.js to include BOTH emails just in case
with open('js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

old_hack = "if (userEmail === 'lamottemegan3@gmail.com') {"
new_hack = "if (userEmail === 'lamottemegan3@gmail.com' || userEmail === 'lamottemegan@gmail.com' || userEmail.includes('lamotte')) {"

data_content = data_content.replace(old_hack, new_hack)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

print('Patched app and data')
