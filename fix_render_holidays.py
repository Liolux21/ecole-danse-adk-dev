import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'if \(\!DATA\.settings\.holidays \|\| DATA\.settings\.holidays\.length === 0\) \{'
replacement = r'if (!DATA.settings || !DATA.settings.holidays || DATA.settings.holidays.length === 0) {'
js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
