import re

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'js/chat\.js\?v=\d+', 'js/chat.js?v=50', content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Bumped cache safely.")
