import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_init = r"initTabs\('admin-tabs',\s*\['tab-inscriptions',\s*'tab-eleves',\s*'tab-profs',\s*'tab-admin-gala'\]\);"
new_init = "initTabs('admin-tabs', ['tab-inscriptions', 'tab-eleves', 'tab-profs', 'tab-admin-cours', 'tab-admin-settings', 'tab-admin-gala', 'tab-admin-annonces']);"

app = re.sub(old_init, new_init, app)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print('app.js tabs updated')
