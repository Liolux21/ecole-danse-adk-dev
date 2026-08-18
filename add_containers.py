import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add to PROF dashboard
prof_banner = '''
        <!-- ANNONCES PROF -->
        <div id="prof-announcements-container" style="display:none; margin-bottom: 2rem;">
          <h3 style="color:#9C5858; margin-bottom: 1rem;">📢 Annonces</h3>
          <div id="prof-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
        </div>
'''

if 'id="prof-announcements-container"' not in html:
    html = html.replace('<div class="dash-tabs" id="prof-tabs">', prof_banner + '\n        <div class="dash-tabs" id="prof-tabs">')

# Add to PARENT dashboard
parent_banner = '''
        <!-- ANNONCES PARENT -->
        <div id="parent-announcements-container" style="display:none; margin-bottom: 2rem;">
          <h3 style="color:#9C5858; margin-bottom: 1rem;">📢 Annonces</h3>
          <div id="parent-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
        </div>
'''

if 'id="parent-announcements-container"' not in html:
    html = html.replace('<div class="dash-tabs" id="parent-tabs">', parent_banner + '\n        <div class="dash-tabs" id="parent-tabs">')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html updated with containers')
