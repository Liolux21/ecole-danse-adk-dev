// =============================================
// ÉCOLE DE DANSE ADK — App v2 (3 rôles)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initHero();
  initCourses();
  initPlanning();
  initInscription();
  initPortal();       // Nouveau portail multi-rôles
  initActualites();
  initGalerie();
  initContact();
  initFooter();
  initReveal();
  initCountdown();
  initMobileMenu();
});

// =============================================
// NAVBAR
// =============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
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
  document.querySelector('.nav-burger').addEventListener('click', () =>
    document.querySelector('.mobile-menu').classList.toggle('open'));
}
function closeMobileMenu() { document.querySelector('.mobile-menu').classList.remove('open'); }

// =============================================
// PARTICLES
// =============================================
function initParticles() {
  const c = document.querySelector('.hero-particles');
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
      slot.style.height = '68px';
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
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Envoi en cours...';
    btn.disabled = true;
    setTimeout(() => { form.style.display = 'none'; success.style.display = 'block'; }, 1500);
  });
}

// =============================================
// PORTAIL MULTI-RÔLES
// =============================================
function initPortal() {
  AUTH.init();

  // Role hints (aide visuelle démo)
  const demoCreds = {
    admin:  '👑 Admin : <strong>admin@adk.be</strong> / <strong>admin2026</strong>',
    prof:   '👩‍🏫 Prof : <strong>prof@adk.be</strong> / <strong>prof2026</strong>',
    parent: '👨‍👩‍👧 Parent : <strong>parent@adk.be</strong> / <strong>parent2026</strong>',
  };
  document.querySelectorAll('.portal-role-hint').forEach(hint => {
    hint.addEventListener('click', () => {
      document.querySelectorAll('.portal-role-hint').forEach(h => h.classList.remove('active'));
      hint.classList.add('active');
      const role = hint.dataset.role;
      const creds = document.getElementById('demo-creds');
      creds.innerHTML = `💡 Démo — ${demoCreds[role]}`;
      creds.classList.add('visible');
      // Pré-remplir email
      document.getElementById('portal-email').value = `${role}@adk.be`;
      document.getElementById('portal-password').value = `${role}2026`;
    });
  });

  // Si déjà connecté, afficher le bon dashboard
  if (AUTH.isAuthenticated()) {
    showPortalDashboard(AUTH.currentUser);
  }

  // Formulaire de connexion
  document.getElementById('portal-login-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('portal-email').value;
    const password = document.getElementById('portal-password').value;
    const btn = document.getElementById('portal-submit-btn');
    btn.textContent = 'Connexion...';
    btn.disabled = true;
    setTimeout(() => {
      const user = AUTH.login(email, password);
      if (user) {
        showPortalDashboard(user);
      } else {
        showToast('❌ Email ou mot de passe incorrect', 'error');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg> Se connecter`;
        btn.disabled = false;
      }
    }, 600);
  });

  // Déconnexions
  ['admin', 'prof', 'parent'].forEach(role => {
    document.getElementById(`${role}-logout`).addEventListener('click', () => {
      AUTH.logout();
      document.getElementById('portal-login-wrapper').style.display = '';
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
  initTabs('admin-tabs', ['tab-inscriptions', 'tab-eleves', 'tab-profs']);
  initTabs('prof-tabs', ['tab-appel', 'tab-mes-eleves']);
}

function showPortalDashboard(user) {
  document.getElementById('portal-login-wrapper').style.display = 'none';
  document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`panel-${user.role}`);
  if (panel) panel.classList.add('active');
  if (user.role === 'admin')  renderAdminDashboard(user);
  if (user.role === 'prof')   renderProfDashboard(user);
  if (user.role === 'parent') renderParentDashboard(user);
}

// ---- TABS ----
function initTabs(tabsContainerId, contentIds) {
  const container = document.getElementById(tabsContainerId);
  if (!container) return;
  container.querySelectorAll('.dash-tab').forEach((tab, i) => {
    tab.addEventListener('click', () => {
      container.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      contentIds.forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); });
      tab.classList.add('active');
      const target = document.getElementById(contentIds[i]);
      if (target) target.classList.add('active');
    });
  });
}

// =============================================
// DASHBOARD ADMIN
// =============================================
function renderAdminDashboard(user) {
  document.getElementById('admin-name').textContent = user.name;
  document.getElementById('admin-avatar').textContent = user.avatar;

  // Stats
  const pending = DATA.getPendingInscriptions();
  document.getElementById('admin-stat-eleves').textContent = DATA.students.length;
  document.getElementById('admin-stat-pending').textContent = pending.length;
  document.getElementById('pending-badge').textContent = pending.length;

  renderAdminInscriptions();
  renderAdminEleves();
  renderAdminProfs();
}

function renderAdminInscriptions() {
  const list = document.getElementById('admin-inscription-list');
  list.innerHTML = '';
  if (DATA.inscriptions.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📭</div><p>Aucune inscription</p></div>';
    return;
  }
  DATA.inscriptions.forEach(ins => {
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
        <button class="btn-approve" onclick="adminApprove(${ins.id})" ${disabled}>✓ Accepter</button>
        <button class="btn-reject"  onclick="adminReject(${ins.id})"  ${disabled}>✗ Refuser</button>
        <a href="mailto:${ins.email}" class="btn btn-outline btn-sm">✉️ Contacter</a>
      </div>`;
    list.appendChild(card);
  });
}

function adminApprove(id) {
  DATA.approveInscription(id);
  renderAdminInscriptions();
  document.getElementById('admin-stat-pending').textContent = DATA.getPendingInscriptions().length;
  document.getElementById('pending-badge').textContent = DATA.getPendingInscriptions().length;
  showToast('✅ Inscription acceptée !', 'success');
}
function adminReject(id) {
  DATA.rejectInscription(id);
  renderAdminInscriptions();
  document.getElementById('admin-stat-pending').textContent = DATA.getPendingInscriptions().length;
  document.getElementById('pending-badge').textContent = DATA.getPendingInscriptions().length;
  showToast('❌ Inscription refusée', 'error');
}

function renderAdminEleves() {
  const tbody = document.getElementById('admin-eleves-body');
  tbody.innerHTML = DATA.students.map(s => {
    const courses = s.courseIds.map(id => DATA.getCourseById(id)?.name || '').filter(Boolean).join(', ');
    const cls = s.cotisation === 'payée' ? 'cotisation-payee' : 'cotisation-attente';
    const label = s.cotisation === 'payée' ? '✓ Payée' : '⏳ En attente';
    return `<tr><td><strong>${s.firstname} ${s.lastname}</strong></td><td>${s.age} ans</td><td style="color:var(--text-muted);font-size:0.82rem">${courses}</td><td><span class="cotisation-badge ${cls}">${label}</span></td></tr>`;
  }).join('');
}

function renderAdminProfs() {
  const tbody = document.getElementById('admin-profs-body');
  const profs = DATA.users.filter(u => u.role === 'prof');
  tbody.innerHTML = profs.map(p => {
    const courses = (p.courseIds || []).map(id => DATA.getCourseById(id)?.name || '').filter(Boolean).join(', ');
    const nbEleves = new Set((p.courseIds || []).flatMap(cid => DATA.getStudentsByCourse(cid).map(s => s.id))).size;
    return `<tr><td><strong>${p.avatar} ${p.name}</strong></td><td style="color:var(--text-muted)">${p.title}</td><td style="color:var(--text-muted);font-size:0.82rem">${courses}</td><td>${nbEleves}</td></tr>`;
  }).join('');
}

// =============================================
// DASHBOARD PROF
// =============================================
function renderProfDashboard(user) {
  document.getElementById('prof-name').textContent = user.name;
  document.getElementById('prof-avatar').textContent = user.avatar;

  const courseIds = user.courseIds || [];
  const courseSelector = document.getElementById('appel-courses');
  courseSelector.innerHTML = '';
  let selectedCourseId = courseIds[0] || null;

  // Date par défaut = aujourd'hui
  const dateInput = document.getElementById('appel-date');
  dateInput.value = new Date().toISOString().split('T')[0];

  // Boutons de cours
  courseIds.forEach((cid, i) => {
    const course = DATA.getCourseById(cid);
    if (!course) return;
    const btn = document.createElement('button');
    btn.className = `appel-course-btn${i === 0 ? ' active' : ''}`;
    btn.textContent = `${course.emoji} ${course.name}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.appel-course-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCourseId = cid;
      renderAppelList(cid);
    });
    courseSelector.appendChild(btn);
  });

  if (selectedCourseId) renderAppelList(selectedCourseId);
  renderProfEleves(user);

  // Bouton sauvegarder
  document.getElementById('appel-save-btn').onclick = () => {
    const date = dateInput.value.split('-').reverse().join('/');
    document.querySelectorAll('.appel-item').forEach(item => {
      const sid = parseInt(item.dataset.studentId);
      const selected = item.querySelector('.appel-btn.selected');
      if (selected) {
        const status = selected.dataset.status;
        DATA.markAttendance(sid, selectedCourseId, date, status);
      }
    });
    showToast('✅ Appel sauvegardé !', 'success');
  };
}

function renderAppelList(courseId) {
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
  const courseIds = user.courseIds || [];
  const allStudents = [...new Map(courseIds.flatMap(cid => DATA.getStudentsByCourse(cid)).map(s => [s.id, s])).values()];
  tbody.innerHTML = allStudents.map(s => {
    const att = DATA.getAttendanceByStudent(s.id);
    const pres = att.filter(a => a.status === 'present').length;
    const rate = att.length ? Math.round(pres / att.length * 100) : 100;
    const courses = s.courseIds.filter(id => courseIds.includes(id)).map(id => DATA.getCourseById(id)?.name).filter(Boolean).join(', ');
    const color = rate >= 80 ? '#90CC90' : rate >= 60 ? 'var(--gold)' : '#DC6464';
    return `<tr><td><strong>${s.firstname} ${s.lastname}</strong></td><td>${s.age} ans</td><td style="font-size:0.82rem;color:var(--text-muted)">${courses}</td><td style="color:${color};font-weight:700">${rate}%</td></tr>`;
  }).join('');
}

// =============================================
// DASHBOARD PARENT
// =============================================
function renderParentDashboard(user) {
  document.getElementById('parent-name').textContent = user.name;
  document.getElementById('parent-avatar').textContent = user.avatar;

  const children = DATA.getChildrenByParent(user.id);
  const childTabs = document.getElementById('child-tabs');
  childTabs.innerHTML = '';

  if (children.length === 0) {
    document.getElementById('parent-attendance-list').innerHTML = '<div class="empty-state"><div class="empty-state-icon">🩰</div><p>Aucun enfant associé à ce compte</p></div>';
    return;
  }

  children.forEach((child, i) => {
    const tab = document.createElement('button');
    tab.className = `child-tab${i === 0 ? ' active' : ''}`;
    tab.textContent = `🩰 ${child.firstname}`;
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
  document.getElementById('parent-child-name').textContent = child.firstname;
  const att = DATA.getAttendanceByStudent(child.id);
  const presents = att.filter(a => a.status === 'present').length;
  const absents  = att.filter(a => a.status === 'absent').length;

  document.getElementById('parent-stat-cours').textContent = child.courseIds.length;
  document.getElementById('parent-stat-presence').textContent = presents;
  document.getElementById('parent-stat-absence').textContent = absents;

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
  const event = DATA.nextEvent;
  document.getElementById('event-name').textContent = event.name;
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
  document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message envoyé ! Nous vous répondrons sous 48h.', 'success');
    e.target.reset();
  });
}

// =============================================
// FOOTER
// =============================================
function initFooter() { document.getElementById('footer-year').textContent = new Date().getFullYear(); }

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
