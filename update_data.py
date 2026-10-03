import re

courses = [
    "{ id: 1, style: 'hiphop', name: 'HIPHOP 4', ages: 'dès 14 ans', levels: 'Déb./Interm.', prof: 'Pauline Gérard', lieu: 'adk', schedule: 'Lundi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 2, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 4', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Janis Romain', lieu: 'adk', schedule: 'Lundi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",
    "{ id: 3, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 5', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Janis Romain', lieu: 'adk', schedule: 'Lundi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",
    "{ id: 4, style: 'classique', name: 'BALLET CLASSIQUE & POINTES', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Lundi 20h00 - 21h30', biweekly: false, eventType: 'regulier', emoji: '🩰' }",
    
    "{ id: 5, style: 'classique', name: 'CLASSIQUE 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Mardi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🩰' }",
    "{ id: 6, style: 'classique', name: 'CLASSIQUE 2', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Mardi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🩰' }",
    "{ id: 7, style: 'jazz_contemporain', name: 'JAZZ 2', ages: '9-11 ans', levels: 'Tous niveaux', prof: 'Janis Romain', lieu: 'adk', schedule: 'Mardi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",
    "{ id: 8, style: 'ragga', name: 'RAGGA 3', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Jade Nélis', lieu: 'adk', schedule: 'Mardi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",
    "{ id: 9, style: 'jazz_contemporain', name: 'STREET JAZZ', ages: 'dès 16 ans & adultes', levels: 'Tous niveaux', prof: 'Maeva Delgoffe', lieu: 'adk', schedule: 'Mardi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '👟' }",

    "{ id: 10, style: 'jazz_contemporain', name: 'JAZZ 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Clémentine Mamdy', lieu: 'adk', schedule: 'Mercredi 14h00 - 15h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",
    "{ id: 11, style: 'eveil', name: 'INITIATION À LA DANSE', ages: '4-5 ans', levels: 'Tous niveaux', prof: 'Daisy Theunissen', lieu: 'adk', schedule: 'Mercredi 15h00 - 16h00', biweekly: false, eventType: 'regulier', emoji: '👶' }",
    "{ id: 12, style: 'eveil', name: 'ÉVEIL À LA DANSE', ages: '3-4 ans', levels: 'Tous niveaux', prof: 'Daisy Theunissen', lieu: 'adk', schedule: 'Mercredi 16h00 - 17h00', biweekly: false, eventType: 'regulier', emoji: '👶' }",
    "{ id: 13, style: 'ragga', name: 'RAGGA 2', ages: 'dès 13 ans', levels: 'Déb./Interm.', prof: 'Lili Maury', lieu: 'adk', schedule: 'Mercredi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",
    "{ id: 14, style: 'ragga', name: 'GIRLY', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '💃' }",
    "{ id: 15, style: 'ragga', name: 'POMDANCE', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '📣' }",
    "{ id: 16, style: 'ragga', name: 'RAGGA 4', ages: 'dès 13 ans', levels: 'Avancé', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",

    "{ id: 17, style: 'ragga', name: 'RAGGA 1', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Jade Nélis', lieu: 'adk', schedule: 'Jeudi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",
    "{ id: 18, style: 'hiphop', name: 'BREAK DANCE', ages: 'dès 8 ans', levels: 'Tous niveaux', prof: 'Adam', lieu: 'adk', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🛹' }",
    "{ id: 19, style: 'hiphop', name: 'HIPHOP OLD SCHOOL', ages: 'Open Level', levels: 'Tous niveaux', prof: 'Adam', lieu: 'adk', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '📻' }",

    "{ id: 20, style: 'hiphop', name: 'HIPHOP 2', ages: '9-11 ans', levels: 'Tous niveaux', prof: 'Jeanne Lefèvre', lieu: 'adk', schedule: 'Vendredi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 21, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 3', ages: 'dès 12 ans', levels: 'Déb./Interm.', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Vendredi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",

    "{ id: 22, style: 'hiphop', name: 'HIPHOP 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 9h00 - 10h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 23, style: 'hiphop', name: 'HIPHOP 3', ages: '11-13 ans', levels: 'Tous niveaux', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 10h00 - 11h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 24, style: 'hiphop', name: 'HIPHOP 6', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 11h00 - 12h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",
    "{ id: 25, style: 'compagnie', name: 'COMPAGNIE MOOVE', ages: 'Compagnie', levels: 'Compagnie', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 12h00 - 13h30 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' }",
    "{ id: 26, style: 'compagnie', name: 'COMPAGNIE UNITY', ages: 'Compagnie', levels: 'Compagnie', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 12h00 - 13h30 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' }",
    "{ id: 27, style: 'hiphop', name: 'HIPHOP 5', ages: 'dès 14 ans', levels: 'Interm./Avancé', prof: 'Zoé Lambert', lieu: 'adk', schedule: 'Samedi 14h00 - 15h30 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 28, style: 'compagnie', name: 'COMPAGNIE TEAM', ages: 'Contemporain', levels: 'Compagnie', prof: 'Janis Romain', lieu: 'adk', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' }",

    "{ id: 29, style: 'compagnie', name: 'ATELIER CHORÉ GIRLY', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Dimanche 9h00 - 10h30 (1 sem/2)', biweekly: true, eventType: 'stage', emoji: '✨' }",
    "{ id: 30, style: 'compagnie', name: 'ATELIER PRO CONTEMPORAIN', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Dimanche 10h30 - 12h00 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🌟' }",

    "{ id: 31, style: 'special', name: 'POLE DANSE', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Florence', lieu: 'flore', schedule: 'Jeudi 19h30 - 21h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' }",

    "{ id: 32, style: 'hiphop', name: 'ADULTES HIPHOP / RAGGA', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'chiny', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 33, style: 'jazz_contemporain', name: 'ADULTES JAZZ / CONTEMPORAIN', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Janis Romain', lieu: 'chiny', schedule: 'Jeudi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '✨' }",

    "{ id: 34, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 35, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: 'dès 13 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🔥' }",

    "{ id: 36, style: 'hiphop', name: 'HIPHOP', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🧢' }",
    "{ id: 37, style: 'ragga', name: 'RAGGA', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🔥' }",
    "{ id: 38, style: 'jazz_contemporain', name: 'CONTEMPORAIN / JAZZ', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '✨' }",
    "{ id: 39, style: 'ragga', name: 'GIRLY', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' }"
]

slots = [
    "{ day: 0, hour: '17h00', course: 'HIPHOP 4', style: 'hiphop', courseId: 1, lieu: 'ADK' }",
    "{ day: 0, hour: '18h00', course: 'JAZZ-CONTEMPORAIN 4', style: 'jazz_contemporain', courseId: 2, lieu: 'ADK' }",
    "{ day: 0, hour: '19h00', course: 'JAZZ-CONTEMPORAIN 5', style: 'jazz_contemporain', courseId: 3, lieu: 'ADK' }",
    "{ day: 0, hour: '20h00', course: 'BALLET CLASSIQUE & POINTES', style: 'classique', courseId: 4, lieu: 'ADK' }",
    
    "{ day: 1, hour: '17h00', course: 'CLASSIQUE 1', style: 'classique', courseId: 5, lieu: 'ADK' }",
    "{ day: 1, hour: '17h00', course: 'CLASSIQUE 2', style: 'classique', courseId: 6, lieu: 'ADK' }",
    "{ day: 1, hour: '18h00', course: 'JAZZ 2', style: 'jazz_contemporain', courseId: 7, lieu: 'ADK' }",
    "{ day: 1, hour: '19h00', course: 'RAGGA 3', style: 'ragga', courseId: 8, lieu: 'ADK' }",
    "{ day: 1, hour: '20h00', course: 'STREET JAZZ', style: 'jazz_contemporain', courseId: 9, lieu: 'ADK' }",
    
    "{ day: 2, hour: '14h00', course: 'JAZZ 1', style: 'jazz_contemporain', courseId: 10, lieu: 'ADK' }",
    "{ day: 2, hour: '15h00', course: 'INITIATION À LA DANSE', style: 'eveil', courseId: 11, lieu: 'ADK' }",
    "{ day: 2, hour: '16h00', course: 'ÉVEIL À LA DANSE', style: 'eveil', courseId: 12, lieu: 'ADK' }",
    "{ day: 2, hour: '17h00', course: 'RAGGA 2', style: 'ragga', courseId: 13, lieu: 'ADK' }",
    "{ day: 2, hour: '18h00', course: 'GIRLY', style: 'ragga', courseId: 14, lieu: 'ADK' }",
    "{ day: 2, hour: '19h00', course: 'POMDANCE', style: 'ragga', courseId: 15, lieu: 'ADK' }",
    "{ day: 2, hour: '20h00', course: 'RAGGA 4', style: 'ragga', courseId: 16, lieu: 'ADK' }",
    
    "{ day: 3, hour: '17h00', course: 'RAGGA 1', style: 'ragga', courseId: 17, lieu: 'ADK' }",
    "{ day: 3, hour: '18h00', course: 'BREAK DANCE', style: 'hiphop', courseId: 18, lieu: 'ADK' }",
    "{ day: 3, hour: '19h00', course: 'HIPHOP OLD SCHOOL', style: 'hiphop', courseId: 19, lieu: 'ADK' }",
    
    "{ day: 4, hour: '17h00', course: 'HIPHOP 2', style: 'hiphop', courseId: 20, lieu: 'ADK' }",
    "{ day: 4, hour: '18h00', course: 'JAZZ-CONTEMPORAIN 3', style: 'jazz_contemporain', courseId: 21, lieu: 'ADK' }",
    
    "{ day: 5, hour: '09h00', course: 'HIPHOP 1', style: 'hiphop', courseId: 22, lieu: 'ADK' }",
    "{ day: 5, hour: '10h00', course: 'HIPHOP 3', style: 'hiphop', courseId: 23, lieu: 'ADK' }",
    "{ day: 5, hour: '11h00', course: 'HIPHOP 6', style: 'hiphop', courseId: 24, lieu: 'ADK' }",
    "{ day: 5, hour: '12h00', course: 'COMPAGNIE MOOVE', style: 'compagnie', courseId: 25, lieu: 'ADK' }",
    "{ day: 5, hour: '12h00', course: 'COMPAGNIE UNITY', style: 'compagnie', courseId: 26, lieu: 'ADK' }",
    "{ day: 5, hour: '14h00', course: 'HIPHOP 5', style: 'hiphop', courseId: 27, lieu: 'ADK' }",
    "{ day: 5, hour: '14h00', course: 'COMPAGNIE TEAM', style: 'compagnie', courseId: 28, lieu: 'ADK' }",
    
    "{ day: 6, hour: '09h00', course: 'ATELIER CHORÉ GIRLY', style: 'compagnie', courseId: 29, lieu: 'ADK' }",
    "{ day: 6, hour: '10h30', course: 'ATELIER PRO CONTEMPORAIN', style: 'compagnie', courseId: 30, lieu: 'ADK' }",
    
    "{ day: 3, hour: '19h30', course: 'POLE DANSE', style: 'special', courseId: 31, lieu: 'flore' }",
    "{ day: 3, hour: '19h00', course: 'ADULTES HIPHOP / RAGGA', style: 'hiphop', courseId: 32, lieu: 'chiny' }",
    "{ day: 3, hour: '20h00', course: 'ADULTES JAZZ / CONTEMPORAIN', style: 'jazz_contemporain', courseId: 33, lieu: 'chiny' }",
    
    "{ day: 3, hour: '17h00', course: 'HIPHOP & RAGGA', style: 'hiphop', courseId: 34, lieu: 'bertrix' }",
    "{ day: 3, hour: '18h00', course: 'HIPHOP & RAGGA', style: 'hiphop', courseId: 35, lieu: 'bertrix' }",
    
    "{ day: 5, hour: '14h00', course: 'HIPHOP', style: 'hiphop', courseId: 36, lieu: 'rox' }",
    "{ day: 5, hour: '14h00', course: 'RAGGA', style: 'ragga', courseId: 37, lieu: 'rox' }",
    "{ day: 5, hour: '16h00', course: 'CONTEMPORAIN / JAZZ', style: 'jazz_contemporain', courseId: 38, lieu: 'rox' }",
    "{ day: 5, hour: '16h00', course: 'GIRLY', style: 'ragga', courseId: 39, lieu: 'rox' }"
]

with open('js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

courses_match = re.search(r'courses:\s*\[([\s\S]*?)\],', content)
slots_match = re.search(r'slots:\s*\[([\s\S]*?)\]', content)

if courses_match and slots_match:
    courses_str = ',\n    '.join(courses)
    slots_str = ',\n      '.join(slots)
    
    new_courses_content = 'courses: [\n    ' + courses_str + '\n  ],'
    new_slots_content = 'slots: [\n      ' + slots_str + '\n    ]'
    
    content = content[:courses_match.start()] + new_courses_content + content[courses_match.end():]
    
    # re-search because indices changed
    slots_match = re.search(r'slots:\s*\[([\s\S]*?)\]', content)
    content = content[:slots_match.start()] + new_slots_content + content[slots_match.end():]
    
    with open('js/data.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("js/data.js updated!")
else:
    print("Error: Could not find courses or slots in data.js")
