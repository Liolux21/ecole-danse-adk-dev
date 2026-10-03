import json, re
with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'const VITRINE_DATA = (\{.*?\});\n', js, re.DOTALL)
if match:
    data = json.loads(match.group(1))
    print(list(data['professeurs'].keys()))
