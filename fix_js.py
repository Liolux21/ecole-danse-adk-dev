import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

for key in ['girly', 'breakdance', 'streetjazz', 'poledance', 'pomdance']:
    pattern = r'(\"' + key + r'\"[\s\S]*?\"content\":\s*)\"([\s\S]*?)\"(\s*\})'
    js = re.sub(pattern, r'\1`\2`\3', js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
