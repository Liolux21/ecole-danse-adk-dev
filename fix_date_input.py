import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_date_input = """<input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem; font-size:0.8rem; border-radius:4px; border:1px solid var(--border); box-sizing: border-box; min-width: 120px;">"""
new_date_input = """<input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem 0.7rem; font-size:0.8rem; border-radius:50px; border:1px solid #ccc; box-sizing: border-box; min-width: 120px; outline:none;">"""

js = js.replace(old_date_input, new_date_input)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

with open('portail.html', 'r', encoding='utf-8') as pf:
    html = pf.read()
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=30"', html)
with open('portail.html', 'w', encoding='utf-8') as pf:
    pf.write(html)
