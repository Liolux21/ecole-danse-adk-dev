import re, json

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update VITRINE_DATA categories
match = re.search(r'(const VITRINE_DATA = )(\{.*?\});\n', js, re.DOTALL)
if match:
    prefix = js[:match.start(2)]
    suffix = js[match.end(2):]
    data = json.loads(match.group(2))
    
    # Add ballet_pointes
    data['cours']['ballet_pointes'] = {
        'title': 'Ballet - Pointes Ados/Adultes',
        'avatar': 'assets/images/hero_dancer.png',
        'modalImage': 'assets/images/hero_dancer.png',
        'content': '''Ce cours de danse classique pour adolescents permet de développer progressivement les bases essentielles de la technique du ballet dans un cadre à la fois exigeant, élégant et bienveillant.

Les élèves travaillent la posture, l’alignement du corps, la coordination des mouvements, l’équilibre, la souplesse ainsi que le placement gracieux de la tête et des bras. À travers le travail à la barre et au centre, ils apprennent à maîtriser leur technique tout en développant leur musicalité et leur expression artistique.

La danse classique apporte également rigueur, discipline, confiance en soi et sens du détail, tout en permettant à chaque danseur de s’épanouir artistiquement.

Travail sur Pointes

Après l’acquisition des bases techniques nécessaires, les élèves peuvent évoluer vers le travail sur pointes. Le cours pointes est destiné aux élèves suivant déjà une formation en danse classique et possédant une préparation musculaire suffisante au niveau des chevilles, des pieds et du maintien du corps.

Chez ADK, l’apprentissage des pointes débute à partir de 13 ans minimum, afin de respecter le développement physique de l’élève et de garantir une progression en toute sécurité. Ce travail progressif permet de renforcer les muscles, d’améliorer la stabilité et d’apprendre à évoluer sur pointes avec contrôle, élégance et sans risque pour le corps.

Une étape emblématique de la danse classique, symbole de grâce, de précision et de dépassement de soi.'''
    }
    
    # Add jazz_contemporain
    data['cours']['jazz_contemporain'] = {
        'title': 'Contemporain / Jazz',
        'avatar': 'assets/images/dance_contemporary.png',
        'modalImage': 'assets/images/dance_contemporary.png',
        'content': '''Énergique, expressive et pleine d’émotions, la danse Jazz & Contemporaine permet aux danseurs de développer à la fois leur technique, leur créativité et leur personnalité artistique.

Inspirée de plusieurs influences, cette discipline mêle rythme, dynamisme, fluidité et expression corporelle. Le modern jazz puise son énergie dans le mouvement, les contrastes, les sensations et la musicalité, tandis que le contemporain apporte une dimension plus émotionnelle, libre et artistique.

Les cours travaillent la coordination, la souplesse, les déplacements, les sauts, les tours ainsi que l’interprétation chorégraphique. Les élèves apprennent également les bases techniques essentielles, inspirées notamment de la danse classique, afin de développer précision, posture et maîtrise du corps.

Sur des musiques modernes et variées, les danseurs explorent différentes qualités de mouvement : puissance, fluidité, énergie, relâchement et émotion. L’improvisation et l’expression personnelle occupent aussi une place importante, permettant à chacun de développer son propre style et de transmettre des émotions à travers la danse.

Accessible et évolutive, cette discipline offre un parfait équilibre entre technique, liberté et créativité, dans une ambiance dynamique et inspirante.'''
    }
    
    new_js = prefix + json.dumps(data, indent=2, ensure_ascii=False) + suffix
    js = new_js

# 2. Update ALL_COURSES
# Ballet & Pointes id 15
js = re.sub(r'style:\s*\'classique\',\s*name:\s*\'Ballet Classique & Pointes \(à pd 12 ans\)\'', 
            r"style: 'ballet_pointes', name: 'Ballet et Pointes'", js)

# Jazz 1 id 9
js = re.sub(r"style:\s*'jazz',\s*name:\s*'Jazz 1 \(6-8 ans\)'", 
            r"style: 'jazz_contemporain', name: 'Jazz Contemporain 1'", js)

# Jazz 2 id 10
js = re.sub(r"style:\s*'jazz',\s*name:\s*'Jazz 2 \(9-11 ans\)'", 
            r"style: 'jazz_contemporain', name: 'Jazz Contemporain 2'", js)

# Jazz 3 id 11
js = re.sub(r"style:\s*'jazz',\s*name:\s*'Jazz 3 \(à pd 12 ans\) – Déb/Int'", 
            r"style: 'jazz_contemporain', name: 'Jazz Contemporain 3'", js)

# Jazz 4 id 12
js = re.sub(r"style:\s*'jazz',\s*name:\s*'Jazz 4 \(à pd 13 ans\)'", 
            r"style: 'jazz_contemporain', name: 'Jazz Contemporain 4'", js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
