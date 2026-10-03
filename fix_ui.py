import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace renderAdminEleves
old_eleves = re.search(r'function renderAdminEleves\(\).*?\n\}\n', js, re.DOTALL)
if old_eleves:
    new_eleves = \"\"\"function renderAdminEleves() {
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
    const isPayee = s.cotisation === 'pay?e' || s.cotisation === 'payee';
    const cotClass = isPayee ? 'select-payee' : 'select-attente';
    const cotSelect = \
      <select class="status-select \" onchange="updateCotisation('\', this.value)" style="margin: 0; padding: 0.2rem; font-size: 0.85rem;">
        <option value="attente" \>? En attente</option>
        <option value="pay?e" \>? Pay?e</option>
      </select>
    \;
    const mutStatus = s.mutuelle || 'attente';
    const mutClass = mutStatus === 'remis' ? 'select-remis' : (mutStatus === 'cours' ? 'select-encours' : 'select-attente');
    const mutSelect = \
      <select class="status-select \" onchange="updateMutuelle('\', this.value)" style="margin: 0; padding: 0.2rem; font-size: 0.85rem;">
        <option value="attente" \>? En attente</option>
        <option value="cours" \>? En cours</option>
        <option value="remis" \>? Remis</option>
      </select>
    \;
    
    return \
      <div style="background: #fff; padding: 1rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: var(--gold); font-size: 1.1rem;">\ \ <span style="color: var(--text-muted); font-size: 0.9rem; font-weight: normal;">(\ ans)</span></h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Cours suivis :</strong> \</div>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; background: rgba(0,0,0,0.02); padding: 0.5rem; border-radius: var(--radius);">
          <div style="display: flex; flex-direction: column; gap: 0.2rem;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Cotisation</span>
            \
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.2rem;">
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">Mutuelle</span>
            \
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="openAddStudentModal('\')">?? Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteStudent('\')">??? Supprimer</button>
        </div>
      </div>
    \;
  }).join('');
}
\"\"\"
    new_eleves = new_eleves.replace('? ', '')
    js = js.replace(old_eleves.group(0), new_eleves)


# Replace renderAdminProfs
old_profs = re.search(r'function renderAdminProfs\(\).*?\n\}\n', js, re.DOTALL)
if old_profs:
    new_profs = \"\"\"function renderAdminProfs() {
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
    
    return \
      <div style="background: #fff; padding: 1rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: var(--gold); font-size: 1.1rem;">\ \</h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Cours enseignés :</strong> \</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Total élèves :</strong> \</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="openAddProfModal('\')">?? Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteProf('\')">??? Supprimer</button>
        </div>
      </div>
    \;
  }).join('');
}
\"\"\"
    js = js.replace(old_profs.group(0), new_profs)


# Replace renderAdminCourses
old_courses = re.search(r'window\.renderAdminCourses = function\(\) \{.*?\n  \};\n', js, re.DOTALL)
if old_courses:
    new_courses = \"\"\"window.renderAdminCourses = function() {
    const tbody = document.getElementById('admin-courses-tbody');
    if (!tbody) return;
    
    if (DATA.courses.length === 0) {
      tbody.innerHTML = '<div class="empty-state">Aucun cours défini.</div>';
      return;
    }

    tbody.innerHTML = DATA.courses.map(c => {
      return \
      <div style="background: #fff; padding: 1rem; border-radius: var(--radius); border: 1px solid var(--border-color); margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: var(--gold); font-size: 1.1rem;">\ \</h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Professeur :</strong> \</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Horaire :</strong> \ à \</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>Âge :</strong> \</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="openAddCourseModal('\')">?? Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteCourse('\')">??? Supprimer</button>
        </div>
      </div>
      \;
    }).join('');
  };
\"\"\"
    js = js.replace(old_courses.group(0), new_courses)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Done replacing in app.js")
