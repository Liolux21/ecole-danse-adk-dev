import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace all occurrences of dash-header-actions
pattern = r'(<div class="dash-header-actions" style="display:flex; gap:0.5rem;">\s*<button class="btn btn-outline btn-sm" onclick="openProfileModal\(\)">.*?Mon Profil</button>\s*<button class="btn btn-outline btn-sm" id="(.*?)-logout">D.connexion</button>\s*</div>)'

replacement = r'''<div class="dash-header-actions" style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">
              <div class="dash-primary-actions" style="display:flex; gap:0.5rem; width:100%;">
                <button class="btn btn-outline btn-sm" onclick="openProfileModal()" style="flex:1; white-space:nowrap;">⚙️ Mon Profil</button>
                <button class="btn btn-outline btn-sm" id="\2-logout" style="flex:1; white-space:nowrap;">Déconnexion</button>
              </div>
            </div>'''

html = re.sub(pattern, replacement, html)

# Update CSS for .dash-header-actions
old_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        flex-direction: column;
        align-items: stretch;
      }
      .dash-header-actions button {
        width: 100%;
        margin-bottom: 0.25rem;
      }
    }"""

new_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        width: 100%;
        margin-top: 0.5rem;
      }
      .dash-header-actions > button {
        width: 100%;
      }
    }"""

html = html.replace(old_css, new_css)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)


with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace insertBefore with appendChild
js = re.sub(r'logoutBtn\.parentNode\.insertBefore\((.*?), logoutBtn\);', r'logoutBtn.closest(".dash-header-actions").appendChild(\1);', js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
