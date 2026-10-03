import re

with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix inline styles of dash-header-actions and dash-primary-actions
# Currently: 
# <div class="dash-header-actions" style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">
# <div class="dash-primary-actions" style="display:flex; gap:0.5rem; width:100%;">

pattern1 = r'<div class="dash-header-actions" style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">'
replacement1 = r'<div class="dash-header-actions" style="display:flex; align-items:center; gap:0.5rem;">'
html = html.replace(pattern1, replacement1)

pattern2 = r'<div class="dash-primary-actions" style="display:flex; gap:0.5rem; width:100%;">'
replacement2 = r'<div class="dash-primary-actions" style="display:flex; gap:0.5rem;">'
html = html.replace(pattern2, replacement2)

# Remove the flex:1 and white-space nowrap from buttons
pattern3 = r'style="flex:1; white-space:nowrap;"'
replacement3 = r''
html = html.replace(pattern3, replacement3)

# Update CSS for .dash-header-actions in mobile media query
old_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        width: 100%;
        margin-top: 0.5rem;
      }
      .dash-header-actions > button {
        width: 100%;
      }
    }"""

new_css = """    @media (max-width: 768px) {
      .dash-header-actions {
        flex-direction: column;
        align-items: flex-end !important;
        margin-top: 0.5rem;
      }
    }"""

html = html.replace(old_css, new_css)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)


with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the .style.width = '100%' from js/app.js
js = js.replace("adminSwitchBtn.style.width = '100%';", "")
js = js.replace("profToAdminBtn.style.width = '100%';", "")
js = js.replace("switchBtn.style.width = '100%';", "")
js = js.replace("parentSwitchBtn.style.width = '100%';", "")

# Also, wait, let's make sure there's no trailing whitespace issue. We can use regex to remove it safely
js = re.sub(r'\s*\w+SwitchBtn\.style\.width = \'100%\';', '', js)
js = re.sub(r'\s*profToAdminBtn\.style\.width = \'100%\';', '', js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
