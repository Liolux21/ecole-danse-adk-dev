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
    "Pole Dance": {
      "title": "Pole Dance",
      "content": "La Pole Dance est une discipline sportive et artistique complète qui allie force, souplesse, grâce et confiance en soi. Accessible à tous, quel que soit l'âge ou le niveau, elle permet de développer sa condition physique tout en s'amusant.\n\nLors des cours, les élèves apprennent progressivement différentes figures, rotations, montées, enchaînements chorégraphiques et techniques autour de la barre. Chaque séance comprend un échauffement, un travail technique adapté au niveau du groupe, du renforcement musculaire ainsi que des étirements.\n\nAu-delà de l'aspect physique, la Pole Dance aide à gagner en assurance, à améliorer sa posture et à exprimer sa créativité dans une ambiance bienveillante et motivante.\n\nLes bienfaits de la Pole Dance :\n\nRenforcement musculaire complet\n\nDéveloppement de la souplesse\n\nAmélioration de la coordination et de l'équilibre\n\nGain de confiance en soi\n\nTravail de la grâce et de l'expression corporelle\n\nDépassement de soi dans le respect de son rythme\n\nQue vous souhaitiez pratiquer pour le sport, le plaisir, le défi personnel ou l'expression artistique, la Pole Dance vous permettra de découvrir une discipline passionnante et valorisante\n\ndans une ambiance conviviale.\n\nCours dispensés au Centre Sportif de Florenville, un jeudi sur deux de 19h30 à 21h00."
    },
    "Pomdance 1": {
      "title": "Pomdance 1",
      "avatar": "https://annedkdanse.be/gallery/Au%20studio%20adk%2014.png?ts=1784038327",
      "modalImage": "https://annedkdanse.be/gallery_gen/d076a5d4d35f6cc853caf82b8c41743b_fit.png?ts=1784038328",
      "content": "Le « pomdance » est une discipline de la « cheer dance », un style chorégraphié très rythmé utilisant les bases techniques du jazz et la manipulation des pompons, nécessitant de l’énergie et un bon esprit d'équipe."
    },
    "Compagnies ADK": {
      "title": "Compagnies Adk",
      "avatar": "assets/images/compagnie_stage.png",
      "modalImage": "assets/images/compagnie_stage.png",
      "content": "Les élèves des compagnies sont les \"élites\" de l'école de danse, ils se produisent en show à l'extérieur\n\net participent à des concours internationaux.\n\nAnne et les professeurs les repèrent lors des répétitions générales et au spectacle de fin d'année.\n\nLeurs formations intensives demandent un grand investissement de la part des  chorégraphes\n\net des élèves des compagnies.\n\n\"Quand tu t'engages dans une compagnie, tu n'as pas de répis, il faut travailler beaucoup,\n\nne pas s'absenter aux répétitions, continuer à se former non stop dans les différentes disciplines,\n\navoir un esprit de groupe positif et comprendre que l'investissement est le plus important\n\nsinon ce n'est pas la peine de commencer\", explique Anne."
    },
    "Danse classique àpd 12 ans": {
      "title": "Danse Classique Àpd 12 Ans",
      "content": "Ballet Classique Ados & Pointes\n\nCe cours de danse classique pour adolescents permet\n\nde développer progressivement les bases essentielles\n\nde la technique du ballet dans un cadre à la fois exigeant,\n\nélégant et bienveillant.\n\nLes élèves travaillent la posture, l’alignement du corps,\n\nla coordination des mouvements, l’équilibre, la souplesse\n\nainsi que le placement gracieux de la tête et des bras.\n\nÀ travers le travail à la barre et au centre, ils apprennent à maîtriser leur technique tout en développant leur musicalité\n\net leur expression artistique.\n\nLa danse classique apporte également rigueur, discipline, confiance en soi et sens du détail, tout en permettant à chaque danseur de s’épanouir artistiquement.\n\nAprès l’acquisition des bases techniques nécessaires, les élèves peuvent évoluer vers le travail sur pointes.\n\nLe cours pointes est destiné aux élèves suivant déjà une formation en danse classique et possédant une préparation musculaire suffisante au niveau des chevilles, des pieds\n\net du maintien du corps.\n\nChez ADK, l’apprentissage des pointes débute à partir de 13 ans minimum, afin de respecter le développement physique de l’élève et de garantir une progression en toute sécurité.\n\nCe travail progressif permet de renforcer les muscles, d’améliorer la stabilité et d’apprendre à évoluer sur pointes avec contrôle, élégance et sans risque pour le corps.\n\nUne étape emblématique de la danse classique, symbole de grâce, de précision et de dépassement de soi"
    },
    "Breaking": {
      "title": "Breaking",
      "avatar": "assets/images/breakdance_freeze.png",
      "modalImage": "assets/images/breakdance_freeze.png",
      "content": "Le Breakdance, aussi appelé Breaking, est l’une des disciplines les plus emblématiques de la culture hip-hop.\n\nNé dans les rues de New York dans les années 70, ce style spectaculaire mélange performance physique, créativité, musicalité et dépassement de soi.\n\nReconnaissable par son travail au sol, ses figures acrobatiques\n\net ses mouvements dynamiques, le Breakdance demande à la fois force, coordination, équilibre et maîtrise du corps.\n\nLes danseurs, appelés B-boys et B-girls, apprennent progressivement différentes techniques : footwork, freezes, passages au sol, mouvements\n\nde puissance et figures acrobatiques adaptées à leur niveau.\n\nAu-delà de l’aspect technique, le Breakdance développe :\n\nla confiance en soi ;\n\nl’endurance et la condition physique ;\n\nla discipline et la persévérance ;\n\nla créativité et l’improvisation ;\n\nl’esprit d’équipe et le respect des autres.\n\nDans une ambiance urbaine, motivante et conviviale, les cours se terminent souvent par des moments de freestyle ou des battles, permettant aux élèves d’exprimer leur personnalité, leur style et leur énergie tout en conservant l’esprit authentique et “street” du Breaking.\n\nUne discipline impressionnante et passionnante où chacun apprend à se dépasser tout en s’amusant"
    },
    "Hiphop": {
      "title": "Hiphop",
      "avatar": "assets/images/hiphop_dancer.png",
      "modalImage": "assets/images/hiphop_dancer.png",
      "content": "Le Hip-Hop est une danse urbaine dynamique, créative et incontournable, née dans les quartiers du Bronx à New York dans les années 1970.\n\nBien plus qu’un style de danse, le hip-hop est une véritable culture qui rassemble la musique, le mouvement, le partage et l’expression de soi.\n\nAujourd’hui présent partout dans le monde, il continue d’évoluer à travers différents styles et influences urbaines.\n\nLes cours sont construits autour de chorégraphies rythmées sur des musiques actuelles, où les élèves développent coordination, musicalité, énergie, précision et confiance en eux. Dans une ambiance familiale, motivante et bienveillante, chacun progresse à son rythme tout en découvrant son propre style.\n\nLe Hip-Hop permet également de travailler:\n\nla mémoire chorégraphique\n\nla condition physique\n\nla créativité et l’improvisation\n\nla présence scénique et l’attitude\n\nLes différents styles\n\nLe Old School regroupe les premiers styles de danse hip-hop apparus dans les années 70 et 80.\n\nTrès festif et basé sur le groove, il met l’accent sur l’énergie, les rebonds et le feeling avec la musique funk et old school.\n\nLe Popping est un style technique qui consiste à contracter et relâcher rapidement les muscles afin de créer des effets visuels impressionnants\n\nappelés “pops”. Cette danse joue beaucoup avec les illusions, le contrôle du corps et la musicalité.\n\nLe Locking est une danse funky et expressive caractérisée par des mouvements rapides suivis de pauses soudaines appelées “locks”.\n\nCe style apporte beaucoup d’énergie, de jeu scénique et d’interaction avec le public.\n\nLa House Dance se danse sur des musiques house et électroniques. Elle se distingue par des déplacements rapides, un important travail des pieds,\n\nde la fluidité et une grande liberté de mouvement. Très rythmée et expressive, elle développe l’endurance, le groove et la musicalité.\n\nEntre énergie, créativité et esprit de partage, le Hip-Hop est une discipline complète qui permet à chacun de s’exprimer librement\n\ntout en évoluant dans une ambiance positive et passionnée"
    },
    "Danse Classique enfant": {
      "title": "Danse Classique Enfant",
      "content": "Danse Classique Enfant\n\nLa danse classique est une discipline élégante et intemporelle qui permet\n\naux enfants de découvrir les bases fondamentales de la danse tout\n\nen développant grâce, posture et musicalité.\n\nLes élèves apprennent progressivement les premiers mouvements\n\ntechniques à travers des exercices adaptés à leur âge, réalisés à la barre,\n\nChaque cours leur permet de travailler la coordination, la souplesse, l’équilibre et la précision des gestes, tout en développant leur écoute de la musique.\n\nPour les plus jeunes, l’apprentissage se fait de manière ludique et bienveillante afin de stimuler leur imagination, leur créativité et leur sensibilité artistique.\n\nLa danse classique aide également les enfants à gagner en confiance,\n\nen concentration et en discipline, tout en leur offrant un véritable moyen d’expression à travers le mouvement.\n\nÀ la fois exigeante et pleine de poésie, cette discipline apprend aux jeunes danseurs à ressentir la musique, à maîtriser leur corps et à évoluer\n\navec élégance et harmonie"
    },
    "Jazz Contemporain": {
      "title": "Jazz Contemporain",
      "avatar": "assets/images/dance_contemporary_1781601310092.png",
      "modalImage": "assets/images/dance_contemporary_1781601310092.png",
      "content": "Énergique, expressive et pleine d’émotions, la danse Jazz & Contemporaine permet aux danseurs de développer à la fois leur technique, leur créativité et leur personnalité artistique.\n\nInspirée de plusieurs influences, cette discipline mêle rythme, dynamisme, fluidité et expression corporelle. Le modern jazz puise\n\nson énergie dans le mouvement, les contrastes, les sensations\n\net la musicalité, tandis que le contemporain apporte une dimension\n\nplus émotionnelle, libre et artistique.\n\nLes cours travaillent la coordination, la souplesse, les déplacements, l\n\nes sauts, les tours ainsi que l’interprétation chorégraphique.\n\nLes élèves apprennent également les bases techniques essentielles, inspirées notamment de la danse classique, afin de développer précision, posture et maîtrise du corps.\n\nSur des musiques modernes et variées, les danseurs explorent différentes qualités de mouvement : puissance, fluidité, énergie, relâchement et émotion.\n\nL’improvisation et l’expression personnelle occupent aussi une place importante, permettant à chacun de développer son propre style\n\net de transmettre des émotions à travers la danse.\n\nAccessible et évolutive, cette discipline offre un parfait équilibre entre technique, liberté et créativité, dans une ambiance dynamique"
    },
    "Line Dance": {
      "title": "Line Dance",
      "content": "Line Dance est une discipline conviviale et dynamique qui se pratique en groupe, sans partenaire. Les danseurs sont alignés en lignes\n\net réalisent ensemble des chorégraphies rythmées sur des musiques variées : country, pop, rock, latino ou encore musiques actuelles.\n\nLors de ce cours, les participants apprennent progressivement\n\ndes enchaînements de pas, développent leur coordination,\n\nleur mémoire, leur sens du rythme et leur confiance en eux,\n\ntout en profitant d'une ambiance chaleureuse et détendue.\n\nAccessible à tous, débutants comme confirmés, le Line Dance permet de bouger, de se dépenser et de partager un moment de plaisir\n\ndans la bonne humeur. C'est une activité idéale pour entretenir\n\nsa condition physique, travailler son équilibre et faire de belles rencontres autour de la passion de la danse.\n\nPas besoin de partenaire, juste l'envie de danser et de s'amuser !"
    },
    "Girly": {
      "title": "Girly",
      "content": "Le cours de Girly Dance est une discipline moderne, fun et pleine d’attitude, qui permet de révéler sa féminité, sa confiance en soi et son expression artistique.\n\nAccessible avec ou sans talons, ce cours mélange techniques de danse, démarche, posture, musicalité et expression scénique dans une ambiance dynamique et bienveillante.\n\nÀ travers des chorégraphies inspirées des clips, des shows et de l’univers commercial, les élèves travaillent :\n\nl’aisance corporelle ;\n\nla confiance en soi ;\n\nla grâce et la posture ;\n\nla sensualité et l’attitude ;\n\nla coordination et la présence scénique.\n\nLe Girly Dance est également un véritable moment de partage et de plaisir grâce à des musiques variées mêlant grands classiques revisités et hits actuels. Des univers rétro aux chorégraphies inspirées des artistes d’aujourd’hui comme Beyoncé, chaque cours permet de s’amuser,\n\nde se dépasser et d’exprimer pleinement sa personnalité.\n\nUne discipline énergique et libératrice où élégance, puissance et confiance se rencontrent"
    },
    "Street Jazz": {
      "title": "Street Jazz",
      "avatar": "assets/images/dance_jazz_1781601320885.png",
      "modalImage": "assets/images/dance_jazz_1781601320885.png",
      "content": "Le Street Jazz est une discipline moderne qui allie l'énergie des danses urbaines\n\nà latechnique du jazz. Véritable mélange de puissance, de précision,\n\nde musicalité et d'expression, ce cours séduit les danseurs qui aiment\n\nles chorégraphies actuelles, dynamiques et pleines de personnalité.\n\nTout au long de l'année, les élèves développent leur technique, leur coordination, leur sens du rythme, leur mémoire chorégraphique, leur présence scénique ainsi que leur interprétation. Les cours alternent échauffement, travail technique, apprentissage des fondamentaux, déplacements, isolations, souplesse et chorégraphies sur des musiques actuelles.\n\nLe Street Jazz intègre également unetouche de Girly, permettant de travaillerl'attitude, l'élégance, la féminité, l'assurance et l'expression corporelle. Il ne s'agit pas simplement de reproduire des mouvements, mais d'apprendre à interpréter une chorégraphie avec style, caractère et émotion, tout en développant sa propre personnalité artistique.\n\nCette discipline offre un excellent travail physique en améliorant l'endurance,\n\nle renforcement musculaire, la mobilité et la confiance en soi, tout en laissant\n\nune grande place au plaisir de danser.\n\nAccessible dès que les bases techniques sont acquises, le Street Jazz est idéal pour les danseurs qui souhaitent évoluer dans un univers moderne, créatif\n\net exigeant, où l'énergie des danses urbaines rencontre l'élégance\n\net la technique du jazz."
    },
    "Cours adultes": {
      "title": "Cours Adultes",
      "content": "Cours de Hip-Hop / Ragga – Adultes\n\nÉnergie, rythme et dépassement de soi Un cours de hip-hop pour adultes ? Oui, et 1000 fois oui ! Ce cours est un espace de liberté, d’expression et de fun, loin des clichés. Vous y découvrirez\n\nou redécouvrirez le plaisir de bouger avec puissance et style,\n\ndans une atmosphère détendue et motivante.\n\nCours de Danse Jazz / Contemporain – Adultes\n\nÉlégance, énergie et expression de soi Envie de renouer avec la grâce du mouvement, la musicalité et l’expressivité ?\n\nLe cours de jazz adultes est fait pour vous, quel que soit votre niveau. Accessible à toutes et tous, il allie technique, fluidité et plaisir, dans une ambiance bienveillante et motivante"
    },
    "Eveil Initiation": {
      "title": "Eveil Initiation",
      "avatar": "assets/images/eveil_kids.png",
      "modalImage": "assets/images/eveil_kids.png",
      "content": "Éveil & Initiation à la Danse (3-5 ans)\n\nOffrez à votre enfant ses premiers pas dans l’univers de la danse\n\nà travers des cours ludiques, créatifs et adaptés à son âge.\n\nLes cours d’éveil et d’initiation à la danse permettent aux enfants\n\nde 3 à 5 ans de découvrir le mouvement, la musique et l’expression corporelle tout en s’amusant. À travers des jeux dansés, des exercices de coordination et de petites chorégraphies, ils développent les bases fondamentales de la danse :\n\nle rythme, l’espace, l’écoute, la mémoire et la motricité.\n\nDans une ambiance bienveillante et encourageante, chaque enfant apprend à prendre confiance en lui, à s’exprimer librement\n\net à évoluer en groupe dans le respect des autres.\n\nUne belle aventure pour grandir, bouger, créer et découvrir"
    }
  }
};
