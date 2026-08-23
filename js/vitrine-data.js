const ALL_COURSES = [

    { id: 47, style: 'girly', name: 'Girly - Heels', desc: "Mélange d'influences de jazz commercial, de hip-hop, de cabaret et de danse contemporaine.", ages: 'à pd 13 ans', levels: 'Intermédiaire - Avancé', prof: '', lieu: 'adk', schedule: 'Dimanche 9h00 à 10h30 (1 sem/2)', biweekly: true, emoji: '👠', image: 'assets/images/ragga_dancer.png' },
    { id: 48, style: 'girly', name: 'Girly ROX - Rouvroy', desc: "Développe la féminité, l’assurance, l’expression corporelle élégantes et pleines d’attitude", ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 15h30 à 17h30 (1 sem/2)', biweekly: true, emoji: '👠', image: 'assets/images/ragga_dancer.png' },

    { id: 45, style: 'ragga', name: 'Ragga ROX - Rouvroy', desc: 'Mélange énergie, rythme et chorégraphie inspirée de la Jamaïque.', ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 13h30 à 15h30 (1 sem/2)', biweekly: true, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },
    { id: 46, style: 'ragga', name: 'Ragga Bertrix', desc: "Energie, rythme et expression, chorégraphies dynamiques adaptées à l'âge du danseur.", ages: '9 - 12 ans', levels: 'Débutant', prof: '', lieu: 'bertrix', schedule: 'Jeudi 17h00 à 18h00', biweekly: false, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },

    { id: 43, style: 'hiphop', name: 'Hip-Hop ROX - Rouvroy', desc: 'Perfectionnment hiphop niveau intermédiaire (cours 1 samedi sur 2). 1er cours le 26/09', ages: 'à pd 13 ans', levels: 'Débutant - Intermédiaire', prof: '', lieu: 'rox', schedule: 'Samedi 14h00 à 16h00 (1 sem/2)', biweekly: true, emoji: '🔥', image: 'assets/images/breakdance_freeze.png' },
    { id: 44, style: 'hiphop', name: 'Hip-Hop Bertrix', desc: "Développement du rythme, de la coordination, de l'énergie et la confiance en soi.", ages: '9 - 12 ans', levels: 'Débutant', prof: '', lieu: 'bertrix', schedule: 'Jeudi 17h00 à 18h00', biweekly: false, emoji: '🔥', image: 'assets/images/breakdance_freeze.png' },

    { id: 40, style: 'jazz_contemporain', name: 'Jazz Contemporain 5 perfectionnement', desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.', ages: 'à pd 14 ans', levels: 'Avancé', prof: '', lieu: 'adk', schedule: 'A DEFINIR', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
    { id: 41, style: 'jazz_contemporain', name: 'Jazz Contemporain ROX - Rouvroy', desc: 'Mélange jazz et contemporain, expression libre et technique.', ages: 'à pd 13 ans', levels: 'Débutant/Interméd.', prof: '', lieu: 'rox', schedule: 'Samedi 16h00 à 18h00 - ROx', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
    { id: 42, style: 'jazz_contemporain', name: 'Jazz Contemporain Atelier Pro', desc: 'Atelier de création contemporaine avancée - Formation intensive (un dimanche sur 2)', ages: 'à pd 13 ans', levels: 'Avancé', prof: '', lieu: 'adk', schedule: 'Dimanche 10h30 à 12h00 (1 sem/2)', biweekly: true, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
// === STUDIO ADK ===
    { id: 1,  style: 'eveil',       name: 'Éveil (3-4 ans)',                               desc: 'Les tout-petits explorent la danse dans un cadre bienveillant et ludique.',                                         ages: '3 à 4 ans',   levels: 'Éveil',            prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 16h00 à 17h00',                biweekly: false, emoji: '🌟', image: 'assets/images/eveil_3_4_ans.png' },
    { id: 2,  style: 'eveil',       name: 'Initiation (4-5 ans)',                          desc: 'Première approche de la danse par le jeu, la musique et le mouvement créatif.',                                     ages: '4 à 5 ans',   levels: 'Initiation',       prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 15h00 à 16h00',                biweekly: false, emoji: '🦋', image: 'assets/images/eveil_kids.png' },
    { id: 3,  style: 'hiphop',      name: 'Hiphop 1 (6-8 ans)',                           desc: 'Introduction aux fondamentaux du hip-hop dans une ambiance fun et énergique.',                                       ages: '6 à 8 ans',   levels: 'Débutant',         prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 9h00 à 10h00',                   biweekly: false, emoji: '🧢', image: 'assets/images/hiphop_dancer.png' },
    { id: 4,  style: 'hiphop',      name: 'Hiphop 2 (9-11 ans)',                          desc: 'Approfondissement des bases hip-hop avec chorégraphies adaptées à l\'âge.',                                          ages: '9 à 11 ans',  levels: 'Débutant',         prof: 'Jeanne',                   lieu: 'adk',     schedule: 'Vendredi 17h00 à 18h00',                biweekly: false, emoji: '👟', image: 'assets/images/hiphop_dancer.png' },
    { id: 5,  style: 'hiphop',      name: 'Hiphop 3 (11-13 ans)',                         desc: 'Développement technique hip-hop pour préados : expression, style et enchaînements.',                                 ages: '11 à 13 ans', levels: 'Intermédiaire',    prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 10h00 à 11h00',                  biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' },
    { id: 6,  style: 'hiphop',      name: 'Hiphop 4 (àpd 14 ans) – Déb/Int',             desc: 'Hip-hop pour grands débutants et intermédiaires : bases, groove et attitude.',                                       ages: 'àpd 14 ans',  levels: 'Déb / Interméd.',  prof: 'Pauline',                  lieu: 'adk',     schedule: 'Lundi 17h00 à 18h00',                   biweekly: false, emoji: '🎧', image: 'assets/images/hiphop_dancer.png' },
    { id: 7,  style: 'hiphop',      name: 'Hiphop 5 (àpd 14 ans) – Interméd. ⏳',         desc: 'Perfectionnement hip-hop niveau intermédiaire, cours bi-mensuel (1 semaine sur 2).',                                ages: 'àpd 14 ans',  levels: 'Intermédiaire',    prof: 'Zoé',                      lieu: 'adk',     schedule: 'Samedi 14h00 à 15h30 (1 sem/2)',        biweekly: true,  emoji: '💥', image: 'assets/images/hiphop_dancer.png' },
    { id: 8,  style: 'hiphop',      name: 'Hiphop 6 (àpd 14 ans) – Avancé',              desc: 'Niveau avancé : technique poussée, style affirmé, préparation aux concours.',                                       ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 11h00 à 12h00',                  biweekly: false, emoji: '👑', image: 'assets/images/hiphop_dancer.png' },
    { id: 9,  style: 'jazz_contemporain', name: 'Jazz Contemporain 1',                              desc: 'Éveil au jazz pour enfants : rythme, coordination, plaisir du mouvement.',                                           ages: '6 à 8 ans',   levels: 'Débutant',         prof: 'Clémentine',               lieu: 'adk',     schedule: 'Mercredi 14h00 à 15h00',                biweekly: false, emoji: '✨', image: 'assets/images/dance_jazz.png' },
    { id: 10, style: 'jazz_contemporain', name: 'Jazz Contemporain 2',                             desc: 'Développement technique jazz, travail du style et des enchaînements scéniques.',                                     ages: '9 à 11 ans',  levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 18h00 à 19h00',                   biweekly: false, emoji: '💫', image: 'assets/images/dance_jazz.png' },
    { id: 11, style: 'jazz_contemporain',        name: 'Jazz Contemporain 3',       desc: 'Mélange jazz et contemporain pour ados : expression libre et technique solide.',                                     ages: 'àpd 12 ans',  levels: 'Déb / Interméd.',  prof: 'Charlotte',                lieu: 'adk',     schedule: 'Vendredi 18h00 à 19h00',                biweekly: false, emoji: '🍃', image: 'assets/images/dance_contemporary.png' },
    { id: 12, style: 'jazz_contemporain',        name: 'Jazz Contemporain 4',        desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.',                             ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 19h00 à 20h00',                   biweekly: false, emoji: '🎭', image: 'assets/images/dance_jazz.png' },
    { id: 13, style: 'classique',   name: 'Classique 1',                         desc: 'Introduction à la danse classique (posture, barre, placement, grâce et musicalité).',                               ages: '6 - 8 ans',   levels: 'Débutant',         prof: 'Charlotte',                    lieu: 'adk',     schedule: 'Mardi 17h00 à 18h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 132, style: 'classique',   name: 'Classique 2',                         desc: 'Approfondissement classique : barre, milieu, vocabulaire académique et variations.',                               ages: '9 - 11 ans',   levels: 'Débutant',         prof: 'Charlotte',                    lieu: 'adk',     schedule: 'Mardi 17h00 à 18h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 15, style: 'classique',   name: 'Ballet Classique & Pointes (àpd 12 ans)',       desc: 'Cours avancé de ballet : travail sur pointes, variations de répertoire et technique approfondie.',                  ages: 'àpd 12 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Lundi 20h00 à 21h30',                   biweekly: false, emoji: '🦢', image: 'assets/images/hero_dancer.png' },
    { id: 16, style: 'ragga',       name: 'Ragga 1',                            desc: 'Introduction au ragga dancehall : rythme, moves caribéens et énergie communicative.',                               ages: '9 à 12 ans',  levels: 'Débutant',         prof: 'Jade',                     lieu: 'adk',     schedule: 'Jeudi 17h00 à 18h00',                   biweekly: false, emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 17, style: 'ragga',       name: 'Ragga 2',               desc: 'Ragga dancehall pour ados et adultes débutants à intermédiaires.',                                                   ages: 'àpd 13 ans',  levels: 'Déb / Interméd.',  prof: 'Jade',                     lieu: 'adk',     schedule: 'Mercredi 17h00 à 18h00',                biweekly: false, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },
    { id: 18, style: 'ragga',       name: 'Ragga 3',            desc: 'Ragga niveau intermédiaire à avancé : style affirmé et préparation aux compétitions.',                              ages: 'àpd 14 ans',  levels: 'Interméd./Avancé', prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 20h00 à 21h00',                biweekly: false, emoji: '💥', image: 'assets/images/ragga_dancer.png' },
    { id: 19, style: 'ragga',       name: 'Girly (àpd 12 ans) – Déb.',              desc: 'Style Girly : féminité, sensualité et expression, niveau débutant.',                                                 ages: 'àpd 12 ans',  levels: 'Débutant',         prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 18h00 à 19h00',                   biweekly: false, emoji: '💋', image: 'assets/images/ragga_dancer.png' },
    { id: 20, style: 'hiphop',      name: 'Break Dance (àpd 8 ans)',                       desc: 'B-boying/b-girling : footwork, freezes, power moves et windmills. Énergie et créativité !',                         ages: 'àpd 8 ans',   levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Jeudi 18h00 à 19h00',                   biweekly: false, emoji: '🌪️', image: 'assets/images/breakdance_freeze.png' },
    { id: 21, style: 'ragga',       name: 'Pomdance (àpd 12 ans)',                      desc: 'Pomdance avec pompons, technique, souplesse et dynamisme.',                                                           ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 19h00 à 20h00',                   biweekly: false, emoji: '🎀', image: 'assets/images/ragga_dancer.png' },
    { id: 22, style: 'special',     name: 'Libre',                                         desc: 'Entraînement libre',                                                                                                ages: 'Tous âges',   levels: 'Tous niveaux',     prof: '',                         lieu: 'adk',     schedule: 'Mardi 18h00 à 20h00',                   biweekly: false, emoji: '🤸', image: 'assets/images/hero_dancer.png' },
    { id: 23, style: 'jazz_contemporain',        name: 'Street Jazz (Ados/Adultes àpd 16 ans)',        desc: 'Clips, publicités, shows : la danse urbaine version commerciale et show-biz pour adultes.',                         ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Maeva',                    lieu: 'adk',     schedule: 'Mardi 20h00 à 21h30',                   biweekly: false, emoji: '🎬', image: 'assets/images/hiphop_dancer.png' },
    { id: 24, style: 'adultes', name: 'Adultes Hip-Hop - Ragga', desc: 'Apprentissage de techniques hiphop et Ragga dans une ambiance conviviale.', ages: 'Adultes', levels: 'Débutant - Intermédiaire', prof: 'Margaux', lieu: 'adk', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' },
    { id: 25, style: 'adultes', name: 'Adultes Jazz - Contemporain', desc: 'Apprentissage de techniques jazz et contemporaine dans une ambiance conviviale.', ages: 'Adultes', levels: 'Débutant - Intermédiaire', prof: 'Janis', lieu: 'adk', schedule: 'Jeudi 20h00-21h00', biweekly: false, emoji: '✨', image: 'assets/images/dance_contemporary.png' },
    { id: 26, style: 'adultes', name: 'Line Dance', desc: 'Danse conviviale et dynamique, pratiquée en ligne sur des chorégraphies variées, accessible à tous et sans partenaire.', ages: 'Tout public', levels: 'Débutant - Intermédiaire', prof: 'Alain', lieu: 'izel', schedule: 'Lundi 20h00-21h15 (sauf dernier lundi du mois)', biweekly: false, emoji: '🤠', image: 'assets/images/dance_jazz.png' },
    { id: 27, style: 'poledance', name: 'Pole Dance', desc: 'Développe la féminité, l’assurance, l’expression corporelle, élégantes et pleines d’attitude', ages: 'à pd 12 ans', levels: 'Débutant - Intermédiaire', prof: 'Florence', lieu: 'flore', schedule: 'Jeudi 19h30 - 21h00', biweekly: false, emoji: '🧘‍♀️', image: 'assets/images/hero_dancer.png' },
    { id: 28, style: 'compagnie',   name: 'ADK Moove / ADK Unity ⏳',                             desc: 'Compagnies hip-hop : création chorégraphique, répétitions et performances scéniques.',                        ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 à 13h30 (1 sem/2)',        biweekly: true,  emoji: '🏆', image: 'assets/images/compagnie_stage.png' },
    { id: 30, style: 'compagnie',   name: 'ADK Team ⏳',              desc: 'Compagnie Team jazz/contemporain : créativité artistique et niveau de compétition.',                                ages: 'Sélection',   levels: 'Compagnie',        prof: 'Janis',                    lieu: 'adk',     schedule: 'Samedi 14h00 à 16h00 (1 sem/2)',        biweekly: true,  emoji: '🌟', image: 'assets/images/compagnie_stage.png' },
    { id: 31, style: 'compagnie',   name: 'Atelier Chorégraphique Girly (Niv Av.)',     desc: 'Atelier de création chorégraphique style Girly, niveau avancé. 1 semaine sur 2.',                         ages: 'Niv Avancé',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Dimanche 9h00 à 10h30 (1 sem/2)',               biweekly: true, emoji: '👠', image: 'assets/images/compagnie_stage.png' },
    { id: 32, style: 'compagnie',   name: 'Atelier Chorégraphique Contemporain (Niv Av.)', desc: 'Atelier de création contemporaine avancée. 1 semaine sur 2.',                                        ages: 'Niv Avancé',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Dimanche 10h30 à 12h00 (1 sem/2)',               biweekly: true, emoji: '🍂', image: 'assets/images/dance_contemporary.png' },
    { id: 33, style: 'special',     name: 'Cours Préparatifs aux concours',                    desc: 'Préparation aux concours de danse.',                               ages: 'Sur sélection', levels: 'Compétition',    prof: 'Maurine - Janis', lieu: 'adk', schedule: 'Dates à convenir',     biweekly: false, emoji: '🥇', image: 'assets/images/compagnie_stage.png' },
    { id: 34, style: 'special',     name: 'Cours Préparatifs Futurs Profs',                desc: 'Formation pédagogique pour les futurs professeurs de l\'école ADK.',                               ages: 'Sur sélection', levels: 'Formation',      prof: 'Maurine - Corentin',       lieu: 'adk',     schedule: 'Dates à convenir',               biweekly: false, emoji: '🎓', image: 'assets/images/compagnie_stage.png' },
    // === AU ROX ===
    { id: 35, style: 'hiphop',      name: 'Hip-hop au Rox (àpd 13 ans) ⏳',                desc: 'Cours hip-hop au Rox, tous niveaux, bi-mensuel (1 semaine sur 2).',                                                 ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 14h00 à 16h00 (1 sem/2)',        biweekly: true,  emoji: '🎧', image: 'assets/images/hiphop_dancer.png' },
    { id: 36, style: 'jazz_contemporain',        name: 'Jazz / Contemporain au Rox (àpd 13 ans) ⏳',    desc: 'Jazz et contemporain au Rox, cours bi-mensuel pour tous niveaux.',                                                   ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 16h00 à 18h00 (1 sem/2)',        biweekly: true,  emoji: '🍃', image: 'assets/images/dance_contemporary.png' },
    { id: 37, style: 'ragga',       name: 'Ragga au Rox (àpd 13 ans) ⏳',                  desc: 'Ragga dancehall au Rox, bi-mensuel, toute l\'énergie des Caraïbes !',                                               ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 13h30 à 15h30 (1 sem/2)',        biweekly: true,  emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 38, style: 'ragga',       name: 'Girly au Rox (àpd 13 ans) ⏳',                  desc: 'Style Girly au Rox, féminité et style, cours bi-mensuel.',                                                           ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 15h30 à 17h30 (1 sem/2)',        biweekly: true,  emoji: '💋', image: 'assets/images/ragga_dancer.png' },
    // === BERTRIX ===
    { id: 39, style: 'hiphop',      name: 'Hiphop / Ragga Bertrix (9-12 ans)',            desc: 'Hip-hop et ragga pour enfants à Bertrix, cours hebdomadaire.',                                                      ages: '9 à 12 ans',  levels: 'Débutant',         prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 17h00 à 18h00',                   biweekly: false, emoji: '👟', image: 'assets/images/hiphop_dancer.png' },
    { id: 40, style: 'hiphop',      name: 'Hiphop / Ragga Bertrix (àpd 13 ans)',          desc: 'Hip-hop et ragga pour ados et adultes à Bertrix.',                                                                   ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 18h00 à 19h00',                   biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' }
];

const VITRINE_DATA = {
  "professeurs": {
    "Anne": {
      "title": "Anne",
      "category": "Fondatrice & Directrice",
      "avatar": "https://annedkdanse.be/gallery_gen/fac195ac9cdce28b1f4016e3c10f388b_1063x1063_0x0_1063x1080_crop.jpg?ts=1784820812",
      "content": "Anne a créé l'école de danse en 1997. Diplômée du Conservatoire de Charleroi en danse classique et jazz, en passant par un perfectionnement au ballet d'Anvers et de Marseille, Anne passionnée par le contact humain et la pédagogie aura cette année près de 30 années d'expérience dans la région ! Elle gère au quotidien l'école ADK pour toutes les décisions et projets, les mises en scène, les assemblages de musiques, les différents shows et concours internationaux avec son équipe de confiance."
    },
    "Andrew": {
      "title": "Andrew",
      "category": "Logistique et technique",
      "avatar": "https://annedkdanse.be/gallery_gen/b357bcb3e8bd30a1378c917bcc32d82e_876x812_fit.jpg?ts=1784984525",
      "content": "Andrew gère toute la logistique, la création vidéo et toute la technique. Il veille à toutes la partie technique de l'école : powerpoint et vidéos pour les spectacles, réparations, installations et soutien logistique du Studio ADK."
    },
    "Sylvie": {
      "title": "Sylvie",
      "category": "Kinésithérapeute accompagnatrice des compagnies et professeurs",
      "avatar": "https://annedkdanse.be/gallery_gen/cffd52798af8c5887dcff43b132cb97a_603x628_0x0_603x761_crop.jpg?ts=1784984525",
      "content": "Sylvie accompagne les danseurs dans leur préparation physique, le renforcement musculaire, la prévention des blessures et le suivi corporel des compagnies surtout avant un spectacle ou un concours. Grâce à son expertise du corps en mouvement, elle aide les danseurs à développer force, équilibre et endurance tout en préservant leur bien-être physique."
    },
    "Mégan": {
      "title": "Mégan",
      "category": "Responsable décoration scénique, créatrice artistique des décors",
      "avatar": "https://annedkdanse.be/gallery/482349329_1785755885609251_7586817620626532284_n.jpg?ts=1784984525",
      "content": "Mégan est une véritable artiste de l'ombre, elle imagine et crée les décors, ambiances et univers visuels qui donnent vie aux spectacles. Grâce à son imagination et son talent artistique, elle nous transporte dans l'aventure ADK."
    },
    "Daisy": {
      "title": "Daisy",
      "styles": "Éveil & Initiation (3-5 ans)",
      "avatar": "https://annedkdanse.be/gallery_gen/bcab6ca05caeee3c4005be65786f33f6_500x498_fit.jpg?ts=1784747270",
      "modalImage": "https://www.annedkdanse.be/gallery_gen/a3452dc8191dd14761a3f034835c4c58_fit.png?ts=1784985733",
      "content": "Enseignante spécialisée en Éveil & Initiation pour les enfants de 3 à 5 ans. Passionnée par le jeune âge, Daisy guide les tout-petits dans leurs premiers pas dansés en développant leur motricité, leur coordination, leur écoute musicale et leur expression corporelle à travers une pédagogie ludique, douce et bienveillante au Studio ADK."
    },
    "Maurine": {
      "title": "Maurine",
      "category": "Coordinatrice et chorégraphe principale",
      "styles": "Hip-Hop · Street · Afro · Cies Moove & Unity",
      "avatar": "https://www.annedkdanse.be/gallery_gen/97fba9ebb7c6f07caf4ed2a1889e5554_504x442_fit.jpg?ts=1784985733",
      "modalImage": "https://www.annedkdanse.be/gallery_gen/97fba9ebb7c6f07caf4ed2a1889e5554_504x442_fit.jpg?ts=1784985733",
      "flyerStyle": {
        "headerSubtitle": "Ecole de danse ADK",
        "headerTitle": "Initiation 3-6 ans<br>Hiphop · Afro",
        "badgeText": "Rencontre avec mes professeurs",
        "paragraphs": [
          "Je danse depuis que j'ai 6 ou 7 ans, et depuis ce jour-là, la danse fait partie intégrante de ma vie. Mon parcours a commencé chez <strong style=\"color:#ffffff; font-weight:700;\">ADK</strong>, un lieu qui est vite devenu ma deuxième maison. J'y ai d'abord grandi au sein d'une compagnie, avant d'avoir la chance de passer de l'autre côté et de transmettre à mon tour en tant que professeure.",
          "Très vite, le <strong style=\"color:#ffffff; font-weight:700;\">hip-hop</strong> s'est imposé comme une évidence : un style qui colle parfaitement à mon énergie ! Plus récemment, j'ai découvert l'<strong style=\"color:#ffffff; font-weight:700;\">afro</strong>, un univers dans lequel je me sens incroyablement libre et épanouie.<br>Mais pour moi, la danse ne s'arrête jamais à ce qu'on maîtrise déjà. Je continue à me former régulièrement à Limal, aux côtés de professeurs inspirants qui m'aident à affiner ma technique. Je participe aussi à un maximum de workshops, en Belgique et ailleurs, parce que chaque cours, chaque rencontre est une occasion précieuse d'apprendre, de grandir et de repousser mes limites.",
          "<div style=\"text-align:center; margin: 1.3rem 0; font-size: 1.15rem; font-style: italic; font-weight: 700; color: #FFE5D0; letter-spacing: 0.5px;\">« toujours avancer, toujours se dépasser »</div>",
          "Je suis une personne dynamique, passionnée, j'aime quand ça bouge, quand l'énergie circule et se partage.<br>Pour moi, la danse, c'est bien plus qu'une passion : c'est mon langage, ma manière de m'exprimer, de vibrer et de me connecter aux autres.",
          "<div style=\"text-align:center; margin-top: 1.3rem; font-size: 1.2rem; font-style: italic; font-weight: 700; color: #FFE5D0; letter-spacing: 0.5px;\">La danse ne se raconte pas, elle se vit.</div>"
        ]
      },
      "content": "Maurine est coordinatrice et chorégraphe principale pour les shows et concours en Belgique ainsi qu'à l'étranger. Elle s'occupe de la formation des futurs professeurs et grâce à son master en éducation physique sa pédagogie n'est plus à faire valoir. Elle suit en parallèle des cours chez Art Tendance à Limal, école dont la renommée professionnelle est bien connue dans le milieu de la danse."
    },
    "Janis": {
      "title": "Janis",
      "category": "Chorégraphe et professeure de jazz",
      "styles": "Contemporain · Jazz · Classique · Cie Team",
      "avatar": "https://annedkdanse.be/gallery_gen/6762ccc16a5d867bc801e00528e3e9e8_394x500_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/6762ccc16a5d867bc801e00528e3e9e8_394x500_fit.jpg?ts=1784984524",
      "content": "Janis est la chorégraphe et professeure de jazz, de danse classique et contemporaine pour les shows et concours tant en Belgique qu'à l'étranger. Elle dirige également la Compagnie Team. Elle fait partie de la merveilleuse équipe passionnée, dévouée et pédagogue qui accompagne Anne au quotidien, transmettant rigueur artistique et plaisir de danser à tous ses élèves."
    },
    "Margaux": {
      "title": "Margaux",
      "category": "Gestion et organisation",
      "styles": "Girly · Pomdance · Ragga · Adultes Hip-Hop/Ragga",
      "avatar": "https://annedkdanse.be/gallery_gen/4318b6ec0738a6fc8e478e7755de4aa6_504x510_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/4318b6ec0738a6fc8e478e7755de4aa6_504x510_fit.jpg?ts=1784984524",
      "content": "Margaux organise la gestion des réunions diverses de l'école et enseigne avec une énergie communicative ! Spécialisée en Girly, Pomdance, Ragga et cours adultes, elle crée une ambiance chaleureuse, rythmée et décomplexée pour permettre à chacun de s'affirmer et de progresser en confiance sur des sonorités dynamiques et caribéennes."
    },
    "Zoé": {
      "title": "Zoé",
      "category": "Gestion et organisation",
      "styles": "Hip-Hop · Contemporain · Jazz",
      "avatar": "https://annedkdanse.be/gallery_gen/838a00fcf2733d092f124231f9975d09_500x500_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/838a00fcf2733d092f124231f9975d09_500x500_fit.jpg?ts=1784984524",
      "content": "Zoé organise la gestion des réunions diverses et enseigne le Hip-Hop, le Contemporain et le Jazz tant au Studio ADK qu'au Rox à Rouvroy. Toujours à l'écoute, motivante et passionnée, elle accompagne ses élèves dans l'apprentissage du rythme, du groove et de la technique corporelle dans une ambiance conviviale et stimulante."
    },
    "Maeva": {
      "title": "Maeva",
      "styles": "Street Jazz · Danse Urbaine Commerciale",
      "avatar": "https://annedkdanse.be/gallery_gen/99a17601896124cd91f408e0d51cb6dd_504x436_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/99a17601896124cd91f408e0d51cb6dd_504x436_fit.jpg?ts=1784984524",
      "content": "Professeure de Danse Urbaine Commerciale et de Street Jazz. Maeva apporte son expérience scénique et sa passion pour créer des chorégraphies modernes, percutantes et dignes des productions artistiques et clips musicaux actuels. Un cours idéal pour travailler l'attitude, la précision chorégraphique et la présence en scène."
    },
    "Charlotte": {
      "title": "Charlotte",
      "styles": "Contemporain · Jazz · Classique enfants",
      "avatar": "https://annedkdanse.be/gallery_gen/570ff47d254ce984c70174311a6a76cf_504x484_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/570ff47d254ce984c70174311a6a76cf_504x484_fit.jpg?ts=1784984524",
      "content": "Professeure de Danse Classique, de Jazz et de Contemporain pour les enfants et préadolescents. Douce, rigoureuse et très pédagogue, Charlotte transmet les bases techniques indispensables, la grâce, le maintien corporel et l'amour de la danse en accompagnant chaque élève à son propre rythme."
    },
    "Jade": {
      "title": "Jade",
      "styles": "Ragga",
      "avatar": "assets/images/jade.png",
      "modalImage": "assets/images/jade.png",
      "content": "Professeure de Ragga dancehall au Studio ADK. Jade transmet toute l'énergie et la chaleur des danses caribéennes dans une ambiance dynamique et conviviale."
    },
    "Clémentine": {
      "title": "Clémentine",
      "styles": "Jazz enfants",
      "avatar": "https://annedkdanse.be/gallery_gen/ad16bd282816bb7912c42f9872942f03_500x468_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/ad16bd282816bb7912c42f9872942f03_500x468_fit.jpg?ts=1784984524",
      "content": "Professeure de Jazz pour enfants au Studio ADK. Clémentine initie les jeunes danseurs aux rythmes jazz, au travail d'appuis, à la souplesse et à la coordination. Grâce à son dynamisme et sa créativité, elle fait naître la passion de la scène chez ses jeunes élèves tout en s'amusant."
    },
    "Loreen": {
      "title": "Loreen",
      "styles": "Hip-Hop · Ragga",
      "avatar": "https://annedkdanse.be/gallery_gen/d44a004fd7c771581c07d2fd09c18597_504x480_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/d44a004fd7c771581c07d2fd09c18597_504x480_fit.jpg?ts=1784984524",
      "content": "Professeure de Hip-Hop et de Ragga, notamment au centre de Bertrix. Débordante d'énergie et de vitalité, Loreen partage sa passion des danses urbaines et caribéennes avec les enfants, adolescents et adultes. Ses cours sont rythmés par des enchaînements percutants et un esprit de groupe convivial."
    },
    "Jeanne": {
      "title": "Jeanne",
      "styles": "Hip-Hop enfants",
      "avatar": "https://annedkdanse.be/gallery_gen/76507dc91e25065907fc6ae6eb458ae1_504x468_fit.jpg?ts=1784984524",
      "modalImage": "https://annedkdanse.be/gallery_gen/76507dc91e25065907fc6ae6eb458ae1_504x468_fit.jpg?ts=1784984524",
      "content": "Professeure de Hip-Hop pour enfants et préadolescents. Jeanne transmet les fondements, le rebond, le groove et l'attitude propre aux danses urbaines. Pédagogue et à l'écoute, elle accompagne ses élèves dans le développement de leur coordination corporelle et de leur musicalité."
    },
    "Pauline": {
      "title": "Pauline",
      "styles": "Hip-Hop · Ragga",
      "avatar": "assets/images/pauline.png",
      "modalImage": "assets/images/pauline.png",
      "content": "Professeure de Hip-Hop et de Ragga. Pauline guide les élèves, des grands débutants aux niveaux intermédiaires, dans la maîtrise des pas de base, du style urbain et du lâcher-prise. Un cours motivant où l'énergie du groupe porte chaque danseur vers de superbes réalisations chorégraphiques."
    },
    "Florence": {
      "title": "Florence",
      "styles": "Pole Dance",
      "avatar": "https://annedkdanse.be/gallery_gen/9c4496f7cc1201f8dc2b814d5e3d03ba_500x506_fit.jpg?ts=1784984525",
      "modalImage": "https://annedkdanse.be/gallery_gen/9c4496f7cc1201f8dc2b814d5e3d03ba_500x506_fit.jpg?ts=1784984525",
      "content": "Professeure de Pole Dance au Complexe Sportif de Florenville. Florence enseigne cette discipline aérienne et artistique qui allie force, souplesse, grâce et acrobatie. Dans un cadre sécurisé et bienveillant, elle permet à chaque élève de repousser ses limites physiques et de gagner en confiance en soi."
    },
    "Alain": {
      "title": "Alain",
      "styles": "Line Dance",
      "avatar": "assets/images/alain.png",
      "modalImage": "assets/images/alain.png",
      "content": "Professeur de Line Dance au Centre Culturel d'Izel. Alain anime des cours chaleureux et accessibles à tous, où l'on apprend à danser en ligne et en synchronisation sur des styles musicaux variés (country, pop, rock, musiques du monde). Convivialité, rythme et bonne humeur garanties !"
    },
    "Adam": {
      "title": "Adam",
      "styles": "Break Dance · Hip-Hop Oldschool",
      "avatar": "https://annedkdanse.be/gallery_gen/53002f7674b0b571a3485dc44d79a672_394x560_fit.jpg?ts=1784984525",
      "modalImage": "https://annedkdanse.be/gallery_gen/53002f7674b0b571a3485dc44d79a672_394x560_fit.jpg?ts=1784984525",
      "content": "Danseur professionnel et professeur de Break Dance (B-boying) et de Hip-Hop Oldschool (Popping, Locking, House Dance). Adam partage les véritables racines de la culture hip-hop, le footwork, les freezes et les power moves avec authenticité, passion et une pédagogie inspirante pour tous les niveaux."
    },
    "Corentin": {
      "title": "Corentin",
      "styles": "Contemporain · Ballet · Pointes · Girly",
      "avatar": "https://annedkdanse.be/gallery_gen/45f52a4e5bc2be7181cc901a5d023472_500x542_fit.jpg?ts=1784984525",
      "modalImage": "https://annedkdanse.be/gallery_gen/45f52a4e5bc2be7181cc901a5d023472_500x542_fit.jpg?ts=1784984525",
      "content": "Danseur professionnel, chorégraphe et professeur de Danse Classique, Travail sur Pointes, Contemporain et Ateliers Chorégraphiques Girly/Contemporain. Exigeant et passionné par l'art du mouvement, Corentin accompagne les danseurs vers la précision académique et l'expression scénique la plus pointue."
    }
  },
  "cours": {
    "eveil": {
      "title": "Eveil & Initiation 3-5 ans",
      "avatar": "assets/images/eveil_kids.png",
      "modalImage": "assets/images/eveil_kids.png",
      "content": "Un cours spécialement conçu pour permettre aux tout-petits de découvrir le plaisir de danser dans une ambiance joyeuse, douce et bienveillante.\n\nÀ travers des jeux dansés, des histoires, des musiques variées et de petits exercices adaptés à leur âge, les enfants apprennent progressivement à :\n- découvrir leur corps et ses possibilités ;\n- développer leur motricité, leur équilibre et leur coordination ;\n- se repérer dans l’espace et suivre le rythme de la musique ;\n- stimuler leur imagination et leur créativité ;\n- mémoriser de petits enchaînements ;\n- prendre confiance en eux et évoluer au sein d’un groupe.\n\nLes activités sont courtes et variées afin de respecter le rythme et la capacité de concentration des enfants. L’apprentissage se fait tout en douceur, sans recherche de performance : l’essentiel est de bouger, de s’exprimer et de prendre plaisir à danser.\n\nUne merveilleuse première approche de la danse, qui prépare naturellement les enfants à découvrir ensuite différentes disciplines."
    },
    "classique": {
      "title": "Danse Classique enfants",
      "avatar": "assets/images/dance_ballet_1781601330406.png",
      "modalImage": "assets/images/dance_ballet_1781601330406.png",
      "content": "La danse classique est une discipline élégante et intemporelle qui permet aux enfants de découvrir les bases fondamentales de la danse tout en développant grâce, posture et musicalité.\n\nLes élèves apprennent progressivement les premiers mouvements techniques à travers des exercices adaptés à leur âge, réalisés à la barre, au centre et au sol. Chaque cours leur permet de travailler la coordination, la souplesse, l’équilibre et la précision des gestes, tout en développant leur écoute de la musique.\n\nPour les plus jeunes, l’apprentissage se fait de manière ludique et bienveillante afin de stimuler leur imagination, leur créativité et leur sensibilité artistique. La danse classique aide également les enfants à gagner en confiance, en concentration et en discipline, tout en leur offrant un véritable moyen d’expression à travers le mouvement.\n\nÀ la fois exigeante et pleine de poésie, cette discipline apprend aux jeunes danseurs à ressentir la musique, à maîtriser leur corps et à évoluer avec élégance et harmonie."
    },
    "ballet_pointes": {
      "title": "Ballet - Pointes Ados/Adultes",
      "avatar": "assets/images/hero_dancer.png",
      "modalImage": "assets/images/hero_dancer.png",
      "content": "Ce cours de danse classique pour adolescents permet de développer progressivement les bases essentielles de la technique du ballet dans un cadre à la fois exigeant, élégant et bienveillant.\n\nLes élèves travaillent la posture, l’alignement du corps, la coordination des mouvements, l’équilibre, la souplesse ainsi que le placement gracieux de la tête et des bras. À travers le travail à la barre et au centre, ils apprennent à maîtriser leur technique tout en développant leur musicalité et leur expression artistique.\n\nLa danse classique apporte également rigueur, discipline, confiance en soi et sens du détail, tout en permettant à chaque danseur de s’épanouir artistiquement.\n\nTravail sur Pointes\n\nAprès l’acquisition des bases techniques nécessaires, les élèves peuvent évoluer vers le travail sur pointes. Le cours pointes est destiné aux élèves suivant déjà une formation en danse classique et possédant une préparation musculaire suffisante au niveau des chevilles, des pieds et du maintien du corps.\n\nChez ADK, l’apprentissage des pointes débute à partir de 13 ans minimum, afin de respecter le développement physique de l’élève et de garantir une progression en toute sécurité. Ce travail progressif permet de renforcer les muscles, d’améliorer la stabilité et d’apprendre à évoluer sur pointes avec contrôle, élégance et sans risque pour le corps.\n\nUne étape emblématique de la danse classique, symbole de grâce, de précision et de dépassement de soi."
    },
    "jazz_contemporain": {
      "title": "Jazz Contemporain",
      "avatar": "assets/images/dance_contemporary.png",
      "modalImage": "assets/images/dance_contemporary.png",
      "content": "Énergique, expressive et pleine d’émotions, la danse Jazz & Contemporaine permet aux danseurs de développer à la fois leur technique, leur créativité et leur personnalité artistique.\n\nInspirée de plusieurs influences, cette discipline mêle rythme, dynamisme, fluidité et expression corporelle. Le modern jazz puise son énergie dans le mouvement, les contrastes, les sensations et la musicalité, tandis que le contemporain apporte une dimension plus émotionnelle, libre et artistique.\n\nLes cours travaillent la coordination, la souplesse, les déplacements, les sauts, les tours ainsi que l’interprétation chorégraphique. Les élèves apprennent également les bases techniques essentielles, inspirées notamment de la danse classique, afin de développer précision, posture et maîtrise du corps.\n\nSur des musiques modernes et variées, les danseurs explorent différentes qualités de mouvement : puissance, fluidité, énergie, relâchement et émotion. L’improvisation et l’expression personnelle occupent aussi une place importante, permettant à chacun de développer son propre style et de transmettre des émotions à travers la danse.\n\nAccessible et évolutive, cette discipline offre un parfait équilibre entre technique, liberté et créativité, dans une ambiance dynamique et inspirante."
    },
    "hiphop": {
      "title": "Hip-Hop",
      "avatar": "assets/images/hiphop_dancer.png",
      "modalImage": "assets/images/hiphop_dancer.png",
      "content": "Le Hip-Hop est une danse urbaine dynamique, créative et incontournable, née dans les quartiers du Bronx à New York dans les années 1970.\n\nBien plus qu’un style de danse, le hip-hop est une véritable culture qui rassemble la musique, le mouvement, le partage et l’expression de soi. Aujourd’hui présent partout dans le monde, il continue d’évoluer à travers différents styles et influences urbaines.\n\nLes cours sont construits autour de chorégraphies rythmées sur des musiques actuelles, où les élèves développent coordination, musicalité, énergie, précision et confiance en eux. Dans une ambiance familiale, motivante et bienveillante, chacun progresse à son rythme tout en découvrant son propre style.\n\nLe Hip-Hop permet également de travailler :\n- le sens du rythme\n- la mémoire chorégraphique\n- la condition physique\n- la créativité et l’improvisation\n- la présence scénique et l’attitude"
    },
    "ragga": {
      "title": "Ragga",
      "avatar": "assets/images/ragga_dancer.png",
      "modalImage": "assets/images/ragga_dancer.png",
      "content": "Originaire des rues de Jamaïque, le Ragga Dancehall est une discipline urbaine énergique, expressive et pleine de caractère.\n\nMélange d’influences afro-jamaïcaines, de mouvements hip-hop et d’attitudes scéniques affirmées, cette danse se distingue par son énergie, sa puissance, sa musicalité et sa sensualité. Le travail du bassin, du torse, des isolations et des rebonds rythmiques est au cœur de ce style unique et vibrant.\n\nSur des musiques entraînantes et actuelles, les danseurs développent coordination, rythme, endurance et confiance en soi tout en apprenant à libérer leur expression corporelle.\n\nLe Ragga Dancehall permet également de travailler :\n- la fluidité des mouvements ;\n- la présence scénique ;\n- l’attitude et l’interprétation ;\n- la souplesse et le cardio ;\n- la connexion avec la musique et les émotions.\n\nÀ la fois intense, libératrice et conviviale, cette discipline invite chacun à danser avec personnalité, énergie et authenticité dans une ambiance dynamique et motivante."
    },
    "girly": {
      "title": "Girly",
      "avatar": "assets/images/ragga_dancer.png",
      "modalImage": "assets/images/ragga_dancer.png",
      "content": "Le cours de Girly Dance est une discipline moderne, fun et pleine d’attitude, qui permet de révéler sa féminité, sa confiance en soi et son expression artistique.\n\nAccessible avec ou sans talons, ce cours mélange techniques de danse, démarche, posture, musicalité et expression scénique dans une ambiance dynamique et bienveillante.\n\nÀ travers des chorégraphies inspirées des clips, des shows et de l’univers commercial, les élèves travaillent :\n- l’aisance corporelle ;\n- la confiance en soi ;\n- la grâce et la posture ;\n- la sensualité et l’attitude ;\n- la coordination et la présence scénique.\n\nLe Girly Dance est également un véritable moment de partage et de plaisir grâce à des musiques variées mêlant grands classiques revisités et hits actuels. Des univers rétro aux chorégraphies inspirées des artistes d’aujourd’hui comme Beyoncé, chaque cours permet de s’amuser, de se dépasser et d’exprimer pleinement sa personnalité.\n\nUne discipline énergique et libératrice où élégance, puissance et confiance se rencontrent."
    },
    "breakdance": {
      "title": "Break Dance",
      "avatar": "assets/images/breakdance_freeze.png",
      "modalImage": "assets/images/breakdance_freeze.png",
      "content": "Le Breakdance, aussi appelé Breaking, est l’une des disciplines les plus emblématiques de la culture hip-hop.\n\nNé dans les rues de New York dans les années 70, ce style spectaculaire mélange performance physique, créativité, musicalité et dépassement de soi. Reconnaissable par son travail au sol, ses figures acrobatiques et ses mouvements dynamiques, le Breakdance demande à la fois force, coordination, équilibre et maîtrise du corps.\n\nLes danseurs, appelés B-boys et B-girls, apprennent progressivement différentes techniques : footwork, freezes, passages au sol, mouvements de puissance et figures acrobatiques adaptées à leur niveau.\n\nAu-delà de l’aspect technique, le Breakdance développe :\n- la confiance en soi ;\n- l’endurance et la condition physique ;\n- la discipline et la persévérance ;\n- la créativité et l’improvisation ;\n- l’esprit d’équipe et le respect des autres.\n\nDans une ambiance urbaine, motivante et conviviale, les cours se terminent souvent par des moments de freestyle ou des battles, permettant aux élèves d’exprimer leur personnalité, leur style et leur énergie tout en conservant l’esprit authentique et “street” du Breaking.\n\nUne discipline impressionnante et passionnante où chacun apprend à se dépasser tout en s’amusant."
    },
    "streetjazz": {
      "title": "Street Jazz",
      "avatar": "assets/images/hiphop_dancer.png",
      "modalImage": "assets/images/hiphop_dancer.png",
      "content": "Le Street Jazz est une discipline moderne qui allie l'énergie des danses urbaines à la technique du jazz. Véritable mélange de puissance, de précision, de musicalité et d'expression, ce cours séduit les danseurs qui aiment les chorégraphies actuelles, dynamiques et pleines de personnalité.\n\nTout au long de l'année, les élèves développent leur technique, leur coordination, leur sens du rythme, leur mémoire chorégraphique, leur présence scénique ainsi que leur interprétation. Les cours alternent échauffement, travail technique, apprentissage des fondamentaux, déplacements, isolations, souplesse et chorégraphies sur des musiques actuelles.\n\nLe Street Jazz intègre également une touche de Girly, permettant de travailler l'attitude, l'élégance, la féminité, l'assurance et l'expression corporelle. Il ne s'agit pas simplement de reproduire des mouvements, mais d'apprendre à interpréter une chorégraphie avec style, caractère et émotion, tout en développant sa propre personnalité artistique.\n\nCette discipline offre un excellent travail physique en améliorant l'endurance, le renforcement musculaire, la mobilité et la confiance en soi, tout en laissant une grande place au plaisir de danser.\n\nAccessible dès que les bases techniques sont acquises, le Street Jazz est idéal pour les danseurs qui souhaitent évoluer dans un univers moderne, créatif et exigeant, où l'énergie des danses urbaines rencontre l'élégance et la technique du jazz."
    },
    "adultes": {
      "title": "Cours Adultes",
      "avatar": "assets/images/hero_dancer.png",
      "modalImage": "assets/images/hero_dancer.png",
      "content": ""
    },
    "poledance": {
      "title": "Pole Dance",
      "avatar": "assets/images/hero_dancer.png",
      "modalImage": "assets/images/hero_dancer.png",
      "content": "La Pole Dance est une discipline sportive et artistique complète qui allie force, souplesse, grâce et confiance en soi. Accessible à tous, quel que soit l'âge ou le niveau, elle permet de développer sa condition physique tout en s'amusant.\n\nLors des cours, les élèves apprennent progressivement différentes figures, rotations, montées, enchaînements chorégraphiques et techniques autour de la barre. Chaque séance comprend un échauffement, un travail technique adapté au niveau du groupe, du renforcement musculaire ainsi que des étirements.\n\nAu-delà de l'aspect physique, la Pole Dance aide à gagner en assurance, à améliorer sa posture et à exprimer sa créativité dans une ambiance bienveillante et motivante.\n\nLes bienfaits de la Pole Dance :\n- Renforcement musculaire complet\n- Développement de la souplesse\n- Amélioration de la coordination et de l'équilibre\n- Gain de confiance en soi\n- Travail de la grâce et de l'expression corporelle\n- Dépassement de soi dans le respect de son rythme\n\nQue vous souhaitiez pratiquer pour le sport, le plaisir, le défi personnel ou l'expression artistique, la Pole Dance vous permettra de découvrir une discipline passionnante et valorisante dans une ambiance conviviale."
    },
    "pomdance": {
      "title": "Pomdance",
      "avatar": "assets/images/ragga_dancer.png",
      "modalImage": "assets/images/ragga_dancer.png",
      "content": "Le pomdance est un style chorégraphique inspiré du cheerleading, qui repose sur un esprit d’équipe et une énergie positive.\n\nIl mêle des mouvements de danse très structurés à l’utilisation de pompoms, pour accentuer le rythme, l’énergie et la précision. Visuel et dynamique, ce style repose sur la synchronisation, les lignes nettes, les transitions rapides et une forte présence scénique.\n\nCe cours te permettra de développer ta coordination, ton endurance et ta confiance en toi, le tout sur des musiques modernes et entraînantes.\n\nAu programme : Apprentissage des pommotions (mouvements de bras) et du vocabulaire propre à la danse pom, apprentissage de chorégraphies entrainantes, travail des pirouettes, des sauts, de la souplesse… et bien plus encore."
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
window.VITRINE_DATA = VITRINE_DATA;
