// =============================================
// ÉCOLE DE DANSE ADK — Data v3 (Saison 2026-2027)
// =============================================

const DATA = {

  school: {
    name: "École de Danse ADK",
    shortName: "ADK",
    tagline: "Une famille · Une passion · Une histoire · Une vie",
    founded: 1998,
    address: "Studio ADK — Florenville, Belgique",
    phone: "+32 2 345 67 89",
    email: "contact@annedkdanse.be",
    website: "www.annedkdanse.be",
    facebook: "https://facebook.com/annedkdanse",
    instagram: "https://instagram.com/annedkdanse",
    mapQuery: "Florenville+Belgique",
    stats: { eleves: 180, professeurs: 14, styles: 8, spectacles: 28 },
    saison: "Septembre 2026 — Gala fin mai 2027"
  },

  // ---- LIEUX ----
  locations: [
    { id: 'adk',     name: 'Studio ADK',                     short: 'ADK',        color: '#C9A84C' },
    { id: 'rox',     name: 'Au Rox',                          short: 'Rox',        color: '#7BB4DC' },
    { id: 'bertrix', name: 'Bertrix',                         short: 'Bertrix',    color: '#90CC90' },
    { id: 'izel',    name: 'Centre Culturel Izel',            short: 'C.C. Izel',  color: '#DC9EC8' },
    { id: 'flore',   name: 'Complexe Sportif Florenville',    short: 'C.S. Flore', color: '#B478DC' },
  ],

  // ---- UTILISATEURS ----
  users: [
    // Admin
    { id: 1,  email: 'admin@adk.be',       password: 'admin2026',  role: 'admin',  name: 'Anne Dubois',   avatar: '👑', title: 'Directrice' },
    // Profs (compte générique + comptes nominatifs)
    { id: 2,  email: 'prof@adk.be',        password: 'prof2026',   role: 'prof',   name: 'Janis',         avatar: '👩‍🏫', title: 'Professeure',  courseIds: [10, 12, 13, 25, 30] },
    { id: 3,  email: 'janis@adk.be',       password: 'prof2026',   role: 'prof',   name: 'Janis',         avatar: '👩‍🏫', title: 'Professeure',  courseIds: [10, 12, 13, 25, 30] },
    { id: 4,  email: 'maurine@adk.be',     password: 'prof2026',   role: 'prof',   name: 'Maurine',       avatar: '💃',  title: 'Professeure',  courseIds: [3, 5, 8, 28, 29] },
    { id: 5,  email: 'corentin@adk.be',    password: 'prof2026',   role: 'prof',   name: 'Corentin',      avatar: '🕺',  title: 'Professeur',   courseIds: [15, 31, 32] },
    { id: 6,  email: 'charlotte@adk.be',   password: 'prof2026',   role: 'prof',   name: 'Charlotte',     avatar: '👩‍🏫', title: 'Professeure',  courseIds: [11, 14] },
    { id: 7,  email: 'margaux@adk.be',     password: 'prof2026',   role: 'prof',   name: 'Margaux',       avatar: '💃',  title: 'Professeure',  courseIds: [18, 19, 22, 24, 37, 38] },
    { id: 8,  email: 'jade@adk.be',        password: 'prof2026',   role: 'prof',   name: 'Jade',          avatar: '👩‍🏫', title: 'Professeure',  courseIds: [16, 17] },
    { id: 9,  email: 'adam@adk.be',        password: 'prof2026',   role: 'prof',   name: 'Adam',          avatar: '🕺',  title: 'Professeur',   courseIds: [20, 21] },
    { id: 10, email: 'daisy@adk.be',       password: 'prof2026',   role: 'prof',   name: 'Daisy',         avatar: '🌸',  title: 'Professeure',  courseIds: [1, 2] },
    { id: 11, email: 'loreen@adk.be',      password: 'prof2026',   role: 'prof',   name: 'Loreen',        avatar: '👩‍🏫', title: 'Professeure',  courseIds: [39, 40] },
    { id: 12, email: 'zoe@adk.be',         password: 'prof2026',   role: 'prof',   name: 'Zoé',           avatar: '💃',  title: 'Professeure',  courseIds: [7, 35, 36] },
    { id: 13, email: 'jeanne@adk.be',      password: 'prof2026',   role: 'prof',   name: 'Jeanne',        avatar: '👩‍🏫', title: 'Professeure',  courseIds: [4] },
    { id: 14, email: 'pauline@adk.be',     password: 'prof2026',   role: 'prof',   name: 'Pauline',       avatar: '💃',  title: 'Professeure',  courseIds: [6] },
    { id: 15, email: 'clementine@adk.be',  password: 'prof2026',   role: 'prof',   name: 'Clémentine',    avatar: '👩‍🏫', title: 'Professeure',  courseIds: [9] },
    { id: 16, email: 'maeva@adk.be',       password: 'prof2026',   role: 'prof',   name: 'Maeva',         avatar: '💃',  title: 'Professeure',  courseIds: [23] },
    { id: 17, email: 'alain@adk.be',       password: 'prof2026',   role: 'prof',   name: 'Alain',         avatar: '🕺',  title: 'Professeur',   courseIds: [26] },
    { id: 18, email: 'florence@adk.be',    password: 'prof2026',   role: 'prof',   name: 'Florence',      avatar: '👩‍🏫', title: 'Professeure',  courseIds: [27] },
    // Parents
    { id: 19, email: 'parent@adk.be',  password: 'parent2026', role: 'parent', name: 'Marie Dupont', avatar: '👩', childrenIds: [1] },
    { id: 20, email: 'parent2@adk.be', password: 'parent2026', role: 'parent', name: 'Jean Petit',   avatar: '👨', childrenIds: [2, 3] },
  ],

  // ---- COURS (Saison 2026-2027) ----
  courses: [
    // === STUDIO ADK ===
    { id: 1,  style: 'eveil',       name: 'Éveil (3-4 ans)',                               desc: 'Les tout-petits explorent la danse dans un cadre bienveillant et ludique.',                                         ages: '3 – 4 ans',   levels: 'Éveil',            prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 16h00 – 17h00',                biweekly: false, emoji: '🌸', image: null },
    { id: 2,  style: 'eveil',       name: 'Initiation (4-5 ans)',                          desc: 'Première approche de la danse par le jeu, la musique et le mouvement créatif.',                                     ages: '4 – 5 ans',   levels: 'Initiation',       prof: 'Daisy',                    lieu: 'adk',     schedule: 'Mercredi 15h00 – 16h00',                biweekly: false, emoji: '🌟', image: null },
    { id: 3,  style: 'hiphop',      name: 'Hip-Hop 1 (6-8 ans)',                           desc: 'Introduction aux fondamentaux du hip-hop dans une ambiance fun et énergique.',                                       ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 9h00 – 10h00',                   biweekly: false, emoji: '🎤', image: null },
    { id: 4,  style: 'hiphop',      name: 'Hip-Hop 2 (9-11 ans)',                          desc: 'Approfondissement des bases hip-hop avec chorégraphies adaptées à l\'âge.',                                          ages: '9 – 11 ans',  levels: 'Débutant',         prof: 'Jeanne',                   lieu: 'adk',     schedule: 'Vendredi 17h00 – 18h00',                biweekly: false, emoji: '🎤', image: null },
    { id: 5,  style: 'hiphop',      name: 'Hip-Hop 3 (11-13 ans)',                         desc: 'Développement technique hip-hop pour préados : expression, style et enchaînements.',                                 ages: '11 – 13 ans', levels: 'Intermédiaire',    prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 10h00 – 11h00',                  biweekly: false, emoji: '🎤', image: null },
    { id: 6,  style: 'hiphop',      name: 'Hip-Hop 4 (àpd 14 ans) — Déb/Int',             desc: 'Hip-hop pour grands débutants et intermédiaires : bases, groove et attitude.',                                       ages: 'àpd 14 ans',  levels: 'Déb / Interméd.',  prof: 'Pauline',                  lieu: 'adk',     schedule: 'Lundi 17h00 – 18h00',                   biweekly: false, emoji: '🎤', image: null },
    { id: 7,  style: 'hiphop',      name: 'Hip-Hop 5 (àpd 14 ans) — Interméd. ½',         desc: 'Perfectionnement hip-hop niveau intermédiaire, cours bi-mensuel (1 semaine sur 2).',                                ages: 'àpd 14 ans',  levels: 'Intermédiaire',    prof: 'Zoé',                      lieu: 'adk',     schedule: 'Samedi 14h00 – 15h30 (1 sem/2)',        biweekly: true,  emoji: '🎤', image: null },
    { id: 8,  style: 'hiphop',      name: 'Hip-Hop 6 (àpd 14 ans) — Avancé',              desc: 'Niveau avancé : technique poussée, style affirmé, préparation aux concours.',                                       ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 11h00 – 12h00',                  biweekly: false, emoji: '🎤', image: null },
    { id: 9,  style: 'jazz',        name: 'Jazz 1 (6-8 ans)',                              desc: 'Éveil au jazz pour enfants : rythme, coordination, plaisir du mouvement.',                                           ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Clémentine',               lieu: 'adk',     schedule: 'Mercredi 14h00 – 15h00',                biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 10, style: 'jazz',        name: 'Jazz 2 (9-11 ans)',                             desc: 'Développement technique jazz, travail du style et des enchaînements scéniques.',                                     ages: '9 – 11 ans',  levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 18h00 – 19h00',                   biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 11, style: 'jazz',        name: 'Jazz-Contempo 3 (àpd 12 ans) — Déb/Int',       desc: 'Mélange jazz et contemporain pour ados : expression libre et technique solide.',                                     ages: 'àpd 12 ans',  levels: 'Déb / Interméd.',  prof: 'Charlotte',                lieu: 'adk',     schedule: 'Vendredi 18h00 – 19h00',                biweekly: false, emoji: '🎷', image: 'assets/images/dance_contemporary.png' },
    { id: 12, style: 'jazz',        name: 'Jazz-Contempo 4 (àpd 14 ans) — Avancé',        desc: 'Haut niveau jazz/contemporain : technique avancée et interprétation scénique poussée.',                             ages: 'àpd 14 ans',  levels: 'Avancé',           prof: 'Janis',                    lieu: 'adk',     schedule: 'Lundi 19h00 – 20h00',                   biweekly: false, emoji: '🎷', image: 'assets/images/dance_jazz.png' },
    { id: 13, style: 'classique',   name: 'Classique 1 (6-8 ans)',                         desc: 'Introduction à la danse classique : posture, barre, placement, grâce et musicalité.',                               ages: '6 – 8 ans',   levels: 'Débutant',         prof: 'Janis',                    lieu: 'adk',     schedule: 'Mercredi 18h00 – 19h00',                biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 14, style: 'classique',   name: 'Classique 2 (9-12 ans)',                        desc: 'Approfondissement classique : barre, milieu, vocabulaire académique et variations.',                                 ages: '9 – 12 ans',  levels: 'Intermédiaire',    prof: 'Charlotte',                lieu: 'adk',     schedule: 'Mardi 17h00 – 18h00',                   biweekly: false, emoji: '🩰', image: 'assets/images/dance_ballet.png' },
    { id: 15, style: 'classique',   name: 'Ballet Classique & Pointes (àpd 12 ans)',       desc: 'Cours avancé de ballet : travail sur pointes, variations de répertoire et technique approfondie.',                  ages: 'àpd 12 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Lundi 20h00 – 21h30',                   biweekly: false, emoji: '🩰', image: 'assets/images/hero_dancer.png' },
    { id: 16, style: 'ragga',       name: 'Ragga 1 (9-12 ans)',                            desc: 'Introduction au ragga dancehall : rythme, moves caribéens et énergie communicative.',                               ages: '9 – 12 ans',  levels: 'Débutant',         prof: 'Jade',                     lieu: 'adk',     schedule: 'Jeudi 17h00 – 18h00',                   biweekly: false, emoji: '🌴', image: null },
    { id: 17, style: 'ragga',       name: 'Ragga 2 (àpd 13 ans) — Déb/Int',               desc: 'Ragga dancehall pour ados et adultes débutants à intermédiaires.',                                                   ages: 'àpd 13 ans',  levels: 'Déb / Interméd.',  prof: 'Jade',                     lieu: 'adk',     schedule: 'Mercredi 17h00 – 18h00',                biweekly: false, emoji: '🌴', image: null },
    { id: 18, style: 'ragga',       name: 'Ragga 3 (àpd 13 ans) — Int/Avancé',            desc: 'Ragga niveau intermédiaire à avancé : style affirmé et préparation aux compétitions.',                              ages: 'àpd 13 ans',  levels: 'Interméd./Avancé', prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 20h00 – 21h00',                biweekly: false, emoji: '🌴', image: null },
    { id: 19, style: 'ragga',       name: 'Girly 1 (àpd 12 ans) — Débutant',              desc: 'Style Girly : féminité, sensualité et expression, niveau débutant.',                                                 ages: 'àpd 12 ans',  levels: 'Débutant',         prof: 'Margaux',                  lieu: 'adk',     schedule: 'Jeudi 18h00 – 19h00',                   biweekly: false, emoji: '💃', image: null },
    { id: 20, style: 'hiphop',      name: 'Break Dance (àpd 8 ans)',                       desc: 'B-boying/b-girling : footwork, freezes, power moves et windmills. Énergie et créativité !',                         ages: 'àpd 8 ans',   levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Mardi 18h00 – 19h00',                   biweekly: false, emoji: '🔄', image: null },
    { id: 21, style: 'hiphop',      name: 'Hiphop Oldschool — Pop/Lock/House (àpd 12 ans)', desc: 'Styles old school hip-hop : popping, locking, house dance. Les vraies racines du hip-hop !',                    ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Adam',                     lieu: 'adk',     schedule: 'Mardi 19h00 – 20h00',                   biweekly: false, emoji: '🎶', image: null },
    { id: 22, style: 'ragga',       name: 'Pomdance (àpd 12 ans)',                         desc: 'Danse avec pompon : énergie, synchronisation et esprit cheerleader.',                                               ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Mercredi 19h00 – 20h00',                biweekly: false, emoji: '🎉', image: null },
    { id: 23, style: 'hiphop',      name: 'Danse Urbaine Commerciale (àpd 16 ans)',        desc: 'Clips, publicités, shows : la danse urbaine version commerciale et show-biz pour adultes.',                         ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Maeva',                    lieu: 'adk',     schedule: 'Mardi 20h00 – 21h00',                   biweekly: false, emoji: '🌟', image: null },
    { id: 24, style: 'hiphop',      name: 'Hip-Hop / Ragga (Adultes)',                     desc: 'Cours adultes mêlant hip-hop et ragga dancehall pour se défouler et progresser en rythme.',                        ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'adk',     schedule: 'Jeudi 19h00 – 20h00',                   biweekly: false, emoji: '🎤', image: null },
    { id: 25, style: 'contemporain',name: 'Contemporain / Jazz (Adultes)',                 desc: 'Expression, fluidité et interprétation pour adultes en danse contemporaine et jazz.',                               ages: 'Adultes',     levels: 'Tous niveaux',     prof: 'Janis',                    lieu: 'adk',     schedule: 'Jeudi 20h00 – 21h00',                   biweekly: false, emoji: '🌊', image: 'assets/images/dance_contemporary.png' },
    { id: 26, style: 'jazz',        name: 'Line Dance',                                    desc: 'Danse en ligne sur des musiques variées, convivialité et bonne humeur garanties !',                                 ages: 'Tous âges',   levels: 'Tous niveaux',     prof: 'Alain',                    lieu: 'izel',    schedule: 'Lundi 20h00 – 21h30 · Centre Culturel Izel', biweekly: false, emoji: '🤠', image: null },
    { id: 27, style: 'special',     name: 'Pole Dance (àpd 16 ans) ½',                    desc: 'Art du Pole Dance : force, grâce et aérien. Cours 1 sem/2 au Complexe Sportif de Florenville.',                    ages: 'àpd 16 ans',  levels: 'Tous niveaux',     prof: 'Florence',                 lieu: 'flore',   schedule: 'Jeudi 19h00 – 21h30 · C.S. Florenville (1 sem/2)', biweekly: true, emoji: '🎀', image: null },
    { id: 28, style: 'compagnie',   name: 'Compagnie Moove ½',                             desc: 'Compagnie hip-hop Moove : création chorégraphique, répétitions et performances scéniques.',                        ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 – 13h30 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: null },
    { id: 29, style: 'compagnie',   name: 'Compagnie Unity ½',                             desc: 'Compagnie Unity : esprit d\'équipe, chorégraphies collectives et représentations.',                                  ages: 'Sélection',   levels: 'Compagnie',        prof: 'Maurine',                  lieu: 'adk',     schedule: 'Samedi 12h00 – 13h30 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: null },
    { id: 30, style: 'compagnie',   name: 'Compagnie Team (Jazz/Contempo) ½',              desc: 'Compagnie Team jazz/contemporain : créativité artistique et niveau de compétition.',                                ages: 'Sélection',   levels: 'Compagnie',        prof: 'Janis',                    lieu: 'adk',     schedule: 'Samedi 14h00 – 16h00 (1 sem/2)',        biweekly: true,  emoji: '⭐', image: null },
    { id: 31, style: 'compagnie',   name: 'Atelier Chorégraphique Girly (àpd 13 ans)',     desc: 'Atelier de création chorégraphique style Girly, niveau avancé. Date et heure à convenir.',                         ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '💫', image: null },
    { id: 32, style: 'compagnie',   name: 'Atelier Chorégraphique Contemporain (àpd 13 ans)', desc: 'Atelier de création contemporaine avancée. Date et heure à convenir.',                                        ages: 'àpd 13 ans',  levels: 'Avancé',           prof: 'Corentin',                 lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '💫', image: null },
    { id: 33, style: 'special',     name: 'Cours Préparatifs Concours',                    desc: 'Préparation aux concours de danse avec Janis, Maurine & Corentin. Dimanche matin.',                               ages: 'Sur sélection', levels: 'Compétition',    prof: 'Janis · Maurine · Corentin', lieu: 'adk', schedule: 'Dimanche matin — date à convenir',     biweekly: false, emoji: '🏆', image: null },
    { id: 34, style: 'special',     name: 'Cours Préparatifs Futurs Profs',                desc: 'Formation pédagogique pour les futurs professeurs de l\'École ADK. Date à convenir.',                               ages: 'Sur sélection', levels: 'Formation',      prof: 'Maurine · Corentin',       lieu: 'adk',     schedule: 'Date & heure à convenir',               biweekly: false, emoji: '📚', image: null },
    // === AU ROX ===
    { id: 35, style: 'hiphop',      name: 'Hip-Hop au Rox (àpd 12 ans) ½',                desc: 'Cours hip-hop au Rox, tous niveaux, bi-mensuel (1 semaine sur 2).',                                                 ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 14h00 – 16h00 (1 sem/2)',        biweekly: true,  emoji: '🎤', image: null },
    { id: 36, style: 'jazz',        name: 'Jazz / Contemporain au Rox (àpd 12 ans) ½',    desc: 'Jazz et contemporain au Rox, cours bi-mensuel pour tous niveaux.',                                                   ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Zoé',                      lieu: 'rox',     schedule: 'Samedi 16h00 – 18h00 (1 sem/2)',        biweekly: true,  emoji: '🎷', image: null },
    { id: 37, style: 'ragga',       name: 'Ragga au Rox (àpd 12 ans) ½',                  desc: 'Ragga dancehall au Rox, bi-mensuel, toute l\'énergie des Caraïbes !',                                               ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 13h30 – 15h30 (1 sem/2)',        biweekly: true,  emoji: '🌴', image: null },
    { id: 38, style: 'ragga',       name: 'Girly au Rox (àpd 12 ans) ½',                  desc: 'Style Girly au Rox, féminité et style, cours bi-mensuel.',                                                           ages: 'àpd 12 ans',  levels: 'Tous niveaux',     prof: 'Margaux',                  lieu: 'rox',     schedule: 'Samedi 15h30 – 17h30 (1 sem/2)',        biweekly: true,  emoji: '💃', image: null },
    // === BERTRIX ===
    { id: 39, style: 'hiphop',      name: 'Hip-Hop / Ragga Bertrix (9-12 ans)',            desc: 'Hip-hop et ragga pour enfants à Bertrix, cours hebdomadaire.',                                                      ages: '9 – 12 ans',  levels: 'Débutant',         prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 17h00 – 18h00',                   biweekly: false, emoji: '🎤', image: null },
    { id: 40, style: 'hiphop',      name: 'Hip-Hop / Ragga Bertrix (àpd 13 ans)',          desc: 'Hip-hop et ragga pour ados et adultes à Bertrix.',                                                                   ages: 'àpd 13 ans',  levels: 'Tous niveaux',     prof: 'Loreen',                   lieu: 'bertrix', schedule: 'Jeudi 18h00 – 19h00',                   biweekly: false, emoji: '🎤', image: null },
  ],

  // ---- PLANNING (créneaux pour la vue calendrier) ----
  schedule: {
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    slots: [
      // LUNDI — Studio ADK + Izel
      { day: 0, hour: "17h00", course: "Hip-Hop 4 (àpd 14 ans)",       style: "hiphop",      courseId: 6,  lieu: "ADK" },
      { day: 0, hour: "18h00", course: "Jazz 2 (9-11 ans)",             style: "jazz",        courseId: 10, lieu: "ADK" },
      { day: 0, hour: "19h00", course: "Jazz-Contempo 4 (Avancé)",      style: "jazz",        courseId: 12, lieu: "ADK" },
      { day: 0, hour: "20h00", course: "Ballet & Pointes (àpd 12 ans)", style: "classique",   courseId: 15, lieu: "ADK" },
      { day: 0, hour: "20h00", course: "Line Dance · Izel",             style: "jazz",        courseId: 26, lieu: "Izel" },
      // MARDI — Studio ADK
      { day: 1, hour: "17h00", course: "Classique 2 (9-12 ans)",        style: "classique",   courseId: 14, lieu: "ADK" },
      { day: 1, hour: "18h00", course: "Break Dance (àpd 8 ans)",       style: "hiphop",      courseId: 20, lieu: "ADK" },
      { day: 1, hour: "19h00", course: "Hiphop Oldschool/Pop/Lock",     style: "hiphop",      courseId: 21, lieu: "ADK" },
      { day: 1, hour: "20h00", course: "Danse Urbaine Commerciale",     style: "hiphop",      courseId: 23, lieu: "ADK" },
      // MERCREDI — Studio ADK
      { day: 2, hour: "14h00", course: "Jazz 1 (6-8 ans)",              style: "jazz",        courseId: 9,  lieu: "ADK" },
      { day: 2, hour: "15h00", course: "Initiation (4-5 ans)",          style: "eveil",       courseId: 2,  lieu: "ADK" },
      { day: 2, hour: "16h00", course: "Éveil (3-4 ans)",               style: "eveil",       courseId: 1,  lieu: "ADK" },
      { day: 2, hour: "17h00", course: "Ragga 2 (àpd 13 ans)",          style: "ragga",       courseId: 17, lieu: "ADK" },
      { day: 2, hour: "18h00", course: "Classique 1 (6-8 ans)",         style: "classique",   courseId: 13, lieu: "ADK" },
      { day: 2, hour: "19h00", course: "Pomdance (àpd 12 ans)",         style: "ragga",       courseId: 22, lieu: "ADK" },
      { day: 2, hour: "20h00", course: "Ragga 3 (Int/Avancé)",          style: "ragga",       courseId: 18, lieu: "ADK" },
      // JEUDI — ADK + Bertrix + Florenville
      { day: 3, hour: "17h00", course: "Ragga 1 (9-12 ans)",            style: "ragga",       courseId: 16, lieu: "ADK" },
      { day: 3, hour: "17h00", course: "H-H Ragga Bertrix 9-12",        style: "hiphop",      courseId: 39, lieu: "Bertrix" },
      { day: 3, hour: "18h00", course: "Girly 1 (àpd 12 ans)",          style: "ragga",       courseId: 19, lieu: "ADK" },
      { day: 3, hour: "18h00", course: "H-H Ragga Bertrix àpd 13",      style: "hiphop",      courseId: 40, lieu: "Bertrix" },
      { day: 3, hour: "19h00", course: "Hip-Hop/Ragga Adultes",         style: "hiphop",      courseId: 24, lieu: "ADK" },
      { day: 3, hour: "19h00", course: "Pole Dance · Florenville ½",    style: "special",     courseId: 27, lieu: "Flore" },
      { day: 3, hour: "20h00", course: "Contemporain/Jazz Adultes",     style: "contemporain",courseId: 25, lieu: "ADK" },
      // VENDREDI — Studio ADK
      { day: 4, hour: "17h00", course: "Hip-Hop 2 (9-11 ans)",          style: "hiphop",      courseId: 4,  lieu: "ADK" },
      { day: 4, hour: "18h00", course: "Jazz-Contempo 3 (Déb/Int)",     style: "jazz",        courseId: 11, lieu: "ADK" },
      // SAMEDI — ADK + Rox
      { day: 5, hour: "09h00", course: "Hip-Hop 1 (6-8 ans)",           style: "hiphop",      courseId: 3,  lieu: "ADK" },
      { day: 5, hour: "10h00", course: "Hip-Hop 3 (11-13 ans)",         style: "hiphop",      courseId: 5,  lieu: "ADK" },
      { day: 5, hour: "11h00", course: "Hip-Hop 6 (Avancé)",            style: "hiphop",      courseId: 8,  lieu: "ADK" },
      { day: 5, hour: "12h00", course: "Cie Moove / Unity ½",           style: "compagnie",   courseId: 28, lieu: "ADK" },
      { day: 5, hour: "13h00", course: "Ragga au Rox ½",                style: "ragga",       courseId: 37, lieu: "Rox" },
      { day: 5, hour: "14h00", course: "Hip-Hop 5 (Int.) ½",            style: "hiphop",      courseId: 7,  lieu: "ADK" },
      { day: 5, hour: "14h00", course: "Hip-Hop au Rox ½",              style: "hiphop",      courseId: 35, lieu: "Rox" },
      { day: 5, hour: "14h00", course: "Cie Team Jazz/Cmp ½",           style: "compagnie",   courseId: 30, lieu: "ADK" },
      { day: 5, hour: "15h00", course: "Girly au Rox ½",                style: "ragga",       courseId: 38, lieu: "Rox" },
      { day: 5, hour: "16h00", course: "Jazz/Cmp au Rox ½",             style: "jazz",        courseId: 36, lieu: "Rox" },
    ]
  },

  // ---- ÉLÈVES (démo) ----
  students: [
    { id: 1, firstname: 'Léa',   lastname: 'Dupont',   age: 9,  courseIds: [1, 9],   parentId: 19, cotisation: 'payée',      montant: 480 },
    { id: 2, firstname: 'Emma',  lastname: 'Petit',    age: 7,  courseIds: [3],      parentId: 20, cotisation: 'payée',      montant: 280 },
    { id: 3, firstname: 'Tom',   lastname: 'Petit',    age: 12, courseIds: [5],      parentId: 20, cotisation: 'en attente', montant: 280 },
    { id: 4, firstname: 'Chloé', lastname: 'Bernard',  age: 14, courseIds: [11, 15], parentId: null, cotisation: 'payée',   montant: 480 },
    { id: 5, firstname: 'Inès',  lastname: 'Martin',   age: 10, courseIds: [10, 9],  parentId: null, cotisation: 'payée',   montant: 480 },
    { id: 6, firstname: 'Zoé',   lastname: 'Lambert',  age: 5,  courseIds: [2],      parentId: null, cotisation: 'payée',   montant: 280 },
    { id: 7, firstname: 'Milo',  lastname: 'Rousseau', age: 12, courseIds: [5, 17],  parentId: null, cotisation: 'en attente', montant: 480 },
    { id: 8, firstname: 'Alice', lastname: 'Moreau',   age: 7,  courseIds: [3, 1],   parentId: null, cotisation: 'payée',   montant: 480 },
  ],

  // ---- PRÉSENCES (démo) ----
  attendance: [
    { studentId: 1, courseId: 1,  date: '10/09', status: 'present' },
    { studentId: 1, courseId: 9,  date: '10/09', status: 'present' },
    { studentId: 1, courseId: 1,  date: '17/09', status: 'absent'  },
    { studentId: 1, courseId: 9,  date: '17/09', status: 'excuse'  },
    { studentId: 1, courseId: 1,  date: '24/09', status: 'present' },
    { studentId: 2, courseId: 3,  date: '13/09', status: 'present' },
    { studentId: 2, courseId: 3,  date: '20/09', status: 'present' },
    { studentId: 2, courseId: 3,  date: '27/09', status: 'absent'  },
    { studentId: 3, courseId: 5,  date: '13/09', status: 'present' },
    { studentId: 3, courseId: 5,  date: '20/09', status: 'present' },
    { studentId: 4, courseId: 11, date: '12/09', status: 'present' },
    { studentId: 4, courseId: 15, date: '14/09', status: 'present' },
    { studentId: 4, courseId: 11, date: '19/09', status: 'excuse'  },
    { studentId: 5, courseId: 10, date: '14/09', status: 'present' },
    { studentId: 5, courseId: 9,  date: '10/09', status: 'absent'  },
    { studentId: 7, courseId: 5,  date: '13/09', status: 'present' },
    { studentId: 7, courseId: 17, date: '10/09', status: 'present' },
    { studentId: 8, courseId: 3,  date: '13/09', status: 'present' },
    { studentId: 8, courseId: 1,  date: '10/09', status: 'present' },
  ],

  // ---- INSCRIPTIONS (démo) ----
  inscriptions: [
    { id: 1, childName: 'Zoé Laurent',   age: 8,  parentName: 'Claire Laurent', email: 'claire.laurent@email.com', phone: '0476 12 34 56', courses: ['Hip-Hop 1 (6-8 ans)'], level: 'Débutant', status: 'pending',  date: '20/06/2026', message: 'Ma fille adore la danse hip-hop !' },
    { id: 2, childName: 'Milo Rousseau', age: 11, parentName: 'Paul Rousseau',  email: 'paul.rousseau@email.com',  phone: '0486 54 32 10', courses: ['Hip-Hop 3 (11-13 ans)'], level: '1-2 ans', status: 'pending',  date: '19/06/2026', message: '' },
    { id: 3, childName: 'Alice Moreau',  age: 5,  parentName: 'Julie Moreau',   email: 'julie.moreau@email.com',   phone: '0472 98 76 54', courses: ['Initiation (4-5 ans)'], level: 'Débutant', status: 'approved', date: '15/06/2026', message: 'Première fois en danse.' },
    { id: 4, childName: 'Lucas Girard',  age: 15, parentName: 'Eric Girard',    email: 'eric.girard@email.com',    phone: '0479 11 22 33', courses: ['Jazz-Contempo 4 (Avancé)', 'Break Dance'], level: '3-5 ans', status: 'pending', date: '22/06/2026', message: 'Lucas a déjà 4 ans de danse.' },
  ],

  // ---- ACTUALITÉS ----
  news: [
    { id: 1, date: "Juin 2026",    title: "Saison 2026-2027 — Inscriptions ouvertes !",  excerpt: "Les cours reprennent en septembre 2026 jusqu'au Gala de fin d'année en mai 2027. 40 cours proposés dans 3 lieux ! Inscriptions ouvertes dès maintenant.", image: "assets/images/dance_jazz.png", emoji: "🎭", category: "Inscriptions" },
    { id: 2, date: "Juillet 2026", title: "Stage d'été intensif — Juillet 2026",          excerpt: "Stage d'été hip-hop, ragga, jazz et classique. Progressez rapidement pendant les vacances !", image: null, emoji: "☀️", category: "Stage" },
    { id: 3, date: "Mai 2026",     title: "Gala de fin d'année 2026 — Un succès !",       excerpt: "Merci à tous les élèves, professeurs et parents pour ce magnifique spectacle. Rendez-vous pour le gala 2027 !", image: "assets/images/dance_ballet.png", emoji: "🌟", category: "Événement" },
  ],

  // ---- GALERIE ----
  gallery: [
    { src: "assets/images/dance_ballet.png",       alt: "Cours de ballet",   category: "Classique"    },
    { src: "assets/images/dance_jazz.png",         alt: "Jazz & spectacle",  category: "Jazz"         },
    { src: "assets/images/dance_contemporary.png", alt: "Contemporain",      category: "Contemporain" },
    { src: "assets/images/hero_dancer.png",        alt: "Danseuse solo",     category: "Classique"    },
    { src: "assets/images/dance_ballet.png",       alt: "Barre classique",   category: "Classique"    },
    { src: "assets/images/dance_jazz.png",         alt: "Gala",              category: "Événement"    },
    { src: "assets/images/dance_contemporary.png", alt: "Répétition",        category: "Contemporain" },
    { src: "assets/images/hero_dancer.png",        alt: "Variation",         category: "Classique"    },
    { src: "assets/images/dance_jazz.png",         alt: "Showcase hip-hop",  category: "Hip-Hop"      },
  ],

  nextEvent: { name: "Gala de Fin d'Année 2027", date: new Date("2027-05-29T19:00:00") },

  // ---- HELPERS ----
  getCourseById(id)             { return this.courses.find(c => c.id === id); },
  getStudentById(id)            { return this.students.find(s => s.id === id); },
  getUserById(id)               { return this.users.find(u => u.id === id); },
  getStudentsByCourse(cid)      { return this.students.filter(s => s.courseIds.includes(cid)); },
  getAttendanceByStudent(sid)   { return this.attendance.filter(a => a.studentId === sid); },
  getPendingInscriptions()      { return this.inscriptions.filter(i => i.status === 'pending'); },
  getChildrenByParent(pid)      { return this.students.filter(s => s.parentId === pid); },
  getCoursesByLieu(lieuId)      { return this.courses.filter(c => c.lieu === lieuId); },
  approveInscription(id)        { const i = this.inscriptions.find(i => i.id === id); if (i) i.status = 'approved'; },
  rejectInscription(id)         { const i = this.inscriptions.find(i => i.id === id); if (i) i.status = 'rejected'; },
  markAttendance(studentId, courseId, date, status) {
    const existing = this.attendance.find(a => a.studentId === studentId && a.courseId === courseId && a.date === date);
    if (existing) existing.status = status;
    else this.attendance.push({ studentId, courseId, date, status });
  }
};
