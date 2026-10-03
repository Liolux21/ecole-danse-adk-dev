import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add filters
pattern_filters = r'<div class="data-table-container">\n\s*<div id="admin-courses-tbody"'
replacement_filters = r'''<div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
              <select id="filter-course-type" class="form-input" style="width: 200px;" onchange="renderAdminCourses()">
                <option value="all">Tous les types</option>
                <option value="regulier">Cours réguliers</option>
                <option value="pro">Cours Pro</option>
                <option value="stage">Stages</option>
                <option value="show">Shows</option>
              </select>
              <select id="filter-course-style" class="form-input" style="width: 200px;" onchange="renderAdminCourses()">
                <option value="all">Tous les pôles</option>
                <option value="classique">Classique</option>
                <option value="jazz_contemporain">Jazz / Contemporain</option>
                <option value="hiphop">Hip-Hop / Break</option>
                <option value="ragga">Ragga / Girly</option>
                <option value="eveil">Éveil / Préparatoire</option>
                <option value="adultes">Adultes</option>
                <option value="poledance">Pole Dance</option>
                <option value="compagnie">Compagnies</option>
                <option value="special">Spécial</option>
              </select>
            </div>
            <div class="data-table-container">
              <div id="admin-courses-tbody"'''

html = re.sub(pattern_filters, replacement_filters, html)

# 2. Add style dropdown in modal
pattern_modal = r'<div class="form-group">\n\s*<label class="form-label">Type d\'événement</label>'
replacement_modal = r'''<div class="form-group">
                <label class="form-label">Pôle (Style de danse)</label>
                <select id="admin-course-style" class="form-input" required>
                  <option value="classique">Classique</option>
                  <option value="jazz_contemporain">Jazz / Contemporain</option>
                  <option value="hiphop">Hip-Hop / Break</option>
                  <option value="ragga">Ragga / Girly</option>
                  <option value="eveil">Éveil / Préparatoire</option>
                  <option value="adultes">Adultes</option>
                  <option value="poledance">Pole Dance</option>
                  <option value="compagnie">Compagnies</option>
                  <option value="special">Spécial</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Type d'événement</label>'''

html = re.sub(pattern_modal, replacement_modal, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
