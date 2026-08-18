import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

m_prof = re.search(r'id="panel-prof".*?</header>', html, re.DOTALL)
if m_prof:
    print('PROF:\n', m_prof.group(0))

m_parent = re.search(r'id="panel-parent".*?</header>', html, re.DOTALL)
if m_parent:
    print('PARENT:\n', m_parent.group(0))
