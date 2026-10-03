import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<button class="btn btn-outline" style="margin-right:0\.5rem;" onclick="openModal\(\'modal-gala-themes\'\); window\.renderGalaThemes\(\);">🎭 Gérer les thèmes</button>'
replacement = r'<button class="btn btn-primary" style="margin-right:0.5rem;" onclick="openModal(\'modal-gala-themes\'); window.renderGalaThemes();">🎭 Gérer les thèmes</button>'
html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
