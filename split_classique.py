import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_classique = '''{ id: 13, style: 'classique',   name: 'Classique 1',                         desc: 'Introduction à la danse classique (posture, barre, placement, grâce et musicalité).',                               ages: '6 - 8 ans',   levels: 'Débutant',         prof: 'Charlotte',                    lieu: 'adk',     schedule: 'Mardi 17h00 à 18h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 132, style: 'classique',   name: 'Classique 2',                         desc: 'Approfondissement classique : barre, milieu, vocabulaire académique et variations.',                               ages: '9 - 11 ans',   levels: 'Débutant',         prof: 'Charlotte',                    lieu: 'adk',     schedule: 'Mardi 17h00 à 18h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },'''

js = re.sub(r'\{\s*id:\s*13,\s*style:\s*\'classique\'.*?\},', new_classique, js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
