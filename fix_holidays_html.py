import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'''<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end;">\n\s*<div class="form-group" style="flex: 1; min-width: 150px; margin-bottom: 0;">\n\s*<label class="form-label">Nom \(ex: Toussaint\)</label>\n\s*<input type="text" id="new-holiday-name" class="form-input">\n\s*</div>\n\s*<div class="form-group" style="flex: 1; min-width: 120px; margin-bottom: 0;">\n\s*<label class="form-label">Début</label>\n\s*<input type="date" id="new-holiday-start" class="form-input">\n\s*</div>\n\s*<div class="form-group" style="flex: 1; min-width: 120px; margin-bottom: 0;">\n\s*<label class="form-label">Fin</label>\n\s*<input type="date" id="new-holiday-end" class="form-input">\n\s*</div>\n\s*<button class="btn btn-outline" onclick="addHoliday\(\)" style="margin-top: 1rem;">\+ Ajouter</button>\n\s*</div>'''

replacement = r'''<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                <div class="form-group" style="flex: 1; min-width: 100%;">
                  <label class="form-label">Nom (ex: Toussaint)</label>
                  <input type="text" id="new-holiday-name" class="form-input">
                </div>
                <div class="form-group" style="flex: 1; min-width: 200px;">
                  <label class="form-label">Début</label>
                  <input type="date" id="new-holiday-start" class="form-input">
                </div>
                <div class="form-group" style="flex: 1; min-width: 200px;">
                  <label class="form-label">Fin</label>
                  <input type="date" id="new-holiday-end" class="form-input">
                </div>
              </div>
              <button class="btn btn-primary" onclick="addHoliday()" style="margin-top: 0.5rem;">+ Ajouter</button>'''

html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
