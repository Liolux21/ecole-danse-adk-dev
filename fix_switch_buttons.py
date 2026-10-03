import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add style.width = '100%' for each switch button.
js = js.replace("adminSwitchBtn.className = 'btn btn-outline btn-sm';", "adminSwitchBtn.className = 'btn btn-outline btn-sm';\n        adminSwitchBtn.style.width = '100%';")
js = js.replace("profToAdminBtn.className = 'btn btn-outline btn-sm';", "profToAdminBtn.className = 'btn btn-outline btn-sm';\n          profToAdminBtn.style.width = '100%';")
js = js.replace("switchBtn.className = 'btn btn-outline btn-sm';", "switchBtn.className = 'btn btn-outline btn-sm';\n          switchBtn.style.width = '100%';")
js = js.replace("parentSwitchBtn.className = 'btn btn-outline btn-sm';", "parentSwitchBtn.className = 'btn btn-outline btn-sm';\n          parentSwitchBtn.style.width = '100%';")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
