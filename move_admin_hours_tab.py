import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove admin-hours from the admin-tabs sidebar
sidebar_tab = '          <button class="dash-tab" data-tab="admin-hours">🕒 Heures Profs</button>\n'
html = html.replace(sidebar_tab, '')

# 2. Add button to tab-profs header
prof_header_old = """          <div class="tab-content" id="tab-profs">
            <div class="dash-header">
              <h3>Gestion des Professeurs</h3>
              <button class="btn btn-primary" onclick="openAddProfModal()">+ Ajouter un professeur</button>
            </div>"""

prof_header_new = """          <div class="tab-content" id="tab-profs">
            <div class="dash-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin:0;">Gestion des Professeurs</h3>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-primary" onclick="openAdminHours()">🕒 Heures Profs</button>
                <button class="btn btn-primary" onclick="openAddProfModal()">+ Ajouter un professeur</button>
              </div>
            </div>"""
html = html.replace(prof_header_old, prof_header_new)

# 3. Add back button to tab-admin-hours
hours_header_old = """        <div class="tab-content" id="tab-admin-hours">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <h3 style="margin: 0; color: var(--primary);">Décompte des heures</h3>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Heures validées par les professeurs lors de l'appel</p>
            </div>"""

hours_header_new = """        <div class="tab-content" id="tab-admin-hours">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-outline btn-sm" onclick="closeAdminHours()">← Retour</button>
              <div>
                <h3 style="margin: 0; color: var(--primary);">Décompte des heures</h3>
                <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Heures validées par les professeurs lors de l'appel</p>
              </div>
            </div>"""
html = html.replace(hours_header_old, hours_header_new)

# Clean up any missed tab-admin-hours line with regex in case of slight spacing differences
html = re.sub(r'\s*<button class="dash-tab" data-tab="admin-hours">.*?Heures Profs</button>', '', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
