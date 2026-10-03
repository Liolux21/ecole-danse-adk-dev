import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the current .dash-header-actions HTML
pattern = r'(<div class="dash-header-actions".*?>\s*<div class="dash-primary-actions".*?>\s*<button.*?>\s*.*?</button>\s*<button.*?id="(.*?)".*?>\s*.*?</button>\s*</div>\s*</div>)'

def replace_html(match):
    logout_id = match.group(2)
    return f'<div class="dash-header-actions" style="display:flex; align-items:center; gap:0.5rem;">\n                  <button class="btn btn-outline btn-sm" onclick="openProfileModal()">⚙️ Mon Profil</button>\n                  <button class="btn btn-outline btn-sm" id="{logout_id}">Déconnexion</button>\n              </div>'

html = re.sub(pattern, replace_html, html)


# Update CSS
old_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        flex-direction: column;
        align-items: flex-end !important;
        margin-top: 0.5rem;
      }
    }"""

new_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        display: grid !important;
        grid-template-columns: auto auto;
        gap: 0.5rem;
        justify-content: flex-start;
        margin-top: 0.5rem;
      }
      .dash-header-actions > button:nth-child(1) { grid-column: 1; grid-row: 1; }
      .dash-header-actions > button:last-child { grid-column: 2; grid-row: 1; }
      .dash-switch-btn { grid-column: 1; grid-row: 2; justify-self: flex-start; }
    }"""

html = html.replace(old_css, new_css)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)


with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Revert appendChild to insertBefore
js = re.sub(r'logoutBtn\.closest\(\"\.dash-header-actions\"\)\.appendChild\((.*?)\);', r'logoutBtn.parentNode.insertBefore(\1, logoutBtn);', js)

# Add class 'dash-switch-btn' to the dynamically created buttons, and reduce font size
js = js.replace("adminSwitchBtn.className = 'btn btn-outline btn-sm';", "adminSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';\n        adminSwitchBtn.style.fontSize = '0.75rem';")
js = js.replace("profToAdminBtn.className = 'btn btn-outline btn-sm';", "profToAdminBtn.className = 'btn btn-outline btn-sm dash-switch-btn';\n          profToAdminBtn.style.fontSize = '0.75rem';")
js = js.replace("switchBtn.className = 'btn btn-outline btn-sm';", "switchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';\n          switchBtn.style.fontSize = '0.75rem';")
js = js.replace("parentSwitchBtn.className = 'btn btn-outline btn-sm';", "parentSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';\n          parentSwitchBtn.style.fontSize = '0.75rem';")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
