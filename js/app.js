
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
  const img = course.image
    ? `<img src="${course.image}" alt="${course.name}" class="course-img" loading="lazy">`
    : `<div class="course-img-placeholder" style="background:linear-gradient(135deg,#1a1a1a,#242424)">${course.emoji}</div>`;
  const lieuName = DATA.locations.find(l => l.id === course.lieu)?.name || '';
  const lieuBadge = lieuName !== 'Studio ADK' ? `<span style="font-size:0.7rem;color:var(--gold);margin-left:0.5rem;">📍 ${lieuName}</span>` : '';
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
        const lieuBadge = match.lieu && match.lieu !== 'ADK' ? `<span class="block-lieu">${match.lieu}</span>` : '';
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
    const lieuName = slot.lieu && slot.lieu !== 'ADK' ? `📍 ${slot.lieu}` : '🏠 Studio ADK';
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
      
      let lieuStr = c.lieu;
      if (c.lieu === 'adk') lieuStr = 'Studio ADK';
      else if (c.lieu === 'rox') lieuStr = 'Au Rox';
      else if (c.lieu === 'bertrix') lieuStr = 'Bertrix';
      else if (c.lieu === 'izel') lieuStr = 'C.C. Izel';
      else if (c.lieu === 'flore') lieuStr = 'Florenville';

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
      const id = parseInt(e.target.dataset.id);
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
    const email = document.getElementById('portal-email').value;
    const password = document.getElementById('portal-password').value;
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
  initTabs('prof-tabs', ['tab-mon-planning', 'tab-appel', 'tab-mes-eleves', 'tab-prof-gala', 'tab-prof-notifications', 'tab-prof-messagerie']);
  initTabs('parent-tabs', ['tab-parent-planning', 'tab-parent-gala', 'tab-parent-notifications', 'tab-parent-messagerie']);
  
  // Sub-tabs Gala
  initTabs('sub-admin-gala-tabs', ['tab-admin-gala-repets', 'tab-admin-gala-tenues', 'tab-admin-gala-infos', 'tab-admin-gala-notes']);
  initTabs('sub-prof-gala-tabs', ['tab-prof-gala-repets', 'tab-prof-gala-tenues', 'tab-prof-gala-infos', 'tab-prof-gala-notes']);
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

  if (user.role === 'admin')  renderAdminDashboard(user);
  if (user.role === 'prof')   renderProfDashboard(user);
  if (user.role === 'parent') renderParentDashboard(user);

  // Demander la permission pour les notifications Push (non-bloquant)
  setTimeout(() => {
    if (window.AUTH && window.AUTH.requestPushNotificationPermission) {
      window.AUTH.requestPushNotificationPermission();
    }
  }, 2000); // Délai de 2s pour ne pas bloquer le rendu visuel
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
  if (typeof renderGalaTables === 'function') renderGalaTables();
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
  
  openModal('modal-hours-detail');
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

window.updateCotisationDate = async function(studentId, dateVal) {
    try {
      const student = DATA.getStudentById(studentId);
      if (!student) {
        alert("Erreur: Etudiant non trouvé! ID=" + studentId);
        return;
      }
      student.cotisationDate = dateVal;
      const firebase = await import('./firebase-config.js');
      await firebase.updateDoc(firebase.doc(firebase.db, 'students', String(studentId)), { cotisationDate: dateVal });
    } catch (e) {
      alert("Erreur Date: " + e.message);
    }
  };
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
      renderAdminEleves();
    } catch (e) {
      alert("Erreur Cotisation: " + e.message);
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
      renderAdminEleves();
    } catch (e) {
      alert("Erreur Mutuelle: " + e.message);
    }
  };

function renderAdminProfs() {
  const tbody = document.getElementById('admin-profs-body');
  const profs = DATA.users.filter(u => u.role === 'prof');
  tbody.innerHTML = profs.map(p => {
    const taughtCourses = DATA.courses.filter(c => c.prof && c.prof.includes(p.name));
    const coursesNames = taughtCourses.map(c => c.name).join(', ');
    const allStudentIds = new Set();
    taughtCourses.forEach(c => {
      DATA.getStudentsByCourse(c.id).forEach(s => allStudentIds.add(s.id));
    });
    const nbEleves = allStudentIds.size;
    const searchName = p.firstname || (p.name ? p.name.split(' ')[0] : '');
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
          const c = DATA.getCourseById(parseInt(cb.value));
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

    const targetId = id ? id : email;
    
    let isNewUser = false;
    let tempPassword = null;
    const userRef = firebase.doc(firebase.db, 'users', targetId);
    
    // Check existing user to preserve roles or create auth
    if (!id) {
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
          if (data.error && data.error.message !== 'EMAIL_EXISTS') throw new Error(data.error.message);
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
      }
    }

    // Update in Firebase users collection
    await firebase.setDoc(userRef, profData, { merge: true });

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
          'service_adk',
          'template_adk_welcome',
          {
            to_email: targetId,
            to_name: fullName,
            password: tempPassword,
            portal_url: window.location.origin
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
    if (!DATA.settings.holidays || DATA.settings.holidays.length === 0) {
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
            <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteHoliday(${index})">Supprimer</button>
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
    
    if(!DATA.settings.holidays) DATA.settings.holidays = [];
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

window.saveSeasonSettings = async function() {
    const start = document.getElementById('settings-season-start').value;
    const end = document.getElementById('settings-season-end').value;
    
    DATA.settings.season = { start, end };
    try {
        const firebase = await import('./firebase-config.js');
        await firebase.setDoc(firebase.doc(firebase.db, 'settings', 'general'), DATA.settings, { merge: true });
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

window.renderGalaTables = function() {
  // Répétitions
  const repBody = document.getElementById('admin-gala-rep-body');
  if (repBody) {
    if (DATA.galaRepets.length === 0) {
      repBody.innerHTML = '<tr class="empty-state"><td colspan="5">Aucune répétition planifiée.</td></tr>';
    } else {
      repBody.innerHTML = DATA.galaRepets.map(r => {
        const courseName = r.course === 'all' ? 'Tous les élèves' : (DATA.getCourseById(r.course)?.name || r.course);
        return `<tr>
          <td>${r.date} à ${r.time}</td>
          <td>${courseName}</td>
          <td>${r.lieu}</td>
          <td>${r.tenue ? 'Oui' : 'Non'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaRep('${r.id}')">X</button></td>
        </tr>`;
      }).join('');
    }
  }

  // Tenues
  const tenueBody = document.getElementById('admin-gala-tenue-body');
  if (tenueBody) {
    if (DATA.galaTenues.length === 0) {
      tenueBody.innerHTML = '<tr class="empty-state"><td colspan="3">Aucune information de tenue.</td></tr>';
    } else {
      tenueBody.innerHTML = DATA.galaTenues.map(t => {
        const courseName = DATA.getCourseById(t.course)?.name || t.course;
        return `<tr>
          <td>${courseName}</td>
          <td>${t.desc}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaTenue('${t.id}')">X</button></td>
        </tr>`;
      }).join('');
    }
  }

  // Infos
  const infoBody = document.getElementById('admin-gala-info-body');
  if (infoBody) {
    if (DATA.galaInfos.length === 0) {
      infoBody.innerHTML = '<tr class="empty-state"><td colspan="6">Aucune info tableau.</td></tr>';
    } else {
      infoBody.innerHTML = DATA.galaInfos.map(i => {
        const courseName = DATA.getCourseById(i.course)?.name || i.course;
        return `<tr>
          <td>${i.time}</td>
          <td>${courseName}</td>
          <td>${i.theme}</td>
          <td>${i.music || '-'}</td>
          <td>${i.tenue || '-'}</td>
          <td><button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaInfo('${i.id}')">X</button></td>
        </tr>`;
      }).join('');
    }
  }

  // Notes
  const noteBody = document.getElementById('admin-gala-note-body');
  if (noteBody) {
    if (DATA.galaNotes.length === 0) {
      noteBody.innerHTML = '<tr class="empty-state"><td colspan="3">Aucune note de réunion.</td></tr>';
    } else {
      noteBody.innerHTML = DATA.galaNotes.map(n => {
        return `<tr>
          <td>${n.date}</td>
          <td>${n.presents.join(', ')}</td>
          <td style="display:flex;gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="editGalaNote('${n.id}')">Voir/Modifier</button>
            <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteGalaNote('${n.id}')">X</button>
          </td>
        </tr>`;
      }).join('');
    }
  }
};

window.initGalaRepModal = function() {
  const select = document.getElementById('gala-rep-course');
  select.innerHTML = '<option value="all">Tous les élèves</option>' + DATA.courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
};
window.saveGalaRep = function() {
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
};
window.deleteGalaRep = function(id) {
  DATA.galaRepets = DATA.galaRepets.filter(r => r.id !== id);
  renderGalaTables();
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
};
window.saveGalaInfo = function() {
  DATA.galaInfos.push({
    id: 'info_' + Date.now(),
    time: document.getElementById('gala-info-time').value,
    course: document.getElementById('gala-info-course').value,
    theme: document.getElementById('gala-info-theme').value,
    music: document.getElementById('gala-info-music').value,
    tenue: document.getElementById('gala-info-tenue').value
  });
  closeModal('modal-gala-info');
  renderGalaTables();
};
window.deleteGalaInfo = function(id) {
  DATA.galaInfos = DATA.galaInfos.filter(r => r.id !== id);
  renderGalaTables();
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
window.saveGalaNote = function() {
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
};
window.deleteGalaNote = function(id) {
  DATA.galaNotes = DATA.galaNotes.filter(r => r.id !== id);
  renderGalaTables();
};

// =============================================
// DASHBOARD PROF
// =============================================
function renderProfDashboard(user) {
  renderUserAnnonces('prof');
  document.getElementById('prof-name').textContent = user.name;
  document.getElementById('prof-avatar').textContent = user.avatar;

  const taughtCourseIds = DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => c.id);
  
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
      selectedCourseId = parseInt(e.target.value);
      populateAppelDates(selectedCourseId);
      renderAppelList(selectedCourseId);
    };
  }
  if (selectedCourseId) {
    populateAppelDates(selectedCourseId);
    renderAppelList(selectedCourseId);
  }
  renderProfEleves(user);
  
  // Onglet: Mon Planning
  const btnEnseignes = document.getElementById('prof-planning-toggle-enseignes');
  const btnSuivis = document.getElementById('prof-planning-toggle-suivis');
  
  btnEnseignes.onclick = () => {
    btnEnseignes.classList.add('active');
    btnSuivis.classList.remove('active');
    renderPlanningCards(taughtCourseIds, 'prof-planning-list', 'Aucun cours enseigné.', user);
    renderWeeklyCalendar(taughtCourseIds, 'prof-planning-calendar');
  };
  btnSuivis.onclick = () => {
    btnSuivis.classList.add('active');
    btnEnseignes.classList.remove('active');
    renderPlanningCards(user.courseIds || [], 'prof-planning-list', 'Vous ne suivez aucun cours.', user);
    renderWeeklyCalendar(user.courseIds || [], 'prof-planning-calendar');
  };
  // Init default view
  btnEnseignes.click();

  const appelSaveBtn = document.getElementById('appel-save-btn');
  if (appelSaveBtn) {
    appelSaveBtn.onclick = () => {
      const dInput = document.getElementById('appel-date');
      const date = dInput.value.split('-').reverse().join('/');
      document.querySelectorAll('.appel-item').forEach(item => {
        const sid = parseInt(item.dataset.studentId);
        const selected = item.querySelector('.appel-btn.selected');
        if (selected) {
          const status = selected.dataset.status;
          DATA.markAttendance(sid, selectedCourseId, date, status);
        }
      });
      
        // Save Prof Hours to Firebase
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && window.AUTH && window.AUTH.currentUser) {
          const profId = window.AUTH.currentUser.id;
          const profName = window.AUTH.currentUser.firstname ? `${window.AUTH.currentUser.firstname} ${window.AUTH.currentUser.lastname}` : window.AUTH.currentUser.name;
          const docId = `${profId}_${selectedCourseId}_${date.replace(/\//g, '-')}`;
          const hours = parseFloat(hoursInput.value) || 0;
          
          if (hours > 0) {
            const record = { profId, profName, courseId: selectedCourseId, date, hours, timestamp: Date.now() };
            try {
              setDoc(doc(db, "prof_hours", docId), record);
              if (!DATA.prof_hours) DATA.prof_hours = [];
              const idx = DATA.prof_hours.findIndex(r => r.id === docId);
              if (idx > -1) DATA.prof_hours[idx] = { id: docId, ...record };
              else DATA.prof_hours.push({ id: docId, ...record });
              
              const statusEl = document.getElementById('prof-hours-status');
              if (statusEl) statusEl.innerHTML = `<span style="color: #27ae60;">✔️ Prestation validée : ${hours} heures</span>`;
            } catch (err) {
              console.error("Error saving prof hours:", err);
            }
          }
        }
        
        showToast('✅ Appel et heures sauvegardés !', 'success');
    };
  }
  
  document.getElementById('appel-date')?.addEventListener('change', () => {
    document.querySelectorAll('.appel-item .appel-btn').forEach(b => b.classList.remove('selected'));
  });
}

function populateAppelDates(courseId) {
  const select = document.getElementById('appel-date');
  if (!select) return;
  select.innerHTML = '';
  
  const slot = DATA.schedule.slots.find(s => s.courseId === courseId);
  const courseDay = slot ? slot.day : 0; // 0 = Lundi, 1 = Mardi, etc.
  const targetJsDay = (courseDay + 1) % 7; // Lundi = 1, Dimanche = 0
  
  const today = new Date();
  
  let d = new Date(today);
  while (d.getDay() !== targetJsDay) {
    d.setDate(d.getDate() + 1);
  }
  
  const dates = [];
  dates.push(new Date(d)); // Prochaine occurrence ou aujourd'hui
  
  for (let i = 1; i <= 8; i++) { // 8 dernières semaines
    const pastDate = new Date(d);
    pastDate.setDate(d.getDate() - (i * 7));
    dates.push(pastDate);
  }
  
  dates.sort((a, b) => b - a);
  
  const todayStr = today.toISOString().split('T')[0];
  let selectedIndex = 0;
  
  dates.forEach((dateObj, idx) => {
    const dateStr = dateObj.toISOString().split('T')[0];
    let displayStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
    displayStr = displayStr.charAt(0).toUpperCase() + displayStr.slice(1);
    
    if (slot && slot.hour) {
      displayStr += ` à ${slot.hour.replace(':', 'h')}`;
    }
    
    const option = document.createElement('option');
    option.value = dateStr;
    option.textContent = displayStr;
    select.appendChild(option);
    
    if (dateStr <= todayStr && selectedIndex === 0) {
      selectedIndex = idx;
    }
  });
  
  select.selectedIndex = selectedIndex;
}

function renderAppelList(courseId) {
  // Update Prof Hours UI
  const hoursInput = document.getElementById('prof-hours-input');
  const statusEl = document.getElementById('prof-hours-status');
  if (hoursInput && statusEl && window.AUTH && window.AUTH.currentUser) {
    const profId = window.AUTH.currentUser.id;
    const dInput = document.getElementById('appel-date');
    if (dInput) {
      const dateStr = dInput.value.split('-').reverse().join('/');
      const docId = `${profId}_${courseId}_${dateStr.replace(/\//g, '-')}`;
      const existing = DATA.prof_hours && DATA.prof_hours.find(p => p.id === docId);
      
      if (existing) {
        hoursInput.value = existing.hours;
        statusEl.innerHTML = `<span style="color: #27ae60;">✅ Prestation validée : ${existing.hours} heures</span>`;
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
  }

  const list = document.getElementById('appel-list');
  const students = DATA.getStudentsByCourse(courseId);
  if (students.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🩰</div><p>Aucun élève dans ce cours</p></div>';
    return;
  }
  list.innerHTML = '';
  students.forEach(s => {
    const item = document.createElement('div');
    item.className = 'appel-item';
    item.dataset.studentId = s.id;
    item.innerHTML = `
      <div>
        <div class="appel-student-name">${s.firstname} ${s.lastname}</div>
        <div class="appel-student-info">${s.age} ans</div>
      </div>
      <div class="appel-btns">
        <button class="appel-btn appel-btn-p" data-status="present" title="Présent(e)">✓ Présent</button>
        <button class="appel-btn appel-btn-a" data-status="absent"  title="Absent(e)">✗ Absent</button>
        <button class="appel-btn appel-btn-e" data-status="excuse"  title="Excusé(e)">~ Excusé</button>
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

function renderProfEleves(user) {
  const tbody = document.getElementById('prof-eleves-body');
  const taughtCourseIds = DATA.courses.filter(c => c.prof && c.prof.includes(user.name)).map(c => c.id);
  const allStudents = [...new Map(taughtCourseIds.flatMap(cid => DATA.getStudentsByCourse(cid)).map(s => [s.id, s])).values()];
  tbody.innerHTML = allStudents.map(s => {
    const att = DATA.getAttendanceByStudent(s.id);
    const pres = att.filter(a => a.status === 'present').length;
    const rate = att.length ? Math.round(pres / att.length * 100) : 100;
    const courses = s.courseIds.filter(id => taughtCourseIds.includes(id)).map(id => DATA.getCourseById(id)?.name).filter(Boolean).join(', ');
    const color = rate >= 80 ? '#90CC90' : rate >= 60 ? 'var(--gold)' : '#DC6464';
    
    // Cotisation display
    const isPayee = s.cotisation === 'payée' || s.cotisation === 'payee' || s.cotisation === 'paye';
    const cotClass = isPayee ? 'pill-approved' : 'pill-pending';
    const cotLabel = isPayee ? '✅ Payée' : '⏳ En attente';
    
    // Mutuelle display
    const mutStatus = s.mutuelle || 'masque';
    const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'en_cours' ? 'pill-pending' : 'pill-rejected');
    const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'en_cours' ? '⏳ En cours' : '⚠️ En attente');
    const mutDisplay = (mutStatus === 'masque') ? '<td style="color:#aaa;">Masqué</td>' : `<td><span class="status-pill ${mutClass}">${mutLabel}</span></td>`;
    
    return `<tr>
      <td><strong>${s.firstname} ${s.lastname}</strong></td>
      <td>${s.age} ans</td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${courses}</td>
      <td style="color:${color};font-weight:700">${rate}%</td>
      <td><span class="status-pill ${cotClass}">${cotLabel}</span></td>
      ${mutDisplay}
    </tr>`;
  }).join('');
}

// =============================================
// DASHBOARD PARENT
// =============================================
function renderParentDashboard(user) {
  renderUserAnnonces('parent');
  document.getElementById('parent-name').textContent = user.name;
  document.getElementById('parent-avatar').textContent = user.avatar;

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
  document.getElementById('parent-stat-mutuelle').innerHTML = (mutStatus === 'masque') ? '<span style="color:#aaa; font-size:0.85rem;">Masqué</span>' : `<span class="status-pill ${mutClass}">${mutLabel}</span>`;

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
    const slots = DATA.schedule.slots.filter(s => s.courseId === id);
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
    if (user && user.role === 'prof' && user.courseIds && user.courseIds.includes(c.id)) {
      // Le prof titulaire peut gérer
      actionButtons += `<button class="btn btn-outline btn-sm btn-manage" data-course-id="${c.id}">⚙️ Gérer</button>`;
    }
    if (user && user.role === 'parent' && studentId) {
      actionButtons += `<button class="btn btn-outline btn-sm btn-absent" data-course-id="${c.id}" data-student-id="${studentId}">📅 Présence</button>`;
    }
    actionButtons += `<button class="btn btn-outline btn-sm btn-msg" data-course-id="${c.id}">💬 Messages</button>`;
    actionButtons += `</div>`;

    return `<div class="portal-course-card" style="${isCancelled ? 'opacity:0.7;' : ''}">
      <img src="${c.image}" class="portal-course-img" alt="${c.name}">
      <div class="portal-course-info" style="flex:1;">
        <div class="portal-course-title" style="display:flex; justify-content:space-between; align-items:center;">
          <span style="${titleStyle}">${c.name}</span>
          ${badge}
        </div>
        <div class="portal-course-meta">
          <span style="${isCancelled ? 'text-decoration: line-through;' : ''}">🗓️ ${scheduleText}</span>
          <span>📍 ${c.lieu}</span>
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
    btn.onclick = () => openManageCourseModal(parseInt(btn.dataset.courseId));
  });
  container.querySelectorAll('.btn-absent').forEach(btn => {
    btn.onclick = () => openAbsenceModal(parseInt(btn.dataset.courseId), parseInt(btn.dataset.studentId));
  });
  container.querySelectorAll('.btn-msg').forEach(btn => {
    btn.onclick = () => openMessagesModal(parseInt(btn.dataset.courseId), user);
  });
}

function populateAbsenceDates(courseId) {
  const select = document.getElementById('absence-date');
  if (!select) return;
  select.innerHTML = '';
  
  const slot = DATA.schedule.slots.find(s => s.courseId === courseId);
  const courseDay = slot ? slot.day : 0;
  const targetJsDay = (courseDay + 1) % 7;
  
  const today = new Date();
  let d = new Date(today);
  while (d.getDay() !== targetJsDay) {
    d.setDate(d.getDate() + 1);
  }
  
  const dates = [];
    let safeguard = 0;
    const c = DATA.getCourseWithOverride(courseId);
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
  const cid = parseInt(document.getElementById('absence-course-id').value);
  const sid = parseInt(document.getElementById('absence-student-id').value);
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
    const currentDay = now.getDay();
  const currentHour = now.getHours() * 60 + now.getMinutes();

  const nextCourses = [];

  children.forEach(child => {
    let nextCourse = null;
    let minDiff = Infinity;

    (child.courseIds || []).forEach(cid => {
      const c = DATA.getCourseWithOverride(cid);
      if (!c || c.status === 'annule') return;
      
      let dayStr = c.schedule.split(' ')[0];
      let hourStr = c.schedule.split(' ')[1];
      if (c.date && c.date.includes(' ')) dayStr = c.date.split(' ')[0];
      if (c.hour) hourStr = c.hour;

      if (!daysMap.hasOwnProperty(dayStr)) return;
      
      const targetDay = daysMap[dayStr];
      const timeParts = hourStr.split('h');
      const targetHour = parseInt(timeParts[0]) * 60 + (parseInt(timeParts[1]) || 0);

      let diffDays = targetDay - currentDay;
      if (diffDays < 0 || (diffDays === 0 && targetHour <= currentHour)) {
        diffDays += 7; 
      }
      
      const targetDate = new Date(now);
      targetDate.setDate(now.getDate() + diffDays);
      const dd = String(targetDate.getDate()).padStart(2, '0');
      const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
      const dateStrObj = `${dd}/${mm}`;
      
      const diffMins = diffDays * 24 * 60 + (targetHour - currentHour);
      
      if (diffMins < minDiff) {
        minDiff = diffMins;
        nextCourse = { child, course: c, diffMins, dayStr, hourStr, dateStrObj };
      }
    });

    if (nextCourse) {
      nextCourses.push(nextCourse);
    }
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

document.getElementById('manage-course-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = parseInt(document.getElementById('manage-course-id').value);
  
  DATA.courseOverrides[id] = {
    type: document.getElementById('manage-course-type').value,
    status: document.getElementById('manage-course-status').value,
    hour: document.getElementById('manage-course-hour').value,
    date: document.getElementById('manage-course-date').value,
    lieu: document.getElementById('manage-course-lieu').value,
    substituteId: document.getElementById('manage-course-sub').value ? parseInt(document.getElementById('manage-course-sub').value) : null,
    message: document.getElementById('manage-course-msg').value
  };

  DATA.saveState();

  showToast('✅ Modifications enregistrées');
  document.getElementById('modal-manage-course').classList.remove('open');
  
  // Refresh dashboard
  if (AUTH.currentUser) showPortalDashboard(AUTH.currentUser);
});

// MESSAGES MODAL
let currentChatCourseId = null;
let currentChatUser = null;

function openMessagesModal(courseId, user) {
  const course = DATA.getCourseWithOverride(courseId);
  if (!course) return;
  currentChatCourseId = courseId;
  currentChatUser = user;

  document.getElementById('chat-course-title').textContent = `Messages : ${course.name}`;
  
  const msgTypeSelect = document.getElementById('chat-msg-type');
  if (user.role === 'prof') {
    const eleves = DATA.getStudentsByCourse(courseId)
      .map(s => s.parentId ? DATA.getUserById(s.parentId) : null)
      .filter(Boolean);
    const uniqueParents = [...new Map(eleves.map(p => [p.id, p])).values()];
    
    msgTypeSelect.innerHTML = `
      <option value="public">🌍 Message Public (Tous les eleves)</option>
      ${uniqueParents.map(p => `<option value="private-${p.id}">🔒 Privé à ${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</option>`).join('')}
    `;
  } else {
    msgTypeSelect.innerHTML = `
      <option value="public">🌍 Message Public (Tous les eleves)</option>
      <option value="private">🔒 Message Privé (Professeur uniquement)</option>
    `;
  }

  renderChatHistory();

  document.getElementById('modal-messages').classList.add('open');
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
    recipientId = parseInt(typeVal.split('-')[1]);
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
      courseIds: selectedCourses
    };
    if (isNew) {
      studentData.absences = [];
      studentData.avatar = `https://i.pravatar.cc/150?u=${targetId}`;
    }
    
    await setDoc(doc(db, "students", targetId), studentData, { merge: true });

    let tempPassword = null;
    if (isNew) {
      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const children = userData.childrenIds || [];
        if (!children.includes(targetId)) {
          await setDoc(userRef, { childrenIds: [...children, targetId] }, { merge: true });
        }
      } else {
        tempPassword = Math.random().toString(36).slice(-8);
        try {
          // Utilisation de l'API REST pour éviter la déconnexion automatique
          const apiKey = "AIzaSyBPOPRg9AxDqojhkskOIRO-4AHxvLICP7Q"; // Key from firebase-config.js
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: tempPassword, returnSecureToken: false })
          });
          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
        } catch(e) {
          console.warn("L'utilisateur existe peut-être déjà dans Auth, mais pas dans Firestore.", e);
        }
        
        await setDoc(userRef, {
          id: email,
          email: email,
          name: `${prenom} ${nom} (Parent)`,
          role: "parent",
          childrenIds: [targetId]
        });
      }
    }

    await DATA.syncFromFirebase();
    if (AUTH.hasRole('admin')) {
      showPortalDashboard(AUTH.currentUser);
    }

    closeModal('modal-add-student');
    document.getElementById('form-add-student').reset();
    showToast(isNew ? '✅ Élève ajouté avec succès' : '✅ Élève modifié avec succès', 'success');

    if (isNew && tempPassword) {
      try {
        await emailjs.send(
          "service_ADK",
          "template_ADK_Compte",
          {
            to_email: email,
            to_name: `${prenom} ${nom}`,
            temp_password: tempPassword,
            login_link: "https://liolux21.github.io/ecole-danse-adk-dev/portail.html"
          }
        );
        showToast('✉️ Email envoyé au parent avec succès !', 'success');
      } catch (emailError) {
        console.error("Erreur EmailJS:", emailError);
        alert(`⚠️ Le compte a été créé mais l'email n'a pas pu être envoyé.
Mot de passe temporaire: ${tempPassword}

(N'oublie pas de configurer EmailJS !)`);
      }
    }

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


function renderUserAnnonces(role) {
  const containerId = role === 'parent' ? 'parent-announcements-list' : 'prof-announcements-list';
  const wrapperId = role === 'parent' ? 'parent-announcements-container' : 'prof-announcements-container';
  const fullContainerId = role === 'parent' ? 'parent-notifications-full-list' : 'prof-notifications-full-list';
  const badgeId = role === 'parent' ? 'parent-notif-badge' : 'prof-notif-badge';
  
  const container = document.getElementById(containerId);
  const wrapper = document.getElementById(wrapperId);
  const fullContainer = document.getElementById(fullContainerId);
  const badge = document.getElementById(badgeId);
  
  if (!container || !wrapper || !fullContainer) return;

  const currentUser = window.AUTH.currentUser;
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
    userCourseIds = (currentUser.courseIds || []).map(String);
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
