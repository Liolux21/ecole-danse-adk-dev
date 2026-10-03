import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Répétition: select for lieu
pattern_lieu = r'<input type="text" id="gala-rep-lieu" class="form-input" required>'
replacement_lieu = r'''<select id="gala-rep-lieu" class="form-input" required>
                <option value="ADK">ADK</option>
                <option value="ROX">ROX</option>
                <option value="Centre Culturel">Centre Culturel</option>
                <option value="Autre">Autre</option>
              </select>'''
html = re.sub(pattern_lieu, replacement_lieu, html)

# 2. Supprimer Tenues pour l'Admin
pattern_tenues_mobile = r'<option value="admin-gala-tenues">👕 Tenues</option>'
html = re.sub(pattern_tenues_mobile, '', html)

pattern_tenues_desktop = r'<button class="btn btn-outline btn-sm btn-tab" data-tab="admin-gala-tenues">👕 Tenues</button>'
html = re.sub(pattern_tenues_desktop, '', html)

pattern_tenues_tab = r'<div class="tab-content" id="tab-admin-gala-tenues">.*?</div>\n\s*<div class="tab-content" id="tab-admin-gala-infos">'
html = re.sub(pattern_tenues_tab, '<div class="tab-content" id="tab-admin-gala-infos">', html, flags=re.DOTALL)

# 3. Gérer les thèmes button
pattern_info_btn = r'<button class="btn btn-primary" onclick="openModal\(\'modal-gala-info\'\); initGalaInfoModal\(\);">\+ Ajouter une info tableau</button>'
replacement_info_btn = r'''<button class="btn btn-outline" style="margin-right:0.5rem;" onclick="openModal('modal-gala-themes'); window.renderGalaThemes();">🎭 Gérer les thèmes</button>
                <button class="btn btn-primary" onclick="openModal('modal-gala-info'); initGalaInfoModal();">+ Ajouter une info tableau</button>'''
html = re.sub(pattern_info_btn, replacement_info_btn, html)

# 4. Info tableau: remove Horaire
pattern_info_time = r'<div class="form-group">\n\s*<label class="form-label">Horaire</label>\n\s*<input type="time" id="gala-info-time" class="form-input" required>\n\s*</div>'
html = re.sub(pattern_info_time, '', html)

pattern_info_th = r'<th>Horaire</th><th>Cours</th>'
html = re.sub(pattern_info_th, '<th>Cours</th>', html)

# 5. Info tableau: Theme as select
pattern_info_theme = r'<input type="text" id="gala-info-theme" class="form-input" required>'
replacement_info_theme = r'<select id="gala-info-theme" class="form-input" required></select>'
html = re.sub(pattern_info_theme, replacement_info_theme, html)


# 6. Add modal-gala-themes and modal-gala-note-view
modals_append = r'''
  <!-- Modal Gérer les thèmes -->
  <div class="vitrine-modal" id="modal-gala-themes">
    <div class="vitrine-modal-content">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title">🎭 Gérer les thèmes du Gala</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-gala-themes')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
          <input type="text" id="new-gala-theme" class="form-input" placeholder="Nouveau thème">
          <button class="btn btn-primary" onclick="window.addGalaTheme()">Ajouter</button>
        </div>
        <div id="gala-themes-list" style="display:flex; flex-direction:column; gap:0.5rem;">
          <!-- Dynamique -->
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Voir Note -->
  <div class="vitrine-modal" id="modal-gala-note-view">
    <div class="vitrine-modal-content" style="max-width: 600px;">
      <div class="vitrine-modal-header">
        <h4 class="vitrine-modal-title" id="note-view-title">Rapport de réunion</h4>
        <button class="vitrine-modal-close" onclick="closeModal('modal-gala-note-view')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <div style="margin-bottom:1rem;">
          <strong>Date :</strong> <span id="note-view-date"></span><br>
          <strong>Présents :</strong> <span id="note-view-presents"></span>
        </div>
        <div style="background:#f4f4f4; padding:1rem; border-radius:var(--radius); min-height:200px; white-space:pre-wrap;" id="note-view-content"></div>
      </div>
    </div>
  </div>
'''

html = html.replace('</body>', modals_append + '\n</body>')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
