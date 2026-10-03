import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Patch renderAdminProfs
profs_match = re.search(r'function renderAdminProfs\(\) \{.*?\n\}\n', js, re.DOTALL)
if profs_match:
    profs_old = profs_match.group(0)
    profs_new = """function renderAdminProfs() {
  const tbody = document.getElementById('admin-profs-body');
  const profs = DATA.users.filter(u => u.role === 'prof');
  tbody.innerHTML = profs.map(p => {
    const taughtCourses = DATA.courses.filter(c => c.prof === p.name);
    const coursesNames = taughtCourses.map(c => c.name).join(', ');
    const allStudentIds = new Set();
    taughtCourses.forEach(c => {
      DATA.getStudentsByCourse(c.id).forEach(s => allStudentIds.add(s.id));
    });
    const nbEleves = allStudentIds.size;
    
    const takenCourses = (p.courseIds || []).map(id => DATA.getCourseById(id)?.name || '').filter(Boolean).join(', ');

    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${p.avatar || '👤'} ${p.name}</h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>💃 Cours enseignés :</strong> ${coursesNames || '-'}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📚 Cours suivis :</strong> ${takenCourses || '-'}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👥 Total élèves :</strong> ${nbEleves}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddProfModal('${p.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteProf('${p.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}
"""
    js = js.replace(profs_old, profs_new)

# 2. Patch openAddProfModal and saveProf
modal_match = re.search(r'window\.openAddProfModal = function.*?window\.saveProf = function.*?\}\;', js, re.DOTALL)
if modal_match:
    modal_old = modal_match.group(0)
    modal_new = """window.openAddProfModal = function(id = null) {
  document.getElementById('form-add-prof').reset();
  const titleEl = document.getElementById('prof-modal-title');
  const courseContainer = document.getElementById('add-prof-courses');
  
  if (courseContainer) {
    courseContainer.innerHTML = DATA.courses.map(c => `
      <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
        <input type="checkbox" class="prof-course-checkbox" value="${c.id}">
        ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
      </label>
    `).join('');
  }

  if (id) {
    titleEl.textContent = "Modifier le professeur";
    const p = DATA.users.find(u => u.id === id);
    if (p) {
      document.getElementById('prof-id').value = p.id;
      document.getElementById('prof-name').value = p.name;
      document.getElementById('prof-email').value = p.email;
      
      if (courseContainer && p.courseIds) {
        const checkboxes = courseContainer.querySelectorAll('.prof-course-checkbox');
        checkboxes.forEach(cb => {
          if (p.courseIds.includes(parseInt(cb.value)) || p.courseIds.includes(cb.value)) {
            cb.checked = true;
          }
        });
      }
    }
  } else {
    titleEl.textContent = "Ajouter un professeur";
    document.getElementById('prof-id').value = '';
  }
  openModal('modal-add-prof');
};

window.saveProf = function() {
  const id = document.getElementById('prof-id').value;
  const name = document.getElementById('prof-name').value;
  const email = document.getElementById('prof-email').value;
  
  let selectedCourseIds = [];
  const courseContainer = document.getElementById('add-prof-courses');
  if (courseContainer) {
    const checkboxes = courseContainer.querySelectorAll('.prof-course-checkbox');
    checkboxes.forEach(cb => {
      if (cb.checked) selectedCourseIds.push(parseInt(cb.value));
    });
  }

  if (id) {
    const prof = DATA.users.find(u => u.id === id);
    if (prof) {
      prof.name = name;
      prof.email = email;
      prof.courseIds = selectedCourseIds;
    }
  } else {
    DATA.users.push({
      id: 'prof_' + Date.now(),
      role: 'prof',
      name: name,
      email: email,
      avatar: '👤',
      courseIds: selectedCourseIds
    });
  }
  closeModal('modal-add-prof');
  renderAdminProfs();
};"""
    js = js.replace(modal_old, modal_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
