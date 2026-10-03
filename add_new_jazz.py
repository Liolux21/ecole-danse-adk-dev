import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_courses = '''
    { id: 40, style: 'jazz_contemporain', name: 'Jazz Contemporain 5 perfectionnement', desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.', ages: 'à pd 14 ans', levels: 'Avancé', prof: '', lieu: 'adk', schedule: 'A DEFINIR', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
    { id: 41, style: 'jazz_contemporain', name: 'Jazz Contemporain ROX - Rouvroy', desc: 'Mélange jazz et contemporain, expression libre et technique.', ages: 'à pd 13 ans', levels: 'Débutant/Interméd.', prof: '', lieu: 'rox', schedule: 'Samedi 16h00 à 18h00 - ROx', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
    { id: 42, style: 'jazz_contemporain', name: 'Jazz Contemporain Atelier Pro', desc: 'Atelier de création contemporaine avancée - Formation intensive (un dimanche sur 2)', ages: 'à pd 13 ans', levels: 'Avancé', prof: '', lieu: 'adk', schedule: 'Dimanche 10h30 à 12h00 (1 sem/2)', biweekly: true, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
'''

js = re.sub(r'(const ALL_COURSES = \[\n)', r'\1' + new_courses, js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
