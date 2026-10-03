import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern_admin = r"initTabs\('sub-admin-gala-tabs', \['tab-admin-gala-repets', 'tab-admin-gala-tenues', 'tab-admin-gala-infos', 'tab-admin-gala-notes'\]\);"
replacement_admin = r"initTabs('sub-admin-gala-tabs', ['tab-admin-gala-repets', 'tab-admin-gala-infos', 'tab-admin-gala-notes']);"
js = re.sub(pattern_admin, replacement_admin, js)

pattern_prof = r"initTabs\('sub-prof-gala-tabs', \['tab-prof-gala-repets', 'tab-prof-gala-tenues', 'tab-prof-gala-infos', 'tab-prof-gala-notes'\]\);"
replacement_prof = r"initTabs('sub-prof-gala-tabs', ['tab-prof-gala-repets', 'tab-prof-gala-infos', 'tab-prof-gala-notes']);"
js = re.sub(pattern_prof, replacement_prof, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
