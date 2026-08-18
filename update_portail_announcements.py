import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Admin Tab button
old_admin_tabs = r'<button class="dash-tab active" data-tab="admin-vue">👁️ Vue globale</button>'
new_admin_tabs = r'<button class="dash-tab active" data-tab="admin-vue">👁️ Vue globale</button>\n          <button class="dash-tab" data-tab="admin-annonces">📢 Annonces</button>'
html = re.sub(old_admin_tabs, new_admin_tabs, html)

# 2. Admin Tab Content
old_admin_content_anchor = r'<!-- Tab: Cours Admin -->'
new_admin_content = r'''<!-- Tab: Annonces Admin -->
        <div class="tab-content" id="tab-admin-annonces">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h3>Annonces Globales</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddAnnonceModal()">+ Nouvelle annonce</button>
          </div>
          <div id="admin-annonces-list" style="display:flex; flex-direction:column; gap:1rem;">
            <!-- Rempli en JS -->
          </div>
        </div>

        <!-- Tab: Cours Admin -->'''
html = re.sub(old_admin_content_anchor, new_admin_content, html)

# 3. Add modal for new annonce
modal_annonce = r'''
  <!-- Modal: Ajouter une Annonce -->
  <div class="vitrine-modal" id="modal-add-annonce">
    <div class="vitrine-modal-content" style="max-width: 600px;">
      <div class="vitrine-modal-header" style="padding-right: 2.5rem;">
        <h2 class="vitrine-modal-title">Nouvelle Annonce</h2>
        <button class="vitrine-modal-close" onclick="closeModal('modal-add-annonce')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <form id="form-add-annonce" onsubmit="event.preventDefault(); submitAddAnnonce();">
          <div class="form-group">
            <label class="form-label">Destinataires</label>
            <select id="annonce-target" class="form-input" required>
              <option value="all">Tous (Parents et Profs)</option>
              <option value="parents">Tous les Parents</option>
              <option value="profs">Tous les Professeurs</option>
              <!-- Les cours seront insérés ici dynamiquement -->
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Titre de l'annonce</label>
            <input type="text" id="annonce-title" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Message</label>
            <textarea id="annonce-content" class="form-input" rows="5" required></textarea>
          </div>
          <div style="text-align: right; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.5rem;">Publier l'annonce</button>
          </div>
        </form>
      </div>
    </div>
  </div>
'''
if 'modal-add-annonce' not in html:
    html = html.replace('<!-- Modal: Ajouter un élève -->', modal_annonce + '\n  <!-- Modal: Ajouter un élève -->')

# 4. Add announcements container to Parent dashboard
parent_anchor = r'<div class="dashboard-panel" id="panel-parent" style="display:none;">'
new_parent = r'''<div class="dashboard-panel" id="panel-parent" style="display:none;">
      <!-- Section Annonces Parent -->
      <div id="parent-announcements-container" style="display:none; margin-bottom: 2rem;">
        <h3 style="font-family:'Playfair Display',serif; color:var(--gold); border-bottom:1px solid var(--border); padding-bottom:0.5rem; margin-bottom:1rem;">📢 Dernières Annonces</h3>
        <div id="parent-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
      </div>
'''
html = re.sub(parent_anchor, new_parent, html)

# 5. Add announcements container to Prof dashboard
prof_anchor = r'<div class="dashboard-panel" id="panel-prof" style="display:none;">'
new_prof = r'''<div class="dashboard-panel" id="panel-prof" style="display:none;">
      <!-- Section Annonces Prof -->
      <div id="prof-announcements-container" style="display:none; margin-bottom: 2rem;">
        <h3 style="font-family:'Playfair Display',serif; color:var(--gold); border-bottom:1px solid var(--border); padding-bottom:0.5rem; margin-bottom:1rem;">📢 Dernières Annonces</h3>
        <div id="prof-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
      </div>
'''
html = re.sub(prof_anchor, new_prof, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html updated')
