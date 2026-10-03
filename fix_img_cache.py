import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace img/adk_pro.png with img/adk_pro.png?v=2
content = content.replace("'img/adk_pro.png'", "'img/adk_pro.png?v=2'")
content = content.replace("'img/adk_stage.png'", "'img/adk_stage.png?v=2'")
content = content.replace("'img/adk_show.png'", "'img/adk_show.png?v=2'")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

with open('portail.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

html_content = re.sub(r'js/app\.js\?v=\d+', 'js/app.js?v=54', html_content)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Cache busters added and v=54 bumped.")
