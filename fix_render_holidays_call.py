import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'if \(typeof renderGalaTables === \'function\'\) renderGalaTables\(\);\n\s*\}'

replacement = r'''if (typeof renderGalaTables === 'function') renderGalaTables();
    
    if (typeof renderHolidays === 'function') renderHolidays();
    if (DATA.settings && DATA.settings.season) {
      if (DATA.settings.season.start) document.getElementById('settings-season-start').value = DATA.settings.season.start;
      if (DATA.settings.season.end) document.getElementById('settings-season-end').value = DATA.settings.season.end;
    }
  }'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
