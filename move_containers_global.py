import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove from parent-planning
parent_ann_regex = r'\s*<!-- ANNONCES PARENT -->\s*<div id="parent-announcements-container"[^>]*>.*?</div>\s*</div>'
m = re.search(parent_ann_regex, html, flags=re.DOTALL)
if m:
    html = html.replace(m.group(0), '')
else:
    print('parent-announcements-container not found inside tab')

# 2. Re-insert under parent-tabs
parent_tabs_regex = r'<div class="dash-tabs" id="parent-tabs">.*?</div>'
m = re.search(parent_tabs_regex, html, flags=re.DOTALL)
if m:
    insert_str = '\n          <!-- ANNONCES PARENT -->\n          <div id="parent-announcements-container" style="display:none; margin-bottom: 2rem; margin-top: 1rem;">\n            <div id="parent-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>\n          </div>'
    html = html.replace(m.group(0), m.group(0) + insert_str)
else:
    print('parent-tabs not found')

# 3. Remove from prof-planning
prof_ann_regex = r'\s*<!-- ANNONCES PROF -->\s*<div id="prof-announcements-container"[^>]*>.*?</div>\s*</div>'
m = re.search(prof_ann_regex, html, flags=re.DOTALL)
if m:
    html = html.replace(m.group(0), '')
else:
    print('prof-announcements-container not found inside tab')

# 4. Re-insert under prof-tabs
prof_tabs_regex = r'<div class="dash-tabs" id="prof-tabs">.*?</div>'
m = re.search(prof_tabs_regex, html, flags=re.DOTALL)
if m:
    insert_str = '\n          <!-- ANNONCES PROF -->\n          <div id="prof-announcements-container" style="display:none; margin-bottom: 2rem; margin-top: 1rem;">\n            <div id="prof-announcements-list" style="display:flex; flex-direction:column; gap:1rem;"></div>\n          </div>'
    html = html.replace(m.group(0), m.group(0) + insert_str)
else:
    print('prof-tabs not found')

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done moving containers globally')
