import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern_html = r'<div class="form-group">\n\s*<label class="form-label">Nom du cours</label>\n\s*<input type="text" id="admin-course-name" class="form-control" required>\n\s*</div>'

replacement_html = r'''<div class="form-group">
              <label class="form-label">Nom du cours / événement</label>
              <input type="text" id="admin-course-name" class="form-control" required>
            </div>
            <div class="form-group">
              <label class="form-label">Type d'événement</label>
              <select id="admin-course-type" class="form-control" required>
                <option value="regulier">Cours régulier</option>
                <option value="pro">Cours Pro (Prioritaire)</option>
                <option value="stage">Stage (Prioritaire)</option>
                <option value="show">Show (Prioritaire)</option>
              </select>
            </div>'''

html = re.sub(pattern_html, replacement_html, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
