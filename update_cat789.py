import json, re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update VITRINE_DATA categories
match = re.search(r'(const VITRINE_DATA = )(\{.*?\});\n', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    data = json.loads(match.group(2))
    
    # Add girly
    data['cours']['girly'] = {
        'title': 'Girly',
        'avatar': 'assets/images/ragga_dancer.png',
        'modalImage': 'assets/images/ragga_dancer.png',
        'content': '''Le cours de Girly Dance est une discipline moderne, fun et pleine d’attitude, qui permet de révéler sa féminité, sa confiance en soi et son expression artistique.

Accessible avec ou sans talons, ce cours mélange techniques de danse, démarche, posture, musicalité et expression scénique dans une ambiance dynamique et bienveillante.

À travers des chorégraphies inspirées des clips, des shows et de l’univers commercial, les élèves travaillent :
- l’aisance corporelle ;
- la confiance en soi ;
- la grâce et la posture ;
- la sensualité et l’attitude ;
- la coordination et la présence scénique.

Le Girly Dance est également un véritable moment de partage et de plaisir grâce à des musiques variées mêlant grands classiques revisités et hits actuels. Des univers rétro aux chorégraphies inspirées des artistes d’aujourd’hui comme Beyoncé, chaque cours permet de s’amuser, de se dépasser et d’exprimer pleinement sa personnalité.

Une discipline énergique et libératrice où élégance, puissance et confiance se rencontrent.'''
    }
    
    # Add breakdance
    data['cours']['breakdance'] = {
        'title': 'Break Dance',
        'avatar': 'assets/images/breakdance_freeze.png',
        'modalImage': 'assets/images/breakdance_freeze.png',
        'content': '''Le Breakdance, aussi appelé Breaking, est l’une des disciplines les plus emblématiques de la culture hip-hop.

Né dans les rues de New York dans les années 70, ce style spectaculaire mélange performance physique, créativité, musicalité et dépassement de soi. Reconnaissable par son travail au sol, ses figures acrobatiques et ses mouvements dynamiques, le Breakdance demande à la fois force, coordination, équilibre et maîtrise du corps.

Les danseurs, appelés B-boys et B-girls, apprennent progressivement différentes techniques : footwork, freezes, passages au sol, mouvements de puissance et figures acrobatiques adaptées à leur niveau.

Au-delà de l’aspect technique, le Breakdance développe :
- la confiance en soi ;
- l’endurance et la condition physique ;
- la discipline et la persévérance ;
- la créativité et l’improvisation ;
- l’esprit d’équipe et le respect des autres.

Dans une ambiance urbaine, motivante et conviviale, les cours se terminent souvent par des moments de freestyle ou des battles, permettant aux élèves d’exprimer leur personnalité, leur style et leur énergie tout en conservant l’esprit authentique et “street” du Breaking.

Une discipline impressionnante et passionnante où chacun apprend à se dépasser tout en s’amusant.'''
    }
    
    # Add streetjazz
    data['cours']['streetjazz'] = {
        'title': 'Street Jazz',
        'avatar': 'assets/images/hiphop_dancer.png',
        'modalImage': 'assets/images/hiphop_dancer.png',
        'content': '''Le Street Jazz est une discipline moderne qui allie l'énergie des danses urbaines à la technique du jazz. Véritable mélange de puissance, de précision, de musicalité et d'expression, ce cours séduit les danseurs qui aiment les chorégraphies actuelles, dynamiques et pleines de personnalité.

Tout au long de l'année, les élèves développent leur technique, leur coordination, leur sens du rythme, leur mémoire chorégraphique, leur présence scénique ainsi que leur interprétation. Les cours alternent échauffement, travail technique, apprentissage des fondamentaux, déplacements, isolations, souplesse et chorégraphies sur des musiques actuelles.

Le Street Jazz intègre également une touche de Girly, permettant de travailler l'attitude, l'élégance, la féminité, l'assurance et l'expression corporelle. Il ne s'agit pas simplement de reproduire des mouvements, mais d'apprendre à interpréter une chorégraphie avec style, caractère et émotion, tout en développant sa propre personnalité artistique.

Cette discipline offre un excellent travail physique en améliorant l'endurance, le renforcement musculaire, la mobilité et la confiance en soi, tout en laissant une grande place au plaisir de danser.

Accessible dès que les bases techniques sont acquises, le Street Jazz est idéal pour les danseurs qui souhaitent évoluer dans un univers moderne, créatif et exigeant, où l'énergie des danses urbaines rencontre l'élégance et la technique du jazz.'''
    }

    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix
    js = new_js

# Update Girly courses
js = re.sub(r'style:\s*\'ragga\',\s*name:\s*\'Girly \(à pd 12 ans\) – Déb\.\'', r"style: 'girly', name: 'Girly'", js)

# Add Girly Heels and Girly ROX
new_girly = '''
    { id: 47, style: 'girly', name: 'Girly - Heels', desc: "Mélange d'influences de jazz commercial, de hip-hop, de cabaret et de danse contemporaine.", ages: 'à pd 13 ans', levels: 'Intermédiaire - Avancé', prof: '', lieu: 'adk', schedule: 'Dimanche 9h00 à 10h30 (1 sem/2)', biweekly: true, emoji: '👠', image: 'assets/images/ragga_dancer.png' },
    { id: 48, style: 'girly', name: 'Girly ROX - Rouvroy', desc: "Développe la féminité, l’assurance, l’expression corporelle élégantes et pleines d’attitude", ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 15h30 à 17h30 (1 sem/2)', biweekly: true, emoji: '👠', image: 'assets/images/ragga_dancer.png' },
'''
js = re.sub(r'(const ALL_COURSES = \[\n)', r'\1' + new_girly, js)

# Update Break Dance
js = re.sub(r'style:\s*\'hiphop\',\s*name:\s*\'Break Dance \(à pd 8 ans\)\'', r"style: 'breakdance', name: 'Break Dance'", js)

# Update Street Jazz
js = re.sub(r'style:\s*\'jazz_contemporain\',\s*name:\s*\'Street Jazz \(Ados/Adultes à pd 16 ans\)\'', r"style: 'streetjazz', name: 'Street Jazz'", js)
js = re.sub(r'style:\s*\'jazz\',\s*name:\s*\'Street Jazz \(Ados/Adultes à pd 16 ans\)\'', r"style: 'streetjazz', name: 'Street Jazz'", js) # in case it's still jazz

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
