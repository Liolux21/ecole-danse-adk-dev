import re

for filename in ['index.html', 'portail.html']:
    with open(filename, 'r', encoding='utf-8') as f:
        html = f.read()

    html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=54"', html)
    html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=54"', html)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)
