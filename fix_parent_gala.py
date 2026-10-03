import re

def fix_render_parent_gala():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Find renderParentDashboard
    pattern = r"(function renderParentDashboard\(user\) \{[\s\S]*?renderUserAnnonces\('parent', user\);\s*document\.getElementById\('parent-name'\)\.textContent = user\.name;)"
    
    new_code = r"\1\n  if (typeof window.renderGalaTables === 'function') window.renderGalaTables(user);"
    
    if re.search(pattern, app_js):
        app_js = re.sub(pattern, new_code, app_js)
        with open('js/app.js', 'w', encoding='utf-8') as f:
            f.write(app_js)
        print("Fixed renderParentDashboard")
    else:
        print("COULD NOT FIND renderParentDashboard")

fix_render_parent_gala()
