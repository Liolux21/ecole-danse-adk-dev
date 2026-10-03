import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

def add_save_call(pattern):
    return re.sub(pattern, r'\1\n  window.saveGalaToFirebase();', js, flags=re.DOTALL)

# 1. saveGalaRep
js = add_save_call(r'(window\.saveGalaRep = function\(\) \{.*?renderGalaTables\(\);\n\s*\})')
js = add_save_call(r'(window\.deleteGalaRep = function\(id\) \{.*?renderGalaTables\(\);\n\s*\})')

# 2. saveGalaInfo
js = add_save_call(r'(window\.saveGalaInfo = function\(\) \{.*?renderGalaTables\(\);\n\s*\})')
js = add_save_call(r'(window\.deleteGalaInfo = function\(id\) \{.*?renderGalaTables\(\);\n\s*\})')

# 3. saveGalaNote
js = add_save_call(r'(window\.saveGalaNote = function\(\) \{.*?renderGalaTables\(\);\n\s*\})')
js = add_save_call(r'(window\.deleteGalaNote = function\(id\) \{.*?renderGalaTables\(\);\n\s*\})')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
