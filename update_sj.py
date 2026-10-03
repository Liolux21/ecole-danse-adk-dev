import re

with open('js/vitrine-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Let's replace the whole object for id 23
new_course = "{ id: 23, style: 'streetjazz', name: 'Street Jazz', desc: 'Melange technique du jazz, du girly et l’énergie des danses urbaines.', ages: 'à pd 12 ans', levels: 'Débutant - Intermédiaire', prof: 'Maeva', lieu: 'adk', schedule: 'Mardi 20h00 à 21h00', biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' }"

js = re.sub(r'\{\s*id:\s*23,\s*style:\s*\'streetjazz\'.*?\},', new_course + ',', js, flags=re.DOTALL)

with open('js/vitrine-data.js', 'w', encoding='utf-8') as f:
    f.write(js)
