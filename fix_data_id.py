import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("i => i.id === id", "i => String(i.id) === String(id)")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated id comparison in data.js")
