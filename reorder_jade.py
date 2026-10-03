import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'(const VITRINE_DATA = )(\{.*?\});\n', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    data = json.loads(match.group(2))
    
    # reorder professeurs
    old_profs = data['professeurs']
    new_profs = {}
    for k, v in old_profs.items():
        if k == 'Jade':
            continue
        new_profs[k] = v
        if k == 'Charlotte':
            new_profs['Jade'] = old_profs['Jade']
            
    data['professeurs'] = new_profs
    
    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix
    
    with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
        f.write(new_js)
