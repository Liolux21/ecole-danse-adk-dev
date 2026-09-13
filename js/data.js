// =============================================
// ÉCOLE DE DANSE ADK — Data v3 (Saison 2026-2027)
// =============================================
import { db, collection, getDocs } from './firebase-config.js';

export const DATA = {

  school: {
    name: "École de Danse ADK",
    shortName: "ADK",
    tagline: "Une famille · Une passion · Une histoire · Une vie",
    founded: 1998,
    address: "Studio ADK - Pin, Belgique",
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
    { id: 'bertrix', name: 'Complexe sportif de Bertrix',     short: 'Bertrix',    color: '#90CC90' },
    { id: 'izel',    name: 'Centre Culturel Izel',            short: 'C.C. Izel',  color: '#DC9EC8' },
    { id: 'flore',   name: 'Complexe Sportif Florenville',    short: 'C.S. Flore', color: '#B478DC' },
  ],

  // ---- UTILISATEURS ----
  users: [],

  // ---- COURS (Saison 2026-2027) ----
  courses: [
    { id: 1, style: 'hiphop', name: 'HIPHOP 4', ages: 'dès 14 ans', levels: 'Déb./Interm.', prof: 'Pauline Gérard', lieu: 'adk', schedule: 'Lundi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 2, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 4', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Janis Romain', lieu: 'adk', schedule: 'Lundi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 3, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 5', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Janis Romain', lieu: 'adk', schedule: 'Lundi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 4, style: 'classique', name: 'BALLET CLASSIQUE & POINTES', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Lundi 20h00 - 21h30', biweekly: false, eventType: 'regulier', emoji: '🩰' },
    { id: 5, style: 'classique', name: 'CLASSIQUE 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Mardi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🩰' },
    { id: 6, style: 'classique', name: 'CLASSIQUE 2', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Mardi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🩰' },
    { id: 7, style: 'jazz_contemporain', name: 'JAZZ 2', ages: '9-11 ans', levels: 'Tous niveaux', prof: 'Janis Romain', lieu: 'adk', schedule: 'Mardi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 8, style: 'ragga', name: 'RAGGA 3', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Jade Nélis', lieu: 'adk', schedule: 'Mardi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 9, style: 'jazz_contemporain', name: 'STREET JAZZ', ages: 'dès 16 ans & adultes', levels: 'Tous niveaux', prof: 'Maeva Delgoffe', lieu: 'adk', schedule: 'Mardi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '👟' },
    { id: 10, style: 'jazz_contemporain', name: 'JAZZ 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Clémentine Mamdy', lieu: 'adk', schedule: 'Mercredi 14h00 - 15h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 11, style: 'eveil', name: 'INITIATION À LA DANSE', ages: '4-5 ans', levels: 'Tous niveaux', prof: 'Daisy Theunissen', lieu: 'adk', schedule: 'Mercredi 15h00 - 16h00', biweekly: false, eventType: 'regulier', emoji: '👶' },
    { id: 12, style: 'eveil', name: 'ÉVEIL À LA DANSE', ages: '3-4 ans', levels: 'Tous niveaux', prof: 'Daisy Theunissen', lieu: 'adk', schedule: 'Mercredi 16h00 - 17h00', biweekly: false, eventType: 'regulier', emoji: '👶' },
    { id: 13, style: 'ragga', name: 'RAGGA 2', ages: 'dès 13 ans', levels: 'Déb./Interm.', prof: 'Lili Maury', lieu: 'adk', schedule: 'Mercredi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 14, style: 'ragga', name: 'GIRLY', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '💃' },
    { id: 15, style: 'ragga', name: 'POMDANCE', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '📣' },
    { id: 16, style: 'ragga', name: 'RAGGA 4', ages: 'dès 13 ans', levels: 'Avancé', prof: 'Margaux Hubert', lieu: 'adk', schedule: 'Mercredi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 17, style: 'ragga', name: 'RAGGA 1', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Jade Nélis', lieu: 'adk', schedule: 'Jeudi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 18, style: 'hiphop', name: 'BREAK DANCE', ages: 'dès 8 ans', levels: 'Tous niveaux', prof: 'Adam Binoua', lieu: 'adk', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🛹' },
    { id: 19, style: 'hiphop', name: 'HIPHOP OLD SCHOOL', ages: 'Open Level', levels: 'Tous niveaux', prof: 'Adam Binoua', lieu: 'adk', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '📻' },
    { id: 20, style: 'hiphop', name: 'HIPHOP 2', ages: '9-11 ans', levels: 'Tous niveaux', prof: 'Jeanne Lefèvre', lieu: 'adk', schedule: 'Vendredi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 21, style: 'jazz_contemporain', name: 'JAZZ-CONTEMPORAIN 3', ages: 'dès 12 ans', levels: 'Déb./Interm.', prof: 'Charlotte Varoquaux', lieu: 'adk', schedule: 'Vendredi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 22, style: 'hiphop', name: 'HIPHOP 1', ages: '6-8 ans', levels: 'Tous niveaux', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 9h00 - 10h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 23, style: 'hiphop', name: 'HIPHOP 3', ages: '11-13 ans', levels: 'Tous niveaux', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 10h00 - 11h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 24, style: 'hiphop', name: 'HIPHOP 6', ages: 'dès 14 ans', levels: 'Avancé', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 11h00 - 12h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 25, style: 'compagnie', name: 'COMPAGNIE MOOVE', ages: 'Compagnie', levels: 'Compagnie', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 12h00 - 13h30 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' },
    { id: 26, style: 'compagnie', name: 'COMPAGNIE UNITY', ages: 'Compagnie', levels: 'Compagnie', prof: 'Maurine Baudon', lieu: 'adk', schedule: 'Samedi 12h00 - 13h30 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' },
    { id: 27, style: 'hiphop', name: 'HIPHOP 5', ages: 'dès 14 ans', levels: 'Interm./Avancé', prof: 'Zoé Lambert', lieu: 'adk', schedule: 'Samedi 14h00 - 15h30 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🧢' },
    { id: 28, style: 'compagnie', name: 'COMPAGNIE TEAM', ages: 'Contemporain', levels: 'Compagnie', prof: 'Janis Romain', lieu: 'adk', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🏆' },
    { id: 29, style: 'compagnie', name: 'ATELIER CHORÉ GIRLY', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Dimanche 9h00 - 10h30 (1 sem/2)', biweekly: true, eventType: 'stage', emoji: '✨' },
    { id: 30, style: 'compagnie', name: 'ATELIER PRO CONTEMPORAIN', ages: 'dès 13 ans', levels: 'Interm./Avancé', prof: 'Corentin Milosevic', lieu: 'adk', schedule: 'Dimanche 10h30 - 12h00 (1 sem/2)', biweekly: true, eventType: 'pro', emoji: '🌟' },
    { id: 31, style: 'special', name: 'POLE DANSE', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Florence Leyens', lieu: 'flore', schedule: 'Jeudi 19h30 - 21h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' },
    { id: 32, style: 'hiphop', name: 'ADULTES HIPHOP / RAGGA', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'chiny', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 33, style: 'jazz_contemporain', name: 'ADULTES JAZZ / CONTEMPORAIN', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Janis Romain', lieu: 'chiny', schedule: 'Jeudi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
    { id: 34, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
    { id: 35, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: 'dès 13 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
    { id: 36, style: 'hiphop', name: 'HIPHOP', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🧢' },
    { id: 37, style: 'ragga', name: 'RAGGA', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🔥' },
    { id: 38, style: 'jazz_contemporain', name: 'CONTEMPORAIN / JAZZ', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '✨' },
    { id: 39, style: 'ragga', name: 'GIRLY', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' }
  ],

  // ---- PLANNING (créneaux pour la vue calendrier) ----
  schedule: {
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    slots: [
      { day: 0, hour: '17h00', course: 'HIPHOP 4', style: 'hiphop', courseId: 1, lieu: 'ADK' },
      { day: 0, hour: '18h00', course: 'JAZZ-CONTEMPORAIN 4', style: 'jazz_contemporain', courseId: 2, lieu: 'ADK' },
      { day: 0, hour: '19h00', course: 'JAZZ-CONTEMPORAIN 5', style: 'jazz_contemporain', courseId: 3, lieu: 'ADK' },
      { day: 0, hour: '20h00', course: 'BALLET CLASSIQUE & POINTES', style: 'classique', courseId: 4, lieu: 'ADK' },
      { day: 1, hour: '17h00', course: 'CLASSIQUE 1', style: 'classique', courseId: 5, lieu: 'ADK' },
      { day: 1, hour: '17h00', course: 'CLASSIQUE 2', style: 'classique', courseId: 6, lieu: 'ADK' },
      { day: 1, hour: '18h00', course: 'JAZZ 2', style: 'jazz_contemporain', courseId: 7, lieu: 'ADK' },
      { day: 1, hour: '19h00', course: 'RAGGA 3', style: 'ragga', courseId: 8, lieu: 'ADK' },
      { day: 1, hour: '20h00', course: 'STREET JAZZ', style: 'jazz_contemporain', courseId: 9, lieu: 'ADK' },
      { day: 2, hour: '14h00', course: 'JAZZ 1', style: 'jazz_contemporain', courseId: 10, lieu: 'ADK' },
      { day: 2, hour: '15h00', course: 'INITIATION À LA DANSE', style: 'eveil', courseId: 11, lieu: 'ADK' },
      { day: 2, hour: '16h00', course: 'ÉVEIL À LA DANSE', style: 'eveil', courseId: 12, lieu: 'ADK' },
      { day: 2, hour: '17h00', course: 'RAGGA 2', style: 'ragga', courseId: 13, lieu: 'ADK' },
      { day: 2, hour: '18h00', course: 'GIRLY', style: 'ragga', courseId: 14, lieu: 'ADK' },
      { day: 2, hour: '19h00', course: 'POMDANCE', style: 'ragga', courseId: 15, lieu: 'ADK' },
      { day: 2, hour: '20h00', course: 'RAGGA 4', style: 'ragga', courseId: 16, lieu: 'ADK' },
      { day: 3, hour: '17h00', course: 'RAGGA 1', style: 'ragga', courseId: 17, lieu: 'ADK' },
      { day: 3, hour: '18h00', course: 'BREAK DANCE', style: 'hiphop', courseId: 18, lieu: 'ADK' },
      { day: 3, hour: '19h00', course: 'HIPHOP OLD SCHOOL', style: 'hiphop', courseId: 19, lieu: 'ADK' },
      { day: 4, hour: '17h00', course: 'HIPHOP 2', style: 'hiphop', courseId: 20, lieu: 'ADK' },
      { day: 4, hour: '18h00', course: 'JAZZ-CONTEMPORAIN 3', style: 'jazz_contemporain', courseId: 21, lieu: 'ADK' },
      { day: 5, hour: '09h00', course: 'HIPHOP 1', style: 'hiphop', courseId: 22, lieu: 'ADK' },
      { day: 5, hour: '10h00', course: 'HIPHOP 3', style: 'hiphop', courseId: 23, lieu: 'ADK' },
      { day: 5, hour: '11h00', course: 'HIPHOP 6', style: 'hiphop', courseId: 24, lieu: 'ADK' },
      { day: 5, hour: '12h00', course: 'COMPAGNIE MOOVE', style: 'compagnie', courseId: 25, lieu: 'ADK' },
      { day: 5, hour: '12h00', course: 'COMPAGNIE UNITY', style: 'compagnie', courseId: 26, lieu: 'ADK' },
      { day: 5, hour: '14h00', course: 'HIPHOP 5', style: 'hiphop', courseId: 27, lieu: 'ADK' },
      { day: 5, hour: '14h00', course: 'COMPAGNIE TEAM', style: 'compagnie', courseId: 28, lieu: 'ADK' },
      { day: 6, hour: '09h00', course: 'ATELIER CHORÉ GIRLY', style: 'compagnie', courseId: 29, lieu: 'ADK' },
      { day: 6, hour: '10h30', course: 'ATELIER PRO CONTEMPORAIN', style: 'compagnie', courseId: 30, lieu: 'ADK' },
      { day: 3, hour: '19h30', course: 'POLE DANSE', style: 'special', courseId: 31, lieu: 'flore' },
      { day: 3, hour: '19h00', course: 'ADULTES HIPHOP / RAGGA', style: 'hiphop', courseId: 32, lieu: 'chiny' },
      { day: 3, hour: '20h00', course: 'ADULTES JAZZ / CONTEMPORAIN', style: 'jazz_contemporain', courseId: 33, lieu: 'chiny' },
      { day: 3, hour: '17h00', course: 'HIPHOP & RAGGA', style: 'hiphop', courseId: 34, lieu: 'bertrix' },
      { day: 3, hour: '18h00', course: 'HIPHOP & RAGGA', style: 'hiphop', courseId: 35, lieu: 'bertrix' },
      { day: 5, hour: '14h00', course: 'HIPHOP', style: 'hiphop', courseId: 36, lieu: 'rox' },
      { day: 5, hour: '14h00', course: 'RAGGA', style: 'ragga', courseId: 37, lieu: 'rox' },
      { day: 5, hour: '16h00', course: 'CONTEMPORAIN / JAZZ', style: 'jazz_contemporain', courseId: 38, lieu: 'rox' },
      { day: 5, hour: '16h00', course: 'GIRLY', style: 'ragga', courseId: 39, lieu: 'rox' }
    ]
  },

  // ---- ÉLÈVES (démo) ----
  students: [],

  // ---- PRÉSENCES (démo) ----
  attendance: [],

  // ---- HEURES PROFS ----
  prof_hours: [],
  galaRepets: [],
  galaInfos: [],
  galaNotes: [],

  // ---- INSCRIPTIONS (démo) ----
  inscriptions: [],

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
  getCourseById(id)             { return this.courses.find(c => String(c.id) === String(id)); },
  getStudentById(id)            { return this.students.find(s => String(s.id) === String(id)); },
  getUserById(id)               { return this.users.find(u => String(u.id) === String(id)); },
  getStudentsByCourse(cid)      { return this.students.filter(s => (s.courseIds||[]).map(String).includes(String(cid))); },
  getAttendanceByStudent(sid)   { return this.attendance.filter(a => String(a.studentId) === String(sid)); },
  getPendingInscriptions()      { return this.inscriptions.filter(i => i.status === 'pending'); },
  getChildrenByParent(user) {
      if (!user) return [];
      const userEmail = (user.email || "").toLowerCase();
      return this.students.filter(s => {
        return (s.parentId === user.id) ||
               (s.parentId && s.parentId.toLowerCase() === userEmail) ||
               (s.contactEmail && s.contactEmail.toLowerCase() === userEmail) ||
               (s.contactEmail2 && s.contactEmail2.toLowerCase() === userEmail) ||
               (user.childrenIds && user.childrenIds.includes(String(s.id)));
      });
    },
  getCoursesByLieu(lieuId)      { return this.courses.filter(c => c.lieu === lieuId); },
  async approveInscription(id)        { 
    const i = this.inscriptions.find(i => String(i.id) === String(id)); 
    if (i) { 
      i.status = 'approved'; 
      try {
        const { doc, updateDoc } = await import('./firebase-config.js');
        await updateDoc(doc(db, "inscriptions", String(id)), { status: 'approved' });
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },
  async rejectInscription(id)         { 
    const i = this.inscriptions.find(i => String(i.id) === String(id)); 
    if (i) { 
      i.status = 'rejected'; 
      try {
        const { doc, updateDoc } = await import('./firebase-config.js');
        await updateDoc(doc(db, "inscriptions", String(id)), { status: 'rejected' });
      } catch(e) { console.error(e); }
      this.saveState(); 
    } 
  },
  async markAttendance(studentId, courseId, date, status) {
    const sId = String(studentId).trim();
    const cId = String(courseId).trim();
    const d = String(date).trim();
    const existing = this.attendance.find(a => String(a.studentId).trim() === sId && String(a.courseId).trim() === cId && String(a.date).trim() === d);
    if (existing) existing.status = status;
    else this.attendance.push({ studentId: sId, courseId: cId, date: d, status });
    this.saveState();
    try {
      const { doc, setDoc, db } = await import('./firebase-config.js');
      const docId = sId + "_" + cId + "_" + d.replace(/\//g, '-');
      await setDoc(doc(db, "attendance", docId), { studentId: sId, courseId: cId, date: d, status, timestamp: Date.now() });
    } catch (e) {
      console.error("Firebase save attendance error:", e);
    }
  },

  // ---- ADVANCED COURSE MANAGEMENT ----
  courseOverrides: {}, // { date, hour, lieu, status: 'maintenu'|'annule', substituteId, message, type: 'temporaire'|'definitif' }
  messages: [], announcements: [],      // { courseId, senderId, senderName, senderRole, type: 'public'|'private', content, timestamp }

  getCourseWithOverride(id) {
    const base = this.getCourseById(id);
    if (!base) return null;
    const override = this.courseOverrides[id];
    if (!override) return base;
    return { ...base, ...override, originalSchedule: base.schedule, originalLieu: base.lieu };
  },

  getProfessors() {
    return this.users.filter(u => u.role === 'prof');
  },

  getMessagesForCourse(courseId, user) {
    return this.messages.filter(m => {
      if (m.courseId !== courseId) return false;
      if (m.type === 'public') return true;
      if (user.role === 'admin') return true;
      if (user.id === m.senderId) return true;
      if (m.recipientId === user.id) return true;
      
      const course = this.getCourseWithOverride(courseId);
      if (user.role === 'prof') {
        const isTitulaire = this.getUserById(user.id)?.courseIds?.includes(courseId);
        const isSub = course.substituteId === user.id;
        return isTitulaire || isSub;
      }
      return false;
    });
  },

  saveState() {
    localStorage.setItem('adk_state', JSON.stringify({
      attendance: this.attendance,
      messages: this.messages,
      courseOverrides: this.courseOverrides,
      inscriptionStatuses: this.inscriptions.map(i => ({id: i.id, status: i.status}))
    }));
  },

  loadState() {
    const saved = localStorage.getItem('adk_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.attendance) this.attendance = parsed.attendance;
        if (parsed.messages) this.messages = parsed.messages;
        if (parsed.courseOverrides) this.courseOverrides = parsed.courseOverrides;
        if (parsed.inscriptionStatuses) {
          parsed.inscriptionStatuses.forEach(s => {
            const i = this.inscriptions.find(ins => ins.id === s.id);
            if (i) i.status = s.status;
          });
        }
      } catch(e) {}
    }
  },

  // ---- FIREBASE SYNC ----
  async syncFromFirebase() {
    try {
      // 1. Fetch Users
      const usersSnap = await getDocs(collection(db, "users"));
      this.users = [];
      usersSnap.forEach(doc => {
        this.users.push({ docId: doc.id, id: doc.id, ...doc.data() });
      });

      // 2. Fetch Students
      try {
        const studentsSnap = await getDocs(collection(db, "students"));
        this.students = [];
        studentsSnap.forEach(doc => {
          let sData = doc.data();
          if (sData.courses && !sData.courseIds) {
            sData.courseIds = sData.courses;
            delete sData.courses;
          }
          sData.courseIds = sData.courseIds || [];
          this.students.push({ docId: doc.id, id: doc.id, ...sData });
        });
      } catch(e) {
        console.warn("students read error:", e);
      }
      // 3. Fetch Courses
      try {
        const coursesSnap = await getDocs(collection(db, "courses"));
        this.courses = [];
        coursesSnap.forEach(doc => {
          this.courses.push({ docId: doc.id, id: doc.id, ...doc.data() });
        });
      } catch(e) {
        console.warn("courses read error:", e);
      }

      // 4. Fetch Inscriptions
      try {
        const inscSnap = await getDocs(collection(db, "inscriptions"));
        this.inscriptions = [];
        inscSnap.forEach(doc => {
          this.inscriptions.push({ docId: doc.id, id: doc.id, ...doc.data() });
        });
      } catch (e) {
        console.warn("inscriptions read error:", e);
      }


      
      
      
      // Fetch Attendance
      try {
        const attSnap = await getDocs(collection(db, "attendance"));
        this.attendance = [];
        attSnap.forEach(doc => {
          this.attendance.push({ id: doc.id, ...doc.data() });
        });
      } catch (e) {
        console.warn("attendance collection missing or error: ", e);
      }
      
      // 5b. Fetch Prof Hours
      try {
        const phSnap = await getDocs(collection(db, "prof_hours"));
        this.prof_hours = [];
        phSnap.forEach(doc => {
          this.prof_hours.push({ id: doc.id, ...doc.data() });
        });
      } catch (e) {
        console.warn("prof_hours collection missing or error: ", e);
      }

      // 6. Fetch Announcements
      try {
        const annSnap = await getDocs(collection(db, "announcements"));
        this.announcements = [];
        annSnap.forEach(doc => {
          this.announcements.push({ id: doc.id, ...doc.data() });
        });
        
        try {
          const settingsSnap = await getDocs(collection(db, "settings"));
          settingsSnap.forEach(doc => {
            if (doc.id === 'general') {
              this.settings = doc.data();
              if (!this.settings.holidays) this.settings.holidays = [];
            }
          if (doc.id === 'gala') {
                const galaData = doc.data();
                this.galaRepets = galaData.repets || [];
                this.galaInfos = galaData.infos || [];
                this.galaNotes = galaData.notes || [];
              }
            });
        } catch(e) {
          console.warn("Settings fetch failed", e);
        }
        // Sort by timestamp desc
        this.announcements.sort((a, b) => b.timestamp - a.timestamp);
      } catch (err) {
        console.error("Error fetching announcements", err);
      }

      console.log("Données Firebase synchronisées avec succès !", { 
        users: this.users.length, 
        students: this.students.length, 
        courses: this.courses.length 
      });
      return true;
    } catch(err) {
      console.error("Erreur de synchronisation Firebase:", err);
      return false;
    }
  }
};

DATA.loadState();
window.DATA = DATA;
