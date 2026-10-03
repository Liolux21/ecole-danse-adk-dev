import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the search logic in renderAdminProfs
pattern = r'const vitrineProf = window\.VITRINE_DATA && window\.VITRINE_DATA\.professeurs \? window\.VITRINE_DATA\.professeurs\[p\.firstname \|\| p\.name\] : null;'
replacement = r'''const searchName = p.firstname || (p.name ? p.name.split(' ')[0] : '');
    const vitrineProf = window.VITRINE_DATA && window.VITRINE_DATA.professeurs ? window.VITRINE_DATA.professeurs[searchName] : null;'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
