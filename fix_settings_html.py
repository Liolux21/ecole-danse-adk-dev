import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Season display
pattern_season = r'<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle</h4>'
replacement_season = r'<h4 style="color: #9C5858; margin-bottom: 1rem;">Saison actuelle <span id="season-display" style="font-size: 0.9rem; font-weight: normal; color: var(--text-muted); margin-left: 1rem;"></span></h4>'
html = re.sub(pattern_season, replacement_season, html)

# 2. Move holidays list below the form
pattern_holidays = r'''<div id="settings-holidays-list" style="margin-bottom: 1rem;">\n\s*<!-- Dynamique -->\n\s*</div>\n\s*<div style="display: flex; flex-wrap: wrap; gap: 1rem;">'''
replacement_holidays = r'''<div style="display: flex; flex-wrap: wrap; gap: 1rem;">'''
html = re.sub(pattern_holidays, replacement_holidays, html)

pattern_add_btn = r'<button class="btn btn-primary" onclick="addHoliday\(\)" style="margin-top: 0\.5rem;">\+ Ajouter</button>'
replacement_add_btn = r'''<button class="btn btn-primary" onclick="addHoliday()" style="margin-top: 0.5rem;">+ Ajouter / Sauvegarder</button>
              <div id="settings-holidays-list" style="margin-top: 2rem;">
                <!-- Dynamique -->
              </div>'''
html = re.sub(pattern_add_btn, replacement_add_btn, html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
