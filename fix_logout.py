import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'(AUTH\.logout\(\);\s*document\.getElementById\(\'portal-login-wrapper\'\)\.style\.display = \'\';)'
replacement = r'\1\n      const subtitle = document.getElementById(\'portal-subtitle\');\n      if (subtitle) subtitle.style.display = \'block\';'

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
