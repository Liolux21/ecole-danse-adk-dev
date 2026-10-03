import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Export Button
html = re.sub(
    r'(<button class="btn btn-primary" onclick="openAddStudentModal\(\)">\+ Ajouter un [^<]+</button>)',
    r'\1\n              <button class="btn btn-outline" style="margin-left: 10px;" onclick="window.exportStudentsExcel()">📊 Extraire (Excel)</button>',
    html
)

# Bump script version again
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=22"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
