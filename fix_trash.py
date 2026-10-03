import re

def fix_trash():
    with open('js/app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    # The trash is: "} font-size:0.85rem;">MasquǸ</span>' : `<span class="status-pill ${mutClass}">${mutLabel}</span>`;"
    
    app_js = re.sub(r"\} font-size:0\.85rem;.*?</span>`;", "}", app_js)
    
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(app_js)
        
    print("Fixed trash")

fix_trash()
