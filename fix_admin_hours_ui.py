import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add to admin menu tabs
menu_old = '<button class="dash-tab" data-tab="profs">👩‍🏫 Professeurs</button>'
menu_new = '<button class="dash-tab" data-tab="profs">👩‍🏫 Professeurs</button>\n          <button class="dash-tab" data-tab="admin-hours">🕒 Heures Profs</button>'

html = html.replace(menu_old, menu_new)

# Add the tab content right before <!-- Tab: Admin Cours --> or something similar
content_old = '<!-- Tab: Cours (Admin) -->'
content_new = """        <!-- Tab: Heures Profs -->
        <div class="tab-content" id="tab-admin-hours">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <h3 style="margin: 0; color: var(--primary);">Décompte des heures</h3>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Heures validées par les professeurs lors de l'appel</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <input type="month" id="admin-hours-month" class="form-input" style="width: auto;">
              <button class="btn btn-outline" id="admin-hours-export" onclick="window.exportProfHours()">Exporter CSV</button>
            </div>
          </div>
          
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Professeur</th>
                  <th>Mois</th>
                  <th>Total Heures</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="admin-hours-body">
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Tab: Cours (Admin) -->"""

html = html.replace(content_old, content_new)

# Add modal for hours details just before </body>
modal_html = """
  <!-- Modal: Détail Heures -->
  <div class="vitrine-modal-overlay" id="modal-hours-detail">
    <div class="vitrine-modal" style="max-width: 500px;">
      <button class="vitrine-modal-close" onclick="closeModal('modal-hours-detail')">&times;</button>
      <div class="vitrine-modal-content">
        <h4 class="vitrine-modal-title" id="hours-detail-title">Détail des prestations</h4>
        <div style="max-height: 400px; overflow-y: auto; margin-top: 1rem;" id="hours-detail-list">
        </div>
      </div>
    </div>
  </div>
"""

if 'modal-hours-detail' not in html:
    html = html.replace("</body>", modal_html + "\n</body>")

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
