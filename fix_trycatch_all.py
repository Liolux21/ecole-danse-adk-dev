import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

def wrap(m):
    fn = m.group(1)
    if fn == 'initInscription':
        return m.group(0) # Already wrapped
    return f"  try {{ {fn}(); }} catch(e) {{ console.error('Error in {fn}:', e); }}"

content = re.sub(r'  (init[A-Za-z0-9_]+)\(\);', wrap, content)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Wrapped all init functions")
