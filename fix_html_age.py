import re
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Age field using Regex
html = re.sub(
    r'<div class="form-group">\s*<label class="form-label">.*?ge</label>\s*<input type="number" id="add-student-age".*?</div>',
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
    html, flags=re.DOTALL
)

# Bump script version
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=21"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
