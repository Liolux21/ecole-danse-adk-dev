import re

def fix_mutuelle_display():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Find the mutuelle display logic
    old_code = "if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = 'flex';"
    new_code = "if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = '';"
    
    app_js = app_js.replace(old_code, new_code)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed display style")

fix_mutuelle_display()
