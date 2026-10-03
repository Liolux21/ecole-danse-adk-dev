import re

def bump(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'js/data.js\?v=\d+', 'js/data.js?v=20', content)
    content = re.sub(r'js/app.js\?v=\d+', 'js/app.js?v=64', content)
    content = re.sub(r'js/auth.js\?v=\d+', 'js/auth.js?v=20', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
        
bump('index.html')
bump('portail.html')
print("Versions bumped")
