import re

# Update Alain avatar in vitrine-data.js
with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = re.sub(r'("Alain": \{.*?"avatar": ").*?(",)', r'\1assets/images/alain.png\2', js, flags=re.DOTALL)
js = re.sub(r'("Alain": \{.*?"modalImage": ").*?(",)', r'\1assets/images/alain.png\2', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Update index.html cache
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=30"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=30"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=85"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Update portail.html cache
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=30"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=30"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=85"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
