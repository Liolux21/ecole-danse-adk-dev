import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add Admin Tab Content
admin_annonces_content = r'''
        <!-- Tab: Annonces Admin -->
        <div class="tab-content" id="tab-admin-annonces">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h3>Annonces Globales</h3>
            <button class="btn btn-primary btn-sm" onclick="openAddAnnonceModal()">+ Nouvelle annonce</button>
          </div>
          <div id="admin-annonces-list" style="display:flex; flex-direction:column; gap:1rem;">
            <!-- Rempli en JS -->
          </div>
        </div>
'''

if 'id="tab-admin-annonces"' not in html:
    html = html.replace('<!-- Tab: Gala Admin -->', admin_annonces_content + '\n        <!-- Tab: Gala Admin -->')
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('portail.html updated')
else:
    print('tab-admin-annonces already exists')
