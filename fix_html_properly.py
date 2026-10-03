import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Export Button
html = html.replace(
    '<button class="btn btn-primary" onclick="openAddStudentModal()">+ Ajouter un élève</button>',
    '<button class="btn btn-primary" onclick="openAddStudentModal()">+ Ajouter un élève</button>\n              <button class="btn btn-outline" style="margin-left: 10px;" onclick="window.exportStudentsExcel()">📊 Extraire (Excel)</button>'
)

# 2. Age -> DOB + Tutors
# Use regex safely WITHOUT DOTALL, just matching the exact div
html = re.sub(
    r'<div class="form-group">\s*<label class="form-label">.*?ge</label>\s*<input type="number" id="add-student-age" class="form-input" required>\s*</div>',
    """<div class="form-group">
              <label class="form-label">Date de naissance</label>
              <input type="date" id="add-student-dob" class="form-input" required>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Prénom tuteur</label>
                <input type="text" id="add-student-tutor-firstname" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Nom tuteur</label>
                <input type="text" id="add-student-tutor-lastname" class="form-input" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Téléphone tuteur</label>
              <input type="tel" id="add-student-tutor-phone" class="form-input" required>
            </div>""",
    html
)

# 3. Bump version
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=23"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
