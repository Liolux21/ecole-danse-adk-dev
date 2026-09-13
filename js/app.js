
const PROF_FULL_NAMES = {
  'Janis': 'Janis Romain', 'Jeanne': 'Jeanne Lefèvre', 'Loreen': 'Loreen Poncelet',
  'Maeva': 'Maeva Delgoffe', 'Margaux': 'Margaux Hubert', 'Maurine': 'Maurine Baudon',
  'Pauline': 'Pauline Gérard', 'Zoé': 'Zoé Lambert', 'Jade': 'Jade Nélis',
  'Daisy': 'Daisy Theunissen', 'Corentin': 'Corentin Milosevic', 'Charlotte': 'Charlotte Varoquaux',
  'Andrew': 'Andrew Schmitz', 'Clémentine': 'Clémentine Mamdy', 'Lili': 'Lili Maury',
  'Florence': 'Florence Leyens', 'Adam': 'Adam Binoua'
};

window.openContactInscriptionModal = function(email, parentName) {
    document.getElementById('contact-inscription-email').value = email;
    document.getElementById('contact-inscription-name').value = parentName;
    document.getElementById('contact-inscription-message').value = '';
    document.getElementById('modal-contact-inscription').classList.add('active');
};

window.sendContactInscription = async function() {
    const email = document.getElementById('contact-inscription-email').value;
    const name = document.getElementById('contact-inscription-name').value;
    const message = document.getElementById('contact-inscription-message').value;
    const btn = document.querySelector('#form-contact-inscription button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Envoi...";
    btn.disabled = true;

    try {
        await emailjs.send(
            "service_ADK", 
            "template_contact_inscription", // Remplacez par l'ID réel de votre template EmailJS pour la prise de contact
            {
                to_email: email,
                to_name: name,
                message: message
            }
        );
        showToast('Message envoyé avec succès !', 'success');
        closeModal('modal-contact-inscription');
    } catch (e) {
        console.error(e);
        showToast('Erreur lors de l\'envoi du message', 'error');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
};

import { db, collection, addDoc, doc, setDoc, getDoc, deleteDoc } from './firebase-config.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

// =============================================
// ÉCOLE DE DANSE ADK — App v2 (3 rôles)
// =============================================

function getMonthName(m) {
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return months[m - 1] || '';
}

document.addEventListener('DOMContentLoaded', () => {
  try { initNavbar(); } catch(e) { console.error('Error in initNavbar:', e); }
  try { initParticles(); } catch(e) { console.error('Error in initParticles:', e); }
  try { initHero(); } catch(e) { console.error('Error in initHero:', e); }
  try { initCourses(); } catch(e) { console.error('Error in initCourses:', e); }
  try { initPlanning(); } catch(e) { console.error('Error in initPlanning:', e); }
  try { initInscription(); } catch(e) { console.error('Error in initInscription:', e); }
  try { initPortal(); } catch(e) { console.error('Error in initPortal:', e); }       // Nouveau portail multi-rôles
  try { initActualites(); } catch(e) { console.error('Error in initActualites:', e); }
  try { initGalerie(); } catch(e) { console.error('Error in initGalerie:', e); }
  try { initContact(); } catch(e) { console.error('Error in initContact:', e); }
  try { initReveal(); } catch(e) { console.error('Error in initReveal:', e); }
    try { initFooter(); } catch(e) { console.error('Error in initFooter:', e); }
  setTimeout(() => document.querySelector('.loader-wrapper')?.classList.add('hidden'), 500);

  // Modal helpers
  window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  };
  window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  };

  try { initCountdown(); } catch(e) { console.error('Error in initCountdown:', e); }
  try { initMobileMenu(); } catch(e) { console.error('Error in initMobileMenu:', e); }
});

// =============================================
// NAVBAR
// =============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const links = document.querySelectorAll('.nav-link[data-section]');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 150) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
  });
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(el.dataset.target);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    });
  });
}
function initMobileMenu() {
  const burger = document.querySelector('.nav-burger');
  const menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;
  burger.addEventListener('click', () => menu.classList.toggle('open'));
}
function closeMobileMenu() { 
  const menu = document.querySelector('.mobile-menu');
  if (menu) menu.classList.remove('open'); 
}

// =============================================
// PARTICLES
// =============================================
function initParticles() {
  const c = document.querySelector('.hero-particles');
  if (!c) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `left:${Math.random()*100}%;width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;animation-duration:${Math.random()*10+8}s;animation-delay:${Math.random()*10}s`;
    c.appendChild(p);
  }
}

// =============================================
// HERO
// =============================================
function initHero() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  window.addEventListener('scroll', () => { bg.style.transform = `translateY(${window.scrollY * 0.4}px)`; }, { passive: true });
  setTimeout(() => bg.classList.add('loaded'), 100);
  const { stats } = DATA.school;
  animateCounter('stat-eleves', stats.eleves);
  animateCounter('stat-profs', stats.professeurs);
  animateCounter('stat-styles', stats.styles);
  animateCounter('stat-ans', new Date().getFullYear() - DATA.school.founded);
}
function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step = target / 60;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur) + '+';
    if (cur >= target) clearInterval(t);
  }, 25);
}

// =============================================
// COURSES
// =============================================
function initCourses() {
  const grid = document.getElementById('courses-grid');
  const filters = document.querySelectorAll('.filter-btn');
  if (!grid) return;
  DATA.courses.forEach(c => grid.appendChild(createCourseCard(c)));
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      grid.querySelectorAll('.course-card').forEach(card => {
        card.classList.toggle('hidden', btn.dataset.filter !== 'all' && card.dataset.style !== btn.dataset.filter);
      });
    });
  });
}
function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card reveal';
  card.dataset.style = course.style;
  const labels = {
    classique:    'Classique',
    contemporain: 'Contemporain',
    jazz:         'Jazz',
    hiphop:       'Hip-Hop',
    eveil:        'Éveil',
    ragga:        'Ragga',
    compagnie:    'Compagnie',
    special:      'Spécial',
  };
  let img = '';
  if (course.image) {
    img = `<img src="${course.image}" alt="${course.name}" class="course-img" loading="lazy">`;
  } else {
    let typeLabel = '';
    if (course.eventType === 'pro') typeLabel = 'img/adk_pro.png?v=3';
    else if (course.eventType === 'stage') typeLabel = 'img/adk_stage.png?v=3';
    else if (course.eventType === 'show') typeLabel = 'img/adk_show.png?v=3';
    
        if (typeLabel) {
      img = `<img src="${typeLabel}" alt="${course.name}" class="course-img" loading="lazy">`;
    } else {
      let vitrineImg = null;
      if (window.VITRINE_DATA && window.VITRINE_DATA.cours && window.VITRINE_DATA.cours[course.style]) {
        vitrineImg = window.VITRINE_DATA.cours[course.style].avatar;
      }
      if (vitrineImg) {
        img = `<img src="${vitrineImg}" alt="${course.name}" class="course-img" style="object-fit: cover;" loading="lazy">`;
      } else {
        img = `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji || '💃'}</div>`;
      }
    }
  }
    const lieuName = DATA.locations.find(l => l.id === course.lieu)?.name || formatLieu(course.lieu);
    const lieuBadge = lieuName ? `<span style="font-size:0.7rem;color:var(--gold);margin-left:0.5rem;">📍 ${lieuName}</span>` : '';
  card.innerHTML = `${img}<div class="course-body"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.75rem;"><span class="course-tag tag-${course.style}">${labels[course.style] || course.style}</span>${lieuBadge}${course.biweekly ? '<span style="font-size:0.65rem;color:var(--text-muted);border:1px solid var(--glass-border);padding:0.1rem 0.5rem;border-radius:50px;">1 sem/2</span>' : ''}</div><h3 class="course-name">${course.name}</h3><p class="course-desc">${course.desc}</p><div class="course-meta"><span class="course-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${course.schedule}</span><span class="course-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>${course.ages}</span><span class="course-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${course.levels}</span><span class="course-meta-item" style="color:var(--gold)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>${course.prof}</span></div></div>`;
  return card;
}

// =============================================
// PLANNING avec filtres + vue mobile
// =============================================
const planningState = { offset: 0, styleFilter: 'all', lieuFilter: 'all', mobileDay: 0 };

function initPlanning() {
  const grid     = document.getElementById('planning-grid');
  const weekLabel= document.getElementById('planning-week');
  if (!grid || !weekLabel) return;

  // Navigation semaine
  document.getElementById('plan-prev').addEventListener('click', () => { planningState.offset--; refreshPlanning(grid, weekLabel); });
  document.getElementById('plan-next').addEventListener('click', () => { planningState.offset++; refreshPlanning(grid, weekLabel); });

  // Filtres style
  document.getElementById('planning-style-filters').addEventListener('click', e => {
    const btn = e.target.closest('.plan-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#planning-style-filters .plan-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    planningState.styleFilter = btn.dataset.style;
    refreshPlanning(grid, weekLabel);
    renderMobileDayCourses();
  });

  // Filtres lieu
  document.getElementById('planning-lieu-filters').addEventListener('click', e => {
    const btn = e.target.closest('.plan-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#planning-lieu-filters .plan-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    planningState.lieuFilter = btn.dataset.lieu;
    refreshPlanning(grid, weekLabel);
    renderMobileDayCourses();
  });

  // Onglets jours mobile
  document.getElementById('mobile-day-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.mobile-day-tab');
    if (!tab) return;
    document.querySelectorAll('.mobile-day-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    planningState.mobileDay = parseInt(tab.dataset.day);
    renderMobileDayCourses();
  });

  refreshPlanning(grid, weekLabel);
  renderMobileDayCourses();
}

function slotMatchesFilters(slot) {
  const styleOk = planningState.styleFilter === 'all' || slot.style === planningState.styleFilter;
  const lieuVal = planningState.lieuFilter;
  const slotLieu = (slot.lieu || '').toLowerCase();
  const lieuOk = lieuVal === 'all' ||
    (lieuVal === 'ADK'     && (slotLieu === 'adk'  || slotLieu === '')) ||
    (lieuVal === 'Rox'     && slotLieu === 'rox') ||
    (lieuVal === 'Bertrix' && slotLieu === 'bertrix') ||
    (lieuVal === 'Izel'    && slotLieu === 'izel') ||
    (lieuVal === 'Flore'   && slotLieu === 'flore');
  return styleOk && lieuOk;
}

function refreshPlanning(grid, weekLabel) {
  grid.innerHTML = '';
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1 + planningState.offset * 7);
  const days = DATA.schedule.days;
  const dates = days.map((_, i) => { const d = new Date(monday); d.setDate(monday.getDate() + i); return d; });
  const last = dates[5];
  weekLabel.textContent = `${monday.getDate()} – ${last.getDate()} ${last.toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' })}`;

  // Cellule vide coin haut-gauche
  grid.appendChild(Object.assign(document.createElement('div'), { className: '' }));

  // En-têtes jours
  days.forEach((day, i) => {
    const cell = document.createElement('div');
    cell.className = 'planning-header-cell';
    const isToday = dates[i].toDateString() === today.toDateString();
    if (isToday) cell.style.borderBottom = '2px solid var(--gold)';
    cell.innerHTML = `<div class="day">${day}</div><div class="date" style="color:${isToday ? 'var(--gold)' : ''}">${dates[i].getDate()}</div>`;
    grid.appendChild(cell);
  });

  // Lignes horaires
  ["09h00","10h00","11h00","12h00","13h00","14h00","15h00","16h00","17h00","18h00","19h00","20h00"].forEach(hour => {
    // Vérifier si cette heure a au moins un cours dans le filtre actif
    const hasMatch = DATA.schedule.slots.some(s => s.hour === hour && slotMatchesFilters(s));
    if (!hasMatch && planningState.styleFilter !== 'all') return; // Skip empty rows when filtered

    const tc = document.createElement('div');
    tc.className = 'planning-time-cell';
    tc.textContent = hour;
    grid.appendChild(tc);

    days.forEach((_, di) => {
      const slot = document.createElement('div');
      const match = DATA.schedule.slots.find(s => s.day === di && s.hour === hour);
      if (match) {
        const matches = slotMatchesFilters(match);
        slot.className = `planning-course-block block-${match.style}${matches ? '' : ' dimmed'}`;
        const formattedLieu = formatLieu(match.lieu);
        const lieuBadge = formattedLieu ? `<span class="block-lieu">${formattedLieu}</span>` : '';
        slot.innerHTML = `<div class="block-name">${match.course}</div><div class="block-time">${match.hour}</div>${lieuBadge}`;
      } else {
        slot.className = 'planning-slot';
      }
      slot.style.height = '54px';
      grid.appendChild(slot);
    });
  });
}

// ---- VUE MOBILE : liste des cours du jour ----
function renderMobileDayCourses() {
  const list = document.getElementById('mobile-course-list');
  if (!list) return;
  const day = planningState.mobileDay;
  const slots = DATA.schedule.slots
    .filter(s => s.day === day && slotMatchesFilters(s))
    .sort((a, b) => a.hour.localeCompare(b.hour));

  if (slots.length === 0) {
    list.innerHTML = `<div class="mobile-empty-day"><div class="mobile-empty-day-icon">🩰</div><p>Aucun cours avec ces filtres ce jour-là.</p></div>`;
    return;
  }

  const accentColors = {
    classique: 'var(--rose)', contemporain: 'var(--gold)', jazz: '#7BB4DC',
    hiphop: '#90CC90', eveil: '#DC9EC8', ragga: '#40C4A4',
    compagnie: '#B478DC', special: '#DC8C50',
  };

  list.innerHTML = slots.map(slot => {
    const course = DATA.getCourseById(slot.courseId);
    const color = accentColors[slot.style] || 'var(--gold)';
    const formattedLieu = formatLieu(slot.lieu);
    const lieuName = formattedLieu ? `📍 ${formattedLieu}` : '🏢 Studio ADK';
    const ages = course?.ages || '';
    const prof = course?.prof || '';
    const biweekly = course?.biweekly ? ' · 1 sem/2' : '';
    const schedule = course?.schedule || slot.hour;
    return `
    <div class="mobile-course-card">
      <div class="mobile-course-accent" style="background:${color}"></div>
      <div class="mobile-course-body">
        <div class="mobile-course-time">${schedule}${biweekly}</div>
        <div class="mobile-course-name">${slot.course}</div>
        <div class="mobile-course-meta">
          <span class="mobile-course-meta-item">👩‍🏫 ${prof}</span>
          <span class="mobile-course-meta-item">👥 ${ages}</span>
          <span class="mobile-course-meta-item">${lieuName}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}


// =============================================
// INSCRIPTION
// =============================================
function initInscription() {
  const form = document.getElementById('inscription-form');
  const success = document.getElementById('form-success');
  const courseSelectContainer = document.querySelector('.custom-select-container');
  const courseSelectHeader = document.getElementById('course-select-header');
  const courseSelectTags = document.getElementById('course-select-tags');
  const courseSearchInput = document.getElementById('course-search-input');
  const courseOptionsList = document.getElementById('course-options-list');

  // Sécurité anti-crash si la page est en cache ou si l'élément n'existe pas
  if (!form || !courseSelectContainer || !courseOptionsList) {
    return;
  }

  let selectedCourses = new Set();

  function renderOptions(filterText = '') {
    courseOptionsList.innerHTML = '';
    const term = filterText.toLowerCase();
    const filtered = DATA.courses.filter(c => 
      c.name.toLowerCase().includes(term) || 
      (c.prof && c.prof.toLowerCase().includes(term)) ||
      c.style.toLowerCase().includes(term)
    );

    if (filtered.length === 0) {
      courseOptionsList.innerHTML = '<div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:0.8rem;">Aucun cours trouvé.</div>';
      return;
    }

    filtered.forEach(c => {
      const opt = document.createElement('div');
      opt.className = `custom-select-option ${selectedCourses.has(c.id) ? 'selected' : ''}`;
      
      let lieuStr = formatLieu(c.lieu);

      const schedule = c.schedule ? c.schedule.split('·')[0].trim() : '';
      const profStr = c.prof ? `👩‍🏫 ${c.prof}` : '';
      
      opt.innerHTML = `
        <input type="checkbox" ${selectedCourses.has(c.id) ? 'checked' : ''}>
        <div>
          <div style="font-weight:600">${c.emoji} ${c.name}</div>
          <span class="option-meta">${schedule} ${profStr ? '— ' + profStr : ''} — 📍 ${lieuStr}</span>
        </div>
      `;
      opt.addEventListener('click', (e) => {
        if(e.target.tagName !== 'INPUT') {
          if (selectedCourses.has(c.id)) selectedCourses.delete(c.id);
          else selectedCourses.add(c.id);
          renderTags();
          renderOptions(courseSearchInput.value);
        }
      });
      courseOptionsList.appendChild(opt);
    });
  }

  function renderTags() {
    if (selectedCourses.size === 0) {
      courseSelectTags.innerHTML = '<span class="placeholder">Sélectionnez vos cours...</span>';
    } else {
      courseSelectTags.innerHTML = '';
      selectedCourses.forEach(id => {
        const c = DATA.getCourseById(id);
        if(!c) return;
        const pill = document.createElement('div');
        pill.className = 'course-tag-pill';
        pill.innerHTML = `<span>${c.emoji} ${c.name}</span> <span class="remove" data-id="${id}">×</span>`;
        courseSelectTags.appendChild(pill);
      });
    }
  }

  courseSelectHeader.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      const id = e.target.dataset.id;
      selectedCourses.delete(id);
      renderTags();
      renderOptions(courseSearchInput.value);
      return;
    }
    courseSelectContainer.classList.toggle('open');
    if (courseSelectContainer.classList.contains('open')) {
      courseSearchInput.focus();
    }
  });

  courseSearchInput.addEventListener('input', (e) => {
    renderOptions(e.target.value);
  });

  document.addEventListener('click', (e) => {
    if (!courseSelectContainer.contains(e.target)) {
      courseSelectContainer.classList.remove('open');
    }
  });

  renderOptions();
  renderTags();
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;

    try {
      const { db, collection, doc, setDoc } = await import('./firebase-config.js');
      const coursesNames = Array.from(selectedCourses).map(id => {
        const c = DATA.getCourseById(id);
        return c ? c.name : null;
      }).filter(Boolean);

      const insData = {
        childName: document.getElementById('child-firstname').value + ' ' + document.getElementById('child-lastname').value,
        age: (new Date().getFullYear()) - (new Date(document.getElementById('child-birth').value).getFullYear()),
        level: document.getElementById('child-level').value,
        parentName: document.getElementById('parent-firstname').value + ' ' + document.getElementById('parent-lastname').value,
        email: document.getElementById('parent-email-form').value,
        phone: document.getElementById('parent-phone').value,
        message: document.getElementById('form-message').value,
        courses: coursesNames,
        status: 'pending',
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: Date.now()
      };

      const docRef = doc(collection(db, "inscriptions"));
      await setDoc(docRef, insData);

      form.style.display = 'none';
      success.style.display = 'block';
    } catch(err) {
      console.error(err);
      alert("Erreur lors de l'envoi de l'inscription.");
      btn.textContent = "Envoyer ma demande d'inscription";
      btn.disabled = false;
    }
  });
}

// =============================================
// PORTAIL MULTI-RÔLES
// =============================================
async function initPortal() {
  const portalForm = document.getElementById('portal-login-form');
  if (!portalForm) return;

  // 1. Initialize Auth
  await AUTH.init();

  // 2. Sync from Firebase Firestore
  await DATA.syncFromFirebase();

  // Si déjà connecté, afficher le bon dashboard
  if (AUTH.isAuthenticated()) {
    showPortalDashboard(AUTH.currentUser);
  }

  // Formulaire de connexion
  portalForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('portal-email').value.trim();
    const password = document.getElementById('portal-password').value.trim();
    const btn = document.getElementById('portal-submit-btn');
    btn.textContent = 'Connexion...';
    btn.disabled = true;
    
    const user = await AUTH.login(email, password);
    if (user) {
      await DATA.syncFromFirebase();
      showPortalDashboard(user);
    } else {
      showToast('❌ Email ou mot de passe incorrect', 'error');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg> Se connecter`;
      btn.disabled = false;
    }
  });

  // Déconnexions
  ['admin', 'prof', 'parent'].forEach(role => {
    document.getElementById(`${role}-logout`).addEventListener('click', () => {
      AUTH.logout();
      document.getElementById('portal-login-wrapper').style.display = '';
      const subtitle = document.getElementById('portal-subtitle');
      if (subtitle) subtitle.style.display = 'block';
      document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('portal-submit-btn').innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg> Se connecter`;
      document.getElementById('portal-submit-btn').disabled = false;
      document.getElementById('portal-login-form').reset();
      document.getElementById('demo-creds').classList.remove('visible');
      document.querySelectorAll('.portal-role-hint').forEach(h => h.classList.remove('active'));
      showToast('✅ Vous êtes déconnecté(e)', 'success');
    });
  });

  // Tabs admin
  initTabs('admin-tabs', ['tab-inscriptions', 'tab-eleves', 'tab-profs', 'tab-admin-cours', 'tab-admin-settings', 'tab-admin-gala', 'tab-admin-annonces', 'tab-admin-messagerie']);
  initTabs('prof-tabs', ['tab-mon-planning', 'tab-appel', 'tab-mes-eleves', 'tab-mes-heures', 'tab-prof-gala', 'tab-prof-messagerie', 'tab-prof-notifications']);
  initTabs('parent-tabs', ['tab-parent-planning', 'tab-parent-gala', 'tab-parent-messagerie', 'tab-parent-notifications']);
  
  // Sub-tabs Gala
  initTabs('sub-admin-gala-tabs', ['tab-admin-gala-repets', 'tab-admin-gala-infos', 'tab-admin-gala-notes']);
  initTabs('sub-prof-gala-tabs', ['tab-prof-gala-repets', 'tab-prof-gala-infos', 'tab-prof-gala-notes']);
  initTabs('sub-parent-gala-tabs', ['tab-parent-gala-repets', 'tab-parent-gala-tenues']);

  // Mobile Gala select logic
  document.querySelectorAll('.gala-mobile-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const targetId = e.target.getAttribute('data-target');
      const container = document.getElementById(targetId);
      if (container) {
        const btn = container.querySelector(`[data-tab="${e.target.value}"]`);
        if (btn) btn.click();
      }
    });
  });
}

function showPortalDashboard(user) {
  document.getElementById('portal-login-wrapper').style.display = 'none';
  const subtitle = document.getElementById('portal-subtitle');
  if (subtitle) subtitle.style.display = 'none';
  document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${user.role}`);
  if (panel) panel.classList.add('active');

  const avatarEl = document.getElementById(`${user.role}-avatar`);
  if (avatarEl) {
    if (user.avatarUrl) {
      avatarEl.style.backgroundImage = `url(${user.avatarUrl})`;
      avatarEl.style.backgroundSize = 'cover';
      avatarEl.style.backgroundPosition = 'center';
      avatarEl.textContent = '';
    } else {
      avatarEl.style.backgroundImage = 'none';
      avatarEl.textContent = user.avatar || (user.name ? user.name[0] : 'U');
    }
  }

  // Handle Role Switching (Prof <-> Parent, Admin <-> Prof)
  const isGodMode = user.email && user.email.toLowerCase() === 'lionel.henrion@gmail.com';
  const godModeSettings = document.getElementById('god-mode-settings');
  if(godModeSettings) godModeSettings.style.display = isGodMode ? 'block' : 'none';
  
  if (isGodMode) {
    const logoutBtnId = user.role === 'admin' ? 'admin-logout' : (user.role === 'prof' ? 'prof-logout' : 'parent-logout');
    const logoutBtn = document.getElementById(logoutBtnId);
    
    if (logoutBtn && logoutBtn.parentNode) {
      // Remove any existing standard switchers
      ['admin-switch-btn', 'prof-to-admin-btn', 'prof-switch-btn', 'parent-switch-btn', 'god-mode-container'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });

      const godContainer = document.createElement('div');
      godContainer.id = 'god-mode-container';
      godContainer.style.display = 'flex';
      godContainer.style.gap = '0.5rem';
      
      const roles = [
        { role: 'admin', label: '👑 Admin' },
        { role: 'prof', label: '👨‍🏫 Prof' },
        { role: 'parent', label: '👨‍👩‍👧 Élève' }
      ];
      
      roles.forEach(r => {
        if (r.role !== user.role) {
          const btn = document.createElement('button');
          btn.className = 'btn btn-outline btn-sm dash-switch-btn';
          btn.style.fontSize = '0.7rem';
          btn.style.borderColor = '#e74c3c';
          btn.style.color = '#e74c3c';
          btn.innerHTML = r.label;
          btn.onclick = () => {
            const newUser = { ...user, role: r.role, isGodMode: true };
            if (r.role !== 'admin') newUser.realRole = 'admin';
            else delete newUser.realRole;
            showPortalDashboard(newUser);
          };
          godContainer.appendChild(btn);
        }
      });
      
      logoutBtn.parentNode.insertBefore(godContainer, logoutBtn);
    }
  } else {
    // Normal Role Switching
    if (user.role === 'admin') {
      let adminSwitchBtn = document.getElementById('admin-switch-btn');
      if (!adminSwitchBtn) {
        adminSwitchBtn = document.createElement('button');
        adminSwitchBtn.id = 'admin-switch-btn';
        adminSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
          adminSwitchBtn.style.fontSize = '0.7rem';
          adminSwitchBtn.style.minWidth = '115px';
          
        adminSwitchBtn.innerHTML = '🔄 Espace Prof';
        adminSwitchBtn.onclick = () => {
          const profUser = { ...user, role: 'prof', realRole: 'admin' };
          showPortalDashboard(profUser);
        };
        const logoutBtn = document.getElementById('admin-logout');
        if (logoutBtn && logoutBtn.parentNode) {
          logoutBtn.parentNode.insertBefore(adminSwitchBtn, logoutBtn);
        }
      }
    } else if (user.role === 'prof') {
      let profToAdminBtn = document.getElementById('prof-to-admin-btn');
      if (user.realRole === 'admin') {
        if (!profToAdminBtn) {
          profToAdminBtn = document.createElement('button');
          profToAdminBtn.id = 'prof-to-admin-btn';
          profToAdminBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            profToAdminBtn.style.fontSize = '0.7rem';
            profToAdminBtn.style.minWidth = '115px';
            
          profToAdminBtn.innerHTML = '🔄 Espace Admin';
          profToAdminBtn.onclick = () => {
            const originalUser = { ...user, role: 'admin' };
            delete originalUser.realRole;
            showPortalDashboard(originalUser);
          };
          const logoutBtn = document.getElementById('prof-logout');
          if (logoutBtn && logoutBtn.parentNode) {
            logoutBtn.parentNode.insertBefore(profToAdminBtn, logoutBtn);
          }
        }
      } else if (profToAdminBtn) {
        profToAdminBtn.remove();
      }

      const userEmail = (user.email || "").toLowerCase();
      const hasStudents = DATA.students.some(s => (s.parentId || "").toLowerCase() === userEmail || (s.contactEmail || "").toLowerCase() === userEmail);
      let switchBtn = document.getElementById('prof-switch-btn');
      if (hasStudents && user.realRole !== 'admin') {
        if (!switchBtn) {
          switchBtn = document.createElement('button');
          switchBtn.id = 'prof-switch-btn';
          switchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            switchBtn.style.fontSize = '0.7rem';
            switchBtn.style.minWidth = '115px';
            
          switchBtn.innerHTML = '🔄 Espace Élève';
          switchBtn.onclick = () => {
            const parentUser = { ...user, role: 'parent', realRole: 'prof' };
            showPortalDashboard(parentUser);
          };
          const logoutBtn = document.getElementById('prof-logout');
          if (logoutBtn && logoutBtn.parentNode) {
            logoutBtn.parentNode.insertBefore(switchBtn, logoutBtn);
          }
        }
      } else if (switchBtn) {
        switchBtn.remove();
      }
    } else if (user.role === 'parent') {
      let parentSwitchBtn = document.getElementById('parent-switch-btn');
      if (user.realRole === 'prof' || user.realRole === 'admin') {
        if (!parentSwitchBtn) {
          parentSwitchBtn = document.createElement('button');
          parentSwitchBtn.id = 'parent-switch-btn';
          parentSwitchBtn.className = 'btn btn-outline btn-sm dash-switch-btn';
            parentSwitchBtn.style.fontSize = '0.7rem';
            parentSwitchBtn.style.minWidth = '115px';
            
          parentSwitchBtn.innerHTML = user.realRole === 'prof' ? '🔄 Espace Prof' : '🔄 Espace Admin';
          parentSwitchBtn.onclick = () => {
            const originalUser = { ...user, role: user.realRole };
            delete originalUser.realRole;
            showPortalDashboard(originalUser);
          };
          const logoutBtn = document.getElementById('parent-logout');
          if (logoutBtn && logoutBtn.parentNode) {
            logoutBtn.parentNode.insertBefore(parentSwitchBtn, logoutBtn);
          }
        }
      } else if (parentSwitchBtn) {
        parentSwitchBtn.remove();
      }
    }
  }

  if (user.role === 'admin')  renderAdminDashboard(user);
  if (user.role === 'prof')   renderProfDashboard(user);
  if (user.role === 'parent') renderParentDashboard(user);

  // Gestion des notifications Push
  // Sur iOS, requestPermission() DOIT être déclenché par un geste utilisateur explicite.
  // Un setTimeout perd le contexte "user gesture" → on affiche un bouton discret.
  initPushNotificationPrompt();
}

function initPushNotificationPrompt() {
  // Si la permission est déjà accordée, enregistrer silencieusement le token
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    if (window.AUTH && window.AUTH.requestPushNotificationPermission) {
      window.AUTH.requestPushNotificationPermission();
    }
    return;
  }

  // Si refusé définitivement, ne pas afficher le bouton
  if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
    return;
  }

  // Sinon (permission 'default'), afficher un bandeau discret
  const existingBanner = document.getElementById('push-permission-banner');
  if (existingBanner) return; // déjà affiché

  const banner = document.createElement('div');
  banner.id = 'push-permission-banner';
  banner.style.cssText = `
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
    background: #1a1a2e; color: #fff; border-radius: 12px;
    padding: 0.8rem 1.2rem; display: flex; align-items: center; gap: 0.8rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4); z-index: 9999;
    font-size: 0.85rem; max-width: 90vw; border: 1px solid rgba(255,100,100,0.4);
  `;
  banner.innerHTML = `
    <span>🔔</span>
    <span>Activer les notifications pour ne rien manquer</span>
    <button id="btn-enable-push" style="background:#e63946;color:#fff;border:none;border-radius:8px;padding:0.4rem 0.8rem;cursor:pointer;font-size:0.8rem;white-space:nowrap;">Activer</button>
    <button id="btn-dismiss-push" style="background:transparent;color:#aaa;border:none;cursor:pointer;font-size:1.1rem;line-height:1;" title="Fermer">✕</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('btn-enable-push').addEventListener('click', function () {
    // Ce clic est un vrai geste utilisateur → requestPermission() fonctionnera sur iOS
    if (window.AUTH && window.AUTH.requestPushNotificationPermission) {
      window.AUTH.requestPushNotificationPermission();
    }
    banner.remove();
  });

  document.getElementById('btn-dismiss-push').addEventListener('click', function () {
    banner.remove();
  });
}


// ---- TABS ----
function initTabs(tabsContainerId, contentIds) {
  const container = document.getElementById(tabsContainerId);
  if (!container) return;
  container.querySelectorAll('.dash-tab, .btn-tab').forEach((tab, i) => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.dash-tab, .btn-tab').forEach(t => t.classList.remove('active'));
      contentIds.forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); });
        const hoursTab = document.getElementById('tab-admin-hours');
        if (hoursTab) hoursTab.classList.remove('active');
      tab.classList.add('active');
      const target = document.getElementById(contentIds[i]);
              if (target) {
          target.classList.add('active');
          const targetId = contentIds[i];
          if (targetId.includes('messagerie')) {
            const messenger = document.getElementById('global-messenger-container');
            if (messenger) {
              target.appendChild(messenger);
              messenger.style.display = 'flex';
              if (window.loadConversations) window.loadConversations();
            }
          }
        }
    });
  });
}

// =============================================
// DASHBOARD ADMIN
// =============================================
function renderAdminDashboard(user) {
  renderAdminAnnonces();
  document.getElementById('admin-name').textContent = user.name;

  // Stats
  const pending = DATA.getPendingInscriptions();
  document.getElementById('admin-stat-eleves').textContent = DATA.students.length;
  document.getElementById('admin-stat-pending').textContent = pending.length;
  document.getElementById('pending-badge').textContent = pending.length;

  renderAdminInscriptions();
  renderAdminEleves();
  renderAdminProfs();
  renderAdminHours();
  if (typeof renderAdminCourses === 'function') renderAdminCourses();
  if (typeof renderGalaTables === 'function') renderGalaTables(user);
    
    if (typeof renderHolidays === 'function') renderHolidays();
    updateSeasonDisplay();
    if (DATA.settings && DATA.settings.season) {
      if (DATA.settings.season.start) document.getElementById('settings-season-start').value = DATA.settings.season.start;
      if (DATA.settings.season.end) document.getElementById('settings-season-end').value = DATA.settings.season.end;
    }
  }


window.renderAdminHours = function() {
  const tbody = document.getElementById('admin-hours-body');
  if (!tbody) return;
  
  const monthInput = document.getElementById('admin-hours-month');
  if (!monthInput.value) {
    // Default to current month
    const now = new Date();
    monthInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    // Add event listener only once
    monthInput.addEventListener('change', window.renderAdminHours);
  }
  
  const [targetYear, targetMonth] = monthInput.value.split('-');
  
  // Filter DATA.prof_hours for the selected month/year
  // date format is DD/MM/YYYY
  const monthRecords = (DATA.prof_hours || []).filter(r => {
    if (!r.date) return false;
    const parts = r.date.split('/');
    if (parts.length === 3) {
      return parts[1] === targetMonth && parts[2] === targetYear;
    }
    return false;
  });
  
  // Group by Prof
  const profTotals = {};
  monthRecords.forEach(r => {
    if (!profTotals[r.profId]) profTotals[r.profId] = { total: 0, records: [] };
    profTotals[r.profId].total += r.hours || 0;
    profTotals[r.profId].records.push(r);
  });
  
  const profs = DATA.users.filter(u => u.role === 'prof');
  
  if (profs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Aucun professeur trouvé</td></tr>';
    return;
  }
  
  let html = '';
  profs.forEach(p => {
    const pData = profTotals[p.id] || { total: 0, records: [] };
    const profName = p.firstname ? `${p.firstname} ${p.lastname}` : p.name;
      let photoUrl = p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫');
      let avatarHtml = photoUrl.startsWith('http') || photoUrl.startsWith('assets/') ? `<img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : photoUrl;
      const searchName = p.firstname || (p.name ? p.name.split(' ')[0] : '');
    const vitrineProf = window.VITRINE_DATA && window.VITRINE_DATA.professeurs ? window.VITRINE_DATA.professeurs[searchName] : null;
      if (vitrineProf && vitrineProf.avatar) {
          avatarHtml = `<img src="${vitrineProf.avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
      }
    
    // Store records in global for modal access
    window[`prof_records_${p.id}`] = pData.records;
    
    html += `
      <tr>
        <td><strong>${profName}</strong></td>
        <td>${targetMonth}/${targetYear}</td>
        <td><strong style="color: var(--primary);">${pData.total} h</strong></td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openProfHoursDetail('${p.id}', '${profName}', '${targetMonth}/${targetYear}')">Voir détails</button>
        </td>
      </tr>
    `;
  });
  
  tbody.innerHTML = html;
};

window.openProfHoursDetail = function(profId, profName, monthStr) {
  const records = window[`prof_records_${profId}`] || [];
  const list = document.getElementById('hours-detail-list');
  document.getElementById('hours-detail-title').textContent = `Détails - ${profName} (${monthStr})`;
  
  if (records.length === 0) {
    list.innerHTML = '<p>Aucune prestation validée pour ce mois.</p>';
  } else {
    // Sort by date
    records.sort((a, b) => {
      const aDate = a.date.split('/').reverse().join('-');
      const bDate = b.date.split('/').reverse().join('-');
      return aDate.localeCompare(bDate);
    });
    
    let html = '<table class="data-table" style="font-size: 0.9rem;"><thead><tr><th>Date</th><th>Cours</th><th>Heures</th></tr></thead><tbody>';
    records.forEach(r => {
      const c = DATA.getCourseById(r.courseId);
      const cName = c ? c.name : 'Cours inconnu';
      html += `<tr><td>${r.date}</td><td>${cName}</td><td><strong>${r.hours}</strong></td></tr>`;
    });
    html += '</tbody></table>';
    list.innerHTML = html;
  }
  
  window.openModal('modal-hours-detail');
};


window.openAdminHours = function() {
  document.querySelectorAll('#panel-admin .tab-content').forEach(c => c.classList.remove('active'));
  const hoursTab = document.getElementById('tab-admin-hours');
  if (hoursTab) {
    hoursTab.classList.add('active');
    // Ensure renderAdminHours is called so data is loaded
    if (typeof window.renderAdminHours === 'function') {
      window.renderAdminHours();
    }
  }
};

window.closeAdminHours = function() {
  document.querySelectorAll('#panel-admin .tab-content').forEach(c => c.classList.remove('active'));
  const profsTab = document.getElementById('tab-profs');
  if (profsTab) profsTab.classList.add('active');
};

window.exportProfHours = function() {
  const monthInput = document.getElementById('admin-hours-month');
  if (!monthInput || !monthInput.value) return;
  const [targetYear, targetMonth] = monthInput.value.split('-');
  
  const monthRecords = (DATA.prof_hours || []).filter(r => {
    if (!r.date) return false;
    const parts = r.date.split('/');
    if (parts.length === 3) return parts[1] === targetMonth && parts[2] === targetYear;
    return false;
  });
  
  if (monthRecords.length === 0) {
    alert("Aucune donnée à exporter pour ce mois.");
    return;
  }
  
  let csv = "Professeur,Email,Date,Cours,Heures\n";
  monthRecords.forEach(r => {
    const prof = DATA.users.find(u => u.id === r.profId);
    const profName = prof ? (prof.firstname ? `${prof.firstname} ${prof.lastname}` : prof.name) : r.profId;
    const profEmail = prof ? prof.email : '';
    const course = DATA.getCourseById(r.courseId);
    const courseName = course ? course.name.replace(/,/g, '') : 'Cours inconnu'; // avoid comma break
    csv += `"${profName}","${profEmail}","${r.date}","${courseName}",${r.hours}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `heures_profs_${targetYear}_${targetMonth}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function renderAdminInscriptions() {
  const list = document.getElementById('admin-inscription-list');
  const filterSelect = document.getElementById('admin-inscriptions-filter');
  const filter = filterSelect ? filterSelect.value : 'pending';
  list.innerHTML = '';
  
  const filtered = DATA.inscriptions.filter(ins => filter === 'all' || ins.status === filter);
  
  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📄</div><p>Aucune inscription</p></div>';
    return;
  }
  
  filtered.forEach(ins => {
    const card = document.createElement('div');
    card.className = 'inscription-card';
    card.id = `ins-card-${ins.id}`;
    const pillClass = { pending: 'pill-pending', approved: 'pill-approved', rejected: 'pill-rejected' }[ins.status];
    const pillLabel = { pending: '⏳ En attente', approved: '✅ Acceptée', rejected: '❌ Refusée' }[ins.status];
    const disabled = ins.status !== 'pending' ? 'style="opacity:0.4;pointer-events:none;"' : '';
    card.innerHTML = `
      <div class="inscription-card-header">
        <div>
          <div class="inscription-child">🩰 ${ins.childName} <span style="font-size:0.8rem;font-weight:400;color:var(--text-muted)">(${ins.age} ans)</span></div>
          <div class="inscription-date">Reçue le ${ins.date}</div>
        </div>
        <span class="status-pill ${pillClass}">${pillLabel}</span>
      </div>
      <div class="inscription-details">
        <div class="inscription-detail"><strong>Parent :</strong> ${ins.parentName}</div>
        <div class="inscription-detail"><strong>Email :</strong> ${ins.email}</div>
        <div class="inscription-detail"><strong>Tél :</strong> ${ins.phone}</div>
        <div class="inscription-detail"><strong>Cours :</strong> ${ins.courses.join(', ')}</div>
        <div class="inscription-detail"><strong>Niveau :</strong> ${ins.level}</div>
      </div>
      ${ins.message ? `<div class="inscription-message">"${ins.message}"</div>` : ''}
      <div class="inscription-actions" id="actions-${ins.id}">
        <button class="btn-approve" onclick="adminApprove('${ins.id}')" ${disabled}>✓ Accepter</button>
        <button class="btn-reject"  onclick="adminReject('${ins.id}')"  ${disabled}>✗ Refuser</button>
        <a href="mailto:${ins.email}" class="btn btn-outline btn-sm">✉️ Contacter</a>
      </div>`;
    list.appendChild(card);
  });
}

async function adminApprove(id) {
  const btn = document.querySelector(`#actions-${id} .btn-approve`);
  if(btn) { btn.disabled = true; btn.textContent = 'Création...'; }

  const ins = DATA.inscriptions.find(i => String(i.id) === String(id));
  if (!ins) return;

  try {
    const { doc, getDoc, setDoc, db } = await import('./firebase-config.js');
    const emailKey = ins.email.toLowerCase().trim();
    const userRefCheck = doc(db, "users", emailKey);
    const userSnapCheck = await getDoc(userRefCheck);
    
    let isNewParent = false;
    const tempPassword = Math.random().toString(36).slice(-8);

    if (!userSnapCheck.exists()) {
      const created = await AUTH.createParentAccount(emailKey, tempPassword, ins.parentName);
      if (!created) {
        console.warn("Auth user already exists, creating missing Firestore document.");
        await setDoc(userRefCheck, {
           email: emailKey,
           name: ins.parentName,
           role: "parent",
           childrenIds: []
        });
      } else {
        isNewParent = true;
      }
    }

    // Create the student in Firestore
    const studentId = "stu_" + Date.now();
    const [firstname, ...lastnameParts] = ins.childName.split(' ');

    const courseIds = [];
    if (ins.courses) {
        for (const courseName of ins.courses) {
            const courseObj = DATA.courses.find(c => c.name === courseName || courseName.includes(c.name));
            if (courseObj) courseIds.push(courseObj.id);
        }
    }

    const studentData = {
      firstname: firstname || ins.childName,
      lastname: lastnameParts.join(' '),
      age: parseInt(ins.age, 10) || 0,
      contactEmail: emailKey,
      courseIds: courseIds,
      parentId: emailKey,
      cotisation: 'en attente',
      mutuelle: 'attente',
      absences: [],
      avatar: `https://i.pravatar.cc/150?u=${studentId}`
    };

    await setDoc(doc(db, "students", studentId), studentData);
    DATA.students.push({ id: studentId, ...studentData });

    const userRef = doc(db, "users", emailKey);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const children = userData.childrenIds || [];
      if (!children.includes(studentId)) {
        await setDoc(userRef, { childrenIds: [...children, studentId] }, { merge: true });
      }
    }

    if (isNewParent) {
      try {
        await emailjs.send(
          "service_ADK",
          "template_ADK_Compte",
          {
            to_email: emailKey,
            to_name: ins.parentName,
            temp_password: tempPassword,
            login_link: window.location.href.split('?')[0]
          }
        );
        showToast('✓ Inscription acceptée et email envoyé !', 'success');
      } catch (emailError) {
        console.error("Erreur EmailJS:", emailError);
        alert(`⚠️ Le compte parent a été créé mais l'email n'a pas pu être envoyé.\nMot de passe temporaire: ${tempPassword}`);
      }
    } else {
      showToast('✓ Inscription acceptée, enfant ajouté au compte existant !', 'success');
    }

    await DATA.approveInscription(id);
    renderAdminInscriptions();
    document.getElementById('admin-stat-pending').textContent = DATA.getPendingInscriptions().length;
    document.getElementById('pending-badge').textContent = DATA.getPendingInscriptions().length;

  } catch(e) {
    console.error(e);
    alert("Erreur lors de l'approbation.");
    if(btn) { btn.disabled = false; btn.textContent = '✓ Accepter'; }
  }
}

async function adminReject(id) {
  const btn = document.querySelector(`#actions-${id} .btn-outline`);
  if(btn) { btn.disabled = true; btn.textContent = 'Suppression...'; }
  await DATA.rejectInscription(id);
  renderAdminInscriptions();
  document.getElementById('admin-stat-pending').textContent = DATA.getPendingInscriptions().length;
  document.getElementById('pending-badge').textContent = DATA.getPendingInscriptions().length;
  showToast('❌ Inscription refusée et supprimée', 'error');
}

function renderAdminEleves() {
  const tbody = document.getElementById('admin-eleves-body');
  const filterSelect = document.getElementById('admin-eleves-filter');
  
  if (filterSelect && filterSelect.options.length <= 1) {
    DATA.courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      filterSelect.appendChild(opt);
    });
  }

  const filterValue = filterSelect ? filterSelect.value : 'all';
  const filteredStudents = filterValue === 'all' 
    ? DATA.students 
    : DATA.students.filter(s => s.courseIds && (s.courseIds.includes(filterValue) || s.courseIds.includes(Number(filterValue))));

  tbody.innerHTML = filteredStudents.map(s => {
    const courses = s.courseIds.map(id => DATA.getCourseById(id)?.name || '').filter(Boolean).join(', ');
        const cotStatus = s.cotisation || 'en attente';
    const cotClass = cotStatus === 'payee_cash' || cotStatus === 'payee_compte' ? 'select-remis' : 'select-attente';
    const cotSelect = `
      <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem; background-color: ${cotStatus === 'en attente' ? '#ffeeba' : ''};">
        <option value="en attente" ${cotStatus === 'en attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="payee_cash" ${cotStatus === 'payee_cash' ? 'selected' : ''}>💶 Payée cash</option>
        <option value="payee_compte" ${cotStatus === 'payee_compte' ? 'selected' : ''}>💳 Payée compte</option>
      </select>
    `;
    const cotDateSelect = `
      <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem 0.7rem; font-size:0.8rem; border-radius:50px; border:1px solid #ccc; box-sizing: border-box; min-width: 120px; outline:none;">
    `;

        const mutStatus = s.mutuelle || 'masque';
    const mutClass = mutStatus === 'remis' ? 'select-remis' : (mutStatus === 'en_cours' ? 'select-encours' : 'select-masque');
    const mutSelect = `
      <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem; background-color: ${mutStatus === 'masque' ? '#e0e0e0' : ''};">
        <option value="masque" ${mutStatus === 'masque' ? 'selected' : ''}>Masqué</option>
        <option value="en_cours" ${mutStatus === 'en_cours' ? 'selected' : ''}>🏃 En cours</option>
        <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✅ Remis</option>
      </select>
    `;
    
    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${s.firstname} ${s.lastname} <span style="color: var(--text-muted); font-size: 0.9rem; font-weight: normal;">(${s.age} ans)</span></h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📚 Cours suivis :</strong> ${courses || '-'}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; background: rgba(0,0,0,0.02); padding: 0.8rem; border-radius: var(--radius);">
          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
            ${cotSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Date paiement</span>
            ${cotDateSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
            ${mutSelect}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('${s.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteStudent('${s.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}

  window.updateCotisation = async function(studentId, value) {
    try {
      const student = DATA.getStudentById(studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.cotisation = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', String(studentId)), { cotisation: value });
      
      const user = window.AUTH && window.AUTH.currentUser;
      if (user && user.role === 'prof' && window.renderProfEleves) {
        window.renderProfEleves();
      } else if (window.renderAdminEleves) {
        window.renderAdminEleves();
      }
    } catch (e) {
      alert("Erreur Cotisation: " + e.message);
    }
  };

  window.updateCotisationDate = async function(studentId, date) {
    try {
      const student = DATA.getStudentById(studentId);
      if (!student) return;
      student.cotisationDate = date;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', String(studentId)), { cotisationDate: date });
    } catch (e) {
      console.error(e);
    }
  };

  window.updateMutuelle = async function(studentId, value) {
    try {
      const student = DATA.getStudentById(studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.mutuelle = value;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', String(studentId)), { mutuelle: value });
      
      const user = window.AUTH && window.AUTH.currentUser;
      if (user && user.role === 'prof' && window.renderProfEleves) {
        window.renderProfEleves();
      } else if (window.renderAdminEleves) {
        window.renderAdminEleves();
      }
    } catch (e) {
      alert("Erreur Mutuelle: " + e.message);
    }
  };

function renderAdminProfs() {
  const tbody = document.getElementById('admin-profs-body');
  const profs = DATA.users.filter(u => u.role === 'prof');
  tbody.innerHTML = profs.map(p => {
    const searchName = p.firstname || (p.name ? p.name.split(' ')[0] : '');
    const fullName = PROF_FULL_NAMES[searchName] || (p.firstname ? p.firstname + ' ' + p.lastname : p.name);
    
    // Check if they exist in DATA.students to link
    const studentMatch = DATA.students.find(s => s.firstname === searchName || (s.firstname + ' ' + s.lastname) === fullName || s.name === fullName);
    const studentBadge = studentMatch ? `<br><span class="badge badge-parent" style="font-size:0.6rem; padding:0.1rem 0.3rem;">Élève lié</span>` : '';
    
    const taughtCourses = DATA.courses.filter(c => c.prof && (c.prof.includes(p.name) || c.prof.includes(fullName) || c.prof.includes(searchName)));
    const coursesNames = taughtCourses.map(c => c.name).join(', ');
    const allStudentIds = new Set();
    taughtCourses.forEach(c => {
      DATA.getStudentsByCourse(c.id).forEach(s => allStudentIds.add(s.id));
    });
    const nbEleves = allStudentIds.size;
    const vitrineProf = window.VITRINE_DATA && window.VITRINE_DATA.professeurs ? window.VITRINE_DATA.professeurs[searchName] : null;
    let photoUrl = p.avatar || (p.gender === 'Féminin' ? '👩‍🏫' : '👨‍🏫');
    let avatarHtml = (photoUrl.startsWith('http') || photoUrl.startsWith('assets/')) ? `<img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : photoUrl;
    if (vitrineProf && vitrineProf.avatar) {
        avatarHtml = `<img src="${vitrineProf.avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    }
    
    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background-color: #f5e6e6; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; overflow: hidden;">${avatarHtml}</div>
              <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</h4>
            </div>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>💃 Cours enseignés :</strong> ${coursesNames || '-'}</div>
        
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👥 Total élèves :</strong> ${nbEleves}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddProfModal('${p.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteProf('${p.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}

window.openAddProfModal = function(id = null) {
  document.getElementById('form-add-prof').reset();
  document.getElementById('prof-tutor-section').style.display = 'none';
  const titleEl = document.getElementById('prof-modal-title');
  const taughtContainer = document.getElementById('add-prof-taught-courses');
  
  if (taughtContainer) {
    taughtContainer.innerHTML = DATA.courses.map(c => `
      <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
        <input type="checkbox" class="prof-taught-checkbox" value="${c.id}">
        ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
      </label>
    `).join('');
  }

  if (id) {
    titleEl.textContent = "Modifier le professeur";
    const p = DATA.users.find(u => u.id === id);
    if (p) {
      document.getElementById('prof-id').value = p.id;
      document.getElementById('prof-firstname').value = p.firstname || p.name || '';
      document.getElementById('prof-lastname').value = p.lastname || '';
      document.getElementById('prof-dob').value = p.dob || '';
      document.getElementById('prof-email').value = p.email || p.id;
      document.getElementById('prof-phone').value = p.phone || '';
      
      if (p.tutorFirstname || p.tutorLastname) {
        document.getElementById('prof-has-tutor').checked = true;
        document.getElementById('prof-tutor-section').style.display = 'block';
        document.getElementById('prof-tutor-firstname').value = p.tutorFirstname || '';
        document.getElementById('prof-tutor-lastname').value = p.tutorLastname || '';
        document.getElementById('prof-tutor-email').value = p.tutorEmail || '';
        document.getElementById('prof-tutor-phone').value = p.tutorPhone || '';
      }
      
      if (taughtContainer) {
        taughtContainer.querySelectorAll('.prof-taught-checkbox').forEach(cb => {
          const c = DATA.getCourseById(cb.value);
          const profFullName = p.firstname ? `${p.firstname} ${p.lastname}` : p.name;
          if (c && c.prof && c.prof.includes(profFullName)) {
            cb.checked = true;
          }
        });
      }
    }
  } else {
    titleEl.textContent = "Nouveau professeur";
    document.getElementById('prof-id').value = '';
  }
  
  openModal('modal-add-prof');
};

window.saveProf = async function() {
  const btn = document.querySelector('#form-add-prof button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Sauvegarde...";
  btn.disabled = true;

  try {
    const id = document.getElementById('prof-id').value;
    const firstname = document.getElementById('prof-firstname').value;
    const lastname = document.getElementById('prof-lastname').value;
    const dob = document.getElementById('prof-dob').value;
    let email = document.getElementById('prof-email').value;
    email = email.toLowerCase().trim();
    const phone = document.getElementById('prof-phone').value;
    
    const hasTutor = document.getElementById('prof-has-tutor').checked;
    const tutorFirstname = document.getElementById('prof-tutor-firstname').value;
    const tutorLastname = document.getElementById('prof-tutor-lastname').value;
    const tutorEmail = document.getElementById('prof-tutor-email').value;
    const tutorPhone = document.getElementById('prof-tutor-phone').value;

    const fullName = `${firstname} ${lastname}`.trim();
    
    let selectedTaughtIds = [];
    const taughtContainer = document.getElementById('add-prof-taught-courses');
    if (taughtContainer) {
      const checkboxes = taughtContainer.querySelectorAll('.prof-taught-checkbox');
      checkboxes.forEach(cb => {
        if (cb.checked) selectedTaughtIds.push(cb.value);
      });
    }

    const profData = {
      role: 'prof',
      firstname,
      lastname,
      name: fullName,
      dob,
      email,
      phone,
      hasTutor,
      tutorFirstname: hasTutor ? tutorFirstname : '',
      tutorLastname: hasTutor ? tutorLastname : '',
      tutorEmail: hasTutor ? tutorEmail : '',
      tutorPhone: hasTutor ? tutorPhone : '',
      avatar: '👩‍🏫'
    };

    const firebase = await import('./firebase-config.js');

    let targetId = id ? id : email;
    let oldDummyDoc = false;

    // Si on édite un compte dummy (@adk.local) avec un vrai email
    if (id && id.includes('@adk.local') && email !== id && !email.includes('@adk.local')) {
      oldDummyDoc = true;
      targetId = email; // On utilise le nouvel email comme ID
    }
    
    let isNewUser = false;
    let tempPassword = null;
    const userRef = firebase.doc(firebase.db, 'users', targetId);
    
    // On crée l'auth pour un nouveau prof ou un prof dummy migré
    if (!id || oldDummyDoc) {
      const userSnap = await firebase.getDoc(userRef);
      if (userSnap.exists()) {
        const existingRole = userSnap.data().role;
        if (existingRole === 'admin') {
          profData.role = 'admin'; // preserve admin role
        } else if (existingRole === 'parent') {
          profData.role = 'prof'; // Upgrade parent to prof
        }
      } else {
        isNewUser = true;
        tempPassword = Math.random().toString(36).slice(-8);
        try {
          const apiKey = firebase.firebaseConfig.apiKey;
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: targetId, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) {
            if (data.error.message === 'EMAIL_EXISTS') {
              isNewUser = false; // Le compte existe déjà, on n'envoie pas de nouveau mot de passe
            } else {
              throw new Error(data.error.message);
            }
          }
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
      }
    }

    // Update in Firebase users collection
    await firebase.setDoc(userRef, profData, { merge: true });

    if (oldDummyDoc) {
      await firebase.deleteDoc(firebase.doc(firebase.db, 'users', id));
      DATA.users = DATA.users.filter(u => u.id !== id);
    }

    // Update local DATA
    let prof = DATA.users.find(u => u.id === targetId);
    if (!prof) {
      prof = { id: targetId, ...profData };
      DATA.users.push(prof);
    } else {
      Object.assign(prof, profData);
    }
    
    if (isNewUser && tempPassword) {
      try {
        await emailjs.send(
          "service_ADK",
          "template_ADK_Compte",
          {
            to_email: targetId,
            to_name: fullName,
            temp_password: tempPassword,
            login_link: "https://liolux21.github.io/ecole-danse-adk-dev/portail.html"
          }
        );
      } catch(e) {
        console.error("Erreur email:", e);
      }
    }

    // Update courses prof string
    for (let c of DATA.courses) {
      let profChanged = false;
      let newProfString = c.prof || '';
      
      if (selectedTaughtIds.includes(String(c.id))) {
        if (!newProfString) {
          newProfString = fullName;
          profChanged = true;
        } else if (!newProfString.includes(fullName)) {
          newProfString = newProfString + ' - ' + fullName;
          profChanged = true;
        }
      } else {
        if (newProfString && newProfString.includes(fullName)) {
          newProfString = newProfString.split('-').map(p => p.trim()).filter(p => p !== fullName).join(' - ');
          profChanged = true;
        }
      }
      
      if (profChanged) {
        c.prof = newProfString;
        try {
          const targetDocId = c.docId || String(c.id);
          await firebase.updateDoc(firebase.doc(firebase.db, 'courses', targetDocId), { prof: c.prof });
        } catch (e) {
          console.warn("Could not update course in Firebase: ", c.id, e);
        }
      }
    }

    closeModal('modal-add-prof');
    renderAdminProfs();
  } catch (err) {
    console.error(err);
    alert("Erreur: " + err.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};

window.deleteProf = async function(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce professeur ?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        DATA.users = DATA.users.filter(u => u.id !== id);
        renderAdminProfs();
        showToast("Professeur supprimé avec succès", "success");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression : " + err.message);
      }
    }
  };

window.renderAdminCourses = function() {
  const tbody = document.getElementById('admin-courses-tbody');
  if (!tbody) return;
  
  const typeFilter = document.getElementById('filter-course-type') ? document.getElementById('filter-course-type').value : 'all';
  const styleFilter = document.getElementById('filter-course-style') ? document.getElementById('filter-course-style').value : 'all';
  
  let courses = DATA.courses || [];
  if (typeFilter !== 'all') {
     courses = courses.filter(c => (c.eventType || 'regulier') === typeFilter);
  }
  if (styleFilter !== 'all') {
     courses = courses.filter(c => c.style === styleFilter);
  }

  if (courses.length === 0) {
    tbody.innerHTML = '<div class="empty-state">Aucun cours ne correspond aux filtres.</div>';
    return;
  }
  
  tbody.innerHTML = courses.map(c => {
    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${c.emoji || '💃'} ${c.name}</h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👤 Professeur :</strong> ${c.prof}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📅 Horaire :</strong> ${c.schedule || "Non défini"}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>🎂 Âge :</strong> ${c.ages || "Non défini"}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddCourseModal('${c.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteCourse('${c.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
};

window.deleteCourse = async function(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
    const firebase = await import('./firebase-config.js');
    const course = DATA.getCourseById(id);
    const targetDocId = (course && course.docId) ? course.docId : String(id);
    await firebase.deleteDoc(firebase.doc(firebase.db, "courses", targetDocId));
    DATA.courses = DATA.courses.filter(c => String(c.id) !== String(id));
    renderAdminCourses();
  }
};

window.renderHolidays = function() {
    const list = document.getElementById('settings-holidays-list');
    if (!list) return;
    if (!DATA.settings || !DATA.settings.holidays || DATA.settings.holidays.length === 0) {
        list.innerHTML = '<div class="empty-state">Aucun congé enregistré.</div>';
        return;
    }
    
    function formatDateFR(dateStr) {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    list.innerHTML = DATA.settings.holidays.map((h, index) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; border-bottom: 1px solid var(--border-color); background: #fdfdfd; border-radius: var(--radius); margin-bottom: 0.5rem;">
            <div>
                <strong style="color: #9C5858;">${h.name}</strong><br>
                <small style="color: var(--text-muted);">Du ${formatDateFR(h.start)} au ${formatDateFR(h.end)}</small>
            </div>
            <div style="display:flex; gap:0.5rem;">
                <button class="btn btn-outline btn-sm" onclick="editHoliday(${index})">Modifier</button>
                <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteHoliday(${index})">Supprimer</button>
            </div>
        </div>
    `).join('');
};

window.addHoliday = async function() {
    const name = document.getElementById('new-holiday-name').value;
    const start = document.getElementById('new-holiday-start').value;
    const end = document.getElementById('new-holiday-end').value;
    if (!name || !start || !end) {
        showToast("Veuillez remplir tous les champs du congé.", "error");
        return;
    }
    
    if (!DATA.settings) DATA.settings = {};
    if (!DATA.settings.holidays) DATA.settings.holidays = [];
    DATA.settings.holidays.push({ name, start, end });
    
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        
        document.getElementById('new-holiday-name').value = '';
        document.getElementById('new-holiday-start').value = '';
        document.getElementById('new-holiday-end').value = '';
        
        renderHolidays();
        showToast("Congé ajouté avec succès", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de l'ajout", "error");
    }
};

window.editHoliday = function(index) {
    const h = DATA.settings.holidays[index];
    if (!h) return;
    document.getElementById('new-holiday-name').value = h.name;
    document.getElementById('new-holiday-start').value = h.start;
    document.getElementById('new-holiday-end').value = h.end;
    DATA.settings.holidays.splice(index, 1);
    renderHolidays();
    document.getElementById('new-holiday-name').focus();
    showToast("Modifiez les infos puis cliquez sur Sauvegarder", "info");
};

window.deleteHoliday = async function(index) {
    if(!confirm("Voulez-vous vraiment supprimer ce congé ?")) return;
    DATA.settings.holidays.splice(index, 1);
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        renderHolidays();
        showToast("Congé supprimé", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de la suppression", "error");
    }
};

function updateSeasonDisplay() {
    if (DATA.settings && DATA.settings.season && DATA.settings.season.start && DATA.settings.season.end) {
        const p1 = DATA.settings.season.start.split('-');
        const p2 = DATA.settings.season.end.split('-');
        const s = `${p1[2]}/${p1[1]}/${p1[0]}`;
        const e = `${p2[2]}/${p2[1]}/${p2[0]}`;
        const span = document.getElementById('season-display');
        if (span) span.textContent = `(Enregistré : du ${s} au ${e})`;
    }
}

window.saveSeasonSettings = async function() {
    const start = document.getElementById('settings-season-start').value;
    const end = document.getElementById('settings-season-end').value;
    
    if (!DATA.settings) DATA.settings = { holidays: [] };
    DATA.settings.season = { start, end };
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
        updateSeasonDisplay();
        showToast("Saison enregistrée avec succès !", "success");
    } catch(err) {
        console.error(err);
        showToast("Erreur lors de l'enregistrement", "error");
    }
};



// =============================================
// GALA ADMIN
// =============================================
if (!DATA.galaRepets) DATA.galaRepets = [];
if (!DATA.galaTenues) DATA.galaTenues = [];
if (!DATA.galaInfos) DATA.galaInfos = [];
if (!DATA.galaNotes) DATA.galaNotes = [];
window.saveGalaToFirebase = async function() {
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'gala'), {
      repets: DATA.galaRepets || [],
      infos: DATA.galaInfos || [],
      notes: DATA.galaNotes || []
    }, { merge: true });
  } catch(err) {
    console.error("Gala save error", err);
    showToast("Erreur de sauvegarde Gala", "error");
  }
};


window.renderGalaTables = function(userCtx) {
  // === ADMIN GALA ===
  const htmlRepAdmin = DATA.galaRepets.length === 0 
    ? '<tr class="empty-state"><td colspan="5">Aucune répétition planifiée.</td></tr>'
    : DATA.galaRepets.map(r => {
        const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
        return `<tr>
          <td>${r.date} à ${r.time}</td>
          <td>${courseName}</td>
          <td>${formatLieu(r.lieu)}</td>
          <td>${r.tenue ? 'Oui' : 'Non'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaRep('${r.id}')">X</button></td>
        </tr>`;
      }).join('');
  const repBody = document.getElementById('admin-gala-rep-body');
  if (repBody) repBody.innerHTML = htmlRepAdmin;

  const htmlInfoAdmin = DATA.galaInfos.length === 0 
    ? '<tr class="empty-state"><td colspan="5">Aucune info tableau.</td></tr>'
    : DATA.galaInfos.map(i => {
        const courseName = DATA.getCourseById(i.course)?.name || i.course;
        return `<tr>
          <td>${courseName}</td>
          <td>${i.theme}</td>
          <td>${i.music || '-'}</td>
          <td>${i.tenue || '-'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaInfo('${i.id}')">X</button></td>
        </tr>`;
      }).join('');
  const infoBody = document.getElementById('admin-gala-info-body');
  if (infoBody) infoBody.innerHTML = htmlInfoAdmin;

  const htmlNoteAdmin = DATA.galaNotes.length === 0 
    ? '<tr class="empty-state"><td colspan="3">Aucune note de réunion.</td></tr>'
    : DATA.galaNotes.map(n => {
        return `<tr>
          <td>${n.date}</td>
          <td>${(n.presents || []).join(', ')}</td>
          <td style="display:flex;gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="viewGalaNote('${n.id}')">👀 Voir</button>
            <button class="btn btn-outline btn-sm" onclick="editGalaNote('${n.id}')">Modifier</button>
            <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaNote('${n.id}')">X</button>
          </td>
        </tr>`;
      }).join('');
  const noteBody = document.getElementById('admin-gala-note-body');
  if (noteBody) noteBody.innerHTML = htmlNoteAdmin;

  // Determine user context for Prof / Parent filtering
  const user = userCtx || window.AUTH.currentUser;
  if (!user) return;

  // === PROF GALA ===
  if (user.role === 'prof' || user.role === 'admin') {
    let profCourseIds = [];
    if (user.realRole === 'admin' || user.role === 'admin') {
       profCourseIds = DATA.courses.map(c => String(c.id));
    } else {
       profCourseIds = DATA.courses.filter(c => c.prof && (c.prof.includes(user.name) || (user.firstname && c.prof.includes(user.firstname)))).map(c => String(c.id));
    }

    const profRepets = DATA.galaRepets.filter(r => r.course === 'all' || profCourseIds.includes(String(r.course)));
    const htmlRepProf = profRepets.length === 0 
      ? '<tr class="empty-state"><td colspan="5">Aucune répétition planifiée.</td></tr>'
      : profRepets.map(r => {
          const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
          return `<tr>
            <td>${r.date} à ${r.time}</td>
            <td>${courseName}</td>
            <td>${formatLieu(r.lieu)}</td>
            <td>${r.tenue ? 'Oui' : 'Non'}</td>
            <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaRep('${r.id}')">X</button></td>
          </tr>`;
        }).join('');
    const profRepBody = document.getElementById('prof-gala-rep-body');
    if (profRepBody) profRepBody.innerHTML = htmlRepProf;

    const profInfos = DATA.galaInfos.filter(i => profCourseIds.includes(String(i.course)));
    const htmlInfoProf = profInfos.length === 0 
      ? '<tr class="empty-state"><td colspan="5">Aucune info tableau.</td></tr>'
      : profInfos.map(i => {
          const courseName = DATA.getCourseById(i.course)?.name || i.course;
          return `<tr>
            <td>${courseName}</td>
            <td>${i.theme}</td>
            <td>${i.music || '-'}</td>
            <td>${i.tenue || '-'}</td>
            <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaInfo('${i.id}')">X</button></td>
          </tr>`;
        }).join('');
    const profInfoBody = document.getElementById('prof-gala-info-body');
    if (profInfoBody) profInfoBody.innerHTML = htmlInfoProf;
    
    // Notes
    const profNoteBody = document.getElementById('prof-gala-note-body');
    if (profNoteBody) profNoteBody.innerHTML = htmlNoteAdmin; // Profs see all notes
  }

  // === PARENT GALA ===
  if (user.role === 'parent' || user.role === 'eleve' || user.role === 'student' || user.role === 'admin') {
    let parentCourseIds = [];
    if (user.realRole === 'admin' || user.role === 'admin') {
       parentCourseIds = DATA.courses.map(c => String(c.id));
    } else {
       const children = DATA.students.filter(s => (user.childrenIds || []).includes(s.id));
       children.forEach(ch => {
         if (ch.courseIds) {
           ch.courseIds.forEach(cid => {
             if (!parentCourseIds.includes(String(cid))) parentCourseIds.push(String(cid));
           });
         }
       });
    }

    const parentRepets = DATA.galaRepets.filter(r => r.course === 'all' || parentCourseIds.includes(String(r.course)));
    
    const parentRepetsContainer = document.getElementById('tab-parent-gala-repets');
    if (parentRepetsContainer) {
       if (parentRepets.length === 0) {
         parentRepetsContainer.innerHTML = '<div class="empty-state"><p>Aucune répétition planifiée.</p></div>';
       } else {
         parentRepetsContainer.innerHTML = parentRepets.map(r => {
           const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
           return `
             <div style="background:#ffffff; border:1px solid var(--border); border-radius:8px; padding:1.25rem; margin-bottom:1rem;">
               <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">${r.date} à ${r.time}</h4>
               <p style="margin:0 0 0.2rem 0;"><strong>Cours concerné :</strong> ${courseName}</p>
               <p style="margin:0 0 0.2rem 0;"><strong>Lieu :</strong> ${formatLieu(r.lieu)}</p>
               <p style="margin:0; color:var(--text-light); font-size:0.9rem;">${r.msg || 'Pas de message supplémentaire.'}</p>
             </div>
           `;
         }).join('');
       }
    }

    const parentTenuesContainer = document.getElementById('tab-parent-gala-tenues');
    if (parentTenuesContainer) {
       // Tenues are from galaInfos and galaTenues
       const parentInfos = DATA.galaInfos.filter(i => parentCourseIds.includes(String(i.course)));
       const parentTenues = DATA.galaTenues.filter(t => parentCourseIds.includes(String(t.course)));
       
       if (parentInfos.length === 0 && parentTenues.length === 0) {
          parentTenuesContainer.innerHTML = '<div class="empty-state"><p>Aucune information de tenue pour le moment.</p></div>';
       } else {
          let html = '';
          parentInfos.forEach(i => {
             const c = DATA.getCourseById(i.course);
             html += `
               <div style="background:#ffffff; border:1px solid var(--border); border-radius:8px; padding:1.25rem; margin-bottom:1rem;">
                 <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">Tableau : ${i.theme} (${c?.name})</h4>
                 <p style="margin:0 0 0.2rem 0;"><strong>Tenue prévue :</strong> ${i.tenue || 'Non définie'}</p>
                 <p style="margin:0; color:var(--text-light); font-size:0.9rem;">Musique : ${i.music || '-'}</p>
               </div>
             `;
          });
          parentTenues.forEach(t => {
             const c = DATA.getCourseById(t.course);
             html += `
               <div style="background:#ffffff; border:1px solid var(--border); border-radius:8px; padding:1.25rem; margin-bottom:1rem;">
                 <h4 style="margin:0 0 0.5rem 0; color:var(--primary); font-size:1.1rem;">Tenue demandée (${c?.name})</h4>
                 <p style="margin:0; white-space:pre-wrap;">${t.desc}</p>
               </div>
             `;
          });
          parentTenuesContainer.innerHTML = html;
       }
    }
  }
};

window.initGalaRepModal = function() {
  const select = document.getElementById('gala-rep-course');
  select.innerHTML = '<option value="all">Tous les élèves</option>' + DATA.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
};
window.saveGalaRep = async function() {
  DATA.galaRepets.push({
    id: 'rep_' + Date.now(),
    date: document.getElementById('gala-rep-date').value,
    time: document.getElementById('gala-rep-time').value,
    course: document.getElementById('gala-rep-course').value,
    lieu: document.getElementById('gala-rep-lieu').value,
    tenue: document.getElementById('gala-rep-tenue').checked,
    msg: document.getElementById('gala-rep-msg').value
  });
  closeModal('modal-gala-rep');
  renderGalaTables();
  await window.saveGalaToFirebase();
};
window.deleteGalaRep = async function(id) {
  DATA.galaRepets = DATA.galaRepets.filter(r => r.id !== id);
  renderGalaTables();
  await window.saveGalaToFirebase();
};

window.initGalaTenueModal = function() {
  const select = document.getElementById('gala-tenue-course');
  select.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
};
window.saveGalaTenue = function() {
  DATA.galaTenues.push({
    id: 'tenue_' + Date.now(),
    course: document.getElementById('gala-tenue-course').value,
    desc: document.getElementById('gala-tenue-desc').value
  });
  closeModal('modal-gala-tenue');
  renderGalaTables();
};
window.deleteGalaTenue = function(id) {
  DATA.galaTenues = DATA.galaTenues.filter(r => r.id !== id);
  renderGalaTables();
};

window.initGalaInfoModal = function() {
  const select = document.getElementById('gala-info-course');
  select.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  
  const selectTheme = document.getElementById('gala-info-theme');
  if (DATA.settings && DATA.settings.galaThemes) {
    selectTheme.innerHTML = DATA.settings.galaThemes.map(t => `<option value="${t}">${t}</option>`).join('');
  } else {
    selectTheme.innerHTML = '';
  }
};
window.saveGalaInfo = async function() {
  DATA.galaInfos.push({
    id: 'info_' + Date.now(),
    course: document.getElementById('gala-info-course').value,
    theme: document.getElementById('gala-info-theme').value,
    music: document.getElementById('gala-info-music').value,
    tenue: document.getElementById('gala-info-tenue').value
  });
  closeModal('modal-gala-info');
  renderGalaTables();
  await window.saveGalaToFirebase();
};
window.deleteGalaInfo = async function(id) {
  DATA.galaInfos = DATA.galaInfos.filter(r => r.id !== id);
  renderGalaTables();
  await window.saveGalaToFirebase();
};

window.initGalaNoteModal = function() {
  document.getElementById('gala-note-id').value = '';
  document.getElementById('gala-note-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('gala-note-pv').value = '';
  const div = document.getElementById('gala-note-presence');
  const profs = DATA.users.filter(u => u.role === 'prof');
  div.innerHTML = profs.map(p => `<div style="display:flex;gap:0.5rem;"><input type="checkbox" id="pres_${p.id}" value="${p.firstname ? p.firstname + ' ' + p.lastname : p.name}"><label for="pres_${p.id}">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</label></div>`).join('');
};
window.editGalaNote = function(id) {
  const note = DATA.galaNotes.find(n => n.id === id);
  if (!note) return;
  document.getElementById('gala-note-id').value = note.id;
  document.getElementById('gala-note-date').value = note.date;
  document.getElementById('gala-note-pv').value = note.pv;
  const div = document.getElementById('gala-note-presence');
  const profs = DATA.users.filter(u => u.role === 'prof');
  div.innerHTML = profs.map(p => `<div style="display:flex;gap:0.5rem;"><input type="checkbox" id="pres_${p.id}" value="${p.firstname ? p.firstname + ' ' + p.lastname : p.name}" ${note.presents.includes(p.name) ? 'checked' : ''}><label for="pres_${p.id}">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</label></div>`).join('');
  openModal('modal-gala-note');
};
window.saveGalaNote = async function() {
  const id = document.getElementById('gala-note-id').value;
  const date = document.getElementById('gala-note-date').value;
  const pv = document.getElementById('gala-note-pv').value;
  const presents = [];
  document.querySelectorAll('#gala-note-presence input:checked').forEach(el => presents.push(el.value));

  if (id) {
    const note = DATA.galaNotes.find(n => n.id === id);
    if (note) { note.date = date; note.pv = pv; note.presents = presents; }
  } else {
    DATA.galaNotes.push({
      id: 'note_' + Date.now(),
      date: date,
      pv: pv,
      presents: presents
    });
  }
  closeModal('modal-gala-note');
  renderGalaTables();
  await window.saveGalaToFirebase();
};
window.deleteGalaNote = async function(id) {
  DATA.galaNotes = DATA.galaNotes.filter(r => r.id !== id);
  renderGalaTables();
  await window.saveGalaToFirebase();
};

// =============================================
// DASHBOARD PROF
// =============================================
function renderProfDashboard(user) {
  renderUserAnnonces('prof', user);
  document.getElementById('prof-name').textContent = user.name;
    const searchName = user.firstname || (user.name ? user.name.split(' ')[0] : '');
    const fullName = PROF_FULL_NAMES[searchName] || (user.firstname ? user.firstname + ' ' + user.lastname : user.name);
    document.getElementById('prof-name').textContent = fullName;
    
    // Lier automatiquement les cours de l'élève
    const studentMatch = DATA.students.find(s => s.firstname === searchName || (s.firstname + ' ' + s.lastname) === fullName || s.name === fullName);
    if (studentMatch && studentMatch.courseIds) {
      user.courseIds = [...new Set([...(user.courseIds || []), ...studentMatch.courseIds])];
    }


  const taughtCourseIds = (user.role === 'admin' || user.realRole === 'admin') 
    ? DATA.courses.map(c => c.id)
    : DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => c.id);
  
  let selectedCourseId = taughtCourseIds[0] || null;
  const courseSelector = document.getElementById('appel-courses-select');
  if (courseSelector) {
    courseSelector.innerHTML = '';

    taughtCourseIds.forEach((cid) => {
      const c = DATA.getCourseById(cid);
      if (!c) return;
      
      const today = new Date().toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit', year: 'numeric'});
      const absences = DATA.attendance.filter(a => a.courseId === cid && a.date === today && (a.status === 'absent' || a.status === 'excuse'));
      const notif = absences.length > 0 ? ` (${absences.length} absent(s))` : '';
      
      const option = document.createElement('option');
      option.value = cid;
      option.textContent = `${c.emoji} ${c.name}${notif}`;
      if (cid === selectedCourseId) option.selected = true;
      courseSelector.appendChild(option);
    });

    courseSelector.onchange = (e) => {
      selectedCourseId = e.target.value;
      populateAppelDates(selectedCourseId);
      renderAppelList(selectedCourseId);
    };
  }
  if (selectedCourseId) {
    populateAppelDates(selectedCourseId);
    renderAppelList(selectedCourseId);
  }
  renderProfEleves(user);
  window.renderProfHeures(user);
  if (typeof window.renderGalaTables === 'function') window.renderGalaTables(user);
  
  // Onglet: Mon Planning
  const btnEnseignes = document.getElementById('prof-planning-toggle-enseignes');
  const btnSuivis = document.getElementById('prof-planning-toggle-suivis');
  const filterStyle = document.getElementById('prof-planning-style');
  const filterLieu = document.getElementById('prof-planning-lieu');

  // Populate filter dropdowns based on DATA.courses
  if (filterStyle && filterStyle.options.length === 1) {
    const styles = [...new Set(DATA.courses.map(c => c.style ? c.style.toLowerCase() : '').filter(Boolean))];
    styles.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s.charAt(0).toUpperCase() + s.slice(1);
      filterStyle.appendChild(opt);
    });
  }
  if (filterLieu && filterLieu.options.length === 1) {
    const lieux = [...new Set(DATA.courses.map(c => c.lieu ? c.lieu.toLowerCase() : '').filter(Boolean))];
    lieux.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l;
      if (l === 'adk') {
        opt.textContent = 'Studio ADK';
      } else if (l === 'rox') {
        opt.textContent = 'ROX';
      } else {
        opt.textContent = l.charAt(0).toUpperCase() + l.slice(1);
      }
      filterLieu.appendChild(opt);
    });
  }

  const applyPlanningFilters = () => {
    const isEnseignes = btnEnseignes.classList.contains('active');
    let baseCourseIds = isEnseignes ? taughtCourseIds : (user.courseIds || []);
    
    if (filterStyle && filterStyle.value !== 'all') {
      baseCourseIds = baseCourseIds.filter(cid => {
        const c = DATA.getCourseById(cid);
        return c && c.style && c.style.toLowerCase() === filterStyle.value;
      });
    }
    if (filterLieu && filterLieu.value !== 'all') {
      baseCourseIds = baseCourseIds.filter(cid => {
        const c = DATA.getCourseById(cid);
        return c && c.lieu && c.lieu.toLowerCase() === filterLieu.value;
      });
    }
    
    renderPlanningCards(baseCourseIds, 'prof-planning-list', isEnseignes ? 'Aucun cours enseigné avec ces filtres.' : 'Aucun cours suivi avec ces filtres.', user);
    renderWeeklyCalendar(baseCourseIds, 'prof-planning-calendar');
  };

  if (filterStyle) filterStyle.onchange = applyPlanningFilters;
  if (filterLieu) filterLieu.onchange = applyPlanningFilters;

  btnEnseignes.onclick = () => {
    btnEnseignes.classList.add('active');
    btnSuivis.classList.remove('active');
    applyPlanningFilters();
  };
  btnSuivis.onclick = () => {
    btnSuivis.classList.add('active');
    btnEnseignes.classList.remove('active');
    applyPlanningFilters();
  };
  // Init default view
  btnEnseignes.click();

  const appelSaveBtn = document.getElementById('appel-save-btn');
  if (appelSaveBtn) {
    appelSaveBtn.onclick = async () => {
      const dInput = document.getElementById('appel-date');
      const date = dInput.value.split('-').reverse().join('/');
      document.querySelectorAll('.appel-item').forEach(item => {
        const sid = item.dataset.studentId;
        const selected = item.querySelector('.appel-btn.selected');
        if (selected) {
          const status = selected.dataset.status;
          DATA.markAttendance(sid, selectedCourseId, date, status);
        }
      });
      
        // Save Prof Hours to Firebase
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && window.AUTH && window.AUTH.currentUser) {
          let profId = window.AUTH.currentUser.id;
          let profName = window.AUTH.currentUser.firstname ? `${window.AUTH.currentUser.firstname} ${window.AUTH.currentUser.lastname}` : window.AUTH.currentUser.name;
          
          if (window.AUTH.currentUser.role === 'admin' || window.AUTH.currentUser.realRole === 'admin') {
            const c = DATA.getCourseById(selectedCourseId);
            if (c && c.prof) {
               const profUser = DATA.users.find(u => u.role === 'prof' && (c.prof.includes(u.name) || c.prof.includes(u.firstname)));
               if (profUser) {
                  profId = profUser.id;
                  profName = profUser.firstname ? `${profUser.firstname} ${profUser.lastname}` : profUser.name;
               }
            }
          }
          
          const docId = `${profId}_${selectedCourseId}_${date.replace(/\//g, '-')}`;
          const hours = parseFloat(hoursInput.value) || 0;
          
            if (hours > 0) {
              const record = { profId, profName, courseId: selectedCourseId, date, hours, timestamp: Date.now() };
              try {
                await setDoc(doc(db, "prof_hours", docId), record);
                if (!DATA.prof_hours) DATA.prof_hours = [];
                const idx = DATA.prof_hours.findIndex(r => r.id === docId);
                if (idx > -1) DATA.prof_hours[idx] = { id: docId, ...record };
                else DATA.prof_hours.push({ id: docId, ...record });
                
                const statusEl = document.getElementById('prof-hours-status');
                if (statusEl) statusEl.innerHTML = `<span style="color: #27ae60;">✔️ Prestation validée : ${hours} heures</span>`;
                
                if (window.renderProfHeures) {
                  window.renderProfHeures(window.AUTH.currentUser);
                }
                if (window.renderProfEleves) {
                  window.renderProfEleves(window.AUTH.currentUser);
                }
              } catch (err) {
                console.error("Error saving prof hours:", err);
                alert("Erreur de sauvegarde: " + err.message);
              }
            } else {
              try {
                const { deleteDoc, doc, db } = await import('./firebase-config.js');
                await deleteDoc(doc(db, "prof_hours", docId));
                if (DATA.prof_hours) {
                  DATA.prof_hours = DATA.prof_hours.filter(r => r.id !== docId);
                }
                const statusEl = document.getElementById('prof-hours-status');
                if (statusEl) statusEl.innerHTML = `<span style="color: #e74c3c;">❌ Prestation annulée</span>`;
                if (window.renderProfHeures) {
                  window.renderProfHeures(window.AUTH.currentUser);
                }
              } catch (e) {
                console.error("Error deleting prof hours:", e);
              }
            }
        }
        
        showToast('✅ Appel et heures sauvegardés !', 'success');
    };
  }
  
  document.getElementById('appel-date')?.addEventListener('change', () => {
    if (typeof selectedCourseId !== 'undefined' && selectedCourseId) {
      renderAppelList(selectedCourseId);
    }
  });
}

function populateAppelDates(courseId) {
  const select = document.getElementById('appel-date');
  if (!select) return;
  select.innerHTML = '';
  
  const course = DATA.getCourseById(courseId);
  if (!course) return;
  const daysMap = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0 };
  let dayStr = course.schedule ? course.schedule.split(' ')[0] : 'Lundi';
  let targetJsDay = daysMap[dayStr] !== undefined ? daysMap[dayStr] : 1;

  const today = new Date();
  
  const seasonYear = today.getMonth() < 7 ? today.getFullYear() - 1 : today.getFullYear();
  const seasonStart = new Date(seasonYear, 8, 1); 
  
  let firstDate = new Date(seasonStart);
  while (firstDate.getDay() !== targetJsDay) {
    firstDate.setDate(firstDate.getDate() + 1);
  }

  let nextDate = new Date(today);
  while (nextDate.getDay() !== targetJsDay) {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  const datesSet = new Set();
  const dates = [];

  const addDate = (d) => {
    const dStr = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    if (!datesSet.has(dStr)) {
      datesSet.add(dStr);
      dates.push(new Date(d));
    }
  };

  if (firstDate <= nextDate) {
    addDate(firstDate);
  }

  for (let i = 4; i >= 1; i--) {
    let past = new Date(nextDate);
    past.setDate(past.getDate() - (i * 7));
    if (past >= seasonStart) {
      addDate(past);
    }
  }

  for (let i = 0; i < 4; i++) {
    let future = new Date(nextDate);
    future.setDate(future.getDate() + (i * 7));
    addDate(future);
  }

  dates.sort((a, b) => b - a);

  let closestDiff = Infinity;
  let closestIndex = 0;

  dates.forEach((dateObj, idx) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const dStr = yyyy + '-' + mm + '-' + dd;
    
    const option = document.createElement('option');
    option.value = dStr;
    option.textContent = dd + '/' + mm + '/' + yyyy;
    
    const diff = Math.abs(dateObj - today);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = idx;
    }
    
    select.appendChild(option);
  });
  
  if (select.options.length > 0) {
    select.selectedIndex = closestIndex;
  }
}

function renderAppelList(courseId) {
  // Update Prof Hours UI
  const hoursInput = document.getElementById('prof-hours-input');
  const statusEl = document.getElementById('prof-hours-status');
  const dInput = document.getElementById('appel-date');
  let dateStr = "";
  if (dInput) {
    dateStr = dInput.value.split('-').reverse().join('/');
  }

  if (hoursInput && statusEl && window.AUTH && window.AUTH.currentUser && dateStr) {
    let profId = window.AUTH.currentUser.id;
    if (window.AUTH.currentUser.role === 'admin' || window.AUTH.currentUser.realRole === 'admin') {
      const c = DATA.getCourseById(courseId);
      if (c && c.prof) {
         const profUser = DATA.users.find(u => u.role === 'prof' && (c.prof.includes(u.name) || c.prof.includes(u.firstname)));
         if (profUser) {
            profId = profUser.id;
         }
      }
    }

    const docId = `${profId}_${courseId}_${dateStr.replace(/\//g, '-')}`;
    const existing = DATA.prof_hours && DATA.prof_hours.find(p => p.id === docId);
    
    if (existing) {
      hoursInput.value = existing.hours;
      statusEl.innerHTML = `<span style="color: #27ae60;">✔️ Prestation validée : ${existing.hours} heures</span>`;
    } else {
      // Calculate default hours based on schedule slot
      let defaultHours = 1;
      const slot = DATA.schedule && DATA.schedule.slots.find(s => s.courseId === courseId);
      if (slot && slot.hour && slot.hour.includes('-')) {
        const parts = slot.hour.split('-');
        const start = parts[0].trim().split('h');
        const end = parts[1].trim().split('h');
        if (start.length === 2 && end.length === 2) {
          const startDec = parseInt(start[0]) + (parseInt(start[1] || '0') / 60);
          const endDec = parseInt(end[0]) + (parseInt(end[1] || '0') / 60);
          if (endDec > startDec) {
            defaultHours = endDec - startDec;
          }
        }
      }
      hoursInput.value = defaultHours;
      statusEl.innerHTML = `Confirmez vos heures pour cette session`;
    }
  }

  const list = document.getElementById('appel-list');
  const students = DATA.getStudentsByCourse(courseId);
  if (students.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">👤</div><p>Aucun élève dans ce cours</p></div>';
    return;
  }
  list.innerHTML = '';
  
  const courseAttendance = DATA.attendance ? DATA.attendance.filter(a => String(a.courseId).trim() === String(courseId).trim() && String(a.date).trim() === dateStr.trim()) : [];

  students.forEach(s => {
    const item = document.createElement('div');
    item.className = 'appel-item';
    item.dataset.studentId = s.id;
    
    const savedAtt = courseAttendance.find(a => String(a.studentId).trim() === String(s.id).trim());
    const status = savedAtt ? savedAtt.status : null;

      item.innerHTML = `
        <div>
          <div class="appel-student-name">${s.firstname} ${s.lastname}</div>
          <div class="appel-student-info">${s.age} ans</div>
        </div>
        <div class="appel-btns">
          <button class="appel-btn appel-btn-p ${status === 'present' ? 'selected' : ''}" data-status="present" title="Présent(e)">✔️ Présent</button>
          <button class="appel-btn appel-btn-a ${status === 'absent' ? 'selected' : ''}" data-status="absent"  title="Absent(e)">❌ Absent</button>
          <button class="appel-btn appel-btn-e ${status === 'excuse' ? 'selected' : ''}" data-status="excuse"  title="Excusé(e)">➖ Excusé</button>
        </div>`;
    item.querySelectorAll('.appel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        item.querySelectorAll('.appel-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    list.appendChild(item);
  });
}

window.deleteProfHour = async function(docId) {
  if (!confirm('Voulez-vous vraiment supprimer cette prestation ?')) return;
  try {
    const { deleteDoc, doc, db } = await import('./firebase-config.js');
    await deleteDoc(doc(db, "prof_hours", docId));
    if (DATA.prof_hours) {
      DATA.prof_hours = DATA.prof_hours.filter(r => r.id !== docId);
    }
    window.renderProfHeures();
    alert('Prestation supprimée avec succès.');
  } catch (err) {
    console.error("Error deleting prof hours:", err);
    alert("Erreur: " + err.message);
  }
};

window.renderProfHeures = function(user) {
  user = user || (window.AUTH && window.AUTH.currentUser);
  if (!user) return;
  const list = document.getElementById('prof-heures-list');
  const totalEl = document.getElementById('prof-heures-total');
  if (!list || !totalEl) return;
  
  if (!DATA.prof_hours || DATA.prof_hours.length === 0) {
    list.innerHTML = '<div class="empty-state">Aucune prestation enregistree.</div>';
    totalEl.textContent = '0h';
    return;
  }
  
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  let totalCurrentMonth = 0;
  const monthData = {};
  
  DATA.prof_hours.forEach(r => {
    if (!r.date) return;
    // If admin is masquerading, they can see all hours in Espace Prof for testing
    if (user.realRole !== 'admin') {
      if (String(r.profId).toLowerCase().trim() !== String(user.id).toLowerCase().trim()) return;
    }
    const parts = r.date.split('/');
    const dObj = new Date(parts[2], parts[1] - 1, parts[0]);
    const key = parts[2] + '-' + parts[1];
    
    if (!monthData[key]) monthData[key] = { total: 0, items: [] };
    monthData[key].total += r.hours;
    monthData[key].items.push(r);
    
    if (dObj.getMonth() === currentMonth && dObj.getFullYear() === currentYear) {
      totalCurrentMonth += r.hours;
    }
  });
  
  totalEl.textContent = totalCurrentMonth + 'h';
  
  const sortedKeys = Object.keys(monthData).sort().reverse();
  
  if (sortedKeys.length === 0) {
    list.innerHTML = '<div class="empty-state">Aucune prestation enregistree.</div>';
    return;
  }
  
  list.innerHTML = sortedKeys.map(key => {
    const data = monthData[key];
    const yyyy = key.split('-')[0];
    const mm = key.split('-')[1];
    const date = new Date(yyyy, mm - 1, 1);
    const monthName = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    
    data.items.sort((a,b) => {
      const aParts = a.date.split('/');
      const bParts = b.date.split('/');
      return new Date(bParts[2], bParts[1]-1, bParts[0]) - new Date(aParts[2], aParts[1]-1, aParts[0]);
    });
    
    const itemsHtml = data.items.map(item => {
      const course = DATA.getCourseById(item.courseId);
      const cName = course ? course.name : 'Cours inconnu';
      return '<div style="display:flex; justify-content:space-between; padding:0.5rem 0; border-bottom:1px solid var(--border-color); font-size:0.9rem;"><div><strong style="color:var(--text);">' + item.date + '</strong> - <span style="color:var(--text-muted);">' + cName + '</span></div><div style="font-weight:bold; color:var(--primary);">' + item.hours + 'h <button onclick="window.deleteProfHour(\'' + item.id + '\')" style="background:none; border:none; cursor:pointer; margin-left:10px;" title="Supprimer">🗑️</button></div></div>';
    }).join('');
    
    return '<div style="margin-bottom:2rem;"><h4 style="margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:2px solid var(--primary-light); color:var(--primary); text-transform:capitalize;">' + monthName + ' <span style="float:right;">' + data.total + 'h</span></h4>' + itemsHtml + '</div>';
  }).join('');
};


window.renderProfEleves = function(user) {
    user = user || (window.AUTH && window.AUTH.currentUser);
    if (!user) return;

    const tbody = document.getElementById('prof-eleves-body');
    const taughtCourseIds = (user.role === 'admin' || user.realRole === 'admin') 
        ? DATA.courses.map(c => String(c.id))
        : DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => String(c.id));
    
    // Populate the dropdown if not already populated
    const filterSelect = document.getElementById('prof-eleves-filter');
    if (filterSelect && filterSelect.getAttribute('data-populated') !== 'true') {
        let opts = '<option value="all">Tous les élèves</option>';
        taughtCourseIds.forEach(cid => {
            const c = DATA.getCourseById(cid);
            if (c) opts += `<option value="${c.id}">${c.name}</option>`;
        });
        filterSelect.innerHTML = opts;
        filterSelect.setAttribute('data-populated', 'true');
        filterSelect.addEventListener('change', () => window.renderProfEleves(user));
    }

    const selectedCourseId = filterSelect ? filterSelect.value : 'all';
    
    let courseIdsToFetch = selectedCourseId === 'all' 
        ? taughtCourseIds 
        : [String(selectedCourseId)];

    const rows = [];
    courseIdsToFetch.forEach(cid => {
        const studentsInCourse = DATA.getStudentsByCourse(cid);
        const course = DATA.getCourseById(cid);
        if (!course) return;

        studentsInCourse.forEach(s => {
            const att = DATA.attendance ? DATA.attendance.filter(a => String(a.studentId) === String(s.id) && String(a.courseId) === String(cid)) : [];
            const pres = att.filter(a => a.status === 'present').length;
            const rate = att.length ? Math.round(pres / att.length * 100) : 100;
            
            rows.push({
                student: s,
                course: course,
                rate: rate
            });
        });
    });

    // Sort alphabetically by firstname
    rows.sort((a,b) => (a.student.firstname || '').localeCompare(b.student.firstname || ''));

    if (rows.length === 0) {
        if (tbody) tbody.innerHTML = '<div style="text-align:center; color: var(--text-muted);">Aucun élève trouvé.</div>';
        return;
    }

    if (tbody) tbody.innerHTML = rows.map(r => {
      const s = r.student;
      const color = r.rate >= 80 ? '#90CC90' : r.rate >= 60 ? 'var(--gold)' : '#DC6464';
      
      // Cotisation selects
      const cotStatus = s.cotisation || 'en attente';
      const cotClass = cotStatus === 'payee_cash' || cotStatus === 'payee_compte' ? 'select-remis' : 'select-attente';
      const cotSelect = `
        <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem; background-color: ${cotStatus === 'en attente' ? '#ffeeba' : ''};">
          <option value="en attente" ${cotStatus === 'en attente' ? 'selected' : ''}>⏳ En attente</option>
          <option value="payee_cash" ${cotStatus === 'payee_cash' ? 'selected' : ''}>💸 Payée cash</option>
          <option value="payee_compte" ${cotStatus === 'payee_compte' ? 'selected' : ''}>💸 Payée compte</option>
        </select>
      `;
      const cotDateSelect = `
        <input type="date" value="${s.cotisationDate || ''}" onchange="updateCotisationDate('${s.id}', this.value)" style="padding:0.2rem 0.7rem; font-size:0.8rem; border-radius:50px; border:1px solid #ccc; box-sizing: border-box; min-width: 120px; outline:none;">
      `;
      
      // Mutuelle display
      const mutStatus = s.mutuelle || 'masque';
      let mutDisplay = '';
      if (mutStatus === 'masque') {
          mutDisplay = `<span style="font-size: 0.85rem; color: #aaa; padding: 0.4rem 0;">👁️ Masqué</span>`;
      } else {
          const mutClass = mutStatus === 'remis' ? 'select-remis' : 'select-encours';
          mutDisplay = `
            <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding-right: 2.2rem; font-size: 0.85rem;">
              <option value="en_cours" ${mutStatus === 'en_cours' ? 'selected' : ''}>⏳ En cours</option>
              <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✔️ Remis</option>
            </select>
          `;
      }
      
      return `
        <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${s.firstname} ${s.lastname} <span style="color: var(--text-muted); font-size: 0.9rem; font-weight: normal;">(${s.age} ans)</span></h4>
            <div style="color:${color}; font-weight:700; font-size: 0.9rem;">Présence: ${r.rate}%</div>
          </div>
          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Cours suivi :</strong> ${r.course.name}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; background: rgba(0,0,0,0.02); padding: 0.8rem; border-radius: var(--radius);">
            <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
              ${cotSelect}
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Date paiement</span>
              ${cotDateSelect}
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem; flex: 0 1 auto;">
              <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
              ${mutDisplay}
            </div>
          </div>
        </div>
      `;
    }).join('');
};

// =============================================
// DASHBOARD PARENT
// =============================================
function renderParentDashboard(user) {
  renderUserAnnonces('parent', user);
  document.getElementById('parent-name').textContent = user.name;
  if (typeof window.renderGalaTables === 'function') window.renderGalaTables(user);

  const children = DATA.getChildrenByParent(user);
  const childTabs = document.getElementById('child-tabs');
  childTabs.innerHTML = '';

  if (children.length === 0) {
    document.getElementById('parent-attendance-list').innerHTML = '<div class="empty-state"><div class="empty-state-icon">🩰</div><p>Aucun enfant associé à ce compte</p></div>';
    return;
  }

  // Notification Prochains cours
  const nextCoursesData = calculateNextCourses(children);
  nextCoursesData.sort((a, b) => a.diffMins - b.diffMins);
  const banner = document.getElementById('parent-next-course-banner');
  const bannerContent = document.getElementById('parent-next-course-content');
  if (nextCoursesData.length > 0 && banner && bannerContent) {
    banner.style.display = 'flex';
    let html = '';
    nextCoursesData.forEach((data, idx) => {
      const isLast = idx === nextCoursesData.length - 1;
      const margin = isLast ? '0' : '0.5rem';
      html += `<div style="margin-bottom: ${margin};">Le prochain cours de <strong style="color: #9C5858;">${data.child.firstname}</strong> est <strong style="color: #9C5858;">${data.course.name}</strong>, ce ${data.dayStr.toLowerCase()} ${data.dateStrObj} à ${data.hourStr}.</div>`;
    });
    bannerContent.innerHTML = html;
  } else if (banner) {
    banner.style.display = 'none';
  }

  children.forEach((child, i) => {
    const tab = document.createElement('button');
    tab.className = `dash-tab child-tab${i === 0 ? ' active' : ''}`;
    tab.textContent = `👧👦 ${child.firstname}`;
    tab.addEventListener('click', () => {
      document.querySelectorAll('.child-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderChildData(child);
    });
    childTabs.appendChild(tab);
  });

  renderChildData(children[0]);
}

function renderChildData(child) {
  const childNameEl = document.getElementById('parent-child-name');
  if (childNameEl) childNameEl.textContent = child.firstname;
  const namePlanEl = document.getElementById('parent-child-name-plan');
  if (namePlanEl) namePlanEl.textContent = child.firstname + ' (' + (child.courseIds ? child.courseIds.length : 0) + ' cours)';
  
  const att = DATA.getAttendanceByStudent(child.id);
  const presents = att.filter(a => a.status === 'present').length;
  const absents  = att.filter(a => a.status === 'absent').length;

  renderPlanningCards(child.courseIds || [], 'parent-planning-list', 'Aucun cours inscrit.', AUTH.currentUser, child.id);
  renderWeeklyCalendar(child.courseIds || [], 'parent-planning-calendar');

  document.getElementById('parent-stat-presence').textContent = presents;
  document.getElementById('parent-stat-absence').textContent = absents;
  
  // Cotisation
  const isPayee = child.cotisation === 'payée' || child.cotisation === 'payee';
  const cotClass = isPayee ? 'pill-approved' : 'pill-pending';
  const cotLabel = isPayee ? '✓ Payée' : '⏳ En attente';
  document.getElementById('parent-stat-cotisation').innerHTML = `<span class="status-pill ${cotClass}">${cotLabel}</span>`;
  
    // Mutuelle
  const mutStatus = child.mutuelle || 'masque';
  const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
  const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
  const mutEl = document.getElementById('parent-stat-mutuelle');
  if (mutStatus === 'masque') {
    if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = 'none';
  } else {
    if (mutEl && mutEl.parentElement) mutEl.parentElement.style.display = '';
    mutEl.innerHTML = `<span class="status-pill ${mutClass}">${mutLabel}</span>`;
  }

  const list = document.getElementById('parent-attendance-list');
  if (att.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>Aucun historique de présence</p></div>';
    return;
  }
  const statusLabels = { present: '✓ Présente', absent: '✗ Absente', excuse: '~ Excusée' };
  const statusColors = { present: '#90CC90', absent: '#DC6464', excuse: 'var(--gold)' };
  list.innerHTML = att.slice().reverse().map(a => {
    const course = DATA.getCourseById(a.courseId);
    return `<div class="parent-attendance-item">
      <div>
        <div class="attend-info">${a.date}</div>
        <div class="attend-course">${course?.name || 'Cours'}</div>
      </div>
      <span class="attendance-status status-${a.status}" style="color:${statusColors[a.status]};background:${statusColors[a.status]}22;padding:0.2rem 0.75rem;border-radius:50px;font-size:0.75rem;font-weight:700">
        ${statusLabels[a.status]}
      </span>
    </div>`;
  }).join('');
}

// =============================================
// ACTUALITÉS
// =============================================
function initActualites() {
  const grid = document.getElementById('news-grid');
  if (!grid) return;
  DATA.news.forEach(a => {
    const card = document.createElement('div');
    card.className = 'news-card reveal';
    const img = a.image
      ? `<img src="${a.image}" alt="${a.title}" class="news-img" loading="lazy">`
      : `<div class="news-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${a.emoji}</div>`;
    card.innerHTML = `${img}<div class="news-body"><div class="news-date">📅 ${a.date} · ${a.category}</div><h3 class="news-title">${a.title}</h3><p class="news-excerpt">${a.excerpt}</p><a href="#" class="news-link">Lire la suite →</a></div>`;
    grid.appendChild(card);
  });
}

// =============================================
// COUNTDOWN
// =============================================
function initCountdown() {
  const eventNameEl = document.getElementById('event-name');
  if (!eventNameEl) return;
  const event = DATA.nextEvent;
  eventNameEl.textContent = event.name;
  function update() {
    const diff = event.date - new Date();
    if (diff < 0) { document.getElementById('countdown').innerHTML = '<p style="color:var(--gold)">🎉 Cet événement a eu lieu !</p>'; return; }
    const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000),
          m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
    ['days','hours','mins','secs'].forEach((k, i) => {
      const el = document.getElementById(`cd-${k}`);
      if (el) el.textContent = String([d,h,m,s][i]).padStart(2,'0');
    });
  }
  update(); setInterval(update, 1000);
}

// =============================================
// GALERIE
// =============================================
function initGalerie() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  DATA.gallery.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item reveal';
    el.innerHTML = `<img src="${item.src}" alt="${item.alt}" class="gallery-img" loading="lazy"><div class="gallery-overlay">🔍</div>`;
    el.addEventListener('click', () => {
      document.getElementById('lightbox-img').src = item.src;
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    grid.appendChild(el);
  });
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox').addEventListener('click', e => { if (e.target === document.getElementById('lightbox')) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = ''; }

// =============================================
// CONTACT
// =============================================
function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message envoyé ! Nous vous répondrons sous 48h.', 'success');
    e.target.reset();
  });
}

// =============================================
// FOOTER
// =============================================
function initFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// =============================================
// SCROLL REVEAL
// =============================================
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => obs.observe(el)), 500);
}

// =============================================
// TOAST
// =============================================
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 100);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
}

window.formatLieu = function(lieu) {
  if (!lieu) return '';
  const l = lieu.toLowerCase();
  if (l === 'adk') return 'Studio ADK';
  if (l === 'rox') return 'ROX';
  if (l === 'bertrix') return 'Bertrix';
  if (l === 'izel') return 'C.C. Izel';
  if (l === 'flore') return 'Florenville';
  return lieu;
};

// =============================================
// HELPER PLANNINGS (Prof & Parents)
// =============================================
function renderWeeklyCalendar(courseIds, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  const calendarData = [[], [], [], [], [], [], []];
  
  courseIds.forEach(id => {
    const c = DATA.getCourseWithOverride(id);
    if (!c) return;
    const slots = DATA.schedule.slots.filter(s => String(s.courseId) === String(id));
    slots.forEach(slot => {
      calendarData[slot.day].push({ ...c, hour: slot.hour });
    });
  });
  
  // sort by hour
  calendarData.forEach(dayCourses => {
    dayCourses.sort((a,b) => (a.hour || '').localeCompare(b.hour || ''));
  });

  if (courseIds.length === 0) {
    container.innerHTML = '';
    return;
  }

  const html = `<div class="compact-calendar">
    ${days.map((dayName, idx) => {
      const coursesHtml = calendarData[idx].map(c => `
        <div class="cal-course-item" title="${c.name} - ${c.hour}">
          <span class="cal-time">${(c.hour || '').replace('h',':')}</span>
          <span class="cal-name">${c.name}</span>
        </div>
      `).join('');
      return `<div class="cal-day ${calendarData[idx].length > 0 ? 'has-courses' : ''}">
        <div class="cal-day-header">${dayName}</div>
        <div class="cal-day-body">${coursesHtml}</div>
      </div>`;
    }).join('')}
  </div>`;
  
  container.innerHTML = html;
}

// =============================================
function renderPlanningCards(courseIds, containerId, emptyMsg = 'Aucun cours.', user = null, studentId = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (!courseIds || courseIds.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🗓️</div><p>${emptyMsg}</p></div>`;
    return;
  }

  const courses = courseIds.map(id => DATA.getCourseWithOverride(id)).filter(Boolean);
  
  container.innerHTML = courses.map(c => {
    const isCancelled = c.status === 'annule';
    const isModified = c.status !== 'annule' && (c.date || c.hour || (c.originalLieu && c.lieu !== c.originalLieu));
    
    // Si c'est annulé, on barre.
    const titleStyle = isCancelled ? 'text-decoration: line-through; color: var(--text-muted);' : '';
    const badge = isCancelled ? `<span class="role-badge badge-admin" style="background:#DC646422;color:#DC6464;">Annulé</span>` 
                : isModified ? `<span class="role-badge badge-prof" style="background:var(--gold-22);color:var(--gold);">Modifié</span>` 
                : '';

    let scheduleText = c.schedule.split('·')[0].trim();
    let displayDate = c.date;
    if (displayDate && displayDate.includes('-')) {
      const parts = displayDate.split('-');
      displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    let displayHour = c.hour ? c.hour.replace(':', 'h') : '';
    if (c.date && c.hour) scheduleText = `${displayDate} à ${displayHour}`;
    else if (c.hour) scheduleText = `${scheduleText.split(' ')[0]} à ${displayHour}`;

    const profName = c.substituteId ? DATA.getUserById(c.substituteId)?.name || c.prof : c.prof;
    const isSubstitute = !!c.substituteId;
    const substituteHtml = isSubstitute && user && user.role === 'parent' ? 
      `<div style="font-size:0.8rem; color:var(--gold); margin-top:0.3rem;">Remplaçant(e) : ${profName} (${DATA.getUserById(c.substituteId)?.phone || 'Pas de tel'})</div>` : '';

    const msgHtml = c.message && user && user.role === 'parent' ? 
      `<div style="background:var(--dark); padding:0.5rem; border-radius:4px; font-size:0.85rem; margin-top:0.5rem; border-left:2px solid var(--gold);"><strong style="color:var(--gold)">Info Prof :</strong> ${c.message}</div>` : '';

    // Boutons d'action
    let actionButtons = `<div style="display:flex; gap:0.5rem; margin-top:0.8rem;">`;
    const isTeacher = user && !studentId && (user.role === 'admin' || user.realRole === 'admin' || (user.role === 'prof' && c.prof && (c.prof.includes(user.name) || c.prof.includes(user.firstname))));
    if (isTeacher) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-manage" data-course-id="${c.id}">⚙️ Modifier cours</button>`;
    }
    if (studentId) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-absent" data-course-id="${c.id}" data-student-id="${studentId}">📅 Présence</button>`;
    }
    actionButtons += `<button class="btn btn-outline btn-sm btn-msg" data-course-id="${c.id}">💬 Messages</button>`;
    actionButtons += `</div>`;

    let imgHtml = '';
    if (c.image && c.image !== 'undefined') {
      imgHtml = `<img src="${c.image}" class="portal-course-img" alt="${c.name}">`;
    } else {
      let fallbackSrc = '';
      if (c.eventType === 'pro') fallbackSrc = 'img/adk_pro.png?v=3';
      else if (c.eventType === 'stage') fallbackSrc = 'img/adk_stage.png?v=3';
      else if (c.eventType === 'show') fallbackSrc = 'img/adk_show.png?v=3';
      
      if (fallbackSrc) {
          imgHtml = `<img src="${fallbackSrc}" class="portal-course-img" alt="${c.name}">`;
      } else {
          let typeLabel = c.style ? c.style.toUpperCase() : 'ADK';
          imgHtml = `<div class="portal-course-img" style="display:flex; flex-direction:column; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2a2a,#111); color:#fff; text-align:center; overflow:hidden;">
            <img src="img/apple-touch-icon.png" style="width:30px; height:30px; object-fit:contain; margin-bottom:4px;" alt="ADK">
            <strong style="font-size:0.65rem; color:var(--gold); font-family:'Playfair Display', serif; line-height:1; padding: 0 2px;">${typeLabel}</strong>
          </div>`;
      }
    }

    return `<div class="portal-course-card" style="${isCancelled ? 'opacity:0.7;' : ''}">
      ${imgHtml}
      <div class="portal-course-info" style="flex:1;">
        <div class="portal-course-title" style="display:flex; justify-content:space-between; align-items:center;">
          <span style="${titleStyle}">${c.name}</span>
          ${badge}
        </div>
        <div class="portal-course-meta">
          <span style="${isCancelled ? 'text-decoration: line-through;' : ''}">📅 ${scheduleText}</span>
          <span>📍 ${formatLieu(c.lieu)}</span>
          <span>👩‍🏫 ${profName}</span>
        </div>
        ${substituteHtml}
        ${msgHtml}
        ${actionButtons}
      </div>
    </div>`;
  }).join('');

  // Attach event listeners
  container.querySelectorAll('.btn-manage').forEach(btn => {
    btn.onclick = () => openManageCourseModal(btn.dataset.courseId);
  });
  container.querySelectorAll('.btn-absent').forEach(btn => {
    btn.onclick = () => openAbsenceModal(btn.dataset.courseId, btn.dataset.studentId);
  });
  container.querySelectorAll('.btn-msg').forEach(btn => {
    btn.onclick = () => openMessagesModal(btn.dataset.courseId, user);
  });
}

function populateAbsenceDates(courseId) {
  const select = document.getElementById('absence-date');
  if (!select) return;
  select.innerHTML = '';
  
  const c = DATA.getCourseWithOverride(courseId);
  const daysMap = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0, 'lundi': 1, 'mardi': 2, 'mercredi': 3, 'jeudi': 4, 'vendredi': 5, 'samedi': 6, 'dimanche': 0 };
  
  let targetJsDay = 1; // Default to Monday
  
  if (c && c.schedule) {
    const dayStr = c.schedule.split(' ')[0];
    if (daysMap.hasOwnProperty(dayStr)) {
        targetJsDay = daysMap[dayStr];
    }
  } else {
    const slot = DATA.schedule.slots.find(s => String(s.courseId) === String(courseId));
    if (slot) {
        targetJsDay = (slot.day + 1) % 7;
    }
  }
  
  const today = new Date();
  let d = new Date(today);
  while (d.getDay() !== targetJsDay) {
    d.setDate(d.getDate() + 1);
  }
  
  const dates = [];
    let safeguard = 0;
    while (dates.length < 4 && safeguard < 52) {
      const futureDate = new Date(d);
      if (isDateValid(futureDate, c || {})) {
        dates.push(futureDate);
      }
      d.setDate(d.getDate() + 7);
      safeguard++;
    }
  
  dates.forEach((dateObj) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;
    const display = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    
    const opt = document.createElement('option');
    opt.value = iso;
    opt.textContent = display.charAt(0).toUpperCase() + display.slice(1);
    select.appendChild(opt);
  });
}

function openAbsenceModal(courseId, studentId) {
  document.getElementById('absence-course-id').value = courseId;
  document.getElementById('absence-student-id').value = studentId;
  populateAbsenceDates(courseId);
  document.getElementById('modal-absence').classList.add('open');
}

document.getElementById('close-absence')?.addEventListener('click', () => {
  document.getElementById('modal-absence').classList.remove('open');
});

document.getElementById('absence-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const cid = document.getElementById('absence-course-id').value;
  const sid = document.getElementById('absence-student-id').value;
  const dateVal = document.getElementById('absence-date').value;
  const dateStr = dateVal.split('-').reverse().join('/');
  let status = document.getElementById('absence-status').value;
  
  if (dateVal && status === 'excuse') {
    const course = DATA.getCourseWithOverride(cid);
    if (course) {
      const timeStr = course.hour || (course.schedule ? course.schedule.split(' ')[1] : null);
      if (timeStr) {
        const h = parseInt(timeStr.split('h')[0], 10);
        const m = parseInt(timeStr.split('h')[1] || '0', 10);
        
        const courseDate = new Date(dateVal);
        courseDate.setHours(h, m, 0, 0);
        
        const now = new Date();
        const diffHours = (courseDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        if (diffHours >= 0 && diffHours < 4) {
          status = 'absent';
          alert("Attention : L'absence est signalée moins de 4h avant le début du cours. Elle sera donc enregistrée comme 'Absence non-excusée'.");
        } else if (diffHours < 0) {
          status = 'absent';
          alert("Attention : L'absence est signalée après le début du cours. Elle sera donc enregistrée comme 'Absence non-excusée'.");
        }
      }
    }
  }
  
  if (dateStr) {
    DATA.markAttendance(sid, cid, dateStr, status);
    if (status !== 'absent' || document.getElementById('absence-status').value !== 'excuse') {
      alert('Vos indications ont été sauvegardées.');
    }
      (async () => {
         try {
           const firebase = await import('./firebase-config.js');
           const course = DATA.getCourseWithOverride(cid);
           const child = DATA.getStudentById(sid);
           if (course && child) {
             const statLabel = status === 'present' ? 'Présent(e)' : (status === 'excuse' ? 'Excusé(e)' : 'Absent(e)');
             const title = status === 'present' ? `Signalement de présence : ${child.firstname}` : `Signalement d'absence : ${child.firstname}`;
             const annData = {
               title: title,
               content: `${child.firstname} a été signalé(e) ${statLabel.toLowerCase()} pour le cours "${course.name}" du ${dateStr}.`,
               target: "prof_course_" + cid,
               timestamp: Date.now(),
               authorId: window.AUTH.currentUser.id
             };
             DATA.announcements.push({...annData, id: 'temp_' + Date.now()});
             await firebase.addDoc(firebase.collection(firebase.db, "announcements"), annData);
           }
         } catch(e) {
           console.error("Error sending absence notif:", e);
         }
      })();

    document.getElementById('modal-absence').classList.remove('open');
    // Refresh the view if looking at a student
    if (AUTH.currentUser.role === 'parent') {
      const currentChildId = sid;
      const child = DATA.getStudentById(sid);
      if (child) renderChildData(child);
    }
  }
});

function isDateValid(date, course) {
    if (course && course.isPriority) return true;
    updateSeasonDisplay();
    if (DATA.settings && DATA.settings.season) {
        if (DATA.settings.season.start) {
            const s = new Date(DATA.settings.season.start);
            s.setHours(0,0,0,0);
            if (date < s) return false;
        }
        if (DATA.settings.season.end) {
            const e = new Date(DATA.settings.season.end);
            e.setHours(23,59,59,999);
            if (date > e) return false;
        }
    }
    if (DATA.settings && DATA.settings.holidays) {
        for (let h of DATA.settings.holidays) {
            const hs = new Date(h.start);
            hs.setHours(0,0,0,0);
            const he = new Date(h.end);
            he.setHours(23,59,59,999);
            if (date >= hs && date <= he) return false;
        }
    }
    return true;
}

function calculateNextCourses(children) {
  const daysMap = { 'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4, 'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0 };
  const now = new Date();
  
  const nextCourses = [];

  children.forEach(child => {
    let nextCourse = null;
    let minDiff = Infinity;

    (child.courseIds || []).forEach(cid => {
      const c = DATA.getCourseWithOverride(cid);
      if (!c || c.status === 'annule') return;
      
      let targetDateObj;
      let hourStr = c.hour || (c.schedule ? c.schedule.split(' ')[1] : '00h00');
      let targetHourMin = 0;
      if (hourStr && hourStr.includes('h')) {
        const timeParts = hourStr.split('h');
        targetHourMin = parseInt(timeParts[0]) * 60 + (parseInt(timeParts[1]) || 0);
      } else if (hourStr && hourStr.includes(':')) {
        const timeParts = hourStr.split(':');
        targetHourMin = parseInt(timeParts[0]) * 60 + (parseInt(timeParts[1]) || 0);
      }

      if (c.date && c.date.includes('-')) {
         const parts = c.date.split('-');
         targetDateObj = new Date(parts[0], parts[1] - 1, parts[2], Math.floor(targetHourMin/60), targetHourMin%60);
      } else if (c.date && c.date.includes('/')) {
         const parts = c.date.split('/');
         targetDateObj = new Date(parts[2], parts[1] - 1, parts[0], Math.floor(targetHourMin/60), targetHourMin%60);
      } else {
         let dayStr = c.schedule ? c.schedule.split(' ')[0] : '';
         if (!daysMap.hasOwnProperty(dayStr)) return;
         
         const targetDay = daysMap[dayStr];
         let diffDays = targetDay - now.getDay();
         if (diffDays < 0 || (diffDays === 0 && targetHourMin <= (now.getHours()*60 + now.getMinutes()))) {
           diffDays += 7; 
         }
         targetDateObj = new Date(now);
         targetDateObj.setDate(now.getDate() + diffDays);
         targetDateObj.setHours(Math.floor(targetHourMin/60), targetHourMin%60, 0, 0);
      }
      
      const diffMs = targetDateObj.getTime() - now.getTime();
      if (diffMs > 0 && diffMs < minDiff) {
        minDiff = diffMs;
        const dd = String(targetDateObj.getDate()).padStart(2, '0');
        const mm = String(targetDateObj.getMonth() + 1).padStart(2, '0');
        const dayNames = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
        
        let displayHourStr = hourStr.replace(':', 'h');
        
        nextCourse = {
          child,
          course: c,
          dayStr: dayNames[targetDateObj.getDay()],
          dateStrObj: dd + '/' + mm,
          hourStr: displayHourStr,
          diffMins: diffMs / 60000
        };
      }
    });

    if (nextCourse) nextCourses.push(nextCourse);
  });

  return nextCourses;
}

// =============================================
// MODALS LOGIC
// =============================================
function openManageCourseModal(courseId) {
  const course = DATA.getCourseWithOverride(courseId);
  if (!course) return;

  document.getElementById('manage-course-id').value = courseId;
  document.getElementById('manage-course-title').textContent = `Gérer: ${course.name}`;
  document.getElementById('manage-course-type').value = course.type || 'temporaire';
  document.getElementById('manage-course-status').value = course.status || 'maintenu';
  let initHour = course.hour || (course.schedule ? course.schedule.split(' ')[1] : '');
  if (initHour && initHour.includes('h')) {
    initHour = initHour.replace('h', ':');
    if (initHour.length === 4) initHour = '0' + initHour;
  }
  document.getElementById('manage-course-hour').value = initHour;
  
  let initDate = course.date || '';
  if (initDate && initDate.includes('/')) {
    const parts = initDate.split('/');
    if (parts.length === 3) initDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  document.getElementById('manage-course-date').value = initDate;
  document.getElementById('manage-course-lieu').value = course.lieu;
  document.getElementById('manage-course-msg').value = course.message || '';
  
  // Remplir les subs
  const subSelect = document.getElementById('manage-course-sub');
  subSelect.innerHTML = '<option value="">-- Aucun --</option>' + 
    DATA.getProfessors().filter(p => p.id !== AUTH.currentUser.id).map(p => `<option value="${p.id}">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</option>`).join('');
  subSelect.value = course.substituteId || '';

  document.getElementById('modal-manage-course').classList.add('open');
}

document.getElementById('close-manage-course')?.addEventListener('click', () => {
  document.getElementById('modal-manage-course').classList.remove('open');
});

document.getElementById('manage-course-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('manage-course-id').value;
  
  DATA.courseOverrides[id] = {
    type: document.getElementById('manage-course-type').value,
    status: document.getElementById('manage-course-status').value,
    hour: document.getElementById('manage-course-hour').value,
    date: document.getElementById('manage-course-date').value,
    lieu: document.getElementById('manage-course-lieu').value,
    substituteId: document.getElementById('manage-course-sub').value || null,
    message: document.getElementById('manage-course-msg').value
  };

  DATA.saveState();

  try {
    const firebase = await import('./firebase-config.js');
    const course = DATA.getCourseById(id);
    if (course) {
      const overrides = DATA.courseOverrides[id];
      const lieuFormate = window.formatLieu ? window.formatLieu(overrides.lieu) : overrides.lieu;
      const notifHtml = `Le cours a été modifié.<br><strong>Statut:</strong> ${overrides.status}<br><strong>Date/Heure:</strong> ${overrides.date} ${overrides.hour}<br><strong>Lieu:</strong> ${lieuFormate}<br><strong>Message:</strong> ${overrides.message}`;
      const annData = {
        title: `⚠️ Changement : ${course.name}`,
        content: notifHtml,
        target: `course_${id}`,
        timestamp: Date.now(),
        authorId: AUTH.currentUser.id
      };
      DATA.announcements.push({...annData, id: 'temp_' + Date.now()});
      await firebase.addDoc(firebase.collection(firebase.db, "announcements"), annData);
      showToast('✅ Modifications enregistrées et notification envoyée');
    }
  } catch (err) {
    console.error("Erreur notif:", err);
    showToast('✅ Modifications enregistrées');
  }

  document.getElementById('modal-manage-course').classList.remove('open');
  
  // Refresh dashboard
  if (AUTH.currentUser) showPortalDashboard(AUTH.currentUser);
});

// MESSAGES MODAL
let currentChatCourseId = null;
let currentChatUser = null;

function openMessagesModal(courseId, user) {
  // Determine role for dashboard panel tab
  const role = (user.role === 'admin' || user.realRole === 'admin') ? 'admin' 
             : (user.role === 'prof') ? 'prof' 
             : 'parent';
             
  const tabBtn = document.querySelector(`#panel-${role} .dash-tab[data-tab*="messagerie"]`) || document.querySelector(`#panel-${role} [data-tab*="messagerie"]`);
  if (tabBtn) tabBtn.click();
  
  // Give time for UI to switch tab
  setTimeout(() => {
    const btnNewChat = document.getElementById('btn-new-chat');
    if (btnNewChat) {
      btnNewChat.click();
      
      setTimeout(() => {
        const targetSelect = document.getElementById('new-chat-target');
        if (targetSelect) {
          targetSelect.value = 'course_' + courseId;
        }
      }, 50);
    }
  }, 50);
}

document.getElementById('close-messages')?.addEventListener('click', () => {
  document.getElementById('modal-messages').classList.remove('open');
});

function renderChatHistory() {
  const historyEl = document.getElementById('chat-history');
  const msgs = DATA.getMessagesForCourse(currentChatCourseId, currentChatUser);
  
  if (msgs.length === 0) {
    historyEl.innerHTML = '<div class="empty-state"><p>Aucun message pour ce cours.</p></div>';
    return;
  }

  historyEl.innerHTML = msgs.map(m => {
    const isMe = m.senderId === currentChatUser.id;
    const align = isMe ? 'flex-end' : 'flex-start';
    const bg = isMe ? 'var(--gold)' : 'var(--dark)';
    const color = isMe ? 'var(--black)' : 'var(--white)';
    const badgeText = m.type === 'private' || m.type.startsWith('private-') ? 
      '<span style="font-size:0.7rem; background:#DC6464; color:white; padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.5rem;">Privé</span>' : '';
    
    return `<div style="display:flex; flex-direction:column; align-items:${align}; margin-bottom:0.5rem;">
      <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.2rem;">${m.senderName} (${m.senderRole}) ${badgeText}</div>
      <div style="background:${bg}; color:${color}; padding:0.8rem 1rem; border-radius:8px; max-width:80%; line-height:1.4;">${m.content}</div>
    </div>`;
  }).join('');
  
  historyEl.scrollTop = historyEl.scrollHeight;
}

document.getElementById('chat-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  if (!input.value.trim() || !currentChatCourseId || !currentChatUser) return;

  const typeVal = document.getElementById('chat-msg-type').value;
  let type = typeVal;
  let recipientId = null;
  
  if (typeVal.startsWith('private-')) {
    type = 'private';
    recipientId = typeVal.split('-')[1];
  }

  DATA.messages.push({
    courseId: currentChatCourseId,
    senderId: currentChatUser.id,
    senderName: currentChatUser.firstname || currentChatUser.name,
    senderRole: currentChatUser.role === 'prof' ? 'Professeur' : 'Parent',
    type: type,
    recipientId: recipientId,
    content: input.value.trim(),
    timestamp: new Date().getTime()
  });

  DATA.saveState();

  input.value = '';
  renderChatHistory();
});
window.initNavbar = initNavbar;
window.initMobileMenu = initMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.initParticles = initParticles;
window.initHero = initHero;
window.animateCounter = animateCounter;
window.initCourses = initCourses;
window.createCourseCard = createCourseCard;
window.initCountdown = initCountdown;
window.initPlanning = initPlanning;
window.slotMatchesFilters = slotMatchesFilters;
window.refreshPlanning = refreshPlanning;
window.renderMobileDayCourses = renderMobileDayCourses;
window.initInscription = initInscription;
window.initPortal = initPortal;
window.showPortalDashboard = showPortalDashboard;
window.initTabs = initTabs;
window.renderAdminDashboard = renderAdminDashboard;
window.renderAdminInscriptions = renderAdminInscriptions;
window.adminApprove = adminApprove;
window.adminReject = adminReject;
window.renderAdminEleves = renderAdminEleves;
window.renderAdminProfs = renderAdminProfs;
window.renderProfDashboard = renderProfDashboard;
window.populateAppelDates = populateAppelDates;
window.renderAppelList = renderAppelList;
window.renderProfEleves = renderProfEleves;
window.renderParentDashboard = renderParentDashboard;
window.renderChildData = renderChildData;
window.initActualites = initActualites;
window.initGalerie = initGalerie;
window.closeLightbox = closeLightbox;
window.initContact = initContact;
window.initFooter = initFooter;
window.initReveal = initReveal;
window.showToast = showToast;

window.deleteStudent = async function(studentId) {
  if (!confirm("Êtes-vous sûr de vouloir supprimer cet élève définitivement ?")) return;
  
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.deleteDoc(firebase.doc(firebase.db, "students", studentId));
    
    // Update local DATA
    window.DATA.students = window.DATA.students.filter(s => s.id !== studentId);
    
    window.showToast('✅ Élève supprimé avec succès', 'success');
    window.renderAdminEleves();
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    alert("Erreur lors de la suppression : " + error.message);
  }
};

window.renderWeeklyCalendar = renderWeeklyCalendar;
window.renderPlanningCards = renderPlanningCards;
window.populateAbsenceDates = populateAbsenceDates;
window.openAbsenceModal = openAbsenceModal;
window.calculateNextCourses = calculateNextCourses;
window.openManageCourseModal = openManageCourseModal;
window.openMessagesModal = openMessagesModal;
window.renderChatHistory = renderChatHistory;

  window.submitForcePassword = async function() {
    const pwd1 = document.getElementById('force-pwd-1').value;
    const pwd2 = document.getElementById('force-pwd-2').value;
    const err = document.getElementById('force-pwd-error');
    const btn = document.getElementById('btn-force-pwd');
    
    if (pwd1 !== pwd2) {
      err.textContent = "Les mots de passe ne correspondent pas.";
      err.style.display = "block";
      return;
    }
    
    err.style.display = "none";
    btn.disabled = true;
    btn.textContent = "Enregistrement...";
    
    try {
      await AUTH.forceChangePassword(pwd1);
      document.getElementById('modal-force-password').classList.remove('active');
      showToast("Mot de passe mis à jour avec succès !", "success");
    } catch(e) {
      err.textContent = "Erreur lors du changement de mot de passe. Veuillez réessayer.";
      err.style.display = "block";
    }
    
    btn.disabled = false;
    btn.textContent = "Enregistrer et Continuer";
  };

  window.submitResetPassword = async function() {
  const email = document.getElementById('reset-password-email').value;
  const btn = document.querySelector('#form-reset-password button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Envoi...';
  btn.disabled = true;

  const success = await AUTH.resetPassword(email);
  if (success) {
    showToast('✉️ Email de réinitialisation envoyé ! Vérifiez vos spams.', 'success');
    closeModal('modal-reset-password');
    document.getElementById('form-reset-password').reset();
  } else {
    showToast('❌ Erreur : Cette adresse n\'existe peut-être pas.', 'error');
  }

  btn.textContent = originalText;
  btn.disabled = false;
};

window.openAddStudentModal = function(studentId = null) {
  const container = document.getElementById('add-student-courses');
    if (container) {
      container.innerHTML = DATA.courses.map(c => `
        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
          <input type="checkbox" class="course-checkbox" value="${c.id}">
          ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
        </label>
      `).join('');
    }
  
  if (studentId) {
    const student = DATA.getStudentById(studentId);
    document.getElementById('add-student-firstname').value = student.firstname || '';
    document.getElementById('add-student-lastname').value = student.lastname || '';
    document.getElementById('add-student-dob').value = student.dob || '';
    document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
    document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
    document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';
    document.getElementById('add-student-email').value = student.contactEmail || '';
    const email2Input = document.getElementById('add-student-email2');
    if (email2Input) email2Input.value = student.contactEmail2 || '';
    
    if (container) {
        const checkboxes = container.querySelectorAll('.course-checkbox');
        checkboxes.forEach(chk => {
          chk.checked = (student.courseIds || []).includes(chk.value);
        });
      }
    
    document.getElementById('add-student-id').value = student.id;
    document.querySelector('#modal-add-student .vitrine-modal-title').textContent = "Modifier l'élève";
    document.querySelector('#form-add-student button[type="submit"]').textContent = "Sauvegarder";
  } else {
    document.getElementById('form-add-student').reset();
    document.getElementById('add-student-id').value = '';
    document.querySelector('#modal-add-student .vitrine-modal-title').textContent = "Ajouter un élève";
    document.querySelector('#form-add-student button[type="submit"]').textContent = "Créer l'élève";
  }
  
  document.getElementById('modal-add-student').classList.add('active');
};

window.submitAddStudent = async function() {
  const btn = document.querySelector('#form-add-student button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Sauvegarde...";
  btn.disabled = true;

  try {
    const studentId = document.getElementById('add-student-id').value;
    const isNew = !studentId;
    const prenom = document.getElementById('add-student-firstname').value;
    const nom = document.getElementById('add-student-lastname').value;
    const dob = document.getElementById('add-student-dob').value;
      const tutorFirstname = document.getElementById('add-student-tutor-firstname').value;
      const tutorLastname = document.getElementById('add-student-tutor-lastname').value;
      const tutorPhone = document.getElementById('add-student-tutor-phone').value;
    const email = document.getElementById('add-student-email').value.toLowerCase().trim();
    const email2Input = document.getElementById('add-student-email2');
    const email2 = email2Input ? email2Input.value.toLowerCase().trim() : "";
    
    const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);

    const targetId = isNew ? "stu_" + Date.now() : studentId;
    const studentData = {
      firstname: prenom,
      lastname: nom,
      dob: dob,
        age: (dob ? (new Date().getFullYear() - new Date(dob).getFullYear() - ((new Date().getMonth() - new Date(dob).getMonth() < 0 || (new Date().getMonth() === new Date(dob).getMonth() && new Date().getDate() < new Date(dob).getDate())) ? 1 : 0)) : 0),
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
      contactEmail: email,
      contactEmail2: email2,
      courseIds: selectedCourses
    };
    if (isNew) {
      studentData.absences = [];
      studentData.avatar = `https://i.pravatar.cc/150?u=${targetId}`;
    }
    
    await setDoc(doc(db, "students", targetId), studentData, { merge: true });

    const manageParentAccount = async (parentEmail, parentName) => {
      if (!parentEmail) return;
      const userRef = doc(db, "users", parentEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const children = userData.childrenIds || [];
        if (!children.includes(targetId)) {
          await setDoc(userRef, { childrenIds: [...children, targetId] }, { merge: true });
        }
      } else {
        let tempPassword = Math.random().toString(36).slice(-8);
        let createdAuth = true;
        try {
          const apiKey = "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q"; // Key from firebase-config.js
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: parentEmail, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) {
             if (data.error.message === 'EMAIL_EXISTS') { createdAuth = false; }
             else throw new Error(data.error.message);
          }
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
        
        await setDoc(userRef, {
          id: parentEmail,
          email: parentEmail,
          name: `${parentName} (Parent)`,
          role: "parent",
          childrenIds: [targetId]
        });
        
        if (createdAuth) {
          try {
            await emailjs.send(
              "service_ADK",
              "template_ADK_Compte",
              {
                to_email: parentEmail,
                to_name: parentName,
                temp_password: tempPassword,
                login_link: "https://liolux21.github.io/ecole-danse-adk-dev/portail.html"
              }
            );
            showToast(`✉️ Email envoyé à ${parentEmail} avec succès !`, 'success');
          } catch (emailError) {
            console.error("Erreur EmailJS:", emailError);
          }
        }
      }
    };

    // On check/crée les DEUX parents s'ils sont renseignés (même en mode "modification" si un parent 2 est ajouté par après)
    await manageParentAccount(email, `${tutorFirstname || prenom} ${tutorLastname || nom}`);
    if (email2) {
      await manageParentAccount(email2, `Parent 2 - ${prenom} ${nom}`);
    }

    await DATA.syncFromFirebase();
    if (AUTH.hasRole('admin')) {
      showPortalDashboard(AUTH.currentUser);
    }

    closeModal('modal-add-student');
    document.getElementById('form-add-student').reset();
    showToast(isNew ? '✅ Élève ajouté avec succès' : '✅ Élève modifié avec succès', 'success');

  } catch(err) {
    console.error(err);
    showToast('❌ Erreur lors de la sauvegarde', 'error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};
window.toggleAdminCourseFields = function() {
  const typeEl = document.getElementById('admin-course-type');
  const regSec = document.getElementById('admin-course-regular-section');
  const evtSec = document.getElementById('admin-course-event-section');
  if(typeEl && regSec && evtSec) {
    if(typeEl.value === 'regulier') {
      regSec.style.display = 'block';
      evtSec.style.display = 'none';
    } else {
      regSec.style.display = 'none';
      evtSec.style.display = 'block';
    }
  }
};
window.openAddCourseModal = function(courseId = null) {
  const profs = DATA.users.filter(u => u.role === 'prof');
  const profsContainer = document.getElementById('admin-course-profs');
  
  if (courseId) {
    const course = DATA.getCourseById(courseId);
    if (course) {
      document.getElementById('admin-course-id').value = course.id;
      document.getElementById('admin-course-name').value = course.name;
      document.getElementById('admin-course-age').value = course.ages || '';
      
      const typeEl = document.getElementById('admin-course-type');
      if (typeEl) typeEl.value = course.eventType || 'regulier';
      const styleEl = document.getElementById('admin-course-style');
      if (styleEl) styleEl.value = course.style || 'classique';
      
      // Select profs
      let profsList = course.prof ? course.prof.split(', ') : [];
      if (profsContainer) {
        profsContainer.innerHTML = profs.map(p => {
          const pName = p.firstname ? p.firstname + ' ' + p.lastname : p.name;
          const checked = profsList.includes(pName) ? 'checked' : '';
          return `<label style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;cursor:pointer;"><input type="checkbox" value="${pName}" ${checked}> ${pName}</label>`;
        }).join('');
      }

      if (course.eventType === 'regulier' || !course.eventType) {
        let schedule = course.schedule || '';
        let parts = schedule.split(' ');
        if(parts.length >= 2) {
            document.getElementById('admin-course-day').value = parts[0];
            document.getElementById('admin-course-time').value = parts[1].replace('h', ':');
        } else {
            document.getElementById('admin-course-day').value = 'Lundi';
            document.getElementById('admin-course-time').value = '';
        }
        document.getElementById('admin-course-start-date').value = '';
        document.getElementById('admin-course-end-date').value = '';
      } else {
        document.getElementById('admin-course-day').value = 'Lundi';
        document.getElementById('admin-course-time').value = '';
        document.getElementById('admin-course-start-date').value = '';
        document.getElementById('admin-course-end-date').value = '';
        document.getElementById('admin-course-event-start-time').value = '';
        document.getElementById('admin-course-event-end-time').value = '';
        
        if(course.schedule) {
           let sp = course.schedule.split(' - ');
           if(sp.length >= 1) {
             let p1 = sp[0].trim().split(' ');
             let d1 = p1[0].split('/');
             if(d1.length === 3) document.getElementById('admin-course-start-date').value = `${d1[2]}-${d1[1]}-${d1[0]}`;
             if(p1.length > 1 && p1[1].includes('h')) {
               document.getElementById('admin-course-event-start-time').value = p1[1].replace('h', ':');
             }
           }
           if(sp.length >= 2) {
             let p2 = sp[1].trim().split(' ');
             p2.forEach(pt => {
               if(pt.includes('/')) {
                 let d2 = pt.split('/');
                 if(d2.length === 3) document.getElementById('admin-course-end-date').value = `${d2[2]}-${d2[1]}-${d2[0]}`;
               }
               if(pt.includes('h')) {
                 document.getElementById('admin-course-event-end-time').value = pt.replace('h', ':');
               }
             });
           }
        }
      }
      
      document.getElementById('admin-course-title').textContent = "Modifier le cours / événement";
    }
  } else {
    const form = document.getElementById('form-admin-course');
    if (form) form.reset();
    document.getElementById('admin-course-id').value = '';
    
    if (profsContainer) {
        profsContainer.innerHTML = profs.map(p => {
          const pName = p.firstname ? p.firstname + ' ' + p.lastname : p.name;
          return `<label style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;cursor:pointer;"><input type="checkbox" value="${pName}"> ${pName}</label>`;
        }).join('');
    }

    document.getElementById('admin-course-title').textContent = "Nouveau cours / événement";
    const styleEl = document.getElementById('admin-course-style');
    if (styleEl) styleEl.value = 'classique';
  }
  
  window.toggleAdminCourseFields();
  openModal('modal-admin-course');
};

window.submitAdminCourse = async function() {
  const btn = document.querySelector('#form-admin-course button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Sauvegarde...";
  btn.disabled = true;

  try {
    let id = document.getElementById('admin-course-id').value;
    const isNew = !id;
    if (isNew) id = "crs_" + Date.now();
    
    let eventType = document.getElementById('admin-course-type') ? document.getElementById('admin-course-type').value : 'regulier';
    let scheduleStr = '';
    if (eventType === 'regulier') {
        let day = document.getElementById('admin-course-day').value;
        let time = document.getElementById('admin-course-time').value.replace(':', 'h');
        scheduleStr = `${day} ${time}`;
    } else {
        let sd = document.getElementById('admin-course-start-date').value;
        let ed = document.getElementById('admin-course-end-date').value;
        let st = document.getElementById('admin-course-event-start-time').value;
        let et = document.getElementById('admin-course-event-end-time').value;
        
        let startPart = '';
        if(sd) {
           let dp = sd.split('-');
           startPart = `${dp[2]}/${dp[1]}/${dp[0]}`;
        }
        if(st) {
           startPart += (startPart ? ' ' : '') + st.replace(':', 'h');
        }
        scheduleStr = startPart;
        
        let endPart = '';
        if(ed) {
           let dp2 = ed.split('-');
           endPart = `${dp2[2]}/${dp2[1]}/${dp2[0]}`;
        }
        if(et) {
           endPart += (endPart ? ' ' : '') + et.replace(':', 'h');
        }
        
        if(endPart) {
           scheduleStr += (scheduleStr ? ' - ' : '') + endPart;
        }
    }

    // Get selected profs
    let profsList = [];
    const profCheckboxes = document.querySelectorAll('#admin-course-profs input[type="checkbox"]:checked');
    profCheckboxes.forEach(cb => profsList.push(cb.value));

    const courseData = {
      id: id,
      name: document.getElementById('admin-course-name').value,
      prof: profsList.join(', '),
      schedule: scheduleStr,
      ages: document.getElementById('admin-course-age').value,
      eventType: eventType,
      isPriority: (eventType !== 'regulier'),
      category: "Nouveau",
      style: document.getElementById('admin-course-style') ? document.getElementById('admin-course-style').value : 'classique',
      lieu: "ADK"
    };

    const firebase = await import('./firebase-config.js');
    
    let targetDocId = String(id);
    if (!isNew) {
      const existing = DATA.getCourseById(id);
      if (existing && existing.docId) {
        targetDocId = existing.docId;
      }
    }
    
    await firebase.setDoc(firebase.doc(firebase.db, 'courses', targetDocId), courseData, { merge: true });

    if (isNew) {
      DATA.courses.push({ docId: targetDocId, ...courseData });
    } else {
      const existing = DATA.getCourseById(id);
      if (existing) Object.assign(existing, courseData);
    }
    
    closeModal('modal-admin-course');
    renderAdminCourses();
    showToast('Cours sauvegardé', 'success');
  } catch(err) {
    console.error(err);
    showToast('❌ Erreur lors de la sauvegarde', 'error');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};

window.deleteAnnonce = async function(id) {
  if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.deleteDoc(firebase.doc(firebase.db, "announcements", id));
    await DATA.syncFromFirebase();
    renderAdminAnnonces();
    showToast('Annonce supprimée', 'success');
  } catch (err) {
    console.error(err);
    showToast('Erreur', 'error');
  }
};

function renderAdminAnnonces() {
  // Populate form options if not already done
  const targetSelect = document.getElementById('annonce-target');
  if (targetSelect && targetSelect.options.length <= 3) {
    DATA.courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = "course_" + c.id;
      opt.textContent = `Cours: ${c.name || c.title} (${c.category || c.level || ''})`;
      targetSelect.appendChild(opt);
    });
  }

  const container = document.getElementById('admin-annonces-list');
  if (!container) return;
  
  if (!DATA.announcements || DATA.announcements.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); border:1px dashed var(--border); border-radius:8px;">Aucune annonce publiée.</div>`;
    return;
  }

  container.innerHTML = DATA.announcements.map(ann => {
    const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
    let targetLabel = "Tous";
    if (ann.target === 'parents') targetLabel = "Tous les Parents";
    if (ann.target === 'profs') targetLabel = "Tous les Profs";
    if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Cours: ${c.name}` : `Cours supprimé`;
    }
    if (ann.target.startsWith('prof_course_')) {
      const cid = ann.target.replace('prof_course_', '');
      const c = DATA.getCourseById(cid);
      targetLabel = c ? `Prof du cours: ${c.name}` : `Prof du cours supprimé`;
    }

    return `
      <div style="background:#ffffff; border:1px solid var(--border); border-radius:8px; padding:1.5rem; position:relative;">
        <button class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; color:#e74c3c; border-color:#e74c3c; padding:0.2rem 0.5rem;" onclick="deleteAnnonce('${ann.id}')">X</button>
        <div style="font-size:0.8rem; color:var(--gold); margin-bottom:0.5rem;">Cible: ${targetLabel} &bull; Le ${date}</div>
        <h4 style="margin:0 0 0.5rem 0; color:#9C5858;">${ann.title}</h4>
        <div style="white-space:pre-wrap; color:var(--text-muted); font-size:0.95rem;">${ann.content}</div>
      </div>
    `;
  }).join('');
}


function renderUserAnnonces(role, userCtx) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const fullContainerId = role === 'parent' ? 'parent-notifications-full-list' : 'prof-notifications-full-list';
  const badgeId = role === 'parent' ? 'parent-notif-badge' : 'prof-notif-badge';
  
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  const fullContainer = document.getElementById(fullContainerId);
  const badge = document.getElementById(badgeId);
  
  if (!container || !wrapper || !fullContainer) return;

  const currentUser = userCtx || window.AUTH.currentUser;
  const readAnnouncements = currentUser.readAnnouncements || [];

  // Determine user's course IDs
  let userCourseIds = [];
  if (role === 'parent') {
    const children = DATA.students.filter(s => (currentUser.childrenIds || []).includes(s.id));
    children.forEach(ch => {
      if (ch.courseIds) {
        ch.courseIds.forEach(cid => {
          if (!userCourseIds.includes(String(cid))) userCourseIds.push(String(cid));
        });
      }
    });
  } else if (role === 'prof') {
      if (currentUser.realRole === 'admin') {
         userCourseIds = DATA.courses.map(c => String(c.id));
      } else {
         userCourseIds = DATA.courses.filter(c => c.prof && (c.prof.includes(currentUser.name) || (currentUser.firstname && c.prof.includes(currentUser.firstname)))).map(c => String(c.id));
      }
    }

  // Filter announcements aimed at this user
  const visibleAnnouncements = (DATA.announcements || []).filter(ann => {
    if (ann.target === 'all') return true;
    if (ann.target === 'parents' && role === 'parent') return true;
    if (ann.target === 'profs' && role === 'prof') return true;
    if (ann.target.startsWith('course_')) {
      const cid = ann.target.replace('course_', '');
      if (userCourseIds.includes(String(cid))) return true;
    }
      if (ann.target.startsWith('prof_course_') && role === 'prof') {
        const cid = ann.target.replace('prof_course_', '');
        if (userCourseIds.includes(String(cid))) return true;
      }
    return false;
  });

  const unreadAnnouncements = visibleAnnouncements.filter(ann => !readAnnouncements.includes(ann.id));

  // Update Badge
  if (badge) {
    if (unreadAnnouncements.length > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = unreadAnnouncements.length;
    } else {
      badge.style.display = 'none';
    }
  }

  // 1. MAIN DASHBOARD (Unread only)
  if (unreadAnnouncements.length === 0) {
    wrapper.style.display = 'none';
  } else {
    wrapper.style.display = 'block';
    container.innerHTML = unreadAnnouncements.map(ann => {
      const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
      return `
        <div class="parent-notification-banner" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.5rem; margin-bottom:0; position:relative;">
          <button onclick="markAnnonceAsRead('${ann.id}')" class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; border-color:#9C5858; color:#9C5858; padding:0.2rem 0.5rem; font-size:0.8rem;">✓ Lu</button>
          <div style="font-size:0.8rem; color:var(--primary); font-weight:600;">Administration ADK &bull; Le ${date}</div>
          <h4 style="margin:0; color:var(--primary); font-size:1.1rem; padding-right: 3rem;">${ann.title}</h4>
          <div style="white-space:pre-wrap; color:var(--text-light); font-size:0.95rem; line-height:1.4;">${ann.content}</div>
        </div>
      `;
    }).join('');
  }

  // 2. FULL NOTIFICATIONS TAB (All)
  if (visibleAnnouncements.length === 0) {
    fullContainer.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);">Aucune notification.</div>';
  } else {
    fullContainer.innerHTML = visibleAnnouncements.map(ann => {
      const date = new Date(ann.timestamp).toLocaleString('fr-FR', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'});
      const isRead = readAnnouncements.includes(ann.id);
      const styleOpacity = isRead ? 'opacity:0.6;' : 'opacity:1;';
      const readBtn = !isRead ? `<button onclick="markAnnonceAsRead('${ann.id}')" class="btn btn-outline btn-sm" style="position:absolute; top:1rem; right:1rem; border-color:#9C5858; color:#9C5858; padding:0.2rem 0.5rem; font-size:0.8rem;">✓ Lu</button>` : '';

      return `
        <div class="parent-notification-banner" style="display:flex; flex-direction:column; align-items:flex-start; gap:0.5rem; margin-bottom:0; position:relative; ${styleOpacity}">
          ${readBtn}
          <div style="font-size:0.8rem; color:var(--primary); font-weight:600;">Administration ADK &bull; Le ${date}</div>
          <h4 style="margin:0; color:var(--primary); font-size:1.1rem; padding-right: 3rem;">${ann.title}</h4>
          <div style="white-space:pre-wrap; color:var(--text-light); font-size:0.95rem; line-height:1.4;">${ann.content}</div>
        </div>
      `;
    }).join('');
  }
}

// =============================================
// MODAL PROFIL (PARAMÈTRES UTILISATEUR)
// =============================================

window.openProfileModal = function() {
  const user = AUTH.currentUser;
  if (!user) return;
  
  document.getElementById('profile-email').value = user.email || '';
  document.getElementById('profile-telephone').value = user.telephone || '';
  document.getElementById('profile-new-password').value = '';
  document.getElementById('profile-current-password').value = '';
  document.getElementById('profile-error').style.display = 'none';

  const preview = document.getElementById('profile-avatar-preview');
  if (user.avatarUrl) {
    preview.style.backgroundImage = 'url(' + user.avatarUrl + ')';
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
    preview.innerText = '';
    document.getElementById('profile-avatar-base64').value = user.avatarUrl;
  } else {
    preview.style.backgroundImage = 'none';
    preview.innerText = (user.prenom ? user.prenom[0] : (user.email ? user.email[0].toUpperCase() : 'U'));
    document.getElementById('profile-avatar-base64').value = '';
  }

  document.getElementById('modal-profile').classList.add('active');
};

window.handleAvatarSelection = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_SIZE = 150;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      
      const preview = document.getElementById('profile-avatar-preview');
      preview.style.backgroundImage = 'url(' + base64 + ')';
      preview.style.backgroundSize = 'cover';
      preview.style.backgroundPosition = 'center';
      preview.innerText = '';
      document.getElementById('profile-avatar-base64').value = base64;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

document.addEventListener('DOMContentLoaded', () => {
  const formProfile = document.getElementById('form-profile');
  if (formProfile) {
    formProfile.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('profile-email').value.trim();
      const phone = document.getElementById('profile-telephone').value.trim();
      const newPw = document.getElementById('profile-new-password').value;
      const currentPw = document.getElementById('profile-current-password').value;
      const avatarBase64 = document.getElementById('profile-avatar-base64').value;
      const errBox = document.getElementById('profile-error');
      const btn = document.getElementById('btn-save-profile');

      errBox.style.display = 'none';
      btn.innerText = 'Enregistrement...';
      btn.disabled = true;

      try {
        await AUTH.updateUserProfile(currentPw, email, newPw, phone, avatarBase64);
        
        // Mettre à jour l'UI (Dashboard Header)
        const user = AUTH.currentUser;
        ['admin', 'prof', 'parent'].forEach(role => {
          const avatarEl = document.getElementById(role + '-avatar');
          if (avatarEl) {
            if (user.avatarUrl) {
              avatarEl.style.backgroundImage = 'url(' + user.avatarUrl + ')';
              avatarEl.style.backgroundSize = 'cover';
              avatarEl.style.backgroundPosition = 'center';
              avatarEl.innerText = '';
            }
          }
        });

        alert("Profil mis à jour avec succès !");
        document.getElementById('modal-profile').classList.remove('active');
      } catch (err) {
        errBox.innerText = err.message || "Erreur lors de la mise à jour.";
        errBox.style.display = 'block';
      } finally {
        btn.innerText = 'Enregistrer';
        btn.disabled = false;
      }
    });
  }
});



window.exportStudentsExcel = function() {
    if (!DATA.students || DATA.students.length === 0) {
        alert("Aucun élève à exporter.");
        return;
    }
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Prenom,Nom,Date de naissance,Email Parent,Prenom Tuteur,Nom Tuteur,Telephone Tuteur,Mutuelle,Cotisation,Date Cotisation\n";
    
    DATA.students.forEach(st => {
        const row = [
            `"${st.firstname || ''}"`,
            `"${st.lastname || ''}"`,
            `"${st.dob || ''}"`,
            `"${st.contactEmail || ''}"`,
            `"${st.tutorFirstname || ''}"`,
            `"${st.tutorLastname || ''}"`,
            `"${st.tutorPhone || ''}"`,
            `"${st.mutuelle || 'masque'}"`,
            `"${st.cotisation || 'en attente'}"`,
            `"${st.cotisationDate || ''}"`
        ];
        csvContent += row.join(",") + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "eleves_adk.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.viewGalaNote = function(id) {
  const note = DATA.galaNotes.find(n => n.id === id);
  if (!note) return;
  
  function formatDateFR(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  
  document.getElementById('note-view-date').textContent = formatDateFR(note.date);
  document.getElementById('note-view-presents').textContent = note.presents.join(', ') || 'Aucun';
  document.getElementById('note-view-content').textContent = note.pv;
  openModal('modal-gala-note-view');
};

window.renderGalaThemes = function() {
  const list = document.getElementById('gala-themes-list');
  if (!list) return;
  if (!DATA.settings) DATA.settings = {};
  if (!DATA.settings.galaThemes) DATA.settings.galaThemes = [];
  
  if (DATA.settings.galaThemes.length === 0) {
    list.innerHTML = '<div class="empty-state">Aucun thème défini.</div>';
    return;
  }
  
  list.innerHTML = DATA.settings.galaThemes.map((t, idx) => `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem; background:#f4f4f4; border-radius:var(--radius);">
      <span>${t}</span>
      <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaTheme(${idx})">X</button>
    </div>
  `).join('');
};

window.addGalaTheme = async function() {
  const input = document.getElementById('new-gala-theme');
  const val = input.value.trim();
  if (!val) return;
  if (!DATA.settings) DATA.settings = {};
  if (!DATA.settings.galaThemes) DATA.settings.galaThemes = [];
  
  DATA.settings.galaThemes.push(val);
  input.value = '';
  
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
    renderGalaThemes();
  } catch(err) {
    console.error(err);
    showToast("Erreur de sauvegarde", "error");
  }
};

window.deleteGalaTheme = async function(idx) {
  if (!confirm("Supprimer ce thème ?")) return;
  DATA.settings.galaThemes.splice(idx, 1);
  try {
    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
    renderGalaThemes();
  } catch(err) {
    console.error(err);
    showToast("Erreur de sauvegarde", "error");
  }
};

window.markAnnonceAsRead = async function(annonceId) {
    const user = window.AUTH ? window.AUTH.currentUser : null;
    if (!user || !user.id) return;
    try {
        const { db, doc, updateDoc, arrayUnion } = await import('./firebase-config.js');
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, {
            readAnnouncements: arrayUnion(annonceId)
        });
        
        if (!user.readAnnouncements) user.readAnnouncements = [];
        if (!user.readAnnouncements.includes(annonceId)) {
            user.readAnnouncements.push(annonceId);
        }
        
        if (user.role === 'admin') renderAdminDashboard(user);
        else if (user.role === 'prof') renderProfDashboard(user);
        else renderParentDashboard(user);
        
    } catch (error) {
        console.error("Erreur lors du marquage comme lu:", error);
    }
};

window.migrateCourses2026 = async function() {
  const btn = document.getElementById('btn-migrate-courses');
  if(!confirm("Êtes-vous sûr de vouloir écraser les cours dans la base de données avec le nouveau planning 2026-2027 ?")) return;
  
  try {
    btn.textContent = "Synchronisation en cours...";
    btn.disabled = true;
    
    const firebase = await import('./firebase-config.js');
    
    // We hardcode the 39 courses to guarantee they are pushed regardless of state.
    const allCourses = [
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
      { id: 18, style: 'hiphop', name: 'BREAK DANCE', ages: 'dès 8 ans', levels: 'Tous niveaux', prof: 'Adam', lieu: 'adk', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🛹' },
      { id: 19, style: 'hiphop', name: 'HIPHOP OLD SCHOOL', ages: 'Open Level', levels: 'Tous niveaux', prof: 'Adam', lieu: 'adk', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '📻' },
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
      { id: 31, style: 'special', name: 'POLE DANSE', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Florence', lieu: 'flore', schedule: 'Jeudi 19h30 - 21h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' },
      { id: 32, style: 'hiphop', name: 'ADULTES HIPHOP / RAGGA', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'chiny', schedule: 'Jeudi 19h00 - 20h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
      { id: 33, style: 'jazz_contemporain', name: 'ADULTES JAZZ / CONTEMPORAIN', ages: 'Adultes', levels: 'Tous niveaux', prof: 'Janis Romain', lieu: 'chiny', schedule: 'Jeudi 20h00 - 21h00', biweekly: false, eventType: 'regulier', emoji: '✨' },
      { id: 34, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: '9-12 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 17h00 - 18h00', biweekly: false, eventType: 'regulier', emoji: '🧢' },
      { id: 35, style: 'hiphop', name: 'HIPHOP & RAGGA', ages: 'dès 13 ans', levels: 'Tous niveaux', prof: 'Loreen Poncelet', lieu: 'bertrix', schedule: 'Jeudi 18h00 - 19h00', biweekly: false, eventType: 'regulier', emoji: '🔥' },
      { id: 36, style: 'hiphop', name: 'HIPHOP', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🧢' },
      { id: 37, style: 'ragga', name: 'RAGGA', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 14h00 - 16h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '🔥' },
      { id: 38, style: 'jazz_contemporain', name: 'CONTEMPORAIN / JAZZ', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Zoé Lambert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '✨' },
      { id: 39, style: 'ragga', name: 'GIRLY', ages: 'dès 12 ans', levels: 'Tous niveaux', prof: 'Margaux Hubert', lieu: 'rox', schedule: 'Samedi 16h00 - 18h00 (1 sem/2)', biweekly: true, eventType: 'regulier', emoji: '💃' }
    ];

    // Push all of them directly
    for (let c of allCourses) {
      await firebase.setDoc(firebase.doc(firebase.collection(firebase.db, "courses"), String(c.id)), c);
    }
    
    // Update local state immediately so no refresh is strictly needed, or we just refresh.
    window.DATA.courses = allCourses;
    
    alert("Le planning a été synchronisé avec succès (39 cours ajoutés). La page va se recharger.");
    location.reload();
  } catch(e) {
    console.error(e);
    alert("Erreur: " + e.message);
    btn.textContent = "Erreur. Réessayez.";
    btn.disabled = false;
  }
};


window.migrateProfs2026 = async function() {
  const btn = document.getElementById('btn-migrate-profs');
  if(!confirm("Êtes-vous sûr de vouloir créer les professeurs manquants ?")) return;
  
  try {
    btn.textContent = "Création en cours...";
    btn.disabled = true;
    
    const firebase = await import('./firebase-config.js');
    
    const profNames = [
      'Janis Romain', 'Jeanne Lefèvre', 'Loreen Poncelet', 'Maeva Delgoffe', 'Margaux Hubert',
      'Maurine Baudon', 'Pauline Gérard', 'Zoé Lambert', 'Jade Nélis', 'Daisy Theunissen',
      'Corentin Milosevic', 'Charlotte Varoquaux', 'Andrew Schmitz', 'Clémentine Mamdy', 'Lili Maury',
      'Florence Leyens', 'Adam Binoua'
    ];
    
    let createdCount = 0;
    
    // Fetch all users directly from DB to be absolutely sure
    const usersSnap = await firebase.getDocs(firebase.collection(firebase.db, "users"));
    const allDbUsers = [];
    usersSnap.forEach(d => allDbUsers.push(d.data()));
    
    for (let fullName of profNames) {
      // Check if a prof with this exact name already exists in DB
      const exists = allDbUsers.find(u => u.role === 'prof' && u.name === fullName);
      
      if (!exists) {
        const parts = fullName.split(' ');
        const firstname = parts[0];
        const lastname = parts.slice(1).join(' ');
        
        // Remove accents safely for email
        const cleanFirstName = firstname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const cleanLastName = lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '');
        const dummyEmail = `${cleanFirstName}${cleanLastName ? '.' + cleanLastName : ''}@adk.local`;
        
        const profData = {
          role: 'prof',
          firstname: firstname,
          lastname: lastname,
          name: fullName,
          dob: '',
          email: dummyEmail,
          phone: '',
          hasTutor: false,
          avatar: '👨‍🏫'
        };
        
        await firebase.setDoc(firebase.doc(firebase.collection(firebase.db, "users"), dummyEmail), profData);
        createdCount++;
      }
    }
    
    alert(`${createdCount} professeurs ont été créés avec succès. Veuillez rafraîchir la page.`);
    location.reload();
  } catch(e) {
    console.error(e);
    alert("Erreur: " + e.message);
    btn.textContent = "Erreur. Réessayez.";
    btn.disabled = false;
  }
};


window.resetNotificationsAndMessages = async function() {
  const btn = document.getElementById('btn-reset-data');
  if(!confirm("ÊTES-VOUS ABSOLUMENT SÛR de vouloir supprimer toutes les notifications et tous les messages ? Cette action est irréversible.")) return;
  if(!confirm("Confirmation finale : Tout effacer ?")) return;
  
  try {
    btn.textContent = "Effacement en cours...";
    btn.disabled = true;
    
    const firebase = await import('./firebase-config.js');
    
    // 1. Delete Announcements
    const annSnap = await firebase.getDocs(firebase.collection(firebase.db, "announcements"));
    for (let d of annSnap.docs) {
      await firebase.deleteDoc(firebase.doc(firebase.db, "announcements", d.id));
    }
    
    // 2. Delete Conversations (which also hides the messages)
    const convSnap = await firebase.getDocs(firebase.collection(firebase.db, "conversations"));
    for (let d of convSnap.docs) {
      // Technically we should delete subcollections but deleting the main doc makes it invisible to queries
      // We will do both for cleanliness
      const msgSnap = await firebase.getDocs(firebase.collection(firebase.db, "conversations", d.id, "messages"));
      for (let m of msgSnap.docs) {
        await firebase.deleteDoc(firebase.doc(firebase.db, "conversations", d.id, "messages", m.id));
      }
      await firebase.deleteDoc(firebase.doc(firebase.db, "conversations", d.id));
    }
    
    // Clear local data
    window.DATA.announcements = [];
    
    alert("Les notifications et la messagerie ont été remises à zéro avec succès.");
    location.reload();
  } catch(e) {
    console.error(e);
    alert("Erreur: " + e.message);
    btn.textContent = "Erreur. Réessayez.";
    btn.disabled = false;
  }
};



// =============================================
// IMPORT ÉLÈVES 2026-2027 (sans envoi d'email)
// =============================================
window.migrateStudents2026 = async function() {
  const STUDENTS = [
  {
    "dob": "11/10/2009",
    "courseIds": [
      24,
      38,
      39
    ],
    "id": "louna.geimer",
    "firstname": "Louna",
    "lastname": "GEIMER",
    "contactEmail": "rouki117@hotmail.com",
    "parentId": "rouki117@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louna.geimer"
  },
  {
    "dob": "23/11/2005",
    "courseIds": [
      24,
      8,
      16,
      38
    ],
    "id": "ines.andrianne",
    "firstname": "Ines",
    "lastname": "ANDRIANNE",
    "contactEmail": "andrianne.ines@hotmail.com",
    "parentId": "andrianne.ines@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ines.andrianne"
  },
  {
    "dob": "17/10/2009",
    "courseIds": [
      2,
      3,
      8,
      16,
      24,
      29,
      30
    ],
    "id": "victoria.bastin",
    "firstname": "Victoria",
    "lastname": "BASTIN",
    "contactEmail": "richardsarah979@gmail.com",
    "parentId": "richardsarah979@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=victoria.bastin"
  },
  {
    "dob": "18/07/2011",
    "courseIds": [
      2,
      3,
      8,
      9,
      16,
      24
    ],
    "id": "louna.chapellier",
    "firstname": "Louna",
    "lastname": "CHAPELLIER",
    "contactEmail": "steph.hemmer@hotmail.com",
    "parentId": "steph.hemmer@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louna.chapellier"
  },
  {
    "dob": "",
    "courseIds": [
      24
    ],
    "id": "fanny.claessens",
    "firstname": "Fanny",
    "lastname": "CLAESSENS",
    "contactEmail": "severine.vliegen@gmail.com",
    "parentId": "severine.vliegen@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=fanny.claessens"
  },
  {
    "dob": "15/09/2011",
    "courseIds": [
      2,
      3,
      8,
      16,
      27
    ],
    "id": "elisa.delcourt",
    "firstname": "Elisa",
    "lastname": "DELCOURT",
    "contactEmail": "melissagallo09@hotmail.com",
    "parentId": "melissagallo09@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elisa.delcourt"
  },
  {
    "dob": "30/10/2013",
    "courseIds": [
      27,
      21
    ],
    "id": "louna.fourny",
    "firstname": "Louna",
    "lastname": "FOURNY",
    "contactEmail": "emeline.mathieu@hotmail.be",
    "parentId": "emeline.mathieu@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louna.fourny"
  },
  {
    "dob": "20/01/2016",
    "courseIds": [
      1,
      8,
      16,
      21,
      27
    ],
    "id": "mya.nalinnes",
    "firstname": "Mya",
    "lastname": "NALINNES",
    "contactEmail": "steph.leyder@hotmail.be",
    "parentId": "steph.leyder@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mya.nalinnes"
  },
  {
    "dob": "12/04/2012",
    "courseIds": [
      2,
      3,
      8,
      16,
      24
    ],
    "id": "aude.nelis",
    "firstname": "Aude",
    "lastname": "NELIS",
    "contactEmail": "lanotte.marylise76@gmail.com",
    "parentId": "lanotte.marylise76@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aude.nelis"
  },
  {
    "dob": "",
    "courseIds": [
      39,
      8,
      9,
      16,
      24,
      29,
      30
    ],
    "id": "romane.perrang",
    "firstname": "Romane",
    "lastname": "PERRANG",
    "contactEmail": "fa.hubert@hotmail.com",
    "parentId": "fa.hubert@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=romane.perrang"
  },
  {
    "dob": "19/09/2010",
    "courseIds": [
      8,
      9,
      16,
      27,
      29
    ],
    "id": "lea.pezzuto",
    "firstname": "Léa",
    "lastname": "PEZZUTO",
    "contactEmail": "sophiedeom@hotmail.com",
    "parentId": "sophiedeom@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lea.pezzuto"
  },
  {
    "dob": "14/10/2009",
    "courseIds": [
      8,
      9,
      16,
      21,
      24,
      30
    ],
    "id": "camille.varoquaux",
    "firstname": "Camille",
    "lastname": "VAROQUAUX",
    "contactEmail": "lamottemegan3@gmail.com",
    "parentId": "lamottemegan3@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=camille.varoquaux"
  },
  {
    "dob": "13/12/2004",
    "courseIds": [
      24,
      26,
      28,
      30
    ],
    "id": "eva.baijot",
    "firstname": "Eva",
    "lastname": "BAIJOT",
    "contactEmail": "evabaijot@gmail.com",
    "parentId": "evabaijot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eva.baijot"
  },
  {
    "dob": "14/08/2009",
    "courseIds": [
      2,
      3,
      4,
      8,
      9,
      16,
      24,
      26,
      28,
      29,
      30
    ],
    "id": "emilie.bertrand",
    "firstname": "Emilie",
    "lastname": "BERTRAND",
    "contactEmail": "famillebertrand25@gmail.com",
    "parentId": "famillebertrand25@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emilie.bertrand"
  },
  {
    "dob": "10/03/2000",
    "courseIds": [
      8,
      16,
      26,
      28,
      29
    ],
    "id": "maeva.delgoffe",
    "firstname": "Maeva",
    "lastname": "DELGOFFE",
    "contactEmail": "maevadelgoffe1003@gmail.com",
    "parentId": "maevadelgoffe1003@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maeva.delgoffe"
  },
  {
    "dob": "11/07/2009",
    "courseIds": [
      24,
      26,
      30
    ],
    "id": "pauline.gerard",
    "firstname": "Pauline",
    "lastname": "GERARD",
    "contactEmail": "elodie.toche@gmail.com",
    "parentId": "elodie.toche@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=pauline.gerard"
  },
  {
    "dob": "01/09/2006",
    "courseIds": [
      26,
      28,
      30
    ],
    "id": "lena.homel",
    "firstname": "Lena",
    "lastname": "HOMEL",
    "contactEmail": "r.pamela3@hotmail.com",
    "parentId": "r.pamela3@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lena.homel"
  },
  {
    "dob": "16/12/2002",
    "courseIds": [
      24,
      26,
      28,
      29,
      30
    ],
    "id": "margaux.hubert",
    "firstname": "Margaux",
    "lastname": "HUBERT",
    "contactEmail": "margaux.hubert6821@gmail.com",
    "parentId": "margaux.hubert6821@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=margaux.hubert"
  },
  {
    "dob": "05/11/2010",
    "courseIds": [
      2,
      3,
      8,
      9,
      16,
      24,
      26,
      29,
      30
    ],
    "id": "violette.jusseret",
    "firstname": "Violette",
    "lastname": "JUSSERET",
    "contactEmail": "sandraromain@hotmail.com",
    "parentId": "sandraromain@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=violette.jusseret"
  },
  {
    "dob": "10/02/2004",
    "courseIds": [
      26,
      29,
      30
    ],
    "id": "zoe.lambert",
    "firstname": "Zoé",
    "lastname": "LAMBERT",
    "contactEmail": "zoe.lambert10@outlook.fr",
    "parentId": "zoe.lambert10@outlook.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.lambert"
  },
  {
    "dob": "30/07/2010",
    "courseIds": [
      2,
      3,
      24,
      26,
      29,
      30
    ],
    "id": "jeanne.lefevre",
    "firstname": "Jeanne",
    "lastname": "LEFEVRE",
    "contactEmail": "fb414462@skynet.be",
    "parentId": "fb414462@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jeanne.lefevre"
  },
  {
    "dob": "05/06/2007",
    "courseIds": [
      24,
      26,
      28,
      30
    ],
    "id": "sashane.malhage",
    "firstname": "Sashane",
    "lastname": "MALHAGE",
    "contactEmail": "jessicalouviaux@gmail.com",
    "parentId": "jessicalouviaux@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sashane.malhage"
  },
  {
    "dob": "01/02/2006",
    "courseIds": [
      2,
      3,
      4,
      24,
      26,
      28,
      30
    ],
    "id": "lili.maury",
    "firstname": "Lili",
    "lastname": "MAURY",
    "contactEmail": "maurylili06@yahoo.com",
    "parentId": "maurylili06@yahoo.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lili.maury"
  },
  {
    "dob": "28/09/2008",
    "courseIds": [
      2,
      3,
      8,
      9,
      16,
      24,
      26,
      29,
      30
    ],
    "id": "jade.nelis",
    "firstname": "Jade",
    "lastname": "NELIS",
    "contactEmail": "lanotte.marylise76@gmail.com",
    "parentId": "lanotte.marylise76@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.nelis"
  },
  {
    "dob": "06/11/2009",
    "courseIds": [
      32,
      33,
      2,
      3,
      8,
      9,
      16,
      24,
      26,
      29,
      30
    ],
    "id": "loreen.poncelet",
    "firstname": "Loreen",
    "lastname": "PONCELET",
    "contactEmail": "ponceletloreen@gmail.com",
    "parentId": "ponceletloreen@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=loreen.poncelet"
  },
  {
    "dob": "23/12/2003",
    "courseIds": [
      4,
      24,
      26,
      29,
      30
    ],
    "id": "janis.romain",
    "firstname": "Janis",
    "lastname": "ROMAIN",
    "contactEmail": "janisromain23@gmail.com",
    "parentId": "janisromain23@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=janis.romain"
  },
  {
    "dob": "27/05/2008",
    "courseIds": [
      8,
      16,
      24,
      26,
      28,
      29,
      30
    ],
    "id": "nina.rotunno",
    "firstname": "Nina",
    "lastname": "ROTUNNO",
    "contactEmail": "ninarotunno05@gmail.com",
    "parentId": "ninarotunno05@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nina.rotunno"
  },
  {
    "dob": "19/04/2007",
    "courseIds": [
      2,
      3,
      24,
      26,
      28,
      30
    ],
    "id": "lucie.sibret",
    "firstname": "Lucie",
    "lastname": "SIBRET",
    "contactEmail": "luciecastagnette07@gmail.com",
    "parentId": "luciecastagnette07@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.sibret"
  },
  {
    "dob": "22/10/2011",
    "courseIds": [
      24,
      26,
      21
    ],
    "id": "giulia.tognolli",
    "firstname": "Giulia",
    "lastname": "TOGNOLLI",
    "contactEmail": "contact@sainte-ode.net",
    "parentId": "contact@sainte-ode.net",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=giulia.tognolli"
  },
  {
    "dob": "",
    "courseIds": [
      2,
      3,
      4,
      8,
      16,
      24,
      26,
      28,
      29,
      30
    ],
    "id": "charlotte.varoquaux",
    "firstname": "Charlotte",
    "lastname": "VAROQUAUX",
    "contactEmail": "lamottemegan3@gmail.com",
    "parentId": "lamottemegan3@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlotte.varoquaux"
  },
  {
    "dob": "13/09/2004",
    "courseIds": [
      2,
      3,
      4,
      24,
      28,
      29,
      30
    ],
    "id": "romane.caille",
    "firstname": "Romane",
    "lastname": "CAILLE",
    "contactEmail": "caille.romane13@gmail.com",
    "parentId": "caille.romane13@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=romane.caille"
  },
  {
    "dob": "14/01/2007",
    "courseIds": [
      28,
      30
    ],
    "id": "nell.etienne",
    "firstname": "Nell",
    "lastname": "ETIENNE",
    "contactEmail": "etienne.nnlo@gmail.com",
    "parentId": "etienne.nnlo@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nell.etienne"
  },
  {
    "dob": "20/02/2024",
    "courseIds": [
      12
    ],
    "id": "elie.briolat",
    "firstname": "Elie",
    "lastname": "BRIOLAT",
    "contactEmail": "severine.dumont@hotmail.com",
    "parentId": "severine.dumont@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elie.briolat"
  },
  {
    "dob": "05/04/2023",
    "courseIds": [
      12
    ],
    "id": "lucie.bryssens",
    "firstname": "Lucie",
    "lastname": "BRYSSENS",
    "contactEmail": "lisa.fraiture@gmail.com",
    "parentId": "lisa.fraiture@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.bryssens"
  },
  {
    "dob": "22/02/2023",
    "courseIds": [
      12
    ],
    "id": "jade.dalier",
    "firstname": "Jade",
    "lastname": "DALIER",
    "contactEmail": "hussonoceane7@gmail.com",
    "parentId": "hussonoceane7@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.dalier"
  },
  {
    "dob": "17/03/2023",
    "courseIds": [
      12
    ],
    "id": "elea.delaisse",
    "firstname": "Éléa",
    "lastname": "DELAISSE",
    "contactEmail": "paulineincourt@gmail.com",
    "parentId": "paulineincourt@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elea.delaisse"
  },
  {
    "dob": "24/01/2023",
    "courseIds": [
      12
    ],
    "id": "louise.d'orchymont",
    "firstname": "Louise",
    "lastname": "D'ORCHYMONT",
    "contactEmail": "cindy.durbecq@hotmail.fr",
    "parentId": "cindy.durbecq@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.d'orchymont"
  },
  {
    "dob": "09/02/2021",
    "courseIds": [
      12
    ],
    "id": "capucine.gigi",
    "firstname": "Capucine",
    "lastname": "GIGI",
    "contactEmail": "camilledubru@hotmail.be",
    "parentId": "camilledubru@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.gigi"
  },
  {
    "dob": "18/06/2022",
    "courseIds": [
      12
    ],
    "id": "julia.gillet",
    "firstname": "Julia",
    "lastname": "GILLET",
    "contactEmail": "jen_0589@hotmail.com",
    "parentId": "jen_0589@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.gillet"
  },
  {
    "dob": "30/04/2022",
    "courseIds": [
      12
    ],
    "id": "lina.godefroid",
    "firstname": "Lina",
    "lastname": "GODEFROID",
    "contactEmail": "pauline_perreaux@hotmail.com",
    "parentId": "pauline_perreaux@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lina.godefroid"
  },
  {
    "dob": "10/01/2022",
    "courseIds": [
      12
    ],
    "id": "ines.godefroid",
    "firstname": "Inès",
    "lastname": "GODEFROID",
    "contactEmail": "violette_rossignon@hotmail.com",
    "parentId": "violette_rossignon@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ines.godefroid"
  },
  {
    "dob": "18/06/2022",
    "courseIds": [
      12
    ],
    "id": "cloe.guerard",
    "firstname": "Cloé",
    "lastname": "GUERARD",
    "contactEmail": "martinehovent@live.be",
    "parentId": "martinehovent@live.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=cloe.guerard"
  },
  {
    "dob": "03/04/2023",
    "courseIds": [
      12
    ],
    "id": "zia.helsen",
    "firstname": "Zia",
    "lastname": "HELSEN",
    "contactEmail": "delphine0816@hotmail.com",
    "parentId": "delphine0816@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zia.helsen"
  },
  {
    "dob": "05/08/2023",
    "courseIds": [
      12
    ],
    "id": "coline.henrion",
    "firstname": "Coline",
    "lastname": "HENRION",
    "contactEmail": "lamottemegan3@gmail.com",
    "parentId": "lamottemegan3@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=coline.henrion"
  },
  {
    "dob": "11/07/2022",
    "courseIds": [
      12
    ],
    "id": "jade.henuset",
    "firstname": "Jade",
    "lastname": "HENUSET",
    "contactEmail": "vanessaalouppe@gmail.com",
    "parentId": "vanessaalouppe@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.henuset"
  },
  {
    "dob": "11/12/2022",
    "courseIds": [
      12
    ],
    "id": "lïana.huaux",
    "firstname": "Lïana",
    "lastname": "HUAUX",
    "contactEmail": "servais89@gmail.com",
    "parentId": "servais89@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lïana.huaux"
  },
  {
    "dob": "11/01/2023",
    "courseIds": [
      12
    ],
    "id": "louis.lambert",
    "firstname": "Louis",
    "lastname": "LAMBERT",
    "contactEmail": "genart.alexandra@gmail.com",
    "parentId": "genart.alexandra@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louis.lambert"
  },
  {
    "dob": "08/04/2023",
    "courseIds": [
      12
    ],
    "id": "lolita.lejeune",
    "firstname": "Lolita",
    "lastname": "LEJEUNE",
    "contactEmail": "marine.menestret@gmail.com",
    "parentId": "marine.menestret@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lolita.lejeune"
  },
  {
    "dob": "10/03/2023",
    "courseIds": [
      12
    ],
    "id": "lou.lempereur",
    "firstname": "Lou",
    "lastname": "LEMPEREUR",
    "contactEmail": "heidivandeuren200038@gmail.com",
    "parentId": "heidivandeuren200038@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lou.lempereur"
  },
  {
    "dob": "12/12/2022",
    "courseIds": [
      12
    ],
    "id": "romy.lousth",
    "firstname": "Romy",
    "lastname": "LOUSTH",
    "contactEmail": "c.nonnon@laposte.net",
    "parentId": "c.nonnon@laposte.net",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=romy.lousth"
  },
  {
    "dob": "22/05/2023",
    "courseIds": [
      12
    ],
    "id": "louise.martin",
    "firstname": "louise",
    "lastname": "MARTIN",
    "contactEmail": "audrey.cachard@hotmail.com",
    "parentId": "audrey.cachard@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.martin"
  },
  {
    "dob": "22/06/2021",
    "courseIds": [
      12
    ],
    "id": "ana.noiset",
    "firstname": "Ana",
    "lastname": "NOISET",
    "contactEmail": "norma_loggi@hotmail.com",
    "parentId": "norma_loggi@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ana.noiset"
  },
  {
    "dob": "30/03/2022",
    "courseIds": [
      12
    ],
    "id": "loona.ospitalcollin",
    "firstname": "Loona",
    "lastname": "OSPITAL COLLIN",
    "contactEmail": "ospital_c@hotmail.com",
    "parentId": "ospital_c@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=loona.ospitalcollin"
  },
  {
    "dob": "04/10/2022",
    "courseIds": [
      12
    ],
    "id": "olivia.richard",
    "firstname": "Olivia",
    "lastname": "RICHARD",
    "contactEmail": "morane.hesbois@hotmail.com",
    "parentId": "morane.hesbois@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=olivia.richard"
  },
  {
    "dob": "20/08/2022",
    "courseIds": [
      12
    ],
    "id": "iryna.tome",
    "firstname": "Iryna",
    "lastname": "TOME",
    "contactEmail": "chelsea.watelet@hotmail.com",
    "parentId": "chelsea.watelet@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=iryna.tome"
  },
  {
    "dob": "19/09/2022",
    "courseIds": [
      12
    ],
    "id": "emilia.watelet",
    "firstname": "Emilia",
    "lastname": "WATELET",
    "contactEmail": "v.abeels@gmail.com",
    "parentId": "v.abeels@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emilia.watelet"
  },
  {
    "dob": "17/05/2023",
    "courseIds": [
      12
    ],
    "id": "lilya.yakounin",
    "firstname": "Lilya",
    "lastname": "YAKOUNIN",
    "contactEmail": "julierenard99@hotmail.com",
    "parentId": "julierenard99@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lilya.yakounin"
  },
  {
    "dob": "29/04/2022",
    "courseIds": [
      12
    ],
    "id": "romane.zacharie",
    "firstname": "Romane",
    "lastname": "ZACHARIE",
    "contactEmail": "louise.jacquemin@gmail.com",
    "parentId": "louise.jacquemin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=romane.zacharie"
  },
  {
    "dob": "28/11/2022",
    "courseIds": [
      12
    ],
    "id": "aurelie.gardien",
    "firstname": "Aurélie",
    "lastname": "GARDIEN",
    "contactEmail": "aureliegardien@yahoo.fr",
    "parentId": "aureliegardien@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aurelie.gardien"
  },
  {
    "dob": "14/12/2021",
    "courseIds": [
      11
    ],
    "id": "rose.casel",
    "firstname": "Rose",
    "lastname": "CASEL",
    "contactEmail": "catherineschneder@me.com",
    "parentId": "catherineschneder@me.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rose.casel"
  },
  {
    "dob": "23/03/2021",
    "courseIds": [
      11
    ],
    "id": "emma.defat",
    "firstname": "Emma",
    "lastname": "DEFAT",
    "contactEmail": "celinejacoby@gmail.com",
    "parentId": "celinejacoby@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.defat"
  },
  {
    "dob": "25/06/2021",
    "courseIds": [
      11
    ],
    "id": "noemie.deremince",
    "firstname": "Noémie",
    "lastname": "DEREMINCE",
    "contactEmail": "juju2396@hotmail.com",
    "parentId": "juju2396@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=noemie.deremince"
  },
  {
    "dob": "22/06/2022",
    "courseIds": [
      11
    ],
    "id": "alizee.georges",
    "firstname": "Alizée",
    "lastname": "GEORGES",
    "contactEmail": "astrid-thirion@hotmail.com",
    "parentId": "astrid-thirion@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alizee.georges"
  },
  {
    "dob": "08/06/2021",
    "courseIds": [
      11
    ],
    "id": "victoire.goffin",
    "firstname": "Victoire",
    "lastname": "GOFFIN",
    "contactEmail": "france-goffin@hotmail.com",
    "parentId": "france-goffin@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=victoire.goffin"
  },
  {
    "dob": "10/03/2021",
    "courseIds": [
      11
    ],
    "id": "lorysia.gomez",
    "firstname": "Lorysia",
    "lastname": "GOMEZ",
    "contactEmail": "coraliecabanac@gmail.com",
    "parentId": "coraliecabanac@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lorysia.gomez"
  },
  {
    "dob": "13/09/2021",
    "courseIds": [
      11
    ],
    "id": "marion.gourmet",
    "firstname": "Marion",
    "lastname": "GOURMET",
    "contactEmail": "julien.gourmet@gmail.com",
    "parentId": "julien.gourmet@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marion.gourmet"
  },
  {
    "dob": "18/08/2021",
    "courseIds": [
      11
    ],
    "id": "damien.grosjean",
    "firstname": "Damien",
    "lastname": "GROSJEAN",
    "contactEmail": "marie.fremy@hotmail.com",
    "parentId": "marie.fremy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=damien.grosjean"
  },
  {
    "dob": "07/07/2021",
    "courseIds": [
      11,
      14
    ],
    "id": "olivia.guillaume",
    "firstname": "Olivia",
    "lastname": "GUILLAUME",
    "contactEmail": "tiffany.fay@orange.fr",
    "parentId": "tiffany.fay@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=olivia.guillaume"
  },
  {
    "dob": "15/03/2022",
    "courseIds": [
      11
    ],
    "id": "milá.herbots",
    "firstname": "Milá",
    "lastname": "HERBOTS",
    "contactEmail": "cynthia.rigole@gmail.com",
    "parentId": "cynthia.rigole@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=milá.herbots"
  },
  {
    "dob": "13/08/2022",
    "courseIds": [
      11
    ],
    "id": "alice.lejeune",
    "firstname": "Alice",
    "lastname": "LEJEUNE",
    "contactEmail": "jonathan.lejeune.hebp@gmail.com",
    "parentId": "jonathan.lejeune.hebp@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alice.lejeune"
  },
  {
    "dob": "26/06/2022",
    "courseIds": [
      11
    ],
    "id": "evie.lequeux",
    "firstname": "Evie",
    "lastname": "LEQUEUX",
    "contactEmail": "lydie.romain90@gmail.com",
    "parentId": "lydie.romain90@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=evie.lequeux"
  },
  {
    "dob": "20/02/2022",
    "courseIds": [
      11
    ],
    "id": "naëlya.libres",
    "firstname": "Naëlya",
    "lastname": "LIBRES",
    "contactEmail": "melanie.doyen.24@gmail.com",
    "parentId": "melanie.doyen.24@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=naëlya.libres"
  },
  {
    "dob": "14/01/2022",
    "courseIds": [
      11
    ],
    "id": "adele.lobet",
    "firstname": "Adèle",
    "lastname": "LOBET",
    "contactEmail": "lorie_l@hotmail.com",
    "parentId": "lorie_l@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adele.lobet"
  },
  {
    "dob": "03/01/2022",
    "courseIds": [
      11
    ],
    "id": "agathe.morette",
    "firstname": "Agathe",
    "lastname": "MORETTE",
    "contactEmail": "aurelhuberty@hotmail.com",
    "parentId": "aurelhuberty@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=agathe.morette"
  },
  {
    "dob": "14/09/2021",
    "courseIds": [
      11
    ],
    "id": "capucine.moris",
    "firstname": "Capucine",
    "lastname": "MORIS",
    "contactEmail": "sarah.debecker@hotmail.com",
    "parentId": "sarah.debecker@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.moris"
  },
  {
    "dob": "15/05/2022",
    "courseIds": [
      11
    ],
    "id": "ellya.noiziez",
    "firstname": "Éllya",
    "lastname": "NOIZIEZ",
    "contactEmail": "lesslyraulin7@gmail.com",
    "parentId": "lesslyraulin7@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ellya.noiziez"
  },
  {
    "dob": "11/05/2022",
    "courseIds": [
      11
    ],
    "id": "louisa.percetti",
    "firstname": "Louisa",
    "lastname": "PERCETTI",
    "contactEmail": "bergermelanie1985@hotmail.com",
    "parentId": "bergermelanie1985@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louisa.percetti"
  },
  {
    "dob": "01/06/2022",
    "courseIds": [
      11
    ],
    "id": "naomi.protin-sarlet",
    "firstname": "Naomi",
    "lastname": "PROTIN - SARLET",
    "contactEmail": "herionmaite@hotmail.fr",
    "parentId": "herionmaite@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=naomi.protin-sarlet"
  },
  {
    "dob": "01/06/2022",
    "courseIds": [
      11
    ],
    "id": "naomi.protinscarlet",
    "firstname": "Naomi",
    "lastname": "PROTIN SCARLET",
    "contactEmail": "herionmaite@hotmail.fr",
    "parentId": "herionmaite@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=naomi.protinscarlet"
  },
  {
    "dob": "02/11/2022",
    "courseIds": [
      11
    ],
    "id": "adele.richard",
    "firstname": "Adèle",
    "lastname": "RICHARD",
    "contactEmail": "alinever@hotmail.com",
    "parentId": "alinever@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adele.richard"
  },
  {
    "dob": "01/03/2022",
    "courseIds": [
      11
    ],
    "id": "emilie.strougmayer",
    "firstname": "Emilie",
    "lastname": "STROUGMAYER",
    "contactEmail": "loquet.charlene@hotmail.com",
    "parentId": "loquet.charlene@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emilie.strougmayer"
  },
  {
    "dob": "28/07/2021",
    "courseIds": [
      11
    ],
    "id": "hailey.viste",
    "firstname": "Hailey",
    "lastname": "VISTE",
    "contactEmail": "lauriecoljon03@gmail.com",
    "parentId": "lauriecoljon03@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=hailey.viste"
  },
  {
    "dob": "10/08/2021",
    "courseIds": [
      11
    ],
    "id": "oscar.darge",
    "firstname": "Oscar",
    "lastname": "DARGE",
    "contactEmail": "pierlot.anne@gmail.com",
    "parentId": "pierlot.anne@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=oscar.darge"
  },
  {
    "dob": "10/08/2021",
    "courseIds": [
      11
    ],
    "id": "henri.darge",
    "firstname": "Henri",
    "lastname": "DARGE",
    "contactEmail": "pierlot.anne@gmail.com",
    "parentId": "pierlot.anne@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=henri.darge"
  },
  {
    "dob": "14/03/2020",
    "courseIds": [
      11
    ],
    "id": "stellapresentes.cannata",
    "firstname": "Stella présente S",
    "lastname": "CANNATA",
    "contactEmail": "tiziana.pecoraro28@gmail.com",
    "parentId": "tiziana.pecoraro28@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=stellapresentes.cannata"
  },
  {
    "dob": "09/04/2020",
    "courseIds": [
      11
    ],
    "id": "ezia.chevalier",
    "firstname": "Ezia",
    "lastname": "CHEVALIER",
    "contactEmail": "jacquemin.medigane@gmail.com",
    "parentId": "jacquemin.medigane@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ezia.chevalier"
  },
  {
    "dob": "17/12/2020",
    "courseIds": [
      11
    ],
    "id": "isao.duliere",
    "firstname": "Isao",
    "lastname": "DULIERE",
    "contactEmail": "whitney-miu@hotmail.com",
    "parentId": "whitney-miu@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=isao.duliere"
  },
  {
    "dob": "02/02/2020",
    "courseIds": [
      11
    ],
    "id": "alicepresentes.dyja",
    "firstname": "Alice présente S",
    "lastname": "DYJA",
    "contactEmail": "perrinedelannoy19@gmail.com",
    "parentId": "perrinedelannoy19@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alicepresentes.dyja"
  },
  {
    "dob": "06/01/2021",
    "courseIds": [
      11
    ],
    "id": "maya.franck",
    "firstname": "Maya",
    "lastname": "FRANCK",
    "contactEmail": "ophelie.hinque@gmail.com",
    "parentId": "ophelie.hinque@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maya.franck"
  },
  {
    "dob": "17/07/2021",
    "courseIds": [
      11
    ],
    "id": "lizy.georis",
    "firstname": "Lizy",
    "lastname": "GEORIS",
    "contactEmail": "mabriste@skynet.be",
    "parentId": "mabriste@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lizy.georis"
  },
  {
    "dob": "17/07/2021",
    "courseIds": [
      11
    ],
    "id": "josie.georis",
    "firstname": "Josie",
    "lastname": "GEORIS",
    "contactEmail": "mabriste@skynet.be",
    "parentId": "mabriste@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=josie.georis"
  },
  {
    "dob": "18/08/2021",
    "courseIds": [
      11
    ],
    "id": "alice.grosjean",
    "firstname": "Alice",
    "lastname": "GROSJEAN",
    "contactEmail": "marie.fremy@hotmail.com",
    "parentId": "marie.fremy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alice.grosjean"
  },
  {
    "dob": "10/08/2021",
    "courseIds": [
      11
    ],
    "id": "iris.jeunehomme",
    "firstname": "Iris",
    "lastname": "JEUNEHOMME",
    "contactEmail": "denis_jeunehomme@yahoo.fr",
    "parentId": "denis_jeunehomme@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=iris.jeunehomme"
  },
  {
    "dob": "12/12/2019",
    "courseIds": [
      22
    ],
    "id": "meline.andrianne",
    "firstname": "Méline",
    "lastname": "ANDRIANNE",
    "contactEmail": "celinelasalle@wanadoo.fr",
    "parentId": "celinelasalle@wanadoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=meline.andrianne"
  },
  {
    "dob": "08/09/2018",
    "courseIds": [
      22
    ],
    "id": "capucine.antoine",
    "firstname": "Capucine",
    "lastname": "ANTOINE",
    "contactEmail": "tomemarcy@hotmail.com",
    "parentId": "tomemarcy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.antoine"
  },
  {
    "dob": "16/12/2020",
    "courseIds": [
      22
    ],
    "id": "ninon.bertrand",
    "firstname": "Ninon",
    "lastname": "BERTRAND",
    "contactEmail": "louise.poncelet@live.be",
    "parentId": "louise.poncelet@live.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ninon.bertrand"
  },
  {
    "dob": "24/03/2018",
    "courseIds": [
      22,
      7
    ],
    "id": "berenice.blanco",
    "firstname": "Bérénice",
    "lastname": "BLANCO",
    "contactEmail": "laurent-valerie05@hotmail.com",
    "parentId": "laurent-valerie05@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=berenice.blanco"
  },
  {
    "dob": "11/01/2021",
    "courseIds": [
      22
    ],
    "id": "judy.blanco",
    "firstname": "Judy",
    "lastname": "BLANCO",
    "contactEmail": "laurent-valerie05@hotmail.com",
    "parentId": "laurent-valerie05@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=judy.blanco"
  },
  {
    "dob": "07/05/2019",
    "courseIds": [
      22
    ],
    "id": "mia.damilot",
    "firstname": "MIA",
    "lastname": "DAMILOT",
    "contactEmail": "meganne.huaux@gmail.com",
    "parentId": "meganne.huaux@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mia.damilot"
  },
  {
    "dob": "07/10/2019",
    "courseIds": [
      22
    ],
    "id": "capucine.debueger",
    "firstname": "Capucine",
    "lastname": "DE BUEGER",
    "contactEmail": "nanoudevelp@yahoo.com",
    "parentId": "nanoudevelp@yahoo.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.debueger"
  },
  {
    "dob": "20/03/2019",
    "courseIds": [
      17,
      22
    ],
    "id": "ninon.echement",
    "firstname": "Ninon",
    "lastname": "ECHEMENT",
    "contactEmail": "simon.emilie@hotmail.com",
    "parentId": "simon.emilie@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ninon.echement"
  },
  {
    "dob": "29/07/2019",
    "courseIds": [
      22
    ],
    "id": "adelyna.grolet",
    "firstname": "Adelyna",
    "lastname": "GROLET",
    "contactEmail": "nini0079@hotmail.com",
    "parentId": "nini0079@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adelyna.grolet"
  },
  {
    "dob": "02/08/2019",
    "courseIds": [
      22
    ],
    "id": "aleyna.guillaume",
    "firstname": "Aleyna",
    "lastname": "GUILLAUME",
    "contactEmail": "aureliejean1990@hotmail.com",
    "parentId": "aureliejean1990@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aleyna.guillaume"
  },
  {
    "dob": "06/08/2020",
    "courseIds": [
      22
    ],
    "id": "henri.halleux",
    "firstname": "Henri",
    "lastname": "HALLEUX",
    "contactEmail": "julie.gruselin@hotmail.com",
    "parentId": "julie.gruselin@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=henri.halleux"
  },
  {
    "dob": "11/09/2017",
    "courseIds": [
      22
    ],
    "id": "maëlly.hardy",
    "firstname": "Maëlly",
    "lastname": "HARDY",
    "contactEmail": "ansiauxtressy28@gmail.com",
    "parentId": "ansiauxtressy28@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maëlly.hardy"
  },
  {
    "dob": "16/09/2020",
    "courseIds": [
      22
    ],
    "id": "elie.henry",
    "firstname": "Élie",
    "lastname": "HENRY",
    "contactEmail": "marion.flamion@hotmail.fr",
    "parentId": "marion.flamion@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elie.henry"
  },
  {
    "dob": "24/09/2019",
    "courseIds": [
      22
    ],
    "id": "capucine.holbrecht",
    "firstname": "Capucine",
    "lastname": "HOLBRECHT",
    "contactEmail": "china.elise@hotmail.com",
    "parentId": "china.elise@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.holbrecht"
  },
  {
    "dob": "05/04/2019",
    "courseIds": [
      22
    ],
    "id": "aaliyah.houbionlorant",
    "firstname": "Aaliyah",
    "lastname": "HOUBION LORANT",
    "contactEmail": "lorantsherline05@gmail.com",
    "parentId": "lorantsherline05@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aaliyah.houbionlorant"
  },
  {
    "dob": "20/01/2018",
    "courseIds": [
      22
    ],
    "id": "marlene.lenoir",
    "firstname": "Marlène",
    "lastname": "LENOIR",
    "contactEmail": "virginie.p.evrard@gmail.com",
    "parentId": "virginie.p.evrard@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marlene.lenoir"
  },
  {
    "dob": "",
    "courseIds": [
      22
    ],
    "id": "adele.lequy",
    "firstname": "Adèle",
    "lastname": "LEQUY",
    "contactEmail": "chloe.ha95@gmail.com",
    "parentId": "chloe.ha95@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adele.lequy"
  },
  {
    "dob": "01/10/2020",
    "courseIds": [
      10,
      5,
      22,
      6
    ],
    "id": "emma.lousth",
    "firstname": "Emma",
    "lastname": "LOUSTH",
    "contactEmail": "julien.lousth@laposte.net",
    "parentId": "julien.lousth@laposte.net",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.lousth"
  },
  {
    "dob": "11/08/2020",
    "courseIds": [
      22
    ],
    "id": "zelie.manand",
    "firstname": "Zelie",
    "lastname": "MANAND",
    "contactEmail": "influence27@outlook.com",
    "parentId": "influence27@outlook.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zelie.manand"
  },
  {
    "dob": "18/04/2017",
    "courseIds": [
      18,
      22
    ],
    "id": "alexandre.mathus",
    "firstname": "Alexandre",
    "lastname": "MATHUS",
    "contactEmail": "henry.vanessa.boulot@gmail.com",
    "parentId": "henry.vanessa.boulot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alexandre.mathus"
  },
  {
    "dob": "07/04/2020",
    "courseIds": [
      22
    ],
    "id": "rose.mathus",
    "firstname": "Rose",
    "lastname": "MATHUS",
    "contactEmail": "henry.vanessa.boulot@gmail.com",
    "parentId": "henry.vanessa.boulot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rose.mathus"
  },
  {
    "dob": "18/12/2020",
    "courseIds": [
      22
    ],
    "id": "lilia.mendoza",
    "firstname": "Lilia",
    "lastname": "MENDOZA",
    "contactEmail": "sarahrobin8@gmail.com",
    "parentId": "sarahrobin8@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lilia.mendoza"
  },
  {
    "dob": "18/03/2020",
    "courseIds": [
      22
    ],
    "id": "loreleï.ospitalcollin",
    "firstname": "Loreleï",
    "lastname": "OSPITAL COLLIN",
    "contactEmail": "ospital_c@hotmail.com",
    "parentId": "ospital_c@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=loreleï.ospitalcollin"
  },
  {
    "dob": "08/11/2020",
    "courseIds": [
      10,
      22
    ],
    "id": "lyana.remy",
    "firstname": "Lyana",
    "lastname": "REMY",
    "contactEmail": "melissa.020889@gmail.com",
    "parentId": "melissa.020889@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lyana.remy"
  },
  {
    "dob": "31/08/2019",
    "courseIds": [
      10,
      5,
      22,
      6
    ],
    "id": "rafaëlle.thiry",
    "firstname": "Rafaëlle",
    "lastname": "THIRY",
    "contactEmail": "maelainin.ma@icloud.com",
    "parentId": "maelainin.ma@icloud.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rafaëlle.thiry"
  },
  {
    "dob": "22/01/2019",
    "courseIds": [
      10,
      22
    ],
    "id": "margaux.vasseur",
    "firstname": "Margaux",
    "lastname": "VASSEUR",
    "contactEmail": "olivier.anais1@gmail.com",
    "parentId": "olivier.anais1@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=margaux.vasseur"
  },
  {
    "dob": "23/03/2020",
    "courseIds": [
      22
    ],
    "id": "capucine.vassiliev",
    "firstname": "Capucine",
    "lastname": "VASSILIEV",
    "contactEmail": "exmelin_fanny@hotmail.com",
    "parentId": "exmelin_fanny@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.vassiliev"
  },
  {
    "dob": "03/07/2018",
    "courseIds": [
      10,
      5,
      22,
      6
    ],
    "id": "charlotte.wauthierh.",
    "firstname": "Charlotte",
    "lastname": "WAUTHIER H.",
    "contactEmail": "paulinehuybrechts@hotmail.com",
    "parentId": "paulinehuybrechts@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlotte.wauthierh."
  },
  {
    "dob": "27/12/2019",
    "courseIds": [
      22
    ],
    "id": "oscar.wilkin",
    "firstname": "Oscar",
    "lastname": "WILKIN",
    "contactEmail": "wilkin.krier@gmail.com",
    "parentId": "wilkin.krier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=oscar.wilkin"
  },
  {
    "dob": "25/04/2021",
    "courseIds": [
      22
    ],
    "id": "coline.wilkin",
    "firstname": "Coline",
    "lastname": "WILKIN",
    "contactEmail": "wilkin.krier@gmail.com",
    "parentId": "wilkin.krier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=coline.wilkin"
  },
  {
    "dob": "14/11/2019",
    "courseIds": [
      22
    ],
    "id": "evy.wolff",
    "firstname": "Evy",
    "lastname": "WOLFF",
    "contactEmail": "lapetitebeka@live.fr",
    "parentId": "lapetitebeka@live.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=evy.wolff"
  },
  {
    "dob": "27/10/2020",
    "courseIds": [
      22
    ],
    "id": "celia.wolff",
    "firstname": "Célia",
    "lastname": "WOLFF",
    "contactEmail": "amelie.thibault0612@gmail.com",
    "parentId": "amelie.thibault0612@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celia.wolff"
  },
  {
    "dob": "22/09/2019",
    "courseIds": [
      22
    ],
    "id": "djulyan.bever",
    "firstname": "Djulyan",
    "lastname": "BEVER",
    "contactEmail": "camelia08@outlook.fr",
    "parentId": "camelia08@outlook.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=djulyan.bever"
  },
  {
    "dob": "07/11/2017",
    "courseIds": [
      22
    ],
    "id": "emiliano.cravatte",
    "firstname": "Emiliano",
    "lastname": "CRAVATTE",
    "contactEmail": "gotademiel34@gmail.com",
    "parentId": "gotademiel34@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emiliano.cravatte"
  },
  {
    "dob": "12/12/2019",
    "courseIds": [
      22
    ],
    "id": "thea.defosset",
    "firstname": "Théa",
    "lastname": "DEFOSSET",
    "contactEmail": "ade.thea1995@gmail.com",
    "parentId": "ade.thea1995@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=thea.defosset"
  },
  {
    "dob": "12/09/2018",
    "courseIds": [
      22
    ],
    "id": "charly.mathieu",
    "firstname": "Charly",
    "lastname": "MATHIEU",
    "contactEmail": "henricot.sabrina@hotmail.com",
    "parentId": "henricot.sabrina@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charly.mathieu"
  },
  {
    "dob": "04/03/2019",
    "courseIds": [
      22
    ],
    "id": "emmapasdespect.stoffel",
    "firstname": "Emma pas de spect",
    "lastname": "STOFFEL",
    "contactEmail": "cacou886@hotmail.com",
    "parentId": "cacou886@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emmapasdespect.stoffel"
  },
  {
    "dob": "28/08/2018",
    "courseIds": [
      22
    ],
    "id": "ilaria.tancredi",
    "firstname": "Ilaria",
    "lastname": "TANCREDI",
    "contactEmail": "giacomo_vicky@hotmail.com",
    "parentId": "giacomo_vicky@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ilaria.tancredi"
  },
  {
    "dob": "",
    "courseIds": [
      22
    ],
    "id": "lea.ville",
    "firstname": "Léa",
    "lastname": "VILLE",
    "contactEmail": "jo6820@hotmail.com",
    "parentId": "jo6820@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lea.ville"
  },
  {
    "dob": "01/12/2015",
    "courseIds": [
      20,
      7
    ],
    "id": "daphnee.beaumont",
    "firstname": "Daphnée",
    "lastname": "BEAUMONT",
    "contactEmail": "andreabouvy@hotmail.com",
    "parentId": "andreabouvy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=daphnee.beaumont"
  },
  {
    "dob": "29/12/2017",
    "courseIds": [
      17,
      20,
      5,
      6
    ],
    "id": "madeline.catot",
    "firstname": "Madeline",
    "lastname": "CATOT",
    "contactEmail": "catotgwen@outlook.com",
    "parentId": "catotgwen@outlook.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=madeline.catot"
  },
  {
    "dob": "16/05/2016",
    "courseIds": [
      17,
      18,
      20
    ],
    "id": "juliette.catot",
    "firstname": "Juliette",
    "lastname": "CATOT",
    "contactEmail": "celine_billion91@hotmail.com",
    "parentId": "celine_billion91@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=juliette.catot"
  },
  {
    "dob": "28/03/2017",
    "courseIds": [
      17,
      20,
      7
    ],
    "id": "louna.chipon",
    "firstname": "Louna",
    "lastname": "CHIPON",
    "contactEmail": "laurie18042@hotmail.fr",
    "parentId": "laurie18042@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louna.chipon"
  },
  {
    "dob": "17/07/2017",
    "courseIds": [
      20
    ],
    "id": "nolwenn.delaunoy",
    "firstname": "Nolwenn",
    "lastname": "DELAUNOY",
    "contactEmail": "gwenola_pirlot@hotmail.com",
    "parentId": "gwenola_pirlot@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nolwenn.delaunoy"
  },
  {
    "dob": "08/01/2015",
    "courseIds": [
      18,
      20,
      23
    ],
    "id": "charline.delon",
    "firstname": "Charline",
    "lastname": "DELON",
    "contactEmail": "vignoul@msn.com",
    "parentId": "vignoul@msn.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charline.delon"
  },
  {
    "dob": "19/03/2016",
    "courseIds": [
      20
    ],
    "id": "louise.deomewathy",
    "firstname": "Louise",
    "lastname": "DEOME WATHY",
    "contactEmail": "solene_cady@hotmail.be",
    "parentId": "solene_cady@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.deomewathy"
  },
  {
    "dob": "",
    "courseIds": [
      20,
      7
    ],
    "id": "archibald.gillin",
    "firstname": "Archibald",
    "lastname": "GILLIN",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=archibald.gillin"
  },
  {
    "dob": "17/12/2015",
    "courseIds": [
      17,
      20
    ],
    "id": "giulia.godefroid",
    "firstname": "Giulia",
    "lastname": "GODEFROID",
    "contactEmail": "pauline_perreaux@hotmail.com",
    "parentId": "pauline_perreaux@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=giulia.godefroid"
  },
  {
    "dob": "29/09/2017",
    "courseIds": [
      5,
      6,
      17,
      18,
      20
    ],
    "id": "ellie.goffette",
    "firstname": "Ellie",
    "lastname": "GOFFETTE",
    "contactEmail": "wen.lbt@gmail.com",
    "parentId": "wen.lbt@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ellie.goffette"
  },
  {
    "dob": "24/04/2016",
    "courseIds": [
      17,
      20
    ],
    "id": "rose.goffinet",
    "firstname": "Rose",
    "lastname": "GOFFINET",
    "contactEmail": "caroline.six@inda.be",
    "parentId": "caroline.six@inda.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rose.goffinet"
  },
  {
    "dob": "31/01/2017",
    "courseIds": [
      17,
      20,
      7
    ],
    "id": "luna.gomez",
    "firstname": "Luna",
    "lastname": "GOMEZ",
    "contactEmail": "baetsleaurelie@gmail.com",
    "parentId": "baetsleaurelie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=luna.gomez"
  },
  {
    "dob": "04/07/2017",
    "courseIds": [
      20
    ],
    "id": "myrtille.hainauxmerlot",
    "firstname": "Myrtille",
    "lastname": "HAINAUX MERLOT",
    "contactEmail": "hainaux.merlot@gmail.com",
    "parentId": "hainaux.merlot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=myrtille.hainauxmerlot"
  },
  {
    "dob": "23/06/2016",
    "courseIds": [
      20
    ],
    "id": "djulia.hella",
    "firstname": "Djulia",
    "lastname": "HELLA",
    "contactEmail": "l.holtzheimer@hotmail.com",
    "parentId": "l.holtzheimer@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=djulia.hella"
  },
  {
    "dob": "15/11/2016",
    "courseIds": [
      17,
      20
    ],
    "id": "liam.josephine",
    "firstname": "Liam",
    "lastname": "JOSEPHINE",
    "contactEmail": "hoogstoelkate@hotmail.com",
    "parentId": "hoogstoelkate@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=liam.josephine"
  },
  {
    "dob": "10/12/2017",
    "courseIds": [
      5,
      6,
      7,
      17,
      20
    ],
    "id": "leontine.lejeune",
    "firstname": "Léontine",
    "lastname": "LEJEUNE",
    "contactEmail": "guischer.sigrid@gmail.com",
    "parentId": "guischer.sigrid@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leontine.lejeune"
  },
  {
    "dob": "17/11/2016",
    "courseIds": [
      20
    ],
    "id": "leonie.maillard",
    "firstname": "Léonie",
    "lastname": "MAILLARD",
    "contactEmail": "maillard.hayertz@gmail.com",
    "parentId": "maillard.hayertz@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leonie.maillard"
  },
  {
    "dob": "02/06/2016",
    "courseIds": [
      20
    ],
    "id": "leanna.nicolas",
    "firstname": "Leanna",
    "lastname": "NICOLAS",
    "contactEmail": "jennifer.blum10@outlook.com",
    "parentId": "jennifer.blum10@outlook.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leanna.nicolas"
  },
  {
    "dob": "03/11/2016",
    "courseIds": [
      20
    ],
    "id": "julia.pierre",
    "firstname": "Julia",
    "lastname": "PIERRE",
    "contactEmail": "sophie.robinet@live.fr",
    "parentId": "sophie.robinet@live.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.pierre"
  },
  {
    "dob": "07/06/2016",
    "courseIds": [
      17,
      20,
      21
    ],
    "id": "louise.piette",
    "firstname": "Louise",
    "lastname": "PIETTE",
    "contactEmail": "berenice.roulot@gmail.com",
    "parentId": "berenice.roulot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.piette"
  },
  {
    "dob": "17/07/2017",
    "courseIds": [
      20
    ],
    "id": "alexandra.pitot",
    "firstname": "Alexandra",
    "lastname": "PITOT",
    "contactEmail": "trina_kyubi@hotmail.com",
    "parentId": "trina_kyubi@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alexandra.pitot"
  },
  {
    "dob": "04/07/2015",
    "courseIds": [
      18,
      20
    ],
    "id": "lou.reichling",
    "firstname": "Lou",
    "lastname": "REICHLING",
    "contactEmail": "frouch04@hormail.com",
    "parentId": "frouch04@hormail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lou.reichling"
  },
  {
    "dob": "16/05/2017",
    "courseIds": [
      20
    ],
    "id": "loucia.richard",
    "firstname": "Loucia",
    "lastname": "RICHARD",
    "contactEmail": "noemieprotin@gmail.com",
    "parentId": "noemieprotin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=loucia.richard"
  },
  {
    "dob": "13/03/2016",
    "courseIds": [
      17,
      20
    ],
    "id": "julia.vandendorpe",
    "firstname": "Julia",
    "lastname": "VANDENDORPE",
    "contactEmail": "emiliecellier17@hotmail.com",
    "parentId": "emiliecellier17@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.vandendorpe"
  },
  {
    "dob": "15/10/2015",
    "courseIds": [
      20
    ],
    "id": "valentine.devillet",
    "firstname": "Valentine",
    "lastname": "DEVILLET",
    "contactEmail": "familledevillet@hotmail.com",
    "parentId": "familledevillet@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=valentine.devillet"
  },
  {
    "dob": "10/10/2017",
    "courseIds": [
      20
    ],
    "id": "capucine.duchesne",
    "firstname": "Capucine",
    "lastname": "DUCHESNE",
    "contactEmail": "maudmangili@gmail.com",
    "parentId": "maudmangili@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.duchesne"
  },
  {
    "dob": "29/07/2016",
    "courseIds": [
      20
    ],
    "id": "fanny.gerard",
    "firstname": "Fanny",
    "lastname": "GERARD",
    "contactEmail": "g.malorie88@gmail.com",
    "parentId": "g.malorie88@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=fanny.gerard"
  },
  {
    "dob": "23/04/2015",
    "courseIds": [
      20
    ],
    "id": "maelle.liblanc",
    "firstname": "Maelle",
    "lastname": "LIBLANC",
    "contactEmail": "dorot.constant@gmail.com",
    "parentId": "dorot.constant@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maelle.liblanc"
  },
  {
    "dob": "12/08/2015",
    "courseIds": [
      17,
      20,
      7,
      23
    ],
    "id": "charlie.maury",
    "firstname": "Charlie",
    "lastname": "MAURY",
    "contactEmail": "sylcol@hotmail.be",
    "parentId": "sylcol@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlie.maury"
  },
  {
    "dob": "11/10/2014",
    "courseIds": [
      1,
      13,
      20,
      21,
      23
    ],
    "id": "clotilde.reyrolle",
    "firstname": "Clotilde",
    "lastname": "REYROLLE",
    "contactEmail": "gaellethiebaut6@gmail.com",
    "parentId": "gaellethiebaut6@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=clotilde.reyrolle"
  },
  {
    "dob": "02/09/2015",
    "courseIds": [
      7,
      23
    ],
    "id": "louane.cavet",
    "firstname": "Louane",
    "lastname": "CAVET",
    "contactEmail": "cavetj@yahoo.fr",
    "parentId": "cavetj@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louane.cavet"
  },
  {
    "dob": "27/02/2015",
    "courseIds": [
      5,
      6,
      15,
      17,
      23
    ],
    "id": "cassie.dansart",
    "firstname": "Cassie",
    "lastname": "DANSART",
    "contactEmail": "g.vanessaa@live.fr",
    "parentId": "g.vanessaa@live.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=cassie.dansart"
  },
  {
    "dob": "07/07/2013",
    "courseIds": [
      23
    ],
    "id": "norah.debue",
    "firstname": "Norah",
    "lastname": "DE BUE",
    "contactEmail": "nathdestain@gmail.com",
    "parentId": "nathdestain@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=norah.debue"
  },
  {
    "dob": "09/12/2014",
    "courseIds": [
      23
    ],
    "id": "claire.filipucci",
    "firstname": "Claire",
    "lastname": "FILIPUCCI",
    "contactEmail": "virginiethedentist@gmail.com",
    "parentId": "virginiethedentist@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=claire.filipucci"
  },
  {
    "dob": "29/12/2013",
    "courseIds": [
      23
    ],
    "id": "flore.gillardin",
    "firstname": "Flore",
    "lastname": "GILLARDIN",
    "contactEmail": "sof.kalle@gmail.com",
    "parentId": "sof.kalle@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=flore.gillardin"
  },
  {
    "dob": "09/04/2015",
    "courseIds": [
      17,
      23
    ],
    "id": "lea.gillet",
    "firstname": "Léa",
    "lastname": "GILLET",
    "contactEmail": "jen_0589@hotmail.com",
    "parentId": "jen_0589@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lea.gillet"
  },
  {
    "dob": "29/07/2014",
    "courseIds": [
      15,
      21,
      23
    ],
    "id": "ellyn.grolet",
    "firstname": "Ellyn",
    "lastname": "GROLET",
    "contactEmail": "nini0079@hotmail.com",
    "parentId": "nini0079@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ellyn.grolet"
  },
  {
    "dob": "06/12/2013",
    "courseIds": [
      23
    ],
    "id": "lee.guillaume",
    "firstname": "Lee",
    "lastname": "GUILLAUME",
    "contactEmail": "sylvie.destain@gmail.com",
    "parentId": "sylvie.destain@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lee.guillaume"
  },
  {
    "dob": "15/05/2014",
    "courseIds": [
      17,
      23
    ],
    "id": "elena.homel",
    "firstname": "Elena",
    "lastname": "HOMEL",
    "contactEmail": "ravello.annabelle@gmail.com",
    "parentId": "ravello.annabelle@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elena.homel"
  },
  {
    "dob": "18/07/2016",
    "courseIds": [
      5,
      6,
      7,
      17,
      23
    ],
    "id": "charlie.hoorens",
    "firstname": "Charlie",
    "lastname": "HOORENS",
    "contactEmail": "sayanapicard3@gmail.com",
    "parentId": "sayanapicard3@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlie.hoorens"
  },
  {
    "dob": "28/11/2011",
    "courseIds": [
      7,
      21,
      23
    ],
    "id": "iden.jadot",
    "firstname": "Iden",
    "lastname": "JADOT",
    "contactEmail": "stephaniw.reding16@gmail.com",
    "parentId": "stephaniw.reding16@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=iden.jadot"
  },
  {
    "dob": "09/09/2014",
    "courseIds": [
      23
    ],
    "id": "noelie.jaumotte",
    "firstname": "Noélie",
    "lastname": "JAUMOTTE",
    "contactEmail": "jaumotte-honore@hotmail.com",
    "parentId": "jaumotte-honore@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=noelie.jaumotte"
  },
  {
    "dob": "23/01/2014",
    "courseIds": [
      21,
      23
    ],
    "id": "mila.kadri",
    "firstname": "Mila",
    "lastname": "KADRI",
    "contactEmail": "05bouilloncindy@gmail.com",
    "parentId": "05bouilloncindy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mila.kadri"
  },
  {
    "dob": "02/03/2015",
    "courseIds": [
      21,
      23
    ],
    "id": "savana.kadri",
    "firstname": "Savana",
    "lastname": "KADRI",
    "contactEmail": "05bouilloncindy@gmail.com",
    "parentId": "05bouilloncindy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=savana.kadri"
  },
  {
    "dob": "04/02/2015",
    "courseIds": [
      23
    ],
    "id": "lou-anne.kaiser",
    "firstname": "Lou-Anne",
    "lastname": "KAISER",
    "contactEmail": "archinpyk@gmail.com",
    "parentId": "archinpyk@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lou-anne.kaiser"
  },
  {
    "dob": "12/04/2013",
    "courseIds": [
      21,
      23
    ],
    "id": "rose.kuborne",
    "firstname": "Rose",
    "lastname": "KUBORNE",
    "contactEmail": "doloresadam7@gmail.com",
    "parentId": "doloresadam7@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rose.kuborne"
  },
  {
    "dob": "03/05/2015",
    "courseIds": [
      23
    ],
    "id": "vanyhna.louppe",
    "firstname": "Vanyhna",
    "lastname": "LOUPPE",
    "contactEmail": "yolandendrary@gmail.com",
    "parentId": "yolandendrary@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=vanyhna.louppe"
  },
  {
    "dob": "02/06/2016",
    "courseIds": [
      17,
      23
    ],
    "id": "julia.neulens",
    "firstname": "Julia",
    "lastname": "NEULENS",
    "contactEmail": "coralie.sinot@hotmail.fr",
    "parentId": "coralie.sinot@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.neulens"
  },
  {
    "dob": "26/01/2015",
    "courseIds": [
      17,
      5,
      6,
      23
    ],
    "id": "sarah.neysen",
    "firstname": "Sarah",
    "lastname": "NEYSEN",
    "contactEmail": "louis.karine@orange.fr",
    "parentId": "louis.karine@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sarah.neysen"
  },
  {
    "dob": "21/11/2014",
    "courseIds": [
      23
    ],
    "id": "elyna.panier",
    "firstname": "Elyna",
    "lastname": "PANIER",
    "contactEmail": "julienpanier2@gmail.com",
    "parentId": "julienpanier2@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elyna.panier"
  },
  {
    "dob": "09/04/2015",
    "courseIds": [
      23
    ],
    "id": "jaimie.pitot",
    "firstname": "Jaimie",
    "lastname": "PITOT",
    "contactEmail": "trina_kyubi@hotmail.com",
    "parentId": "trina_kyubi@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jaimie.pitot"
  },
  {
    "dob": "30/06/2015",
    "courseIds": [
      23
    ],
    "id": "victoire.poncelet",
    "firstname": "Victoire",
    "lastname": "PONCELET",
    "contactEmail": "emond.melanie@gmail.com",
    "parentId": "emond.melanie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=victoire.poncelet"
  },
  {
    "dob": "04/09/2015",
    "courseIds": [
      17,
      7,
      23
    ],
    "id": "flavie.vasseur",
    "firstname": "Flavie",
    "lastname": "VASSEUR",
    "contactEmail": "olivier.anais1@gmail.com",
    "parentId": "olivier.anais1@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=flavie.vasseur"
  },
  {
    "dob": "21/10/2015",
    "courseIds": [
      23
    ],
    "id": "lucie.vassiliev",
    "firstname": "Lucie",
    "lastname": "VASSILIEV",
    "contactEmail": "exmelin_fanny@hotmail.com",
    "parentId": "exmelin_fanny@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.vassiliev"
  },
  {
    "dob": "06/06/2016",
    "courseIds": [
      23
    ],
    "id": "myroslava.voitoviych",
    "firstname": "Myroslava",
    "lastname": "VOITOVIYCH",
    "contactEmail": "kseniia.voitovych@gmail.com",
    "parentId": "kseniia.voitovych@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=myroslava.voitoviych"
  },
  {
    "dob": "05/08/2016",
    "courseIds": [
      34,
      7,
      23
    ],
    "id": "jeanne.wenkin",
    "firstname": "Jeanne",
    "lastname": "WENKIN",
    "contactEmail": "dedrichecatherine@hotmail.com",
    "parentId": "dedrichecatherine@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jeanne.wenkin"
  },
  {
    "dob": "26/09/2015",
    "courseIds": [
      13,
      23
    ],
    "id": "mylann.werbrouck",
    "firstname": "Mylann",
    "lastname": "WERBROUCK",
    "contactEmail": "julya1114@hotmail.com",
    "parentId": "julya1114@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mylann.werbrouck"
  },
  {
    "dob": "15/09/2014",
    "courseIds": [
      17,
      14,
      23
    ],
    "id": "melina.benlimem",
    "firstname": "Melina",
    "lastname": "BEN LIMEM",
    "contactEmail": "carolinebidaine91@gmail.com",
    "parentId": "carolinebidaine91@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=melina.benlimem"
  },
  {
    "dob": "",
    "courseIds": [
      23
    ],
    "id": "jade.bertholet",
    "firstname": "Jade",
    "lastname": "BERTHOLET",
    "contactEmail": "laetiribeaucourt@gmail.com",
    "parentId": "laetiribeaucourt@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.bertholet"
  },
  {
    "dob": "06/11/2014",
    "courseIds": [
      23
    ],
    "id": "gabriel.dehut",
    "firstname": "Gabriel",
    "lastname": "DEHUT",
    "contactEmail": "laetitiathiry86@hotmail.com",
    "parentId": "laetitiathiry86@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=gabriel.dehut"
  },
  {
    "dob": "28/09/2014",
    "courseIds": [
      1,
      21,
      23
    ],
    "id": "julia.giltaire",
    "firstname": "Julia",
    "lastname": "GILTAIRE",
    "contactEmail": "leochris_78@yahoo.fr",
    "parentId": "leochris_78@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.giltaire"
  },
  {
    "dob": "21/07/2014",
    "courseIds": [
      13,
      23
    ],
    "id": "capucine.laffut",
    "firstname": "Capucine",
    "lastname": "LAFFUT",
    "contactEmail": "defosse_lara@hotmail.com",
    "parentId": "defosse_lara@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.laffut"
  },
  {
    "dob": "05/09/2012",
    "courseIds": [
      1,
      13,
      23
    ],
    "id": "nour.moumen",
    "firstname": "Nour",
    "lastname": "MOUMEN",
    "contactEmail": "xena3382@hotmail.com",
    "parentId": "xena3382@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nour.moumen"
  },
  {
    "dob": "11/05/2012",
    "courseIds": [
      23
    ],
    "id": "milla.szydolowski",
    "firstname": "Milla",
    "lastname": "SZYDOLOWSKI",
    "contactEmail": "autheletchris@yahoo.fr",
    "parentId": "autheletchris@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=milla.szydolowski"
  },
  {
    "dob": "20/05/2012",
    "courseIds": [
      1,
      2,
      3,
      4,
      13
    ],
    "id": "essia.benlimem",
    "firstname": "Essia",
    "lastname": "BEN LIMEM",
    "contactEmail": "carolinebidaine91@gmail.com",
    "parentId": "carolinebidaine91@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=essia.benlimem"
  },
  {
    "dob": "06/02/2013",
    "courseIds": [
      1,
      2,
      3,
      13,
      15
    ],
    "id": "zoe.dupont",
    "firstname": "Zoé",
    "lastname": "DUPONT",
    "contactEmail": "flo6610@hotmail.com",
    "parentId": "flo6610@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.dupont"
  },
  {
    "dob": "08/05/2013",
    "courseIds": [
      1,
      13
    ],
    "id": "meryl.gerard",
    "firstname": "Méryl",
    "lastname": "GERARD",
    "contactEmail": "fgerard@gmail.com",
    "parentId": "fgerard@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=meryl.gerard"
  },
  {
    "dob": "28/03/2013",
    "courseIds": [
      1,
      13
    ],
    "id": "anelyne.jaumotte",
    "firstname": "Anelyne",
    "lastname": "JAUMOTTE",
    "contactEmail": "jaumotte-honore@hotmail.com",
    "parentId": "jaumotte-honore@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anelyne.jaumotte"
  },
  {
    "dob": "19/04/2013",
    "courseIds": [
      1,
      4,
      8,
      14,
      16,
      21,
      30
    ],
    "id": "fauve.josephine",
    "firstname": "Fauve",
    "lastname": "JOSEPHINE",
    "contactEmail": "hoogstoelkate@hotmail.com",
    "parentId": "hoogstoelkate@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=fauve.josephine"
  },
  {
    "dob": "05/10/2010",
    "courseIds": [
      1,
      2,
      3,
      8,
      16
    ],
    "id": "emy.lanotte",
    "firstname": "Emy",
    "lastname": "LANOTTE",
    "contactEmail": "marysenoah@hotmail.com",
    "parentId": "marysenoah@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emy.lanotte"
  },
  {
    "dob": "09/03/2012",
    "courseIds": [
      1,
      13,
      21
    ],
    "id": "aline.motch",
    "firstname": "Aline",
    "lastname": "MOTCH",
    "contactEmail": "florence.noel72@gmail.com",
    "parentId": "florence.noel72@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aline.motch"
  },
  {
    "dob": "08/06/2010",
    "courseIds": [
      1,
      13,
      21
    ],
    "id": "madenn.munten",
    "firstname": "Madenn",
    "lastname": "MUNTEN",
    "contactEmail": "marie.laurent6833@gmail.com",
    "parentId": "marie.laurent6833@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=madenn.munten"
  },
  {
    "dob": "04/09/2013",
    "courseIds": [
      1,
      13,
      21
    ],
    "id": "malwenn.munten",
    "firstname": "Malwenn",
    "lastname": "MUNTEN",
    "contactEmail": "marie.laurent6833@gmail.com",
    "parentId": "marie.laurent6833@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=malwenn.munten"
  },
  {
    "dob": "11/05/2012",
    "courseIds": [
      1,
      13
    ],
    "id": "milla.szydlowski",
    "firstname": "Milla",
    "lastname": "SZYDLOWSKI",
    "contactEmail": "autheletchris@yahoo.fr",
    "parentId": "autheletchris@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=milla.szydlowski"
  },
  {
    "dob": "moyen.fran",
    "courseIds": [
      1
    ],
    "id": "eleonore.moyen",
    "firstname": "Eléonore",
    "lastname": "MOYEN",
    "contactEmail": "francois fany",
    "parentId": "francois fany",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eleonore.moyen"
  },
  {
    "dob": "03/08/2011",
    "courseIds": [
      1
    ],
    "id": "kenza.claes",
    "firstname": "Kenza",
    "lastname": "CLAES",
    "contactEmail": "jlafontaine86@gmail.com",
    "parentId": "jlafontaine86@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kenza.claes"
  },
  {
    "dob": "26/03/2013",
    "courseIds": [
      1,
      2,
      3,
      4,
      8,
      9,
      16,
      27
    ],
    "id": "alexandre.marino",
    "firstname": "Alexandre",
    "lastname": "MARINO",
    "contactEmail": "orsara_1@hotmail.com",
    "parentId": "orsara_1@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alexandre.marino"
  },
  {
    "dob": "17/02/2008",
    "courseIds": [
      1
    ],
    "id": "kelyane.sanchezruiz",
    "firstname": "Kelyane",
    "lastname": "SANCHEZ RUIZ",
    "contactEmail": "kelyanesanchez@gmail.com",
    "parentId": "kelyanesanchez@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kelyane.sanchezruiz"
  },
  {
    "dob": "14/02/2013",
    "courseIds": [
      1,
      8,
      9,
      16,
      21,
      27
    ],
    "id": "eline.ursmer",
    "firstname": "Eline",
    "lastname": "URSMER",
    "contactEmail": "veronique@vanlerberghe.eu",
    "parentId": "veronique@vanlerberghe.eu",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eline.ursmer"
  },
  {
    "dob": "12/10/2011",
    "courseIds": [
      2,
      3,
      4,
      8,
      16,
      27,
      29,
      30
    ],
    "id": "manon.bouillon",
    "firstname": "Manon",
    "lastname": "BOUILLON",
    "contactEmail": "bouillonl@yahoo.fr",
    "parentId": "bouillonl@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=manon.bouillon"
  },
  {
    "dob": "26/12/2009",
    "courseIds": [
      13,
      27,
      21
    ],
    "id": "leca.bredoumi",
    "firstname": "Leca",
    "lastname": "BREDOUMI",
    "contactEmail": "lecabredoumi2009@yahoo.com",
    "parentId": "lecabredoumi2009@yahoo.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leca.bredoumi"
  },
  {
    "dob": "14/02/2010",
    "courseIds": [
      3,
      9,
      2,
      27
    ],
    "id": "meï-lee.chapellier",
    "firstname": "Meï-Lee",
    "lastname": "CHAPELLIER",
    "contactEmail": "steph.hemmer@hotmail.com",
    "parentId": "steph.hemmer@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=meï-lee.chapellier"
  },
  {
    "dob": "23/11/2011",
    "courseIds": [
      2,
      3,
      27,
      29,
      30
    ],
    "id": "emy.clercq",
    "firstname": "Emy",
    "lastname": "CLERCQ",
    "contactEmail": "valerie.blaise0675@gmail.com",
    "parentId": "valerie.blaise0675@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emy.clercq"
  },
  {
    "dob": "12/05/2009",
    "courseIds": [
      27,
      21
    ],
    "id": "louane.collignon",
    "firstname": "Louane",
    "lastname": "COLLIGNON",
    "contactEmail": "dubois.benedicte@outlook.com",
    "parentId": "dubois.benedicte@outlook.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louane.collignon"
  },
  {
    "dob": "22/11/1999",
    "courseIds": [
      32,
      27
    ],
    "id": "ophelie.cornelis",
    "firstname": "Ophélie",
    "lastname": "CORNELIS",
    "contactEmail": "lerustelouise@gmail.com",
    "parentId": "lerustelouise@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ophelie.cornelis"
  },
  {
    "dob": "30/06/2010",
    "courseIds": [
      27
    ],
    "id": "salome.delgoffe",
    "firstname": "Salomé",
    "lastname": "DELGOFFE",
    "contactEmail": "christophe.delgoffe@gmail.com",
    "parentId": "christophe.delgoffe@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=salome.delgoffe"
  },
  {
    "dob": "05/01/2000",
    "courseIds": [
      36,
      38,
      8,
      16,
      24,
      27
    ],
    "id": "clemence.denis",
    "firstname": "Clemence",
    "lastname": "DENIS",
    "contactEmail": "clem.denis05@gmail.com",
    "parentId": "clem.denis05@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=clemence.denis"
  },
  {
    "dob": "15-15-09",
    "courseIds": [
      13,
      27,
      21
    ],
    "id": "lucie.depierreux",
    "firstname": "Lucie",
    "lastname": "DEPIERREUX",
    "contactEmail": "marie-france_123@hotmail.com",
    "parentId": "marie-france_123@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.depierreux"
  },
  {
    "dob": "22/04/2011",
    "courseIds": [
      8,
      16,
      27
    ],
    "id": "lola.francois",
    "firstname": "Lola",
    "lastname": "FRANCOIS",
    "contactEmail": "lolafrancois22@icloud.com",
    "parentId": "lolafrancois22@icloud.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lola.francois"
  },
  {
    "dob": "16/10/2011",
    "courseIds": [
      27,
      13
    ],
    "id": "leonie.grosjean",
    "firstname": "Léonie",
    "lastname": "GROSJEAN",
    "contactEmail": "andre.flo80@yahoo.fr",
    "parentId": "andre.flo80@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leonie.grosjean"
  },
  {
    "dob": "24/03/2009",
    "courseIds": [
      24,
      27
    ],
    "id": "maëlle.jacquemin",
    "firstname": "Maëlle",
    "lastname": "JACQUEMIN",
    "contactEmail": "maellejacquemin.21@gmail.com",
    "parentId": "maellejacquemin.21@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maëlle.jacquemin"
  },
  {
    "dob": "23/11/2010",
    "courseIds": [
      3,
      2,
      27,
      29
    ],
    "id": "zoe.jullien",
    "firstname": "Zoé",
    "lastname": "JULLIEN",
    "contactEmail": "cagivajc@hotmail.com",
    "parentId": "cagivajc@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.jullien"
  },
  {
    "dob": "20/02/2009",
    "courseIds": [
      27,
      21
    ],
    "id": "lucie.lecerf",
    "firstname": "Lucie",
    "lastname": "LECERF",
    "contactEmail": "samyturpin@gmail.com",
    "parentId": "samyturpin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.lecerf"
  },
  {
    "dob": "06/06/2009",
    "courseIds": [
      13,
      27,
      21
    ],
    "id": "juliette.maillard",
    "firstname": "Juliette",
    "lastname": "MAILLARD",
    "contactEmail": "maillard.hayertz@gmail.com",
    "parentId": "maillard.hayertz@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=juliette.maillard"
  },
  {
    "dob": "03/09/2009",
    "courseIds": [
      2,
      3,
      8,
      16,
      27,
      29,
      30
    ],
    "id": "lea.pecheur",
    "firstname": "Lea",
    "lastname": "PECHEUR",
    "contactEmail": "colettehenricot_13@hotmail.com",
    "parentId": "colettehenricot_13@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lea.pecheur"
  },
  {
    "dob": "16/01/2013",
    "courseIds": [
      9,
      13,
      27,
      21
    ],
    "id": "laure.zelazko",
    "firstname": "Laure",
    "lastname": "ZELAZKO",
    "contactEmail": "daisyzelazko@hotmail.com",
    "parentId": "daisyzelazko@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=laure.zelazko"
  },
  {
    "dob": "02/05/2011",
    "courseIds": [
      27
    ],
    "id": "victoria.jadot",
    "firstname": "Victoria",
    "lastname": "JADOT",
    "contactEmail": "stephanie.reding16@gmail.com",
    "parentId": "stephanie.reding16@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=victoria.jadot"
  },
  {
    "dob": "27/12/2010",
    "courseIds": [
      8,
      16,
      27,
      14
    ],
    "id": "enza.theny",
    "firstname": "Enza",
    "lastname": "THENY",
    "contactEmail": "streit.severine@gmail.com",
    "parentId": "streit.severine@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=enza.theny"
  },
  {
    "dob": "03/12/2010",
    "courseIds": [
      27
    ],
    "id": "xana.verhelpen",
    "firstname": "Xana",
    "lastname": "VERHELPEN",
    "contactEmail": "nathalie.lemaire@skynet.be",
    "parentId": "nathalie.lemaire@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=xana.verhelpen"
  },
  {
    "dob": "10/10/2009",
    "courseIds": [
      8,
      16,
      24,
      29,
      30
    ],
    "id": "louisie.deconynck",
    "firstname": "Louisie",
    "lastname": "DE CONYNCK",
    "contactEmail": "baudea@hotmail.com",
    "parentId": "baudea@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louisie.deconynck"
  },
  {
    "dob": "22/09/2008",
    "courseIds": [
      24,
      38,
      29,
      30
    ],
    "id": "emma.neysen",
    "firstname": "Emma",
    "lastname": "NEYSEN",
    "contactEmail": "emma.neysen@orange.fr",
    "parentId": "emma.neysen@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.neysen"
  },
  {
    "dob": "23/08/2009",
    "courseIds": [
      24,
      8,
      16
    ],
    "id": "charlie.schneder",
    "firstname": "Charlie",
    "lastname": "SCHNEDER",
    "contactEmail": "v.baude@hotmail.com",
    "parentId": "v.baude@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlie.schneder"
  },
  {
    "dob": "25/04/2008",
    "courseIds": [
      24,
      29,
      30
    ],
    "id": "emma.storms",
    "firstname": "Emma",
    "lastname": "STORMS",
    "contactEmail": "bhelsemans@yahoo.fr",
    "parentId": "bhelsemans@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.storms"
  },
  {
    "dob": "25/04/2008",
    "courseIds": [
      24
    ],
    "id": "rihana.dasnois",
    "firstname": "Rihana",
    "lastname": "DASNOIS",
    "contactEmail": "copetlolclaurence@gmail.com",
    "parentId": "copetlolclaurence@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rihana.dasnois"
  },
  {
    "dob": "08/10/2008",
    "courseIds": [
      24
    ],
    "id": "celya.dion",
    "firstname": "Celya",
    "lastname": "DION",
    "contactEmail": "aurehenry8@yahoo.fr",
    "parentId": "aurehenry8@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celya.dion"
  },
  {
    "dob": "07/05/2016",
    "courseIds": [
      17,
      5,
      6,
      15
    ],
    "id": "victoria.lambert",
    "firstname": "Victoria",
    "lastname": "LAMBERT",
    "contactEmail": "genart.alexandra@gmail.com",
    "parentId": "genart.alexandra@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=victoria.lambert"
  },
  {
    "dob": "05/06/2016",
    "courseIds": [
      17,
      5,
      6,
      7
    ],
    "id": "naële.echement",
    "firstname": "Naële",
    "lastname": "ECHEMENT",
    "contactEmail": "simon.emilie@hotmail.com",
    "parentId": "simon.emilie@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=naële.echement"
  },
  {
    "dob": "13/08/2017",
    "courseIds": [
      5,
      6
    ],
    "id": "ninon.felten",
    "firstname": "Ninon",
    "lastname": "FELTEN",
    "contactEmail": "sophie.calay@hotmail.com",
    "parentId": "sophie.calay@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ninon.felten"
  },
  {
    "dob": "06/09/2017",
    "courseIds": [
      5,
      6
    ],
    "id": "juliette.blondelet",
    "firstname": "Juliette",
    "lastname": "BLONDELET",
    "contactEmail": "laetitiaduf@hotmail.com",
    "parentId": "laetitiaduf@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=juliette.blondelet"
  },
  {
    "dob": "19/12/2018",
    "courseIds": [
      5,
      6
    ],
    "id": "louve.bion",
    "firstname": "Louve",
    "lastname": "BION",
    "contactEmail": "alextricite@hotmail.com",
    "parentId": "alextricite@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louve.bion"
  },
  {
    "dob": "19/04/2019",
    "courseIds": [
      10,
      5,
      6
    ],
    "id": "laure.saubouin",
    "firstname": "Laure",
    "lastname": "SAUBOUIN",
    "contactEmail": "guillaume.delph@gmail.com",
    "parentId": "guillaume.delph@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=laure.saubouin"
  },
  {
    "dob": "03/01/2020",
    "courseIds": [
      5,
      6
    ],
    "id": "alix.goffinet",
    "firstname": "Alix",
    "lastname": "GOFFINET",
    "contactEmail": "thomasamelie475@gmail.com",
    "parentId": "thomasamelie475@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alix.goffinet"
  },
  {
    "dob": "",
    "courseIds": [
      5,
      6
    ],
    "id": "shaya.pignolet",
    "firstname": "Shaya",
    "lastname": "PIGNOLET",
    "contactEmail": "fannydipalma@outlook.fr",
    "parentId": "fannydipalma@outlook.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=shaya.pignolet"
  },
  {
    "dob": "26/01/2015",
    "courseIds": [
      5,
      6
    ],
    "id": "lea.postal",
    "firstname": "Léa",
    "lastname": "POSTAL",
    "contactEmail": "cathy.gerard@ymail.com",
    "parentId": "cathy.gerard@ymail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lea.postal"
  },
  {
    "dob": "26/04/2008",
    "courseIds": [
      4
    ],
    "id": "darina.kruth",
    "firstname": "Darina",
    "lastname": "KRUTH",
    "contactEmail": "darinakruth@gmail.com",
    "parentId": "darinakruth@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=darina.kruth"
  },
  {
    "dob": "26/04/2011",
    "courseIds": [
      2,
      3,
      4,
      30
    ],
    "id": "janelle.picke",
    "firstname": "Janelle",
    "lastname": "PICKE",
    "contactEmail": "adelemertens79@gmail.com",
    "parentId": "adelemertens79@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=janelle.picke"
  },
  {
    "dob": "26/11/2013",
    "courseIds": [
      13,
      4,
      21
    ],
    "id": "lisbeth.sogaard",
    "firstname": "Lisbeth",
    "lastname": "SOGAARD",
    "contactEmail": "soggardm@gmail.com",
    "parentId": "soggardm@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lisbeth.sogaard"
  },
  {
    "dob": "25/07/2020",
    "courseIds": [
      10
    ],
    "id": "lou.bernard",
    "firstname": "Lou",
    "lastname": "BERNARD",
    "contactEmail": "bernardfmartinm@gmail.com",
    "parentId": "bernardfmartinm@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lou.bernard"
  },
  {
    "dob": "10/04/2018",
    "courseIds": [
      17,
      10
    ],
    "id": "solveig.deruette",
    "firstname": "Solveig",
    "lastname": "DERUETTE",
    "contactEmail": "jennifer.collin83@gmail.com",
    "parentId": "jennifer.collin83@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=solveig.deruette"
  },
  {
    "dob": "30/07/2019",
    "courseIds": [
      10
    ],
    "id": "cloe.fontaine",
    "firstname": "Cloé",
    "lastname": "FONTAINE",
    "contactEmail": "salaun-nathalie@orange.fr",
    "parentId": "salaun-nathalie@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=cloe.fontaine"
  },
  {
    "dob": "15/11/2019",
    "courseIds": [
      10
    ],
    "id": "thea.galametz-godfrin",
    "firstname": "Théa",
    "lastname": "GALAMETZ-GODFRIN",
    "contactEmail": "cindy080181@gmail.com",
    "parentId": "cindy080181@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=thea.galametz-godfrin"
  },
  {
    "dob": "15/05/2019",
    "courseIds": [
      10
    ],
    "id": "zoe.gerard",
    "firstname": "Zoé",
    "lastname": "GERARD",
    "contactEmail": "sophie.zacharie@eflchiny.be",
    "parentId": "sophie.zacharie@eflchiny.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.gerard"
  },
  {
    "dob": "12/10/2020",
    "courseIds": [
      10
    ],
    "id": "ysia.lequeux",
    "firstname": "Ysia",
    "lastname": "LEQUEUX",
    "contactEmail": "lydie.romain90@gmail.com",
    "parentId": "lydie.romain90@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ysia.lequeux"
  },
  {
    "dob": "09/08/2019",
    "courseIds": [
      10
    ],
    "id": "lyy-lou.parisel",
    "firstname": "Lyy-lou",
    "lastname": "PARISEL",
    "contactEmail": "delphinelepage@hotmail.com",
    "parentId": "delphinelepage@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lyy-lou.parisel"
  },
  {
    "dob": "28/08/2020",
    "courseIds": [
      10
    ],
    "id": "charlie.pauquai-rensonnet",
    "firstname": "Charlie",
    "lastname": "PAUQUAI-RENSONNET",
    "contactEmail": "goffin.julie@hotmail.com",
    "parentId": "goffin.julie@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlie.pauquai-rensonnet"
  },
  {
    "dob": "27/03/2020",
    "courseIds": [
      10
    ],
    "id": "leonie.servais",
    "firstname": "LEONIE",
    "lastname": "SERVAIS",
    "contactEmail": "lorella_7@hotmail.com",
    "parentId": "lorella_7@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leonie.servais"
  },
  {
    "dob": "24/01/2010",
    "courseIds": [
      10
    ],
    "id": "zelie.thirion",
    "firstname": "Zélie",
    "lastname": "THIRION",
    "contactEmail": "clementine.mamdy@gmail.com",
    "parentId": "clementine.mamdy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zelie.thirion"
  },
  {
    "dob": "10/02/2021",
    "courseIds": [
      10
    ],
    "id": "albane.thirion",
    "firstname": "Albane",
    "lastname": "THIRION",
    "contactEmail": "clementine.mamdy@gmail.com",
    "parentId": "clementine.mamdy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=albane.thirion"
  },
  {
    "dob": "25/09/2015",
    "courseIds": [
      7
    ],
    "id": "margo.berny",
    "firstname": "Margo",
    "lastname": "BERNY",
    "contactEmail": "bouillongeraldine@hotmail.com",
    "parentId": "bouillongeraldine@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=margo.berny"
  },
  {
    "dob": "26/06/2015",
    "courseIds": [
      15,
      7
    ],
    "id": "assya.bolat",
    "firstname": "Assya",
    "lastname": "BOLAT",
    "contactEmail": "gck2406@gmail.com",
    "parentId": "gck2406@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=assya.bolat"
  },
  {
    "dob": "27/04/2017",
    "courseIds": [
      7
    ],
    "id": "angele.boxus",
    "firstname": "Angèle",
    "lastname": "BOXUS",
    "contactEmail": "aline.cuvelier@gmail.com",
    "parentId": "aline.cuvelier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=angele.boxus"
  },
  {
    "dob": "19/03/2015",
    "courseIds": [
      7
    ],
    "id": "eldana.danielrezene",
    "firstname": "Eldana",
    "lastname": "DANIEL REZENE",
    "contactEmail": "aline.sower@chiny.be",
    "parentId": "aline.sower@chiny.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eldana.danielrezene"
  },
  {
    "dob": "01/05/2015",
    "courseIds": [
      17,
      7
    ],
    "id": "clara.vandamme",
    "firstname": "Clara",
    "lastname": "VAN DAMME",
    "contactEmail": "melanie.mart@hotmail.com",
    "parentId": "melanie.mart@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=clara.vandamme"
  },
  {
    "dob": "12/05/2018",
    "courseIds": [
      17,
      7
    ],
    "id": "lucie.verger",
    "firstname": "Lucie",
    "lastname": "VERGER",
    "contactEmail": "lamotte.kelly@hotmail.com",
    "parentId": "lamotte.kelly@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.verger"
  },
  {
    "dob": "29/09/2014",
    "courseIds": [
      13,
      21
    ],
    "id": "meredith.adam",
    "firstname": "Meredith",
    "lastname": "ADAM",
    "contactEmail": "annelise_nanquette@hotmail.com",
    "parentId": "annelise_nanquette@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=meredith.adam"
  },
  {
    "dob": "26/08/2014",
    "courseIds": [
      21
    ],
    "id": "maeva.bouvy",
    "firstname": "Maéva",
    "lastname": "BOUVY",
    "contactEmail": "julie-plisnier@outlook.be",
    "parentId": "julie-plisnier@outlook.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maeva.bouvy"
  },
  {
    "dob": "24/07/2012",
    "courseIds": [
      21
    ],
    "id": "lucie.conrotte",
    "firstname": "Lucie",
    "lastname": "CONROTTE",
    "contactEmail": "francois.delph@gmail.com",
    "parentId": "francois.delph@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lucie.conrotte"
  },
  {
    "dob": "14/05/2012",
    "courseIds": [
      32,
      13,
      21
    ],
    "id": "josephine.crepaux",
    "firstname": "Josephine",
    "lastname": "CREPAUX",
    "contactEmail": "baudesson.elise@outlook.fr",
    "parentId": "baudesson.elise@outlook.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=josephine.crepaux"
  },
  {
    "dob": "09/07/2013",
    "courseIds": [
      13,
      29,
      21,
      14
    ],
    "id": "zoe.jacoby",
    "firstname": "Zoé",
    "lastname": "JACOBY",
    "contactEmail": "aburet1@hotmail.com",
    "parentId": "aburet1@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.jacoby"
  },
  {
    "dob": "11/04/2014",
    "courseIds": [
      8,
      16,
      21
    ],
    "id": "jasmyne.kikstra",
    "firstname": "Jasmyne",
    "lastname": "KIKSTRA",
    "contactEmail": "klaas.kikstra@gmail.com",
    "parentId": "klaas.kikstra@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jasmyne.kikstra"
  },
  {
    "dob": "02/08/2013",
    "courseIds": [
      13,
      21
    ],
    "id": "margot.martin",
    "firstname": "Margot",
    "lastname": "MARTIN",
    "contactEmail": "delphineponcelet@yahoo.fr",
    "parentId": "delphineponcelet@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=margot.martin"
  },
  {
    "dob": "01/07/2014",
    "courseIds": [
      21
    ],
    "id": "clara.morette",
    "firstname": "Clara",
    "lastname": "MORETTE",
    "contactEmail": "manubenjamorette@gmail.com",
    "parentId": "manubenjamorette@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=clara.morette"
  },
  {
    "dob": "04/11/2010",
    "courseIds": [
      13,
      21
    ],
    "id": "elea.pochet",
    "firstname": "Eléa",
    "lastname": "POCHET",
    "contactEmail": "tiphanie.c@hotmail.com",
    "parentId": "tiphanie.c@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elea.pochet"
  },
  {
    "dob": "14/09/2010",
    "courseIds": [
      21,
      14
    ],
    "id": "louane.simonin",
    "firstname": "Louane",
    "lastname": "SIMONIN",
    "contactEmail": "simoninlouane@gmail.com",
    "parentId": "simoninlouane@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louane.simonin"
  },
  {
    "dob": "03/05/2012",
    "courseIds": [
      13,
      2,
      3,
      21
    ],
    "id": "noemie.storms",
    "firstname": "Noemie",
    "lastname": "STORMS",
    "contactEmail": "bhelsemans@yahoo.fr",
    "parentId": "bhelsemans@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=noemie.storms"
  },
  {
    "dob": "16/05/2013",
    "courseIds": [
      13,
      21
    ],
    "id": "capucine.verlaine",
    "firstname": "Capucine",
    "lastname": "VERLAINE",
    "contactEmail": "fionathiry@gmail.com",
    "parentId": "fionathiry@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=capucine.verlaine"
  },
  {
    "dob": "14/09/2013",
    "courseIds": [
      2,
      3
    ],
    "id": "chloe.dubray",
    "firstname": "Chloé",
    "lastname": "DUBRAY",
    "contactEmail": "jowan10@yahoo.ca",
    "parentId": "jowan10@yahoo.ca",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=chloe.dubray"
  },
  {
    "dob": "26/07/2007",
    "courseIds": [
      2,
      3
    ],
    "id": "oceane.ketels",
    "firstname": "Océane",
    "lastname": "KETELS",
    "contactEmail": "oceaneketels@gmail.com",
    "parentId": "oceaneketels@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=oceane.ketels"
  },
  {
    "dob": "27/12/2005",
    "courseIds": [
      2,
      3,
      8,
      9,
      16
    ],
    "id": "lou.rat",
    "firstname": "Lou",
    "lastname": "RAT",
    "contactEmail": "lou.rat27@gmail.com",
    "parentId": "lou.rat27@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lou.rat"
  },
  {
    "dob": "11/10/2011",
    "courseIds": [
      2,
      3
    ],
    "id": "siloe.sorgho",
    "firstname": "Siloé",
    "lastname": "SORGHO",
    "contactEmail": "virgousse@gmail.com",
    "parentId": "virgousse@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=siloe.sorgho"
  },
  {
    "dob": "02/02/2006",
    "courseIds": [
      36,
      37,
      38,
      39,
      29,
      30
    ],
    "id": "nolan.dans",
    "firstname": "Nolan",
    "lastname": "DANS",
    "contactEmail": "claessensmarief@hotmail.com",
    "parentId": "claessensmarief@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nolan.dans"
  },
  {
    "dob": "04/11/1997",
    "courseIds": [
      33,
      30
    ],
    "id": "melusine.desclodures",
    "firstname": "Mélusine",
    "lastname": "DESCLODURES",
    "contactEmail": "melusine.dscs@gmail.com",
    "parentId": "melusine.dscs@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=melusine.desclodures"
  },
  {
    "dob": "24/09/1998",
    "courseIds": [
      32,
      9,
      30,
      33
    ],
    "id": "gwenaëlle.vaerewyck",
    "firstname": "Gwenaëlle",
    "lastname": "VAEREWYCK",
    "contactEmail": "gwen.v@hotmail.com",
    "parentId": "gwen.v@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=gwenaëlle.vaerewyck"
  },
  {
    "dob": "25/09/2008",
    "courseIds": [
      29,
      30
    ],
    "id": "anna.marotte",
    "firstname": "Anna",
    "lastname": "MAROTTE",
    "contactEmail": "antoinevirginie@hotmail.com",
    "parentId": "antoinevirginie@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anna.marotte"
  },
  {
    "dob": "05/11/1997",
    "courseIds": [
      32,
      33,
      9,
      14,
      29
    ],
    "id": "julie.authelet",
    "firstname": "Julie",
    "lastname": "AUTHELET",
    "contactEmail": "julie.authelet@hotmail.com",
    "parentId": "julie.authelet@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julie.authelet"
  },
  {
    "dob": "06/01/2010",
    "courseIds": [
      9
    ],
    "id": "lylou.doury",
    "firstname": "Lylou",
    "lastname": "DOURY",
    "contactEmail": "lyloudoury0601@gmail.com",
    "parentId": "lyloudoury0601@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lylou.doury"
  },
  {
    "dob": "19/02/2008",
    "courseIds": [
      8,
      9,
      16
    ],
    "id": "valentine.gerard",
    "firstname": "Valentine",
    "lastname": "GERARD",
    "contactEmail": "valentinegerard56@gmail.com",
    "parentId": "valentinegerard56@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=valentine.gerard"
  },
  {
    "dob": "22/11/1983",
    "courseIds": [
      32,
      9,
      33
    ],
    "id": "julie.gruselin",
    "firstname": "Julie",
    "lastname": "GRUSELIN",
    "contactEmail": "julie.gruselin@hotmail.com",
    "parentId": "julie.gruselin@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julie.gruselin"
  },
  {
    "dob": "18/12/2003",
    "courseIds": [
      32,
      9,
      33
    ],
    "id": "fallon.hermans",
    "firstname": "Fallon",
    "lastname": "HERMANS",
    "contactEmail": "fallonhermans81@outlook.be",
    "parentId": "fallonhermans81@outlook.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=fallon.hermans"
  },
  {
    "dob": "02/05/2006",
    "courseIds": [
      9
    ],
    "id": "emy.lafarque",
    "firstname": "Emy",
    "lastname": "LAFARQUE",
    "contactEmail": "lafarqueemy@gmail.com",
    "parentId": "lafarqueemy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emy.lafarque"
  },
  {
    "dob": "21/05/2005",
    "courseIds": [
      9
    ],
    "id": "enora.menissier",
    "firstname": "Enora",
    "lastname": "MENISSIER",
    "contactEmail": "enora.menissier@gmail.com",
    "parentId": "enora.menissier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=enora.menissier"
  },
  {
    "dob": "21/05/2005",
    "courseIds": [
      32,
      9
    ],
    "id": "enora.menuissier",
    "firstname": "Enora",
    "lastname": "MENUISSIER",
    "contactEmail": "enora.menissier@gmail.com",
    "parentId": "enora.menissier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=enora.menuissier"
  },
  {
    "dob": "15/12/1986",
    "courseIds": [
      32,
      9,
      33
    ],
    "id": "aline.cuvelier",
    "firstname": "Aline",
    "lastname": "CUVELIER",
    "contactEmail": "aline.cuvelier@gmail.com",
    "parentId": "aline.cuvelier@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aline.cuvelier"
  },
  {
    "dob": "13/05/1987",
    "courseIds": [
      32,
      9,
      33,
      15
    ],
    "id": "celine.danneau",
    "firstname": "Céline",
    "lastname": "DANNEAU",
    "contactEmail": "celine.danneau.6814@hersvirton.be",
    "parentId": "celine.danneau.6814@hersvirton.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celine.danneau"
  },
  {
    "dob": "",
    "courseIds": [
      32,
      9,
      33
    ],
    "id": "jessica.fortemps",
    "firstname": "Jessica",
    "lastname": "FORTEMPS",
    "contactEmail": "gck2406@gmail.com",
    "parentId": "gck2406@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jessica.fortemps"
  },
  {
    "dob": "12/07/1988",
    "courseIds": [
      32,
      9,
      33,
      15
    ],
    "id": "alexandra.genart",
    "firstname": "Alexandra",
    "lastname": "GENART",
    "contactEmail": "genart.alexandra@gmail.com",
    "parentId": "genart.alexandra@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alexandra.genart"
  },
  {
    "dob": "15/12/2004",
    "courseIds": [
      32,
      33,
      38,
      39,
      9,
      15
    ],
    "id": "julie.grolet",
    "firstname": "Julie",
    "lastname": "GROLET",
    "contactEmail": "groletjulie04@gmail.com",
    "parentId": "groletjulie04@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julie.grolet"
  },
  {
    "dob": "13/03/1997",
    "courseIds": [
      32,
      9,
      14,
      33
    ],
    "id": "aline.lanotte",
    "firstname": "Aline",
    "lastname": "LANOTTE",
    "contactEmail": "alinelanotte2@gmail.com",
    "parentId": "alinelanotte2@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aline.lanotte"
  },
  {
    "dob": "31/10/2001",
    "courseIds": [
      32,
      9,
      38
    ],
    "id": "harmony.magagnin",
    "firstname": "Harmony",
    "lastname": "MAGAGNIN",
    "contactEmail": "harmonymagagnin@gmail.com",
    "parentId": "harmonymagagnin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=harmony.magagnin"
  },
  {
    "dob": "12/04/2012",
    "courseIds": [
      32,
      9,
      33
    ],
    "id": "julie.romani",
    "firstname": "Julie",
    "lastname": "ROMANI",
    "contactEmail": "julieromani2001@outlook.com",
    "parentId": "julieromani2001@outlook.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julie.romani"
  },
  {
    "dob": "19/01/2017",
    "courseIds": [
      17
    ],
    "id": "line.adam",
    "firstname": "Line",
    "lastname": "ADAM",
    "contactEmail": "nannanmariesylvie@gmail.com",
    "parentId": "nannanmariesylvie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=line.adam"
  },
  {
    "dob": "10/02/2015",
    "courseIds": [
      17
    ],
    "id": "olymbia.cotsoglou",
    "firstname": "Olymbia",
    "lastname": "COTSOGLOU",
    "contactEmail": "elenbarthel@gmail.com",
    "parentId": "elenbarthel@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=olymbia.cotsoglou"
  },
  {
    "dob": "18/06/2015",
    "courseIds": [
      17
    ],
    "id": "leah.mahin",
    "firstname": "Léah",
    "lastname": "MAHIN",
    "contactEmail": "amandine310782@gmail.com",
    "parentId": "amandine310782@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leah.mahin"
  },
  {
    "dob": "25/06/2011",
    "courseIds": [
      13
    ],
    "id": "norah.gaillard",
    "firstname": "Norah",
    "lastname": "GAILLARD",
    "contactEmail": "virginielenel@hotmail.com",
    "parentId": "virginielenel@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=norah.gaillard"
  },
  {
    "dob": "26/01/2014",
    "courseIds": [
      13
    ],
    "id": "jeanne.gerard",
    "firstname": "Jeanne",
    "lastname": "GERARD",
    "contactEmail": "godfrin.celine1206@gmail.com",
    "parentId": "godfrin.celine1206@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jeanne.gerard"
  },
  {
    "dob": "05/07/2012",
    "courseIds": [
      13
    ],
    "id": "lena.hans",
    "firstname": "Léna",
    "lastname": "HANS",
    "contactEmail": "brizioncathy@yahoo.fr",
    "parentId": "brizioncathy@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lena.hans"
  },
  {
    "dob": "01/02/2009",
    "courseIds": [
      13
    ],
    "id": "celiane.manginot",
    "firstname": "Céliane",
    "lastname": "MANGINOT",
    "contactEmail": "didier.manginot@orange.fr",
    "parentId": "didier.manginot@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celiane.manginot"
  },
  {
    "dob": "18/07/2013",
    "courseIds": [
      13
    ],
    "id": "elisa.molhoek",
    "firstname": "Elisa",
    "lastname": "MOLHOEK",
    "contactEmail": "anne.poncelet@hotmail.com",
    "parentId": "anne.poncelet@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elisa.molhoek"
  },
  {
    "dob": "16/04/2011",
    "courseIds": [
      13
    ],
    "id": "anaïs.morais",
    "firstname": "Anaïs",
    "lastname": "MORAIS",
    "contactEmail": "anais.dejesusmorais@gmail.com",
    "parentId": "anais.dejesusmorais@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anaïs.morais"
  },
  {
    "dob": "15/11/2012",
    "courseIds": [
      13
    ],
    "id": "maya.picke",
    "firstname": "Maya",
    "lastname": "PICKE",
    "contactEmail": "adelemertens79@gmail.com",
    "parentId": "adelemertens79@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maya.picke"
  },
  {
    "dob": "27/04/2013",
    "courseIds": [
      13
    ],
    "id": "jeanne.postal",
    "firstname": "Jeanne",
    "lastname": "POSTAL",
    "contactEmail": "cathy.gerard@ymail.com",
    "parentId": "cathy.gerard@ymail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jeanne.postal"
  },
  {
    "dob": "06/09/2016",
    "courseIds": [
      13,
      14
    ],
    "id": "tara.richard",
    "firstname": "Tara",
    "lastname": "RICHARD",
    "contactEmail": "dic_10@yahoo.es",
    "parentId": "dic_10@yahoo.es",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=tara.richard"
  },
  {
    "dob": "31/12/2009",
    "courseIds": [
      8,
      16
    ],
    "id": "marie.albers",
    "firstname": "Marie",
    "lastname": "ALBERS",
    "contactEmail": "mapatoupatou@gmail.com",
    "parentId": "mapatoupatou@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marie.albers"
  },
  {
    "dob": "05/04/2010",
    "courseIds": [
      36,
      37,
      38,
      39,
      8,
      16
    ],
    "id": "lenie.ezzine",
    "firstname": "Lénie",
    "lastname": "EZZINE",
    "contactEmail": "sophie.eddy.mona@skynet.be",
    "parentId": "sophie.eddy.mona@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lenie.ezzine"
  },
  {
    "dob": "22/06/2009",
    "courseIds": [
      8,
      16,
      39
    ],
    "id": "aglae.jacques",
    "firstname": "Aglaé",
    "lastname": "JACQUES",
    "contactEmail": "berengerejj1@hotmail.com",
    "parentId": "berengerejj1@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=aglae.jacques"
  },
  {
    "dob": "02/10/2009",
    "courseIds": [
      8,
      16,
      39
    ],
    "id": "emma.keser",
    "firstname": "Emma",
    "lastname": "KESER",
    "contactEmail": "breyersophie77@gmail.com",
    "parentId": "breyersophie77@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.keser"
  },
  {
    "dob": "30/04/2003",
    "courseIds": [
      32,
      33,
      14
    ],
    "id": "romane.lanotte",
    "firstname": "Romane",
    "lastname": "LANOTTE",
    "contactEmail": "lanotteromane@gmail.com",
    "parentId": "lanotteromane@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=romane.lanotte"
  },
  {
    "dob": "05/03/2014",
    "courseIds": [
      14
    ],
    "id": "charline.piette",
    "firstname": "Charline",
    "lastname": "PIETTE",
    "contactEmail": "berenice.roulot@gmail.com",
    "parentId": "berenice.roulot@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charline.piette"
  },
  {
    "dob": "18/02/1999",
    "courseIds": [
      32,
      14,
      15
    ],
    "id": "coralie.gillet",
    "firstname": "Coralie",
    "lastname": "GILLET",
    "contactEmail": "gillet.coralie@hotmail.com",
    "parentId": "gillet.coralie@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=coralie.gillet"
  },
  {
    "dob": "26/08/2010",
    "courseIds": [
      14
    ],
    "id": "cristina.casa",
    "firstname": "Cristina",
    "lastname": "CASA",
    "contactEmail": "taniastarck74@gmail.com",
    "parentId": "taniastarck74@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=cristina.casa"
  },
  {
    "dob": "02/07/1905",
    "courseIds": [
      14
    ],
    "id": "alice.berckmans",
    "firstname": "Alice",
    "lastname": "BERCKMANS",
    "contactEmail": "aliceberckmans@gmail.com",
    "parentId": "aliceberckmans@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alice.berckmans"
  },
  {
    "dob": "08/11/2012",
    "courseIds": [
      14
    ],
    "id": "jade.collin",
    "firstname": "Jade",
    "lastname": "COLLIN",
    "contactEmail": "lerustelouise@gmail.com",
    "parentId": "lerustelouise@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.collin"
  },
  {
    "dob": "07/12/2013",
    "courseIds": [
      14
    ],
    "id": "florinne.noel",
    "firstname": "Florinne",
    "lastname": "NOEL",
    "contactEmail": "tuota.c@gmail.com",
    "parentId": "tuota.c@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=florinne.noel"
  },
  {
    "dob": "06/11/1986",
    "courseIds": [
      32,
      33,
      15
    ],
    "id": "vanessa.gerard",
    "firstname": "Vanessa",
    "lastname": "GERARD",
    "contactEmail": "g.vanessaa@live.fr",
    "parentId": "g.vanessaa@live.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=vanessa.gerard"
  },
  {
    "dob": "18/06/1995",
    "courseIds": [
      32,
      15
    ],
    "id": "luana.gerard",
    "firstname": "Luana",
    "lastname": "GERARD",
    "contactEmail": "luanagerard0077@gmail.com",
    "parentId": "luanagerard0077@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=luana.gerard"
  },
  {
    "dob": "17/12/2013",
    "courseIds": [
      15
    ],
    "id": "lisa.grandjean",
    "firstname": "Lisa",
    "lastname": "GRANDJEAN",
    "contactEmail": "carolhermitte@yahoo.fr",
    "parentId": "carolhermitte@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lisa.grandjean"
  },
  {
    "dob": "17/08/2018",
    "courseIds": [
      18
    ],
    "id": "mathias.cavet",
    "firstname": "Mathias",
    "lastname": "CAVET",
    "contactEmail": "dechemilie@gmail.com",
    "parentId": "dechemilie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mathias.cavet"
  },
  {
    "dob": "09/09/2015",
    "courseIds": [
      18
    ],
    "id": "saskia.claeyssenslaveaux",
    "firstname": "Saskia",
    "lastname": "CLAEYSSENS LAVEAUX",
    "contactEmail": "aicharapsaet@gmail.com",
    "parentId": "aicharapsaet@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=saskia.claeyssenslaveaux"
  },
  {
    "dob": "08/02/2015",
    "courseIds": [
      18
    ],
    "id": "hylwenn.dath",
    "firstname": "Hylwenn",
    "lastname": "DATH",
    "contactEmail": "syndie.willems@hotmail.com",
    "parentId": "syndie.willems@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=hylwenn.dath"
  },
  {
    "dob": "02/06/2017",
    "courseIds": [
      18
    ],
    "id": "mylhow.dath",
    "firstname": "Mylhow",
    "lastname": "DATH",
    "contactEmail": "syndie.willems@hotmail.com",
    "parentId": "syndie.willems@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mylhow.dath"
  },
  {
    "dob": "23/08/2017",
    "courseIds": [
      18
    ],
    "id": "charly.reichling",
    "firstname": "Charly",
    "lastname": "REICHLING",
    "contactEmail": "frouch04@hotmail.com",
    "parentId": "frouch04@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charly.reichling"
  },
  {
    "dob": "26/10/2012",
    "courseIds": [
      38
    ],
    "id": "sana.alomary",
    "firstname": "Sana",
    "lastname": "ALOMARY",
    "contactEmail": "carolineitheimer80@gmail.com",
    "parentId": "carolineitheimer80@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sana.alomary"
  },
  {
    "dob": "31/12/2013",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "ameline.asselborn",
    "firstname": "Améline",
    "lastname": "ASSELBORN",
    "contactEmail": "nanouni86@hotmail.com",
    "parentId": "nanouni86@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ameline.asselborn"
  },
  {
    "dob": "14/05/2014",
    "courseIds": [
      38
    ],
    "id": "elfy.bergeret",
    "firstname": "Elfy",
    "lastname": "BERGERET",
    "contactEmail": "bergeretelfy@gmail.com",
    "parentId": "bergeretelfy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elfy.bergeret"
  },
  {
    "dob": "23/03/2010",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "chiara.burton",
    "firstname": "Chiara",
    "lastname": "BURTON",
    "contactEmail": "meliasop@gmail.com",
    "parentId": "meliasop@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=chiara.burton"
  },
  {
    "dob": "06/11/2013",
    "courseIds": [
      38
    ],
    "id": "chloe.chauvaux",
    "firstname": "Chloé",
    "lastname": "CHAUVAUX",
    "contactEmail": "jeremy.chauvaux.be@gmail.com",
    "parentId": "jeremy.chauvaux.be@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=chloe.chauvaux"
  },
  {
    "dob": "04/11/2012",
    "courseIds": [
      38
    ],
    "id": "louise.collin",
    "firstname": "Louise",
    "lastname": "COLLIN",
    "contactEmail": "aline.fontaine372@gmail.com",
    "parentId": "aline.fontaine372@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.collin"
  },
  {
    "dob": "25/05/2011",
    "courseIds": [
      38
    ],
    "id": "amelie.collin",
    "firstname": "Amélie",
    "lastname": "COLLIN",
    "contactEmail": "tuyetnguyen5282@gmail.com",
    "parentId": "tuyetnguyen5282@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=amelie.collin"
  },
  {
    "dob": "21/02/2013",
    "courseIds": [
      36,
      37,
      38
    ],
    "id": "maïly.debbaut",
    "firstname": "Maïly",
    "lastname": "DEBBAUT",
    "contactEmail": "sabhanoteau@hotmail.com",
    "parentId": "sabhanoteau@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maïly.debbaut"
  },
  {
    "dob": "20/07/2006",
    "courseIds": [
      38
    ],
    "id": "elise.dehez",
    "firstname": "Elise",
    "lastname": "DEHEZ",
    "contactEmail": "rdehez@yahoo.fr",
    "parentId": "rdehez@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elise.dehez"
  },
  {
    "dob": "12/06/2008",
    "courseIds": [
      38
    ],
    "id": "celestine.dehez",
    "firstname": "Célestine",
    "lastname": "DEHEZ",
    "contactEmail": "rdehez@yahoo.fr",
    "parentId": "rdehez@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celestine.dehez"
  },
  {
    "dob": "19/05/2009",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "emma.delcommune",
    "firstname": "Emma",
    "lastname": "DELCOMMUNE",
    "contactEmail": "candy080881@yahoo.fr",
    "parentId": "candy080881@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.delcommune"
  },
  {
    "dob": "20/05/2003",
    "courseIds": [
      38
    ],
    "id": "manon.duchene",
    "firstname": "Manon",
    "lastname": "DUCHENE",
    "contactEmail": "dchn.manon@gmail.com",
    "parentId": "dchn.manon@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=manon.duchene"
  },
  {
    "dob": "22/09/2013",
    "courseIds": [
      38,
      39
    ],
    "id": "rosie.gaziaux",
    "firstname": "Rosie",
    "lastname": "GAZIAUX",
    "contactEmail": "melissafoulon07@gmail.com",
    "parentId": "melissafoulon07@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=rosie.gaziaux"
  },
  {
    "dob": "02/08/2011",
    "courseIds": [
      37,
      38
    ],
    "id": "ellyn.geoffroy",
    "firstname": "Ellyn",
    "lastname": "GEOFFROY",
    "contactEmail": "agneta.keser@orange.fr",
    "parentId": "agneta.keser@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ellyn.geoffroy"
  },
  {
    "dob": "03/11/2009",
    "courseIds": [
      36,
      37,
      38
    ],
    "id": "stecy.klein",
    "firstname": "Stecy",
    "lastname": "KLEIN",
    "contactEmail": "dellej2408@gmail.com",
    "parentId": "dellej2408@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=stecy.klein"
  },
  {
    "dob": "10/02/2004",
    "courseIds": [
      36,
      38
    ],
    "id": "julia.lamotte",
    "firstname": "Julia",
    "lastname": "LAMOTTE",
    "contactEmail": "julia.lamotte49@gmail.com",
    "parentId": "julia.lamotte49@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=julia.lamotte"
  },
  {
    "dob": "25/05/2009",
    "courseIds": [
      38,
      39
    ],
    "id": "philomene.poncelet",
    "firstname": "Philomène",
    "lastname": "PONCELET",
    "contactEmail": "poncelet.arquin@gmail.com",
    "parentId": "poncelet.arquin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=philomene.poncelet"
  },
  {
    "dob": "05/11/2009",
    "courseIds": [
      37,
      38,
      39
    ],
    "id": "zoe.ramirez",
    "firstname": "Zoe",
    "lastname": "RAMIREZ",
    "contactEmail": "juliasoulignac@orange.fr",
    "parentId": "juliasoulignac@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=zoe.ramirez"
  },
  {
    "dob": "24/07/2007",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "alyssa.secretin",
    "firstname": "Alyssa",
    "lastname": "SECRETIN",
    "contactEmail": "alyssasecretin0@gmail.com",
    "parentId": "alyssasecretin0@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alyssa.secretin"
  },
  {
    "dob": "05/01/2011",
    "courseIds": [
      38
    ],
    "id": "kayliah.sinigenga",
    "firstname": "Kayliah",
    "lastname": "SINIGENGA",
    "contactEmail": "paulanduwi@hotmail.be",
    "parentId": "paulanduwi@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kayliah.sinigenga"
  },
  {
    "dob": "04/12/2013",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "melina.slimani",
    "firstname": "Mélina",
    "lastname": "SLIMANI",
    "contactEmail": "jessica.barthol@hotmail.com",
    "parentId": "jessica.barthol@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=melina.slimani"
  },
  {
    "dob": "10/09/2013",
    "courseIds": [
      37,
      38,
      39
    ],
    "id": "nolwen.thomas",
    "firstname": "Nolwen",
    "lastname": "THOMAS",
    "contactEmail": "didi8501@hotmail.com",
    "parentId": "didi8501@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=nolwen.thomas"
  },
  {
    "dob": "25/05/2011",
    "courseIds": [
      38
    ],
    "id": "emma.trigo",
    "firstname": "Emma",
    "lastname": "TRIGO",
    "contactEmail": "celinedehez@hotmail.com",
    "parentId": "celinedehez@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.trigo"
  },
  {
    "dob": "01/04/2012",
    "courseIds": [
      36,
      38
    ],
    "id": "emma.anizet",
    "firstname": "Emma",
    "lastname": "ANIZET",
    "contactEmail": "roxane2886@hotmail.com",
    "parentId": "roxane2886@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.anizet"
  },
  {
    "dob": "05/01/2008",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "anaë.delville",
    "firstname": "Anaë",
    "lastname": "DELVILLE",
    "contactEmail": "corinne.delville@free.fr",
    "parentId": "corinne.delville@free.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anaë.delville"
  },
  {
    "dob": "09/04/2012",
    "courseIds": [
      37,
      38,
      39
    ],
    "id": "jade.detaille",
    "firstname": "Jade",
    "lastname": "DETAILLE",
    "contactEmail": "laetitia.lette@hotmail.com",
    "parentId": "laetitia.lette@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.detaille"
  },
  {
    "dob": "15/09/2009",
    "courseIds": [
      36,
      37,
      38
    ],
    "id": "ambre.fries",
    "firstname": "Ambre",
    "lastname": "FRIES",
    "contactEmail": "iamgreg2212@gmail.com",
    "parentId": "iamgreg2212@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ambre.fries"
  },
  {
    "dob": "06/05/2004",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "adeline.germain",
    "firstname": "Adeline",
    "lastname": "GERMAIN",
    "contactEmail": "adeline55.germain@orange.fr",
    "parentId": "adeline55.germain@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adeline.germain"
  },
  {
    "dob": "06/03/2013",
    "courseIds": [
      38
    ],
    "id": "lena.leroy",
    "firstname": "Léna",
    "lastname": "LEROY",
    "contactEmail": "wagnermarie@hotmail.fr",
    "parentId": "wagnermarie@hotmail.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lena.leroy"
  },
  {
    "dob": "14/05/2009",
    "courseIds": [
      36,
      37,
      38,
      39
    ],
    "id": "emy.robert",
    "firstname": "Emy",
    "lastname": "ROBERT",
    "contactEmail": "ansolemy@hotmail.com",
    "parentId": "ansolemy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emy.robert"
  },
  {
    "dob": "27/06/2000",
    "courseIds": [
      36,
      38
    ],
    "id": "celia.valentegd",
    "firstname": "Célia",
    "lastname": "VALENTE G D",
    "contactEmail": "celiaduarte2730@hotmail.com",
    "parentId": "celiaduarte2730@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celia.valentegd"
  },
  {
    "dob": "10/07/2009",
    "courseIds": [
      36,
      37
    ],
    "id": "line.alomary",
    "firstname": "Line",
    "lastname": "ALOMARY",
    "contactEmail": "carolineitheimer80@gmail.com",
    "parentId": "carolineitheimer80@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=line.alomary"
  },
  {
    "dob": "14/09/2010",
    "courseIds": [
      36
    ],
    "id": "camille.collin",
    "firstname": "Camille",
    "lastname": "COLLIN",
    "contactEmail": "aline.fontaine372@gmail.com",
    "parentId": "aline.fontaine372@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=camille.collin"
  },
  {
    "dob": "09/07/2016",
    "courseIds": [
      36
    ],
    "id": "laÿna.deruette",
    "firstname": "Laÿna",
    "lastname": "DE RUETTE",
    "contactEmail": "alilac16@gmail.com",
    "parentId": "alilac16@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=laÿna.deruette"
  },
  {
    "dob": "02/08/2011",
    "courseIds": [
      36
    ],
    "id": "ellyn.geoffroid",
    "firstname": "Ellyn",
    "lastname": "GEOFFROID",
    "contactEmail": "agneta.keser@orange.fr",
    "parentId": "agneta.keser@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ellyn.geoffroid"
  },
  {
    "dob": "07/12/2010",
    "courseIds": [
      36
    ],
    "id": "kelly.herman",
    "firstname": "Kelly",
    "lastname": "HERMAN",
    "contactEmail": "fasololaetitia21@gmail.com",
    "parentId": "fasololaetitia21@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kelly.herman"
  },
  {
    "dob": "09/04/2012",
    "courseIds": [
      36
    ],
    "id": "jade.detail",
    "firstname": "Jade",
    "lastname": "DETAIL",
    "contactEmail": "laetitia.lette@hotmail.com",
    "parentId": "laetitia.lette@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jade.detail"
  },
  {
    "dob": "19/10/2009",
    "courseIds": [
      36,
      37
    ],
    "id": "leo.deville",
    "firstname": "Léo",
    "lastname": "DEVILLE",
    "contactEmail": "raquel.deville@gmail.com",
    "parentId": "raquel.deville@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leo.deville"
  },
  {
    "dob": "23/12/2010",
    "courseIds": [
      36
    ],
    "id": "mila.iciakene",
    "firstname": "Mila",
    "lastname": "ICIAKENE",
    "contactEmail": "amandine.iciakene@gmail.com",
    "parentId": "amandine.iciakene@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mila.iciakene"
  },
  {
    "dob": "08/11/2010",
    "courseIds": [
      36
    ],
    "id": "madison.jacquemin",
    "firstname": "Madison",
    "lastname": "JACQUEMIN",
    "contactEmail": "malou.fontaine75@gmail.com",
    "parentId": "malou.fontaine75@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=madison.jacquemin"
  },
  {
    "dob": "12/10/2009",
    "courseIds": [
      37,
      39
    ],
    "id": "louane.abujahrur",
    "firstname": "Louane",
    "lastname": "ABU JAHRUR",
    "contactEmail": "cuvelier.sylviane@orange.fr",
    "parentId": "cuvelier.sylviane@orange.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louane.abujahrur"
  },
  {
    "dob": "15/08/2014",
    "courseIds": [
      37,
      39
    ],
    "id": "oceane.aubryferrari",
    "firstname": "Océane",
    "lastname": "AUBRY FERRARI",
    "contactEmail": "nanouni86@hotmail.com",
    "parentId": "nanouni86@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=oceane.aubryferrari"
  },
  {
    "dob": "01/03/2009",
    "courseIds": [
      37,
      39
    ],
    "id": "luna.dumontzambo",
    "firstname": "Luna",
    "lastname": "DUMONT ZAMBO",
    "contactEmail": "sabhanoteau@hotmail.com",
    "parentId": "sabhanoteau@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=luna.dumontzambo"
  },
  {
    "dob": "07/11/2009",
    "courseIds": [
      39
    ],
    "id": "eva.parrot",
    "firstname": "Eva",
    "lastname": "PARROT",
    "contactEmail": "amicisskam1985@gmail.com",
    "parentId": "amicisskam1985@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eva.parrot"
  },
  {
    "dob": "05/02/2013",
    "courseIds": [
      37,
      39
    ],
    "id": "soliyana.teweldebiniam",
    "firstname": "Soliyana",
    "lastname": "TEWELDE BINIAM",
    "contactEmail": "biniam.bt123@gmail.com",
    "parentId": "biniam.bt123@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=soliyana.teweldebiniam"
  },
  {
    "dob": "07/01/2010",
    "courseIds": [
      37,
      39
    ],
    "id": "courtney.thiry",
    "firstname": "Courtney",
    "lastname": "THIRY",
    "contactEmail": "thirygregory1985@gmail.com",
    "parentId": "thirygregory1985@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=courtney.thiry"
  },
  {
    "dob": "11/01/2009",
    "courseIds": [
      37
    ],
    "id": "mariama.kamagate",
    "firstname": "Mariama",
    "lastname": "KAMAGATE",
    "contactEmail": "amicisskam1985@gmail.com",
    "parentId": "amicisskam1985@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mariama.kamagate"
  },
  {
    "dob": "20/02/2006",
    "courseIds": [
      37
    ],
    "id": "manon.pougny",
    "firstname": "Manon",
    "lastname": "POUGNY",
    "contactEmail": "pougnymanon@gmail.com",
    "parentId": "pougnymanon@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=manon.pougny"
  },
  {
    "dob": "16/05/2009",
    "courseIds": [
      37
    ],
    "id": "anaïs.chauvaux",
    "firstname": "Anaïs",
    "lastname": "CHAUVAUX",
    "contactEmail": "jeremy.chauvaux.be@gmail.com",
    "parentId": "jeremy.chauvaux.be@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anaïs.chauvaux"
  },
  {
    "dob": "04/06/2007",
    "courseIds": [
      37
    ],
    "id": "alyssa.couset",
    "firstname": "Alyssa",
    "lastname": "COUSET",
    "contactEmail": "dasnoy.stephanie@gmail.com",
    "parentId": "dasnoy.stephanie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alyssa.couset"
  },
  {
    "dob": "07/12/2008",
    "courseIds": [
      37
    ],
    "id": "kayliah.vazfelix",
    "firstname": "Kayliah",
    "lastname": "VAZ FELIX",
    "contactEmail": "solune2409@gmail.com",
    "parentId": "solune2409@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kayliah.vazfelix"
  },
  {
    "dob": "13/05/2016",
    "courseIds": [
      34
    ],
    "id": "agathe.ange",
    "firstname": "Agathe",
    "lastname": "ANGE",
    "contactEmail": "ch.duroy@skynet.be",
    "parentId": "ch.duroy@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=agathe.ange"
  },
  {
    "dob": "11/01/2016",
    "courseIds": [
      34
    ],
    "id": "olivia.draux",
    "firstname": "Olivia",
    "lastname": "DRAUX",
    "contactEmail": "manon.hillewaert@gmail.com",
    "parentId": "manon.hillewaert@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=olivia.draux"
  },
  {
    "dob": "17/02/2017",
    "courseIds": [
      34
    ],
    "id": "eva.hardy",
    "firstname": "Eva",
    "lastname": "HARDY",
    "contactEmail": "py.hardy@outlook.be",
    "parentId": "py.hardy@outlook.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eva.hardy"
  },
  {
    "dob": "13/11/2017",
    "courseIds": [
      34
    ],
    "id": "anais.hoyois",
    "firstname": "Anais",
    "lastname": "HOYOIS",
    "contactEmail": "maoui.manon@hotmail.com",
    "parentId": "maoui.manon@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anais.hoyois"
  },
  {
    "dob": "12/04/2016",
    "courseIds": [
      34
    ],
    "id": "giulia.lambert",
    "firstname": "Giulia",
    "lastname": "LAMBERT",
    "contactEmail": "malwina.p@live.com",
    "parentId": "malwina.p@live.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=giulia.lambert"
  },
  {
    "dob": "28/04/2017",
    "courseIds": [
      34
    ],
    "id": "roxy.martin",
    "firstname": "Roxy",
    "lastname": "MARTIN",
    "contactEmail": "kimberley111331@gmail.com",
    "parentId": "kimberley111331@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=roxy.martin"
  },
  {
    "dob": "13/10/2015",
    "courseIds": [
      34
    ],
    "id": "constance.mazy",
    "firstname": "Constance",
    "lastname": "MAZY",
    "contactEmail": "ch.duroy@skynet.be",
    "parentId": "ch.duroy@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=constance.mazy"
  },
  {
    "dob": "08/02/2014",
    "courseIds": [
      34
    ],
    "id": "anna.vincent",
    "firstname": "Anna",
    "lastname": "VINCENT",
    "contactEmail": "natacha-rouyer@hotmail.be",
    "parentId": "natacha-rouyer@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anna.vincent"
  },
  {
    "dob": "01/04/2016",
    "courseIds": [
      34
    ],
    "id": "luzmila.solarmiranda",
    "firstname": "Luzmila",
    "lastname": "SOLAR MIRANDA",
    "contactEmail": "cathytriest@hotmail.com",
    "parentId": "cathytriest@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=luzmila.solarmiranda"
  },
  {
    "dob": "28/03/2016",
    "courseIds": [
      34
    ],
    "id": "leonie.roger",
    "firstname": "Léonie",
    "lastname": "ROGER",
    "contactEmail": "staumontdaphne63@gmail.com",
    "parentId": "staumontdaphne63@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=leonie.roger"
  },
  {
    "dob": "11/05/2017",
    "courseIds": [
      34
    ],
    "id": "olivia.moyen",
    "firstname": "Olivia",
    "lastname": "MOYEN",
    "contactEmail": "nathe_11@hotmail.com",
    "parentId": "nathe_11@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=olivia.moyen"
  },
  {
    "dob": "29/08/2016",
    "courseIds": [
      34
    ],
    "id": "judith.petit",
    "firstname": "Judith",
    "lastname": "PETIT",
    "contactEmail": "ch.déom@outlook.be",
    "parentId": "ch.déom@outlook.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=judith.petit"
  },
  {
    "dob": "22/12/2016",
    "courseIds": [
      34
    ],
    "id": "mya.titeux",
    "firstname": "Mya",
    "lastname": "TITEUX",
    "contactEmail": "chaputjulie@hotmail.be",
    "parentId": "chaputjulie@hotmail.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=mya.titeux"
  },
  {
    "dob": "31/05/2013",
    "courseIds": [
      35
    ],
    "id": "juliette.ange",
    "firstname": "Juliette",
    "lastname": "ANGE",
    "contactEmail": "ch.duroy@skynet.be",
    "parentId": "ch.duroy@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=juliette.ange"
  },
  {
    "dob": "26/05/2010",
    "courseIds": [
      35
    ],
    "id": "lilou.amanddemendieta",
    "firstname": "Lilou",
    "lastname": "AMAND DE MENDIETA",
    "contactEmail": "amandlilou4@gmail.com",
    "parentId": "amandlilou4@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lilou.amanddemendieta"
  },
  {
    "dob": "12/11/2015",
    "courseIds": [
      35
    ],
    "id": "louisa.bay",
    "firstname": "Louisa",
    "lastname": "BAY",
    "contactEmail": "jessicadelcroix007@gmail.com",
    "parentId": "jessicadelcroix007@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louisa.bay"
  },
  {
    "dob": "08/02/2014",
    "courseIds": [
      35
    ],
    "id": "kaylia.borrens",
    "firstname": "Kaylia",
    "lastname": "BORRENS",
    "contactEmail": "elodie.dehalleux@live.fr",
    "parentId": "elodie.dehalleux@live.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kaylia.borrens"
  },
  {
    "dob": "30/12/2013",
    "courseIds": [
      35
    ],
    "id": "elsa.crippa",
    "firstname": "Elsa",
    "lastname": "CRIPPA",
    "contactEmail": "audrey_houins@hotmail.com",
    "parentId": "audrey_houins@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elsa.crippa"
  },
  {
    "dob": "18/11/2010",
    "courseIds": [
      35
    ],
    "id": "marion.duplicy",
    "firstname": "Marion",
    "lastname": "DUPLICY",
    "contactEmail": "elisewav@gmail.com",
    "parentId": "elisewav@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marion.duplicy"
  },
  {
    "dob": "11/12/2011",
    "courseIds": [
      35
    ],
    "id": "sasha.kemtiongouana",
    "firstname": "Sasha",
    "lastname": "KEMTIO NGOUANA",
    "contactEmail": "guillaumeclaire@hotmail.com",
    "parentId": "guillaumeclaire@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sasha.kemtiongouana"
  },
  {
    "dob": "17/02/2014",
    "courseIds": [
      35
    ],
    "id": "lyne.klepper",
    "firstname": "Lyne",
    "lastname": "KLEPPER",
    "contactEmail": "l.arnould@icloud.com",
    "parentId": "l.arnould@icloud.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lyne.klepper"
  },
  {
    "dob": "11/05/2014",
    "courseIds": [
      35
    ],
    "id": "thea.latot",
    "firstname": "Thea",
    "lastname": "LATOT",
    "contactEmail": "gaellebertrand81@gmail.com",
    "parentId": "gaellebertrand81@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=thea.latot"
  },
  {
    "dob": "14/12/2000",
    "courseIds": [
      35
    ],
    "id": "noellyne.mazy",
    "firstname": "Noellyne",
    "lastname": "MAZY",
    "contactEmail": "ch.duroy@skynet.be",
    "parentId": "ch.duroy@skynet.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=noellyne.mazy"
  },
  {
    "dob": "15/10/2010",
    "courseIds": [
      35
    ],
    "id": "flavie.noel",
    "firstname": "Flavie",
    "lastname": "NOEL",
    "contactEmail": "mohymelissa@gmail.com",
    "parentId": "mohymelissa@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=flavie.noel"
  },
  {
    "dob": "19/09/2009",
    "courseIds": [
      35
    ],
    "id": "maelys.piquard",
    "firstname": "Maelys",
    "lastname": "PIQUARD",
    "contactEmail": "piquardemilie@gmail.com",
    "parentId": "piquardemilie@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=maelys.piquard"
  },
  {
    "dob": "27/05/2013",
    "courseIds": [
      35
    ],
    "id": "eloïse.roger",
    "firstname": "Eloïse",
    "lastname": "ROGER",
    "contactEmail": "staumontdaphne63@gmail.com",
    "parentId": "staumontdaphne63@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eloïse.roger"
  },
  {
    "dob": "04/11/2003",
    "courseIds": [
      32,
      33
    ],
    "id": "emeline.cornelis",
    "firstname": "Emeline",
    "lastname": "CORNELIS",
    "contactEmail": "cornelis.emeline@gmail.com",
    "parentId": "cornelis.emeline@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emeline.cornelis"
  },
  {
    "dob": "05/08/1982",
    "courseIds": [
      32,
      33
    ],
    "id": "marie.cornerotte",
    "firstname": "Marie",
    "lastname": "CORNEROTTE",
    "contactEmail": "toune5882@hotmail.com",
    "parentId": "toune5882@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marie.cornerotte"
  },
  {
    "dob": "18/03/1997",
    "courseIds": [
      33
    ],
    "id": "marine.depiesse",
    "firstname": "Marine",
    "lastname": "DEPIESSE",
    "contactEmail": "marine.depiesse@outlook.be",
    "parentId": "marine.depiesse@outlook.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=marine.depiesse"
  },
  {
    "dob": "20/10/1981",
    "courseIds": [
      33
    ],
    "id": "virginie.evrard",
    "firstname": "Virginie",
    "lastname": "EVRARD",
    "contactEmail": "virginie_evrard2005@yahoo.fr",
    "parentId": "virginie_evrard2005@yahoo.fr",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=virginie.evrard"
  },
  {
    "dob": "09/01/2001",
    "courseIds": [
      32,
      33
    ],
    "id": "celina.giannone",
    "firstname": "Celina",
    "lastname": "GIANNONE",
    "contactEmail": "celina.giannone09@gmail.com",
    "parentId": "celina.giannone09@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=celina.giannone"
  },
  {
    "dob": "26/05/1991",
    "courseIds": [
      32,
      33
    ],
    "id": "medigane.jacquemin",
    "firstname": "Medigane",
    "lastname": "JACQUEMIN",
    "contactEmail": "jacquemin.medigane@gmail.com",
    "parentId": "jacquemin.medigane@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=medigane.jacquemin"
  },
  {
    "dob": "28/09/1989",
    "courseIds": [
      33
    ],
    "id": "anaïs.olivier",
    "firstname": "Anaïs",
    "lastname": "OLIVIER",
    "contactEmail": "olivier.anais1@gmail.com",
    "parentId": "olivier.anais1@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anaïs.olivier"
  },
  {
    "dob": "29/03/1971",
    "courseIds": [
      33
    ],
    "id": "anne-sophie.pemmers",
    "firstname": "Anne-Sophie",
    "lastname": "PEMMERS",
    "contactEmail": "annexophie_pemmers@hotmail.com",
    "parentId": "annexophie_pemmers@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=anne-sophie.pemmers"
  },
  {
    "dob": "17/04/1990",
    "courseIds": [
      32,
      33
    ],
    "id": "alicia.resibois",
    "firstname": "Alicia",
    "lastname": "RESIBOIS",
    "contactEmail": "aliciaresibois@hotmail.com",
    "parentId": "aliciaresibois@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=alicia.resibois"
  },
  {
    "dob": "26/06/1982",
    "courseIds": [
      32,
      33
    ],
    "id": "gaelle.thiebaut",
    "firstname": "Gaelle",
    "lastname": "THIEBAUT",
    "contactEmail": "gaellethiebaut6@gmail.com",
    "parentId": "gaellethiebaut6@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=gaelle.thiebaut"
  },
  {
    "dob": "31/08/1983",
    "courseIds": [
      32,
      33
    ],
    "id": "elodie.toche",
    "firstname": "Elodie",
    "lastname": "TOCHE",
    "contactEmail": "elodie.toche@gmail.com",
    "parentId": "elodie.toche@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=elodie.toche"
  },
  {
    "dob": "09/04/1982",
    "courseIds": [
      32
    ],
    "id": "fanny.exmelin",
    "firstname": "Fanny",
    "lastname": "EXMELIN",
    "contactEmail": "exmelin_fanny@hotmail.com",
    "parentId": "exmelin_fanny@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=fanny.exmelin"
  },
  {
    "dob": "23/01/1992",
    "courseIds": [
      32
    ],
    "id": "coralie.hardy",
    "firstname": "Coralie",
    "lastname": "HARDY",
    "contactEmail": "coralie_hardy@hotmail.com",
    "parentId": "coralie_hardy@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=coralie.hardy"
  },
  {
    "dob": "20/10/1989",
    "courseIds": [
      32
    ],
    "id": "priscilla.honore",
    "firstname": "Priscilla",
    "lastname": "HONORE",
    "contactEmail": "jaumotte-honore@hotmail.com",
    "parentId": "jaumotte-honore@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=priscilla.honore"
  },
  {
    "dob": "04/11/2002",
    "courseIds": [
      32
    ],
    "id": "kenza.housni",
    "firstname": "Kenza",
    "lastname": "HOUSNI",
    "contactEmail": "kenza.housni411@gmail.com",
    "parentId": "kenza.housni411@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=kenza.housni"
  },
  {
    "dob": "10/01/1995",
    "courseIds": [
      32
    ],
    "id": "louise.jacquemin",
    "firstname": "Louise",
    "lastname": "JACQUEMIN",
    "contactEmail": "louise.jacquemin@gmail.com",
    "parentId": "louise.jacquemin@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=louise.jacquemin"
  },
  {
    "dob": "22/04/1990",
    "courseIds": [
      32
    ],
    "id": "lorie.lallemand",
    "firstname": "Lorie",
    "lastname": "LALLEMAND",
    "contactEmail": "lorie_l@hotmail.com",
    "parentId": "lorie_l@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=lorie.lallemand"
  },
  {
    "dob": "14/07/1989",
    "courseIds": [
      32
    ],
    "id": "charlotte.lecluze",
    "firstname": "Charlotte",
    "lastname": "LECLUZE",
    "contactEmail": "charlotte.lecluze.7@gmail.com",
    "parentId": "charlotte.lecluze.7@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=charlotte.lecluze"
  },
  {
    "dob": "18/06/1999",
    "courseIds": [
      32
    ],
    "id": "houda.mezouari",
    "firstname": "Houda",
    "lastname": "MEZOUARI",
    "contactEmail": "houdamezouari06@gmail.com",
    "parentId": "houdamezouari06@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=houda.mezouari"
  },
  {
    "dob": "14/07/1977",
    "courseIds": [
      32
    ],
    "id": "johane.penning",
    "firstname": "Johane",
    "lastname": "PENNING",
    "contactEmail": "joevoyage@gmail.com",
    "parentId": "joevoyage@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=johane.penning"
  },
  {
    "dob": "18/07/1989",
    "courseIds": [
      32
    ],
    "id": "eve.theodore",
    "firstname": "Eve",
    "lastname": "THEODORE",
    "contactEmail": "eve.theodore89@gmail.com",
    "parentId": "eve.theodore89@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=eve.theodore"
  },
  {
    "dob": "22/12/1989",
    "courseIds": [
      32
    ],
    "id": "sophie.zacharie",
    "firstname": "Sophie",
    "lastname": "ZACHARIE",
    "contactEmail": "sophie.zacharie@eflchiny.be",
    "parentId": "sophie.zacharie@eflchiny.be",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sophie.zacharie"
  },
  {
    "dob": "16/06/1999",
    "courseIds": [
      32
    ],
    "id": "sylviane.larimazy",
    "firstname": "Sylviane",
    "lastname": "LARIMAZY",
    "contactEmail": "sylvianeiarimasy@gmail.com",
    "parentId": "sylvianeiarimasy@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=sylviane.larimazy"
  },
  {
    "dob": "26/10/1999",
    "courseIds": [
      32
    ],
    "id": "emma.loutsch",
    "firstname": "Emma",
    "lastname": "LOUTSCH",
    "contactEmail": "emma.loutsch@gmail.com",
    "parentId": "emma.loutsch@gmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=emma.loutsch"
  },
  {
    "dob": "",
    "courseIds": [
      31
    ],
    "id": "ass..cours",
    "firstname": "ass.",
    "lastname": "cours",
    "contactEmail": "mail",
    "parentId": "mail",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ass..cours"
  },
  {
    "dob": "5 cours",
    "courseIds": [
      31
    ],
    "id": "20.135",
    "firstname": "20",
    "lastname": "135",
    "contactEmail": "france-goffin@hotmail.com",
    "parentId": "france-goffin@hotmail.com",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=20.135"
  },
  {
    "dob": "kimadam@li",
    "courseIds": [
      31
    ],
    "id": "adam.1",
    "firstname": "Adam",
    "lastname": "1",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=adam.1"
  },
  {
    "dob": "boonenlaet",
    "courseIds": [
      31
    ],
    "id": "boonen.2",
    "firstname": "Boonen",
    "lastname": "2",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=boonen.2"
  },
  {
    "dob": "laura.coll",
    "courseIds": [
      31
    ],
    "id": "collin.3",
    "firstname": "Collin",
    "lastname": "3",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=collin.3"
  },
  {
    "dob": "ophelie.co",
    "courseIds": [
      31
    ],
    "id": "cornelis.4",
    "firstname": "CORNELIS",
    "lastname": "4",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=cornelis.4"
  },
  {
    "dob": "dedricheca",
    "courseIds": [
      31
    ],
    "id": "dedriche.5",
    "firstname": "DEDRICHE",
    "lastname": "5",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=dedriche.5"
  },
  {
    "dob": "severine.d",
    "courseIds": [
      31
    ],
    "id": "dumont.6",
    "firstname": "Dumont",
    "lastname": "6",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=dumont.6"
  },
  {
    "dob": "marikefran",
    "courseIds": [
      31
    ],
    "id": "franck.7",
    "firstname": "Franck",
    "lastname": "7",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=franck.7"
  },
  {
    "dob": "goffinet.m",
    "courseIds": [
      31
    ],
    "id": "goffinet.8",
    "firstname": "Goffinet",
    "lastname": "8",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=goffinet.8"
  },
  {
    "dob": "coralie_ha",
    "courseIds": [
      31
    ],
    "id": "hardy.9",
    "firstname": "HARDY",
    "lastname": "9",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=hardy.9"
  },
  {
    "dob": "fallonherm",
    "courseIds": [
      31
    ],
    "id": "hermans.10",
    "firstname": "HERMANS",
    "lastname": "10",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=hermans.10"
  },
  {
    "dob": "ophelie.hi",
    "courseIds": [
      31
    ],
    "id": "hinque.11",
    "firstname": "Hinque",
    "lastname": "11",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=hinque.11"
  },
  {
    "dob": "clara.jado",
    "courseIds": [
      31
    ],
    "id": "jadot.12",
    "firstname": "JADOT",
    "lastname": "12",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jadot.12"
  },
  {
    "dob": "cagivajc@h",
    "courseIds": [
      31
    ],
    "id": "jullien.13",
    "firstname": "JULLIEN",
    "lastname": "13",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=jullien.13"
  },
  {
    "dob": "oceanekete",
    "courseIds": [
      31
    ],
    "id": "ketels.14",
    "firstname": "KETELS",
    "lastname": "14",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ketels.14"
  },
  {
    "dob": "sidjimoulu",
    "courseIds": [
      31
    ],
    "id": "moulure.15",
    "firstname": "Moulure",
    "lastname": "15",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=moulure.15"
  },
  {
    "dob": "kimberley1",
    "courseIds": [
      31
    ],
    "id": "piette.16",
    "firstname": "Piette",
    "lastname": "16",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=piette.16"
  },
  {
    "dob": "sarah.pint",
    "courseIds": [
      31
    ],
    "id": "pintus.17",
    "firstname": "Pintus",
    "lastname": "17",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=pintus.17"
  },
  {
    "dob": "m.pioge@gm",
    "courseIds": [
      31
    ],
    "id": "pioge.18",
    "firstname": "Pioge",
    "lastname": "18",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=pioge.18"
  },
  {
    "dob": "",
    "courseIds": [
      31
    ],
    "id": "ponsard.19",
    "firstname": "Ponsard",
    "lastname": "19",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=ponsard.19"
  },
  {
    "dob": "pougnymano",
    "courseIds": [
      31
    ],
    "id": "pougny.20",
    "firstname": "pougny",
    "lastname": "20",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=pougny.20"
  },
  {
    "dob": "fanny.tiss",
    "courseIds": [
      31
    ],
    "id": "tison.21",
    "firstname": "Tison",
    "lastname": "21",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=tison.21"
  },
  {
    "dob": "aurelie.va",
    "courseIds": [
      31
    ],
    "id": "vanduren.22",
    "firstname": "Vanduren",
    "lastname": "22",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=vanduren.22"
  },
  {
    "dob": "kseniia.vo",
    "courseIds": [
      31
    ],
    "id": "voitovych.23",
    "firstname": "Voitovych",
    "lastname": "23",
    "contactEmail": "",
    "parentId": "",
    "coursesRaw": "Excel Import",
    "cotisation": "en attente",
    "mutuelle": "attente",
    "absences": [],
    "avatar": "https://i.pravatar.cc/150?u=voitovych.23"
  }
];
  const btn = document.getElementById('btn-migrate-students');
  if (!confirm(`Importer les ${STUDENTS.length} fiches élèves 2026-2027 ?\n\nAucun email ne sera envoyé. Cette opération peut prendre 1-2 minutes.`)) return;

  btn.textContent = "Importation en cours...";
  btn.disabled = true;

  try {
    const firebase = await import('./firebase-config.js');
    
    
    
    let created = 0;
    let skipped = 0;
    let errors = 0;
    const BATCH_SIZE = 10;

    for (let i = 0; i < STUDENTS.length; i += BATCH_SIZE) {
      const batch = STUDENTS.slice(i, i + BATCH_SIZE);
      btn.textContent = `Importation... ${i}/${STUDENTS.length}`;
      
      await Promise.all(batch.map(async (s) => {
        try {
          const docRef = firebase.doc(firebase.db, "students", s.id);
          const existing = await firebase.getDoc(docRef);
          if (existing.exists()) {
            skipped++;
            return;
          }
          
          await firebase.setDoc(docRef, {
            firstname: s.firstname,
            lastname: s.lastname,
            dob: s.dob,
            contactEmail: s.contactEmail,
            parentId: s.parentId,
            courseIds: s.courseIds,
            cotisation: s.cotisation,
            mutuelle: s.mutuelle,
            absences: s.absences,
            avatar: s.avatar
          });
          created++;
        } catch (err) {
          console.error("Error importing student", s.id, err);
          errors++;
        }
      }));
    }
    
    // Update local DATA
    window.DATA.students = [];
    const snap = await firebase.getDocs(firebase.collection(firebase.db, "students"));
    snap.forEach(d => window.DATA.students.push({ id: d.id, ...d.data() }));
    
    alert(`✅ Import terminé !\n\n✔ ${created} fiches créées\n⏭ ${skipped} fiches déjà existantes\n❌ ${errors} erreurs\n\nAucun email n'a été envoyé.`);
    window.renderAdminEleves();
  } catch(e) {
    console.error(e);
    alert("Erreur : " + e.message);
  } finally {
    btn.textContent = "Importer les élèves 2026-2027";
    btn.disabled = false;
  }
};


// Fix prof names in Firestore (one-time migration)
window.fixProfNames = async function() {
  const firebase = await import('./firebase-config.js');
  
  // Search all users and fix any that still have old single-name values
  const usersSnap = await firebase.getDocs(firebase.collection(firebase.db, 'users'));
  let fixed = 0;
  let details = [];
  
  for (const d of usersSnap.docs) {
    const data = d.data();
    if (data.name === 'Florence' || data.firstname === 'Florence') {
      await firebase.updateDoc(firebase.doc(firebase.db, 'users', d.id), {
        name: 'Florence Leyens',
        firstname: 'Florence',
        lastname: 'Leyens'
      });
      fixed++;
      details.push('Florence -> Florence Leyens (id: ' + d.id + ')');
    } else if (data.name === 'Adam' || data.firstname === 'Adam') {
      await firebase.updateDoc(firebase.doc(firebase.db, 'users', d.id), {
        name: 'Adam Binoua',
        firstname: 'Adam',
        lastname: 'Binoua'
      });
      fixed++;
      details.push('Adam -> Adam Binoua (id: ' + d.id + ')');
    }
  }
  
  if (fixed === 0) {
    alert('ℹ️ Aucun compte à corriger trouvé.\n\nLes comptes ont peut-être déjà été mis à jour, ou n\'ont pas encore été créés.\nUtilisez d\'abord "Créer les profs manquants".');
  } else {
    alert('✅ ' + fixed + ' compte(s) mis à jour !\n\n' + details.join('\n'));
  }
};


window.deleteAllStudents2026 = async function() {
  const btn = document.getElementById('btn-delete-all-students');
  if(!confirm('⚠️ ÊTES-VOUS SÛR DE VOULOIR SUPPRIMER TOUS LES ÉLÈVES ? Cette action effacera toute la collection students.')) return;
  if(!confirm('Dernier avertissement : TOUS les élèves vont être supprimés. Continuer ?')) return;
  
  try {
    btn.textContent = 'Suppression en cours...';
    btn.disabled = true;
    const firebase = await import('./firebase-config.js');
    const snap = await firebase.getDocs(firebase.collection(firebase.db, 'students'));
    
    // Delete in batches or sequentially
    for(let docSnap of snap.docs) {
      await firebase.deleteDoc(firebase.doc(firebase.db, 'students', docSnap.id));
    }
    
    window.DATA.students = [];
    alert('🗑 ' + snap.docs.length + ' élèves ont été supprimés de la base de données avec succès.');
    location.reload();
  } catch(e) {
    console.error(e);
    alert('Erreur : ' + e.message);
    btn.textContent = 'Erreur. Réessayez.';
    btn.disabled = false;
  }
};
