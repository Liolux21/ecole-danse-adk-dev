import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace fontSize = '0.75rem' with '0.7rem' and add minWidth
js = js.replace("adminSwitchBtn.style.fontSize = '0.75rem';", "adminSwitchBtn.style.fontSize = '0.7rem';\n        adminSwitchBtn.style.minWidth = '115px';")
js = js.replace("profToAdminBtn.style.fontSize = '0.75rem';", "profToAdminBtn.style.fontSize = '0.7rem';\n          profToAdminBtn.style.minWidth = '115px';")
js = js.replace("switchBtn.style.fontSize = '0.75rem';", "switchBtn.style.fontSize = '0.7rem';\n          switchBtn.style.minWidth = '115px';")
js = js.replace("parentSwitchBtn.style.fontSize = '0.75rem';", "parentSwitchBtn.style.fontSize = '0.7rem';\n          parentSwitchBtn.style.minWidth = '115px';")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
