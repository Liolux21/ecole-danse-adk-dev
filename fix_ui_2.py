import re
with open('old_eleves.txt', 'r', encoding='utf-8') as f:
    old_eleves = f.read()
with open('old_profs.txt', 'r', encoding='utf-8') as f:
    old_profs = f.read()
with open('old_courses.txt', 'r', encoding='utf-8') as f:
    old_courses = f.read()

new_eleves = """function renderAdminEleves() {
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
    const isPayee = s.cotisation === 'payée' || s.cotisation === 'payee';
    const cotClass = isPayee ? 'select-payee' : 'select-attente';
    const cotSelect = `
      <select class="status-select ${cotClass}" onchange="updateCotisation('${s.id}', this.value)" style="margin: 0; padding: 0.4rem; font-size: 0.9rem; padding-right: 2rem;">
        <option value="attente" ${!isPayee ? 'selected' : ''}>⏳ En attente</option>
        <option value="payée" ${isPayee ? 'selected' : ''}>✅ Payée</option>
      </select>
    `;
    const mutStatus = s.mutuelle || 'attente';
    const mutClass = mutStatus === 'remis' ? 'select-remis' : (mutStatus === 'cours' ? 'select-encours' : 'select-attente');
    const mutSelect = `
      <select class="status-select ${mutClass}" onchange="updateMutuelle('${s.id}', this.value)" style="margin: 0; padding: 0.4rem; font-size: 0.9rem; padding-right: 2rem;">
        <option value="attente" ${mutStatus === 'attente' ? 'selected' : ''}>⏳ En attente</option>
        <option value="cours" ${mutStatus === 'cours' ? 'selected' : ''}>🔄 En cours</option>
        <option value="remis" ${mutStatus === 'remis' ? 'selected' : ''}>✅ Remis</option>
      </select>
    `;
    
    return `
      <div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.2rem; font-weight: bold;">${s.firstname} ${s.lastname} <span style="color: var(--text-muted); font-size: 0.95rem; font-weight: normal;">(${s.age} ans)</span></h4>
        </div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>📚 Cours suivis :</strong> ${courses || '-'}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; background: rgba(0,0,0,0.02); padding: 0.8rem; border-radius: var(--radius); border: 1px solid rgba(0,0,0,0.05);">
          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
            ${cotSelect}
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.3rem;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
            ${mutSelect}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('${s.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteStudent('${s.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}
"""

new_profs = """function renderAdminProfs() {
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
    
    return `
      <div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.2rem; font-weight: bold;">${p.avatar || '👤'} ${p.name}</h4>
        </div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>💃 Cours enseignés :</strong> ${coursesNames || '-'}</div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>👥 Total élèves :</strong> ${nbEleves}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddProfModal('${p.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteProf('${p.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
}
"""

new_courses = """window.renderAdminCourses = function() {
    const tbody = document.getElementById('admin-courses-tbody');
    if (!tbody) return;
    
    if (DATA.courses.length === 0) {
      tbody.innerHTML = '<div class="empty-state">Aucun cours défini.</div>';
      return;
    }

    tbody.innerHTML = DATA.courses.map(c => {
      return `
      <div style="background: #ffffff; padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.2rem; font-weight: bold;">${c.emoji || '💃'} ${c.name}</h4>
        </div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>👤 Professeur :</strong> ${c.prof}</div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>📅 Horaire :</strong> ${c.day} à ${c.time}</div>
        <div style="font-size: 0.95rem; color: var(--text-muted);"><strong>🎂 Âge :</strong> ${c.age}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.5rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddCourseModal('${c.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteCourse('${c.id}')">🗑️ Supprimer</button>
        </div>
      </div>
      `;
    }).join('');
  };
"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace(old_eleves, new_eleves)
js = js.replace(old_profs, new_profs)
js = js.replace(old_courses, new_courses)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
