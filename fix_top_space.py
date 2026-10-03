import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'(<section id="parents" class="vitrine-section" style="min-height: calc\(100vh - 80px - 250px\); display: flex; flex-direction: column;) justify-content: center; padding-top: 1\.5rem;"'
replacement = r'\1 justify-content: flex-start; padding-top: 1.5rem;"'

html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
