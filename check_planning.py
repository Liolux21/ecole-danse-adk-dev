import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

m = re.search(r'id="tab-parent-planning".*?id="parent-child-name"', html, re.DOTALL)
if m: print(m.group(0))
