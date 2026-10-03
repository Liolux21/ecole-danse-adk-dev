import re

def bump_cache():
    with open('portail.html', 'r', encoding='utf-8') as f:
        portail = f.read()

    portail = re.sub(r'js/app\.js\?v=\d+', 'js/app.js?v=53', portail)
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(portail)

    print("Bumped cache")

bump_cache()
