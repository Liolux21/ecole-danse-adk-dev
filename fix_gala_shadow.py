import re

def fix_gala_shadows():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # Repets
    app_js = app_js.replace(
        '<div class="stat-card" style="margin-bottom:1rem; border-left:4px solid var(--primary);">',
        '<div style="background:#ffffff; border:1px solid var(--border); border-left:4px solid var(--primary); border-radius:8px; padding:1.25rem; margin-bottom:1rem;">'
    )
    
    # Infos (Tableau)
    app_js = app_js.replace(
        '<div class="stat-card" style="margin-bottom:1rem; border-left:4px solid var(--gold);">',
        '<div style="background:#ffffff; border:1px solid var(--border); border-left:4px solid var(--gold); border-radius:8px; padding:1.25rem; margin-bottom:1rem;">'
    )
    
    # Tenues
    app_js = app_js.replace(
        '<div class="stat-card" style="margin-bottom:1rem; border-left:4px solid #3498db;">',
        '<div style="background:#ffffff; border:1px solid var(--border); border-left:4px solid #3498db; border-radius:8px; padding:1.25rem; margin-bottom:1rem;">'
    )

    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
    
    print("Fixed shadow on gala cards")

fix_gala_shadows()
