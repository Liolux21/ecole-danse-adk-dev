import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

m1 = re.search(r'id="prof-tabs".*?</button>\s*</div>', html, re.DOTALL)
if m1:
    print('PROF:', m1.group(0))

m2 = re.search(r'id="parent-tabs".*?</button>\s*</div>', html, re.DOTALL)
if m2:
    print('PARENT:', m2.group(0))
