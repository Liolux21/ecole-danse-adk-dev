
with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('?v=11', '?v=12')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)

