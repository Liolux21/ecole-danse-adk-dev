import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update Sylvie category
js = re.sub(r'("Sylvie": \{.*?)"category": "Kinésithérapeute accompagnatrice"', 
            r'\1"category": "Kinésithérapeute accompagnatrice des compagnies et professeurs"', js, flags=re.DOTALL)

# Update Megan category
js = re.sub(r'("Mégan": \{.*?)"category": "Responsable décoration scénique"', 
            r'\1"category": "Responsable décoration scénique, créatrice artistique des décors"', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Bump index.html cache
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=34"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=34"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=89"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Bump portail.html cache
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=34"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=34"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=89"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
