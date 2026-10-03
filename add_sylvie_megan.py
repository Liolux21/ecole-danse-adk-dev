import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

match = re.search(r'(const VITRINE_DATA = )(\{.*?\});\n', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    data = json.loads(match.group(2))
    
    # reorder professeurs and add Sylvie and Megan
    old_profs = data['professeurs']
    new_profs = {}
    
    for k, v in old_profs.items():
        new_profs[k] = v
        if k == 'Andrew':
            new_profs['Sylvie'] = {
                "title": "Sylvie",
                "category": "Kinésithérapeute accompagnatrice",
                "avatar": "https://annedkdanse.be/gallery_gen/cffd52798af8c5887dcff43b132cb97a_603x628_0x0_603x761_crop.jpg?ts=1784984525",
                "content": "Sylvie accompagne les danseurs dans leur préparation physique, le renforcement musculaire, la prévention des blessures et le suivi corporel des compagnies surtout avant un spectacle ou un concours. Grâce à son expertise du corps en mouvement, elle aide les danseurs à développer force, équilibre et endurance tout en préservant leur bien-être physique."
            }
            new_profs['Mégan'] = {
                "title": "Mégan",
                "category": "Responsable décoration scénique",
                "avatar": "https://annedkdanse.be/gallery/482349329_1785755885609251_7586817620626532284_n.jpg?ts=1784984525",
                "content": "Mégan est une véritable artiste de l'ombre, elle imagine et crée les décors, ambiances et univers visuels qui donnent vie aux spectacles. Grâce à son imagination et son talent artistique, elle nous transporte dans l'aventure ADK."
            }
            
    data['professeurs'] = new_profs
    
    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix
    
    with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
        f.write(new_js)

# Bump index.html cache
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=33"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=33"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=88"', html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# Bump portail.html cache
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'src="js/data.js\?v=\d+"', 'src="js/data.js?v=33"', html)
html = re.sub(r'src="js/vitrine-data.js\?v=\d+"', 'src="js/vitrine-data.js?v=33"', html)
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=88"', html)

with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
