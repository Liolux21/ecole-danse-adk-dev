import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Gender Select in modal-add-prof
form_group_email = """              <div class="form-group">
                <label class="form-label">Email de contact</label>
                <input type="email" id="prof-email" class="form-input" required>
              </div>"""

form_group_gender = """              <div class="form-group">
                <label class="form-label">Email de contact</label>
                <input type="email" id="prof-email" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Genre</label>
                <select id="prof-gender" class="form-input" required>
                  <option value="F">Féminin (Professeure)</option>
                  <option value="M">Masculin (Professeur)</option>
                </select>
              </div>"""

if 'id="prof-gender"' not in html:
    html = html.replace(form_group_email, form_group_gender)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
