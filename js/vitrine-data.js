const ALL_COURSES = [

    // === STUDIO ADK ===
    { id: 1,  style: 'eveil',       name: 'Éveil (3-4 ans)',                               desc: 'Les tout-petits explorent la danse dans un cadre bienveillant et ludique.',                                         ages: '3 – 4 ans',   levels: 'Éveil',            prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 16h00 – 17h00',                biweekly: false, emoji: '🌸', image: 'assets/images/eveil_kids.png' },
    { id: 2,  style: 'eveil',       name: 'Initiation (4-5 ans)',                          desc: 'Première approche de la danse par le jeu, la musique et le mouvement créatif.',                                     ages: '4 – 5 ans',   levels: 'Initiation',       prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 15h00 – 16h00',                biweekly: false, emoji: '🌟', image: 'assets/images/eveil_kids.png' },
    { id: 3,  style: 'hiphop',      name: 'Hip-Hop 1 (6-8 ans)',                           desc: 'Introduction aux fondamentaux du hip-hop dans une ambiance fun et énergique.',                                       ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 9h00 – 10h00',                   biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 4,  style: 'hiphop',      name: 'Hip-Hop 2 (9-11 ans)',                          desc: 'Approfondissement des bases hip-hop avec chorégraphies adaptées à l\'âge.',                                          ages: '9 – 11 ans',  levels: 'Débutant',         prof: 'Jeanne',                   lieu: 'adk',     schedule: 'Vendredi 17h00 – 18h00',                biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 5,  style: 'hiphop',      name: 'Hip-Hop 3 (11-13 ans)',                         desc: 'Développement technique hip-hop pour préados : expression, style et enchaînements.',                                 ages: '11 – 13 ans', levels: 'Intermédiaire',    prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 10h00 – 11h00',                  biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 6,  style: 'hiphop',      name: 'Hip-Hop 4 (àpd 14 ans) — Déb/Int',             desc: 'Hip-hop pour grands débutants et intermédiaires : bases, groove et attitude.',                                       ages: 'àpd 14 ans',  levels: 'Déb / Interméd.',  prof: 'Pauline',                  lieu: 'adk',     schedule: 'Lundi 17h00 – 18h00',                   biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 7,  style: 'hiphop',      name: 'Hip-Hop 5 (àpd 14 ans) — Interméd. ½',         desc: 'Perfectionnement hip-hop niveau intermédiaire, cours bi-mensuel (1 semaine sur 2).',                                ages: 'àpd 14 ans',  levels: 'Intermédiaire',    prof: 'Zoé',                      lieu: 'adk',     schedule: 'Samedi 14h00 – 15h30 (1 sem/2)',        biweekly: true,  emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 8,  style: 'hiphop',      name: 'Hip-Hop 6 (àpd 14 ans) — Avancé',              desc: 'Niveau avancé : technique poussée, style affirmé, préparation aux concours.',                                       ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 11h00 – 12h00',                  biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 9,  style: 'jazz',        name: 'Jazz 1 (6-8 ans)',                              desc: 'Éveil au jazz pour enfants : rythme, coordination, plaisir du mouvement.',                                           ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Clémentine',               lieu: 'adk',     schedule: 'Mercredi 14h00 – 15h00',                biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 10, style: 'jazz',        name: 'Jazz 2 (9-11 ans)',                             desc: 'Développement technique jazz, travail du style et des enchaînements scéniques.',                                     ages: '9 – 11 ans',  levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 18h00 – 19h00',                   biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 11, style: 'jazz',        name: 'Jazz-Contempo 3 (àpd 12 ans) — Déb/Int',       desc: 'Mélange jazz et contemporain pour ados : expression libre et technique solide.',                                     ages: 'àpd 12 ans',  levels: 'Déb / Interméd.',  prof: 'Charlotte',                lieu: 'adk',     schedule: 'Vendredi 18h00 – 19h00',                biweekly: false, emoji: '🎷', image: 'assets/images/dance_contemporary.png' },
    { id: 12, style: 'jazz',        name: 'Jazz-Contempo 4 (àpd 14 ans) — Avancé',        desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.',                             ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 19h00 – 20h00',                   biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 13, style: 'classique',   name: 'Classique 1 (6-8 ans)',                         desc: 'Introduction à la danse classique : posture, barre, placement, grâce et musicalité.',                               ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Mercredi 18h00 – 19h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 14, style: 'classique',   name: 'Classique 2 (9-12 ans)',                        desc: 'Approfondissement classique : barre, milieu, vocabulaire académique et variations.',                                 ages: '9 – 12 ans',  levels: 'Intermédiaire',    prof: 'Charlotte',                lieu: 'adk',     schedule: 'Mardi 17h00 – 18h00',                   biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 15, style: 'classique',   name: 'Ballet Classique & Pointes (àpd 12 ans)',       desc: 'Cours avancé de ballet : travail sur pointes, variations de répertoire et technique approfondie.',                  ages: 'àpd 12 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Lundi 20h00 – 21h30',                   biweekly: false, emoji: '🩰', image: 'assets/images/hero_dancer.png' },
    { id: 16, style: 'ragga',       name: 'Ragga 1 (9-12 ans)',                            desc: 'Introduction au ragga dancehall : rythme, moves caribéens et énergie communicative.',                               ages: '9 – 12 ans',  levels: 'Débutant',         prof: 'Jade',                     lieu: 'adk',     schedule: 'Jeudi 17h00 – 18h00',                   biweekly: false, emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 17, style: 'ragga',       name: 'Ragga 2 (àpd 13 ans) — Déb/Int',               desc: 'Ragga dancehall pour ados et adultes débutants à intermédiaires.',                                                   ages: 'àpd 13 ans',  levels: 'Déb / Interméd.',  prof: 'Jade',                     lieu: 'adk',     schedule: 'Mercredi 17h00 – 18h00',                biweekly: false, emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 18, style: 'ragga',       name: 'Ragga 3 (àpd 13 ans) — Int/Avancé',            desc: 'Ragga niveau intermédiaire à avancé : style affirmé et préparation aux compétitions.',                              ages: 'àpd 13 ans',  levels: 'Interméd./Avancé', prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 20h00 – 21h00',                biweekly: false, emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 19, style: 'ragga',       name: 'Girly 1 (àpd 12 ans) — Débutant',              desc: 'Style Girly : féminité, sensualité et expression, niveau débutant.',                                                 ages: 'àpd 12 ans',  levels: 'Débutant',         prof: 'Margaux',                  lieu: 'adk',     schedule: 'Jeudi 18h00 – 19h00',                   biweekly: false, emoji: '💃', image: 'assets/images/ragga_dancer.png' },
    { id: 20, style: 'hiphop',      name: 'Break Dance (àpd 8 ans)',                       desc: 'B-boying/b-girling : footwork, freezes, power moves et windmills. Énergie et créativité !',                         ages: 'àpd 8 ans',   levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Mardi 18h00 – 19h00',                   biweekly: false, emoji: '🔄', image: 'assets/images/breakdance_freeze.png' },
    { id: 21, style: 'hiphop',      name: 'Hiphop Oldschool — Pop/Lock/House (àpd 12 ans)', desc: 'Styles old school hip-hop : popping, locking, house dance. Les vraies racines du hip-hop !',                    ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Mardi 19h00 – 20h00',                   biweekly: false, emoji: '🎶', image: 'assets/images/breakdance_freeze.png' },
    { id: 22, style: 'ragga',       name: 'Pomdance (àpd 12 ans)',                         desc: 'Danse avec pompon : énergie, synchronisation et esprit cheerleader.',                                               ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 19h00 – 20h00',                biweekly: false, emoji: '🎉', image: 'assets/images/ragga_dancer.png' },
    { id: 23, style: 'hiphop',      name: 'Danse Urbaine Commerciale (àpd 16 ans)',        desc: 'Clips, publicités, shows : la danse urbaine version commerciale et show-biz pour adultes.',                         ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Maeva',                    lieu: 'adk',     schedule: 'Mardi 20h00 – 21h00',                   biweekly: false, emoji: '🌟', image: 'assets/images/hiphop_dancer.png' },
    { id: 24, style: 'hiphop',      name: 'Hip-Hop / Ragga (Adultes)',                     desc: 'Cours adultes mêlant hip-hop et ragga dancehall pour se défouler et progresser en rythme.',                        ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Jeudi 19h00 – 20h00',                   biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 25, style: 'contemporain',name: 'Contemporain / Jazz (Adultes)',                 desc: 'Expression, fluidité et interprétation pour adultes en danse contemporaine et jazz.',                               ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Janis',                    lieu: 'adk',     schedule: 'Jeudi 20h00 – 21h00',                   biweekly: false, emoji: '🌊', image: 'assets/images/dance_contemporary.png' },
    { id: 26, style: 'jazz',        name: 'Line Dance',                                    desc: 'Danse en ligne sur des musiques variées, convivialité et bonne humeur garanties !',                                 ages: 'Tous âges',   levels: 'Tous niveaux',     prof: 'Alain',                    lieu: 'izel',    schedule: 'Lundi 20h00 – 21h30 · Centre Culturel Izel', biweekly: false, emoji: '🤠', image: 'assets/images/dance_jazz.png' },
    { id: 27, style: 'special',     name: 'Pole Dance (àpd 16 ans) ½',                    desc: 'Art du Pole Dance : force, grâce et aérien. Cours 1 sem/2 au Complexe Sportif de Florenville.',                    ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Florence',                 lieu: 'flore',   schedule: 'Jeudi 19h00 – 21h30 · C.S. Florenville (1 sem/2)', biweekly: true, emoji: '🎀', image: 'assets/images/hero_dancer.png' },
    { id: 28, style: 'compagnie',   name: 'Compagnie Moove ½',                             desc: 'Compagnie hip-hop Moove : création chorégraphique, répétitions et performances scéniques.',                        ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 – 13h30 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: 'assets/images/compagnie_stage.png' },
    { id: 29, style: 'compagnie',   name: 'Compagnie Unity ½',                             desc: 'Compagnie Unity : esprit d\'équipe, chorégraphies collectives et représentations.',                                  ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 – 13h30 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: 'assets/images/compagnie_stage.png' },
    { id: 30, style: 'compagnie',   name: 'Compagnie Team (Jazz/Contempo) ½',              desc: 'Compagnie Team jazz/contemporain : créativité artistique et niveau de compétition.',                                ages: 'Sélection',   levels: 'Compagnie',        prof: 'Janis',                    lieu: 'adk',     schedule: 'Samedi 14h00 – 16h00 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: 'assets/images/compagnie_stage.png' },
    { id: 31, style: 'compagnie',   name: 'Atelier Chorégraphique Girly (àpd 13 ans)',     desc: 'Atelier de création chorégraphique style Girly, niveau avancé. Date et heure à convenir.',                         ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '💫', image: 'assets/images/compagnie_stage.png' },
    { id: 32, style: 'compagnie',   name: 'Atelier Chorégraphique Contemporain (àpd 13 ans)', desc: 'Atelier de création contemporaine avancée. Date et heure à convenir.',                                        ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '💫', image: 'assets/images/dance_contemporary.png' },
    { id: 33, style: 'special',     name: 'Cours Préparatifs Concours',                    desc: 'Préparation aux concours de danse avec Janis, Maurine & Corentin. Dimanche matin.',                               ages: 'Sur sélection', levels: 'Compétition',    prof: 'Janis · Maurine · Corentin', lieu: 'adk', schedule: 'Dimanche matin — date à convenir',     biweekly: false, emoji: '🏆', image: 'assets/images/compagnie_stage.png' },
    { id: 34, style: 'special',     name: 'Cours Préparatifs Futurs Profs',                desc: 'Formation pédagogique pour les futurs professeurs de l\'École ADK. Date à convenir.',                               ages: 'Sur sélection', levels: 'Formation',      prof: 'Maurine · Corentin',       lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '📚', image: 'assets/images/compagnie_stage.png' },
    // === AU ROX ===
    { id: 35, style: 'hiphop',      name: 'Hip-Hop au Rox (àpd 12 ans) ½',                desc: 'Cours hip-hop au Rox, tous niveaux, bi-mensuel (1 semaine sur 2).',                                                 ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 14h00 – 16h00 (1 sem/2)',        biweekly: true,  emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 36, style: 'jazz',        name: 'Jazz / Contemporain au Rox (àpd 12 ans) ½',    desc: 'Jazz et contemporain au Rox, cours bi-mensuel pour tous niveaux.',                                                   ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 16h00 – 18h00 (1 sem/2)',        biweekly: true,  emoji: '🎷', image: 'assets/images/dance_contemporary.png' },
    { id: 37, style: 'ragga',       name: 'Ragga au Rox (àpd 12 ans) ½',                  desc: 'Ragga dancehall au Rox, bi-mensuel, toute l\'énergie des Caraïbes !',                                               ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 13h30 – 15h30 (1 sem/2)',        biweekly: true,  emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 38, style: 'ragga',       name: 'Girly au Rox (àpd 12 ans) ½',                  desc: 'Style Girly au Rox, féminité et style, cours bi-mensuel.',                                                           ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 15h30 – 17h30 (1 sem/2)',        biweekly: true,  emoji: '💃', image: 'assets/images/ragga_dancer.png' },
    // === BERTRIX ===
    { id: 39, style: 'hiphop',      name: 'Hip-Hop / Ragga Bertrix (9-12 ans)',            desc: 'Hip-hop et ragga pour enfants à Bertrix, cours hebdomadaire.',                                                      ages: '9 – 12 ans',  levels: 'Débutant',         prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 17h00 – 18h00',                   biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
    { id: 40, style: 'hiphop',      name: 'Hip-Hop / Ragga Bertrix (àpd 13 ans)',          desc: 'Hip-hop et ragga pour ados et adultes à Bertrix.',                                                                   ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 18h00 – 19h00',                   biweekly: false, emoji: '🎤', image: 'assets/images/hiphop_dancer.png' },
];

const VITRINE_DATA = {
  "professeurs": {
    "Anne": {
      "title": "Anne",
      "category": "Direction & Fondatrice",
      "content": "Anne a créé l'école de danse en 1997. Diplômée du Conservatoire de Charleroi en danse classique et jazz, en passant par un perfectionnement au ballet d'Anvers et de Marseille, Anne passionnée par le contact humain et la pédagogie aura cette année près de 30 années d'expérience dans la région ! Elle gère au quotidien l'école ADK pour toutes les décisions et projets, les mises en scène, les assemblages de musiques, les différents shows et concours internationaux avec son équipe de confiance."
    },
    "Corentin": {
      "title": "Corentin",
      "content": "Découvrez l'univers de Corentin."
    },
    "Mégan": {
      "title": "Mégan",
      "content": "Mégan est une véritable artiste de l'ombre, elle imagnie et crée les décors, ambiances et univers visuels qui donnent vie aux spectacles.  Grâce à son imagination et son talent artistique, elle nous transporte dans l'aventure ADK"
    },
    "Sylvie": {
      "title": "Sylvie",
      "content": "Sylvie accompagne les danseurs dans leur préparation physique, le renforcement musculaire, la prévention des blessures et le suivi corporel des compagnies surtout avant un spectacle ou un concours.  Grâce à son expertise du corps en mouvement, elle aides les danseurs à développer force, équilibre et endurance tout en préservant leur bien-être physique."
    },
    "Charlotte": {
      "title": "Charlotte",
      "content": "Découvrez l'univers de Charlotte."
    },
    "Pauline": {
      "title": "Pauline",
      "content": "Bienvenue à l'École de danse ADK, un lieu où la passion du mouvement et de la danse prend vie.\n\nSpécialisée dans l'enseignement de diverses disciplines, notre école est dédiée\n\nà vous faire découvrir et perfectionner votre talent.\n\nQue vous soyez débutant ou danseur confirmé, nous proposons un environnement\n\naccueillant et professionnel pour tous.\n\nRejoignez-nous et laissez la danse devenir votre expression ultime de créativité et de plaisir.\n\nL'objectif pédagogique de l'école\n\nest de permettre aux élèves d'atteindre leur meilleur niveau\n\ndans une structure amateur exigeante.\n\nDiplômée du Concervatoire de Charleroi en danse classique et jazz, en passant par un perfectionnement au ballet d'Anvers et de Marseille (FR), Anne passionnée par le contact humain et la pédagogie aura cette année 28 année d'éxpérience dans la région !\n\nLes professeurs travaillent en concertation et participent\n\nà des Workshops, formations professionnelles, stages afin d'être toujours formés à la pointe des nouveautés."
    },
    "Alain": {
      "title": "Alain",
      "content": "Découvrez l'univers de Alain."
    },
    "Clémentine": {
      "title": "Clémentine",
      "content": "Découvrez l'univers de Clémentine."
    },
    "Adam": {
      "title": "Adam",
      "content": "Découvrez l'univers de Adam."
    },
    "Daisy": {
      "title": "Daisy",
      "content": "Découvrez l'univers de Daisy."
    },
    "Zoé": {
      "title": "Zoé",
      "category": "Gestion et organisation",
      "content": "Zoé organise la gestion des réunions diverses et fait partie de la merveilleuse équipe passionnée, dévouée et pédagogue qui accompagne Anne au quotidien."
    },
    "Andrew": {
      "title": "Andrew",
      "category": "Logistique et technique",
      "content": "Andrew gère toute la logistique, la création vidéo et toute la technique. Il veille à toutes la partie technique de l'école : powerpoint et vidéos pour les spectacles, réparations, installations et soutien logistique du Studio ADK."
    },
    "Loreen": {
      "title": "Loreen",
      "content": "Découvrez l'univers de Loreen."
    },
    "Maeva": {
      "title": "Maeva",
      "content": "Découvrez l'univers de Maeva."
    },
    "Jade": {
      "title": "Jade",
      "content": "Découvrez l'univers de Jade."
    },
    "Janis": {
      "title": "Janis",
      "category": "Chorégraphe et professeure de jazz",
      "content": "Janis est la chorégraphe et professeure de jazz pour les shows et concours tant en Belgique qu'à l'étranger. Elle fait partie de la merveilleuse équipe passionnée, dévouée et pédagogue qui accompagne Anne au quotidien."
    },
    "Margaux": {
      "title": "Margaux",
      "category": "Gestion et organisation",
      "content": "Margaux organise la gestion des réunions diverses et fait partie de la merveilleuse équipe passionnée, dévouée et pédagogue qui accompagne Anne au quotidien."
    },
    "Jeanne": {
      "title": "Jeanne",
      "content": "Découvrez l'univers de Jeanne."
    },
    "Maurine": {
      "title": "Maurine",
      "avatar": "https://annedkdanse.be/gallery/Mau%20mau.jpg?ts=1784038327",
      "modalImage": "https://annedkdanse.be/gallery_gen/0a716be772784745dccd4a8e75abef22_fit.png?ts=1784038327",
      "category": "Coordinatrice et chorégraphe principale",
      "content": "Maurine est coordinatrice et chorégraphe principale pour les shows et concours en Belgique ainsi qu'à l'étranger. Elle s'occupe de la formation des futurs professeurs et grâce à son master en éducation physique sa pédagogie n'est plus à faire valoir. Elle suit en parallèle des cours chez Art Tendance à Limal, école dont la renommée professionnelle est bien connue dans le milieu de la danse."
    },
  },
  "cours": {
    "eveil": {
      "title": "Éveil & Initiation",
      "avatar": "assets/images/eveil_kids.png",
      "modalImage": "assets/images/eveil_kids.png",
      "content": "Offrez à votre enfant ses premiers pas dans l’univers de la danse à travers des cours ludiques, créatifs et adaptés à son âge. À travers des jeux dansés, des exercices de coordination et de petites chorégraphies, ils développent le rythme, l'espace, l'écoute, et la motricité."
    },
    "hiphop": {
      "title": "Hip-Hop & Break",
      "avatar": "assets/images/hiphop_dancer.png",
      "modalImage": "assets/images/hiphop_dancer.png",
      "content": "Le Hip-Hop est une danse urbaine dynamique, créative et incontournable. Bien plus qu'un style de danse, c'est une véritable culture. Les cours sont construits autour de chorégraphies rythmées où les élèves développent coordination, musicalité, énergie et attitude."
    },
    "ragga": {
      "title": "Ragga & Girly",
      "avatar": "assets/images/ragga_dancer.png",
      "modalImage": "assets/images/ragga_dancer.png",
      "content": "Rythmes caribéens, dansehall et touches Girly : une section riche en énergie, féminité et expression corporelle. Idéal pour ceux qui souhaitent se défouler et travailler l'attitude, la présence scénique et la confiance en soi sur des musiques chaleureuses."
    },
    "classique": {
      "title": "Danse Classique",
      "avatar": "assets/images/dance_ballet_1781601330406.png",
      "modalImage": "assets/images/dance_ballet_1781601330406.png",
      "content": "La danse classique est la base de toutes les danses. Elle apporte rigueur, grâce, souplesse et maîtrise du corps. Des premiers pas à la barre jusqu'au travail sur pointes pour les plus avancés, c'est une discipline exigeante mais merveilleusement élégante."
    },
    "jazz": {
      "title": "Jazz & Street Jazz",
      "avatar": "assets/images/dance_jazz_1781601320885.png",
      "modalImage": "assets/images/dance_jazz_1781601320885.png",
      "content": "Énergique, expressive et pleine d’émotions, la danse Jazz permet aux danseurs de développer technique, créativité et personnalité artistique. Le Street Jazz allie l'énergie urbaine à la technique jazz pour des chorégraphies modernes et dynamiques."
    },
    "contemporain": {
      "title": "Contemporain",
      "avatar": "assets/images/dance_contemporary_1781601310092.png",
      "modalImage": "assets/images/dance_contemporary_1781601310092.png",
      "content": "La danse contemporaine apporte une dimension émotionnelle, libre et artistique. Elle explore le rapport au sol, le relâchement, la respiration et la fluidité. L'improvisation y tient une place importante pour développer son propre langage corporel."
    },
    "compagnie": {
      "title": "Compagnies ADK",
      "avatar": "assets/images/compagnie_stage.png",
      "modalImage": "assets/images/compagnie_stage.png",
      "content": "Les élèves des compagnies sont repérés lors des spectacles et répétitions. Leurs formations intensives demandent un grand investissement. Ils se produisent en show à l'extérieur et participent à des concours nationaux et internationaux."
    },
    "special": {
      "title": "Spécialités",
      "avatar": "assets/images/hero_dancer_1781601293705.png",
      "modalImage": "assets/images/hero_dancer_1781601293705.png",
      "content": "Des cours spécifiques comme la Pole Dance ou des formations intensives (préparatifs concours, formation de futurs professeurs). Des disciplines uniques pour repousser ses limites ou se professionnaliser."
    }
  }
};
