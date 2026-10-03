import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Export Button to the "Elèves" Tab Header
eleves_header_pattern = r'(<h2 class="dash-section-title">Base de donn.*?es Ǹl.*?ves</h2>)'
if 'Export Excel' not in html:
    html = re.sub(
        r'(<div class="dash-header-right"[^>]*>\s*<button class="btn btn-primary" onclick="openAddStudentModal\(\)">\+ Ajouter</button>\s*</div>)',
        r'\1\n        <button class="btn btn-outline" style="margin-left: 10px;" onclick="window.exportStudentsExcel()">📊 Extraire (Excel)</button>',
        html
    )

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
