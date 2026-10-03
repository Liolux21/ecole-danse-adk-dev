import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Using regex to group the buttons inside tab-eleves dash-header
html = re.sub(
    r'(<div class="dash-header">\s*<h3>Gestion des Élèves</h3>)\s*<button class="btn btn-primary" onclick="openAddStudentModal\(\)">\+ Ajouter un élève</button>\s*<button class="btn btn-primary" style="margin-left: 10px;" onclick="window\.exportStudentsExcel\(\)">📊 Extraire \(Excel\)</button>',
    r'\1\n              <div style="display: flex; gap: 10px; flex-wrap: wrap;">\n                <button class="btn btn-primary" onclick="window.exportStudentsExcel()">📊 Extraire (Excel)</button>\n                <button class="btn btn-primary" onclick="openAddStudentModal()">+ Ajouter un élève</button>\n              </div>',
    html
)

# In case the exact spacing varies:
html = re.sub(
    r'<button class="btn btn-primary" onclick="openAddStudentModal\(\)">\+ Ajouter un élève</button>\s*<button class="btn btn-primary"[^>]*onclick="window\.exportStudentsExcel\(\)">.*?Extraire \(Excel\)</button>',
    r'<div style="display: flex; gap: 10px; flex-wrap: wrap;">\n                <button class="btn btn-primary" onclick="window.exportStudentsExcel()">📊 Extraire (Excel)</button>\n                <button class="btn btn-primary" onclick="openAddStudentModal()">+ Ajouter un élève</button>\n              </div>',
    html
)

# Let's bump cache version so they don't have to clear cache every time (wait, this is HTML, HTML cache clears with F5)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=26"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
