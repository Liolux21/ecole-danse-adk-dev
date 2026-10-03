import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

adultes_str = '''
    "adultes": {
      "title": "Cours Adultes",
      "avatar": "assets/images/hero_dancer.png",
      "modalImage": "assets/images/hero_dancer.png",
      "content": ""
    },'''

poledance_str = '''
    "poledance": {
      "title": "Pole Dance",
      "avatar": "assets/images/hero_dancer.png",
      "modalImage": "assets/images/hero_dancer.png",
      "content": "La Pole Dance est une discipline sportive et artistique complète qui allie force, souplesse, grâce et confiance en soi. Accessible à tous, quel que soit l'âge ou le niveau, elle permet de développer sa condition physique tout en s'amusant.\\n\\nLors des cours, les élèves apprennent progressivement différentes figures, rotations, montées, enchaînements chorégraphiques et techniques autour de la barre. Chaque séance comprend un échauffement, un travail technique adapté au niveau du groupe, du renforcement musculaire ainsi que des étirements.\\n\\nAu-delà de l'aspect physique, la Pole Dance aide à gagner en assurance, à améliorer sa posture et à exprimer sa créativité dans une ambiance bienveillante et motivante.\\n\\nLes bienfaits de la Pole Dance :\\n- Renforcement musculaire complet\\n- Développement de la souplesse\\n- Amélioration de la coordination et de l'équilibre\\n- Gain de confiance en soi\\n- Travail de la grâce et de l'expression corporelle\\n- Dépassement de soi dans le respect de son rythme\\n\\nQue vous souhaitiez pratiquer pour le sport, le plaisir, le défi personnel ou l'expression artistique, la Pole Dance vous permettra de découvrir une discipline passionnante et valorisante dans une ambiance conviviale."
    },'''

pomdance_str = '''
    "pomdance": {
      "title": "Pomdance",
      "avatar": "assets/images/ragga_dancer.png",
      "modalImage": "assets/images/ragga_dancer.png",
      "content": "Le pomdance est un style chorégraphique inspiré du cheerleading, qui repose sur un esprit d’équipe et une énergie positive.\\n\\nIl mêle des mouvements de danse très structurés à l’utilisation de pompoms, pour accentuer le rythme, l’énergie et la précision. Visuel et dynamique, ce style repose sur la synchronisation, les lignes nettes, les transitions rapides et une forte présence scénique.\\n\\nCe cours te permettra de développer ta coordination, ton endurance et ta confiance en toi, le tout sur des musiques modernes et entraînantes.\\n\\nAu programme : Apprentissage des pommotions (mouvements de bras) et du vocabulaire propre à la danse pom, apprentissage de chorégraphies entrainantes, travail des pirouettes, des sauts, de la souplesse… et bien plus encore."
    },'''

# Insert these new categories at the beginning of 'cours'
js = re.sub(r'("cours": \{\n)', r'\1' + adultes_str + poledance_str + pomdance_str, js)


# Update Adultes Hip-Hop - Ragga (id 24)
course_24 = "{ id: 24, style: 'adultes', name: 'Adultes Hip-Hop - Ragga', desc: 'Apprentissage de techniques hiphop et Ragga dans une ambiance conviviale.', ages: 'Adultes', levels: 'Débutant - Intermédiaire', prof: 'Margaux', lieu: 'adk', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' }"
js = re.sub(r'\{\s*id:\s*24,\s*style:\s*\'[^\']+\'.*?\},', course_24 + ',', js, flags=re.DOTALL)

# Update Adultes Jazz - Contemporain (id 25)
course_25 = "{ id: 25, style: 'adultes', name: 'Adultes Jazz - Contemporain', desc: 'Apprentissage de techniques jazz et contemporaine dans une ambiance conviviale.', ages: 'Adultes', levels: 'Débutant - Intermédiaire', prof: 'Janis', lieu: 'adk', schedule: 'Jeudi 20h00-21h00', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' }"
js = re.sub(r'\{\s*id:\s*25,\s*style:\s*\'[^\']+\'.*?\},', course_25 + ',', js, flags=re.DOTALL)

# Update Line Dance (id 26)
course_26 = "{ id: 26, style: 'adultes', name: 'Line Dance', desc: 'Danse conviviale et dynamique, pratiquée en ligne sur des chorégraphies variées, accessible à tous et sans partenaire.', ages: 'Tout public', levels: 'Débutant - Intermédiaire', prof: 'Alain', lieu: 'izel', schedule: 'Lundi 20h00-21h15 (sauf dernier lundi du mois)', biweekly: false, emoji: '🤠', image: 'assets/images/dance_jazz.png' }"
js = re.sub(r'\{\s*id:\s*26,\s*style:\s*\'[^\']+\'.*?\},', course_26 + ',', js, flags=re.DOTALL)

# Update Pole Dance (id 27)
course_27 = "{ id: 27, style: 'poledance', name: 'Pole Dance', desc: 'Développe la féminité, l’assurance, l’expression corporelle, élégantes et pleines d’attitude', ages: 'à pd 12 ans', levels: 'Débutant - Intermédiaire', prof: 'Florence', lieu: 'flore', schedule: 'Jeudi 19h30 - 21h00', biweekly: false, emoji: '🧘‍♀️', image: 'assets/images/hero_dancer.png' }"
js = re.sub(r'\{\s*id:\s*27,\s*style:\s*\'special\'.*?\},', course_27 + ',', js, flags=re.DOTALL)

# Update Pomdance (id 21)
# Pomdance is currently in 'ragga', move to 'pomdance' and rename
js = re.sub(r"style:\s*'ragga',\s*name:\s*'Pomdance \(à pd 12 ans\)'", r"style: 'pomdance', name: 'Pomdance'", js)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
