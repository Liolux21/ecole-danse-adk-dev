import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Add renderAdminAnnonces to renderAdminDashboard
if 'renderAdminAnnonces();' not in app.split('function renderAdminDashboard(user) {')[1].split('}')[0]:
    app = re.sub(r'(function renderAdminDashboard\(user\) \{)', r'\1\n  renderAdminAnnonces();', app)

# 2. Add pink color to past announcement titles
app = app.replace('<h4 style="margin:0 0 0.5rem 0;">${ann.title}</h4>', '<h4 style="margin:0 0 0.5rem 0; color:#9C5858;">${ann.title}</h4>')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("history fixed")
