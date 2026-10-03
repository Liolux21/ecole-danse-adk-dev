import os

with open('portail.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = '<div class="tab-content" id="tab-parent-notifications">'
insertion = '<!-- Tab: Messagerie --><div class="tab-content" id="tab-parent-messagerie"></div>\n          '

if target in content and 'id="tab-parent-messagerie"' not in content:
    content = content.replace(target, insertion + target)
    
    # Also bump JS version just in case
    import re
    content = re.sub(r'js/chat\.js\?v=\d+', 'js/chat.js?v=48', content)
    
    with open('portail.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added tab-parent-messagerie.")
else:
    print("Could not find target or tab-parent-messagerie already exists.")
