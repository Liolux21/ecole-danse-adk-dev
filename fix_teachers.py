import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix Margaux_1 -> Margaux
js = js.replace('"Margaux_1": {', '"Margaux": {')

# Remove Margaux_2
js = re.sub(r'"Margaux_2": \{.*?\},\n    ', '', js, flags=re.DOTALL)

# Remove M?gan (whatever it was)
js = re.sub(r'"M\uFFFDgan": \{.*?\},\n    ', '', js, flags=re.DOTALL)
js = re.sub(r'"M.*gan": \{.*?\},\n    ', '', js, flags=re.DOTALL)

# Remove Sylvie
js = re.sub(r'"Sylvie": \{.*?\},\n    ', '', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
