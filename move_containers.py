import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove old PARENT container
html = re.sub(r'\s*<!-- ANNONCES PARENT -->\s*<div id="parent-announcements-container"[^\>]*>\s*<h3[^\>]*>.*?</h3>\s*<div id="parent-announcements-list"[^\>]*></div>\s*</div>\s*', '\n', html, flags=re.DOTALL)

# Insert it above child-tabs in tab-parent-planning
parent_new_container = '''
            <!-- ANNONCES PARENT -->
            <div id="parent-announcements-container" style="display:none; margin-bottom: 2rem;">
              <div id="parent-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
            </div>
'''
html = html.replace('<div class="child-tabs" id="child-tabs"></div>', parent_new_container + '            <div class="child-tabs" id="child-tabs"></div>')

# Remove old PROF container
html = re.sub(r'\s*<!-- ANNONCES PROF -->\s*<div id="prof-announcements-container"[^\>]*>\s*<h3[^\>]*>.*?</h3>\s*<div id="prof-announcements-list"[^\>]*></div>\s*</div>\s*', '\n', html, flags=re.DOTALL)

# Insert it in prof planning
prof_new_container = '''
            <!-- ANNONCES PROF -->
            <div id="prof-announcements-container" style="display:none; margin-bottom: 2rem;">
              <div id="prof-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>
            </div>
'''
html = html.replace('<div class="prof-dashboard-grid">', prof_new_container + '\n            <div class="prof-dashboard-grid">')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html updated')
