import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove Line Dance course (id 26)
js = re.sub(r"\s*\{ id: 26, style: 'adultes', name: 'Line Dance'.*?\},", "", js)

# Remove Alain from profs
# "Alain": { ... },
js = re.sub(r'\s*"Alain":\s*\{[^}]+\},', "", js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
