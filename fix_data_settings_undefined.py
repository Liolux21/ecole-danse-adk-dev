import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. saveSeasonSettings
pattern_save = r'DATA\.settings\.season = \{ start, end \};'
replacement_save = r'''if (!DATA.settings) DATA.settings = { holidays: [] };
    DATA.settings.season = { start, end };'''
js = re.sub(pattern_save, replacement_save, js)

# 2. addHoliday
pattern_add = r'if\(!DATA\.settings\.holidays\) DATA\.settings\.holidays = \[\];'
replacement_add = r'''if (!DATA.settings) DATA.settings = {};
    if (!DATA.settings.holidays) DATA.settings.holidays = [];'''
js = re.sub(pattern_add, replacement_add, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
