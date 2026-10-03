import re

# Update index.html cache
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'href="css/style.css\?v=\d+"', 'href="css/style.css?v=57"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Update portail.html cache
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'href="css/style.css\?v=\d+"', 'href="css/style.css?v=57"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
