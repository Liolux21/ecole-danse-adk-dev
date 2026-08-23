const ALL_COURSES = [
// === STUDIO ADK ===
    { id: 1,  style: 'eveil',       name: 'Éveil (3-4 ans)',                               desc: 'Les tout-petits explorent la danse dans un cadre bienveillant et ludique.',                                         ages: '3 à 4 ans',   levels: 'Éveil',            prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 16h00 à 17h00',                biweekly: false, emoji: '🌟', image: 'assets/images/eveil_kids.png' },
    { id: 2,  style: 'eveil',       name: 'Initiation (4-5 ans)',                          desc: 'Première approche de la danse par le jeu, la musique et le mouvement créatif.',                                     ages: '4 à 5 ans',   levels: 'Initiation',       prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 15h00 à 16h00',                biweekly: false, emoji: '🦋', image: 'assets/images/eveil_kids.png' },
    { id: 3,  style: 'hiphop',      name: 'Hiphop 1 (6-8 ans)',                           desc: 'Introduction aux fondamentaux du hip-hop dans une ambiance fun et énergique.',                                       ages: '6 à 8 ans',   levels: 'Débutant',         prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 9h00 à 10h00',                   biweekly: false, emoji: '🧢', image: 'assets/images/hiphop_dancer.png' },
    { id: 4,  style: 'hiphop',      name: 'Hiphop 2 (9-11 ans)',                          desc: 'Approfondissement des bases hip-hop avec chorégraphies adaptées à l\'âge.',                                          ages: '9 à 11 ans',  levels: 'Débutant',         prof: 'Jeanne',                   lieu: 'adk',     schedule: 'Vendredi 17h00 à 18h00',                biweekly: false, emoji: '👟', image: 'assets/images/hiphop_dancer.png' },
    { id: 5,  style: 'hiphop',      name: 'Hiphop 3 (11-13 ans)',                         desc: 'Développement technique hip-hop pour préados : expression, style et enchaînements.',                                 ages: '11 à 13 ans', levels: 'Intermédiaire',    prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 10h00 à 11h00',                  biweekly: false, emoji: '🔥', image: 'assets/images/hiphop_dancer.png' },
    { id: 6,  style: 'hiphop',      name: 'Hiphop 4 (àpd 14 ans) – Déb/Int',             desc: 'Hip-hop pour grands débutants et intermédiaires : bases, groove et attitude.',                                       ages: 'àpd 14 ans',  levels: 'Déb / Interméd.',  prof: 'Pauline',                  lieu: 'adk',     schedule: 'Lundi 17h00 à 18h00',                   biweekly: false, emoji: '🎧', image: 'assets/images/hiphop_dancer.png' },
    { id: 7,  style: 'hiphop',      name: 'Hiphop 5 (àpd 14 ans) – Interméd. ⏳',         desc: 'Perfectionnement hip-hop niveau intermédiaire, cours bi-mensuel (1 semaine sur 2).',                                ages: 'àpd 14 ans',  levels: 'Intermédiaire',    prof: 'Zoé',                      lieu: 'adk',     schedule: 'Samedi 14h00 à 15h30 (1 sem/2)',        biweekly: true,  emoji: '💥', image: 'assets/images/hiphop_dancer.png' },
    { id: 8,  style: 'hiphop',      name: 'Hiphop 6 (àpd 14 ans) – Avancé',              desc: 'Niveau avancé : technique poussée, style affirmé, préparation aux concours.',                                       ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 11h00 à 12h00',                  biweekly: false, emoji: '👑', image: 'assets/images/hiphop_dancer.png' },
    { id: 9,  style: 'jazz',        name: 'Jazz 1 (6-8 ans)',                              desc: 'Éveil au jazz pour enfants : rythme, coordination, plaisir du mouvement.',                                           ages: '6 à 8 ans',   levels: 'Débutant',         prof: 'Clémentine',               lieu: 'adk',     schedule: 'Mercredi 14h00 à 15h00',                biweekly: false, emoji: '✨', image: 'assets/images/dance_jazz.png' },
    { id: 10, style: 'jazz',        name: 'Jazz 2 (9-11 ans)',                             desc: 'Développement technique jazz, travail du style et des enchaînements scéniques.',                                     ages: '9 à 11 ans',  levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 18h00 à 19h00',                   biweekly: false, emoji: '💫', image: 'assets/images/dance_jazz.png' },
    { id: 11, style: 'jazz',        name: 'Jazz 3 (àpd 12 ans) – Déb/Int',       desc: 'Mélange jazz et contemporain pour ados : expression libre et technique solide.',                                     ages: 'àpd 12 ans',  levels: 'Déb / Interméd.',  prof: 'Charlotte',                lieu: 'adk',     schedule: 'Vendredi 18h00 à 19h00',                biweekly: false, emoji: '🍃', image: 'assets/images/dance_contemporary.png' },
    { id: 12, style: 'jazz',        name: 'Jazz 4 (àpd 13 ans)',        desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.',                             ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 19h00 à 20h00',                   biweekly: false, emoji: '🎭', image: 'assets/images/dance_jazz.png' },
    { id: 13, style: 'classique',   name: 'Classique 1 & 2 (6-8 ans & 9-11 ans)',                         desc: 'Introduction à la danse classique : posture, barre, placement, grâce et musicalité.',                               ages: '6 à 11 ans',   levels: 'Débutant/Interméd.',         prof: 'Charlotte',                    lieu: 'adk',     schedule: 'Mardi 17h00 à 18h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 15, style: 'classique',   name: 'Ballet Classique & Pointes (àpd 12 ans)',       desc: 'Cours avancé de ballet : travail sur pointes, variations de répertoire et technique approfondie.',                  ages: 'àpd 12 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Lundi 20h00 à 21h30',                   biweekly: false, emoji: '🦢', image: 'assets/images/hero_dancer.png' },
    { id: 16, style: 'ragga',       name: 'Ragga 1 (9-12 ans)',                            desc: 'Introduction au ragga dancehall : rythme, moves caribéens et énergie communicative.',                               ages: '9 à 12 ans',  levels: 'Débutant',         prof: 'Jade',                     lieu: 'adk',     schedule: 'Jeudi 17h00 à 18h00',                   biweekly: false, emoji: '🌴', image: 'assets/images/ragga_dancer.png' },
    { id: 17, style: 'ragga',       name: 'Ragga 2 (àpd 13 ans) – Déb/Int',               desc: 'Ragga dancehall pour ados et adultes débutants à intermédiaires.',                                                   ages: 'àpd 13 ans',  levels: 'Déb / Interméd.',  prof: 'Jade',                     lieu: 'adk',     schedule: 'Mercredi 17h00 à 18h00',                biweekly: false, emoji: '🔥', image: 'assets/images/ragga_dancer.png' },
    { id: 18, style: 'ragga',       name: 'Ragga 3 (àpd 14 ans) – Int/Avancé',            desc: 'Ragga niveau intermédiaire à avancé : style affirmé et préparation aux compétitions.',                              ages: 'àpd 14 ans',  levels: 'Interméd./Avancé', prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 20h00 à 21h00',                biweekly: false, emoji: '💥', image: 'assets/images/ragga_dancer.png' },
    { id: 19, style: 'ragga',       name: 'Girly (àpd 12 ans) – Déb.',              desc: 'Style Girly : féminité, sensualité et expression, niveau débutant.',                                                 ages: 'àpd 12 ans',  levels: 'Débutant',         prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 18h00 à 19h00',                   biweekly: false, emoji: '💋', image: 'assets/images/ragga_dancer.png' },
    { id: 20, style: 'hiphop',      name: 'Break Dance (àpd 8 ans)',                       desc: 'B-boying/b-girling : footwork, freezes, power moves et windmills. Énergie et créativité !',                         ages: 'àpd 8 ans',   levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Jeudi 18h00 à 19h00',                   biweekly: false, emoji: '🌪️', image: 'assets/images/breakdance_freeze.png' },
    { id: 21, style: 'ragga',       name: 'Pomdance (àpd 12 ans)',                      desc: 'Pomdance avec pompons, technique, souplesse et dynamisme.',                                                           ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 19h00 à 20h00',                   biweekly: false, emoji: '🎀', image: 'assets/images/ragga_dancer.png' },
    { id: 22, style: 'special',     name: 'Libre',                                         desc: 'Entraînement libre',                                                                                                ages: 'Tous âges',   levels: 'Tous niveaux',     prof: '',                         lieu: 'adk',     schedule: 'Mardi 18h00 à 20h00',                   biweekly: false, emoji: '🤸', image: 'assets/images/hero_dancer.png' },
    { id: 23, style: 'jazz',        name: 'Street Jazz (Ados/Adultes àpd 16 ans)',        desc: 'Clips, publicités, shows : la danse urbaine version commerciale et show-biz pour adultes.',                         ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Maeva',                    lieu: 'adk',     schedule: 'Mardi 20h00 à 21h30',                   biweekly: false, emoji: '🎬', image: 'assets/images/hiphop_dancer.png' },
    { id: 24, style: 'hiphop',      name: 'Adultes Hiphop & Ragga',                     desc: 'Cours adultes mêlant hip-hop et ragga dancehall pour se défouler et progresser en rythme.',                        ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Jeudi 19h00 à 20h00',                   biweekly: false, emoji: '💃', image: 'assets/images/hiphop_dancer.png' },
    { id: 25, style: 'contemporain',name: 'Adultes Jazz / Contemporain',                 desc: 'Expression, fluidité et interprétation pour adultes en danse contemporaine et jazz.',                               ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Janis',                    lieu: 'adk',     schedule: 'Jeudi 20h00 à 21h00',                   biweekly: false, emoji: '🎭', image: 'assets/images/dance_contemporary.png' },
    { id: 26, style: 'jazz',        name: 'Line Dance',                                    desc: 'Danse en ligne sur des musiques variées, convivialité et bonne humeur garanties !',                                 ages: 'àpd 13 ans',   levels: 'Tous niveaux',     prof: 'Alain',                    lieu: 'izel',    schedule: 'Lundi 20h00 à 21h30 – Centre Culturel Izel', biweekly: false, emoji: '🤠', image: 'assets/images/dance_jazz.png' },
    { id: 27, style: 'special',     name: 'Pole Dance (1 sem/2) ⏳',                    desc: 'Art du Pole Dance : force, grâce et aérien. Cours 1 sem/2 au Complexe Sportif de Florenville.',                    ages: 'Ados/Adultes',  levels: 'Tous niveaux',     prof: 'Florence',                 lieu: 'flore',   schedule: 'Jeudi 19h30 à 21h00 – C.S. Florenville (1 sem/2)', biweekly: true, emoji: '🎪', image: 'assets/images/hero_dancer.png' },
    { id: 28, style: 'compagnie',   name: 'ADK Moove / ADK Unity ⏳',                             desc: 'Compagnies hip-hop : création chorégraphique, répétitions et performances scéniques.',                        ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 à 13h30 (1 sem/2)',        biweekly: true,  emoji: '🏆', image: 'assets/images/compagnie_stage.png' },
    { id: 30, style: 'compagnie',   name: 'ADK Team ⏳',              desc: 'Compagnie Team jazz/contemporain : créativité artistique et niveau de compétition.',                                ages: 'Sélection',   levels: 'Compagnie',        prof: 'Janis',                    lieu: 'adk',     schedule: 'Samedi 14h00 à 16h00 (1 sem/2)',        biweekly: true,  emoji: '🌟', image: 'assets/images/compagnie_stage.png' },
    { id: 31, style: 'compagnie',   name: 'Atelier Chorégraphique Girly (Niv Av.)',     desc: 'Atelier de création chorégraphique style Girly, niveau avancé. 1 semaine sur 2.',                         ages: 'Niv Avancé',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Dimanche 9h00 à 10h30 (1 sem/2)',               biweekly: true, emoji: '👠', image: 'assets/images/compagnie_stage.png' },
    { id: 32, style: 'compagnie',   name: 'Atelier Chorégraphique Contemporain (Niv Av.)', desc: 'Atelier de création contemporaine avancée. 1 semaine sur 2.',                                        ages: 'Niv Avancé',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Dimanche 10h30 à 12h00 (1 sem/2)',               biweekly: true, emoji: '🍂', image: 'assets/images/dance_contemporary.png' },
    { id: 33, style: 'special',     name: 'Cours Préparatifs aux concours',                    desc: 'Préparation aux concours de danse.',                               ages: 'Sur sélection', levels: 'Compétition',    prof: 'Maurine - Janis', lieu: 'adk', schedule: 'Dates à convenir',     biweekly: false, emoji: '🥇', image: 'assets/images/compagnie_stage.png' },
    { id: 34, style: 'special',     name: 'Cours Préparatifs Futurs Profs',                desc: 'Formation pédagogique pour les futurs professeurs de l\'école ADK.',                               ages: 'Sur sélection', levels: 'Formation',      prof: 'Maurine - Corentin',       lieu: 'adk',     schedule: 'Dates à convenir',               biweekly: false, emoji: '🎓', image: 'assets/images/compagnie_stage.png' },
    // === AU ROX ===
    { id: 35, style: 'hiphop',      name: 'Hip-hop au Rox (àpd 13 ans) ⏳',                desc: 'Cours hip-hop au Rox, tous niveaux, bi-mensuel (1 semaine sur 2).',                                                 ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 14h00 à 16h00 (1 sem/2)',        biweekly: true,  emoji: '🎧', image: 'assets/images/hiphop_dancer.png' },
    { id: 36, style: 'jazz',        name: 'Jazz / Contemporain au Rox (àpd 13 ans) ⏳',    desc: 'Jazz et contemporain au Rox, cours bi-mensuel pour tous niveaux.',                                                   ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 16h00 à 18h00 (1 sem/2)',        biweekly: true,  emoji: '🍃', image: 'assets/images/dance_contemporary.png' },
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
      "category": "Kinésithérapeute accompagnatrice",
      "avatar": "https://annedkdanse.be/gallery_gen/cffd52798af8c5887dcff43b132cb97a_603x628_0x0_603x761_crop.jpg?ts=1784984525",
      "content": "Sylvie accompagne les danseurs dans leur préparation physique, le renforcement musculaire, la prévention des blessures et le suivi corporel des compagnies surtout avant un spectacle ou un concours. Grâce à son expertise du corps en mouvement, elle aide les danseurs à développer force, équilibre et endurance tout en préservant leur bien-être physique."
    },
    "Mégan": {
      "title": "Mégan",
      "category": "Responsable décoration scénique",
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
window.VITRINE_DATA = VITRINE_DATA;
