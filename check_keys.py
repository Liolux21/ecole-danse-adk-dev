import re
with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'"cours":\s*\{(.*?)\},\s*"professeurs":', js, re.DOTALL)
if match:
    cours_str = match.group(1)
    keys = re.findall(r'"([a-zA-Z0-9_]+)":\s*\{', cours_str)
    print('Current keys:', keys)
