import sys
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_line = "const password = document.getElementById('portal-password').value;"
new_line = "const password = document.getElementById('portal-password').value.trim();"
content = content.replace(old_line, new_line)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Trim added.")
