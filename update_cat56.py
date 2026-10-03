import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Update Hip-Hop category text
hiphop_content = '''Le Hip-Hop est une danse urbaine dynamique, créative et incontournable, née dans les quartiers du Bronx à New York dans les années 1970.

Bien plus qu’un style de danse, le hip-hop est une véritable culture qui rassemble la musique, le mouvement, le partage et l’expression de soi. Aujourd’hui présent partout dans le monde, il continue d’évoluer à travers différents styles et influences urbaines.

Les cours sont construits autour de chorégraphies rythmées sur des musiques actuelles, où les élèves développent coordination, musicalité, énergie, précision et confiance en eux. Dans une ambiance familiale, motivante et bienveillante, chacun progresse à son rythme tout en découvrant son propre style.

Le Hip-Hop permet également de travailler :
- le sens du rythme
- la mémoire chorégraphique
- la condition physique
- la créativité et l’improvisation
- la présence scénique et l’attitude'''

js = re.sub(r'("hiphop":\s*\{.*?"content":\s*").*?(")', r'\g<1>' + hiphop_content.replace('\n', '\\n') + r'\2', js, flags=re.DOTALL)

# Update Ragga category text
ragga_content = '''Originaire des rues de Jamaïque, le Ragga Dancehall est une discipline urbaine énergique, expressive et pleine de caractère.

Mélange d’influences afro-jamaïcaines, de mouvements hip-hop et d’attitudes scéniques affirmées, cette danse se distingue par son énergie, sa puissance, sa musicalité et sa sensualité. Le travail du bassin, du torse, des isolations et des rebonds rythmiques est au cœur de ce style unique et vibrant.

Sur des musiques entraînantes et actuelles, les danseurs développent coordination, rythme, endurance et confiance en soi tout en apprenant à libérer leur expression corporelle.

Le Ragga Dancehall permet également de travailler :
- la fluidité des mouvements ;
- la présence scénique ;
- l’attitude et l’interprétation ;
- la souplesse et le cardio ;
- la connexion avec la musique et les émotions.

À la fois intense, libératrice et conviviale, cette discipline invite chacun à danser avec personnalité, énergie et authenticité dans une ambiance dynamique et motivante.'''

js = re.sub(r'("ragga":\s*\{.*?"content":\s*").*?(")', r'\g<1>' + ragga_content.replace('\n', '\\n') + r'\2', js, flags=re.DOTALL)

# Add missing Hip-Hop courses (ROX and Bertrix)
new_hiphop = '''
    { id: 43, style: 'hiphop', name: 'Hip-Hop ROX - Rouvroy', desc: 'Perfectionnment hiphop niveau intermédiaire (cours 1 samedi sur 2). 1er cours le 26/09', ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 14h00 à 16h00 (1 sem/2)', biweekly: true, emoji: '🔥', image: 'assets/images/breakdance_freeze.png' },
    { id: 44, style: 'hiphop', name: 'Hip-Hop Bertrix', desc: "Développement du rythme, de la coordination, de l'énergie et la confiance en soi.", ages: '9 - 12 ans', levels: 'Débutant', prof: '', lieu: 'bertrix', schedule: 'Jeudi 17h00 à 18h00', biweekly: false, emoji: '🔥', image: 'assets/images/breakdance_freeze.png' },
'''
js = re.sub(r'(const ALL_COURSES = \[\n)', r'\1' + new_hiphop, js)

# Add missing Ragga courses (ROX and Bertrix)
new_ragga = '''
    { id: 45, style: 'ragga', name: 'Ragga ROX - Rouvroy', desc: 'Mélange énergie, rythme et chorégraphie inspirée de la Jamaïque.', ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 13h30 à 15h30 (1 sem/2)', biweekly: true, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },
    { id: 46, style: 'ragga', name: 'Ragga Bertrix', desc: "Energie, rythme et expression, chorégraphies dynamiques adaptées à l'âge du danseur.", ages: '9 - 12 ans', levels: 'Débutant', prof: '', lieu: 'bertrix', schedule: 'Jeudi 17h00 à 18h00', biweekly: false, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },
'''
js = re.sub(r'(const ALL_COURSES = \[\n)', r'\1' + new_ragga, js)

# Rename existing Hip-Hop courses
js = re.sub(r"name:\s*'Hip-Hop 1.*?'", r"name: 'Hip-Hop 1'", js)
js = re.sub(r"name:\s*'Hip-Hop 2.*?'", r"name: 'Hip-Hop 2'", js)
js = re.sub(r"name:\s*'Hip-Hop 3.*?'", r"name: 'Hip-Hop 3'", js)
js = re.sub(r"name:\s*'Hip-Hop 4.*?'", r"name: 'Hip-Hop 4'", js)
js = re.sub(r"name:\s*'Hip-Hop 5.*?'", r"name: 'Hip-Hop 5'", js)
js = re.sub(r"name:\s*'Hip-Hop 6.*?'", r"name: 'Hip-Hop 6'", js)

# Rename existing Ragga courses
js = re.sub(r"name:\s*'Ragga 1.*?'", r"name: 'Ragga 1'", js)
js = re.sub(r"name:\s*'Ragga 2.*?'", r"name: 'Ragga 2'", js)
js = re.sub(r"name:\s*'Ragga 3.*?'", r"name: 'Ragga 3'", js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
