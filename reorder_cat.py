import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'(const VITRINE_DATA = )(\{.*\});', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    
    data = json.loads(match.group(2))
    
    # Reorder cours
    order = [
        'eveil',
        'classique',
        'ballet_pointes',
        'jazz_contemporain',
        'hiphop',
        'ragga',
        'girly',
        'breakdance',
        'streetjazz',
        'adultes',
        'poledance',
        'pomdance',
        'compagnie',
        'special'
    ]
    
    ordered_cours = {}
    for key in order:
        if key in data['cours']:
            ordered_cours[key] = data['cours'][key]
            
    # Add any missing keys
    for key in data['cours']:
        if key not in ordered_cours:
            ordered_cours[key] = data['cours'][key]
            
    data['cours'] = ordered_cours
    
    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix
    js = new_js

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
