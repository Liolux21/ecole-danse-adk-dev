import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'''<!-- Section pour Événement Ponctuel \(Stage, Show, Pro\) -->\n\s*<div id="admin-course-event-section" style="display: none;">\n\s*<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">\n\s*<div class="form-group">\n\s*<label class="form-label">Date de début</label>\n\s*<input type="date" id="admin-course-start-date" class="form-input">\n\s*</div>\n\s*<div class="form-group">\n\s*<label class="form-label">Date de fin \(optionnelle\)</label>\n\s*<input type="date" id="admin-course-end-date" class="form-input">\n\s*</div>\n\s*</div>\n\s*</div>'''

replacement = r'''<!-- Section pour Événement Ponctuel (Stage, Show, Pro) -->
              <div id="admin-course-event-section" style="display: none;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Date de début</label>
                      <input type="date" id="admin-course-start-date" class="form-input">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Date de fin (optionnelle)</label>
                      <input type="date" id="admin-course-end-date" class="form-input">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Heure de début (opt.)</label>
                      <input type="time" id="admin-course-event-start-time" class="form-input">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Heure de fin (opt.)</label>
                      <input type="time" id="admin-course-event-end-time" class="form-input">
                    </div>
                  </div>
              </div>'''

html = re.sub(pattern, replacement, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
