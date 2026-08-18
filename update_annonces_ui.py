import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the whole tab-admin-annonces content
old_tab_pattern = r'<!-- Tab: Annonces Admin -->\s*<div class="tab-content" id="tab-admin-annonces">.*?<div id="admin-annonces-list".*?</div>\s*</div>'

new_tab = r'''<!-- Tab: Annonces Admin -->
        <div class="tab-content" id="tab-admin-annonces">
          
          <div style="background:var(--dark-2); padding:2rem; border-radius:var(--radius); border:1px solid var(--border); margin-bottom:2.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <h3 style="margin-top:0; margin-bottom:1.5rem; color:var(--primary); font-size: 1.5rem;">Rédiger une nouvelle annonce</h3>
            <form id="form-add-annonce" onsubmit="event.preventDefault(); submitAddAnnonce();">
              <div class="form-group">
                <label class="form-label">Destinataires</label>
                <select id="annonce-target" class="form-input" style="font-size: 1.1rem; padding: 0.75rem;" required>
                  <option value="all">Tous (Parents et Profs)</option>
                  <option value="parents">Tous les Parents</option>
                  <option value="profs">Tous les Professeurs</option>
                  <!-- Les cours seront insérés ici dynamiquement -->
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Titre de l'annonce</label>
                <input type="text" id="annonce-title" class="form-input" style="font-size: 1.1rem; padding: 0.75rem;" required>
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea id="annonce-content" class="form-input" rows="6" style="font-size: 1.1rem; padding: 0.75rem;" required></textarea>
              </div>
              <div style="text-align: right; margin-top: 1.5rem;">
                <button type="submit" class="btn btn-primary" style="padding: 0.75rem 2rem; font-size: 1.1rem;">Publier l'annonce</button>
              </div>
            </form>
          </div>

          <h3 style="margin-bottom: 1rem; color:var(--gold);">Historique des annonces</h3>
          <div id="admin-annonces-list" style="display:flex; flex-direction:column; gap:1rem;">
            <!-- Rempli en JS -->
          </div>
        </div>'''

html = re.sub(old_tab_pattern, new_tab, html, flags=re.DOTALL)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html updated')
