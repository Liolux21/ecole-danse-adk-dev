import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Find the exact start and end of tab-admin-hours
start_marker = '<!-- Tab: Heures Profs -->'
end_marker = '<!-- Tab: Cours -->'

if start_marker in html and end_marker in html:
    start_idx = html.find(start_marker)
    end_idx = html.find(end_marker)
    
    new_html = html[:start_idx] + """<!-- Tab: Heures Profs -->
        <div class="tab-content" id="tab-admin-hours">
          <div class="dash-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-outline btn-sm" onclick="closeAdminHours()" style="border-radius: 50px; padding: 0.25rem 0.75rem;">← Retour</button>
              <div>
                <h3 style="margin: 0; color: var(--primary);">Décompte des heures</h3>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary" onclick="window.exportProfHours()">📥 Exporter CSV</button>
            </div>
          </div>
          
          <div class="data-table-wrapper">
            <div class="data-table-header" style="justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
              <span class="data-table-title">🕒 Heures validées par mois</span>
              <input type="month" id="admin-hours-month" class="form-input" style="width: auto; padding: 0.4rem 0.8rem; border-radius: 50px;">
            </div>
            <div style="overflow-x: auto;">
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
        </div>
        
        """ + html[end_idx:]
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
