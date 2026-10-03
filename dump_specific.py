import re
import json

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'const VITRINE_DATA = (\{.*?\});\n', js, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    for k, v in data['professeurs'].items():
        if k in ['Margaux', 'Margaux2', 'Sylvie', 'Megan', 'Jade', 'Corentin', 'Alain']:
            print(k, v.get('category'), v.get('content')[:150])
