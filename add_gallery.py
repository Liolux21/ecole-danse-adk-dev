import json
import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'(const VITRINE_DATA = )(\{.*\});', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    
    data = json.loads(match.group(2))
    
    data['gallery'] = {
        "eveil": [
            "assets/images/eveil_3_4_ans.png",
            "assets/images/eveil_kids.png",
            "assets/images/dance_ballet.png",
            "assets/images/dance_jazz.png",
            "assets/images/ragga_dancer.png",
            "assets/images/hiphop_dancer.png"
        ]
    }
    
    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(new_js)
