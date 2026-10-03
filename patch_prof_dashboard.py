import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Fix openAddCourseModal
modal_match = re.search(r'window\.openAddCourseModal = function\(courseId = null\) \{.*?\};', js, re.DOTALL)
if modal_match:
    modal_old = modal_match.group(0)
    modal_new = """window.openAddCourseModal = function(courseId = null) {
  const profSelect = document.getElementById('manage-course-prof');
  if (profSelect) {
    const profs = DATA.users.filter(u => u.role === 'prof');
    profSelect.innerHTML = profs.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
  }
  
  if (courseId) {
    const course = DATA.getCourseById(courseId);
    document.getElementById('manage-course-id').value = course.id;
    document.getElementById('manage-course-name').value = course.name;
    if (profSelect) profSelect.value = course.prof;
    document.getElementById('manage-course-schedule').value = course.schedule || '';
    document.getElementById('manage-course-age').value = course.ages || '';
    document.getElementById('manage-course-title').textContent = "Modifier le cours";
  } else {
    document.getElementById('form-manage-course').reset();
    document.getElementById('manage-course-id').value = '';
    document.getElementById('manage-course-title').textContent = "Nouveau cours";
  }
  
  openModal('modal-add-course');
};"""
    js = js.replace(modal_old, modal_new)

# 2. Fix renderProfEleves
eleves_match = re.search(r'function renderProfEleves\(user\) \{.*?\n\}', js, re.DOTALL)
if eleves_match:
    eleves_old = eleves_match.group(0)
    eleves_new = """function renderProfEleves(user) {
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
    const mutStatus = s.mutuelle || 'attente';
    const mutClass = mutStatus === 'remis' ? 'pill-approved' : (mutStatus === 'cours' ? 'pill-pending' : 'pill-rejected');
    const mutLabel = mutStatus === 'remis' ? '✅ Remis' : (mutStatus === 'cours' ? '🔄 En cours' : '⏳ En attente');
    
    return `<tr>
      <td><strong>${s.firstname} ${s.lastname}</strong></td>
      <td>${s.age} ans</td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${courses}</td>
      <td style="color:${color};font-weight:700">${rate}%</td>
      <td><span class="status-pill ${cotClass}">${cotLabel}</span></td>
      <td><span class="status-pill ${mutClass}">${mutLabel}</span></td>
    </tr>`;
  }).join('');
}"""
    js = js.replace(eleves_old, eleves_new)

# 3. Fix renderProfDashboard
dashboard_match = re.search(r'function renderProfDashboard\(user\) \{.*?\n\}', js, re.DOTALL)
if dashboard_match:
    dashboard_old = dashboard_match.group(0)
    dashboard_new = """function renderProfDashboard(user) {
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
      showToast('✅ Appel sauvegardé !', 'success');
    };
  }
  
  document.getElementById('appel-date')?.addEventListener('change', () => {
    document.querySelectorAll('.appel-item .appel-btn').forEach(b => b.classList.remove('selected'));
  });
}"""
    js = js.replace(dashboard_old, dashboard_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
