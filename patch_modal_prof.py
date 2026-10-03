import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

modal_match = re.search(r'window\.openAddProfModal = function.*?window\.saveProf = function.*?\}\;', js, re.DOTALL)
if modal_match:
    modal_old = modal_match.group(0)
    modal_new = """window.openAddProfModal = function(id = null) {
  document.getElementById('form-add-prof').reset();
  const titleEl = document.getElementById('prof-modal-title');
  const courseContainer = document.getElementById('add-prof-courses');
  const taughtContainer = document.getElementById('add-prof-taught-courses');
  
  if (courseContainer) {
    courseContainer.innerHTML = DATA.courses.map(c => `
      <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
        <input type="checkbox" class="prof-course-checkbox" value="${c.id}">
        ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
      </label>
    `).join('');
  }
  
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
      
      if (taughtContainer) {
        const checkboxes = taughtContainer.querySelectorAll('.prof-taught-checkbox');
        checkboxes.forEach(cb => {
          const c = DATA.getCourseById(parseInt(cb.value));
          if (c && c.prof && c.prof.includes(p.name)) {
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
  
  let selectedTaughtIds = [];
  const taughtContainer = document.getElementById('add-prof-taught-courses');
  if (taughtContainer) {
    const checkboxes = taughtContainer.querySelectorAll('.prof-taught-checkbox');
    checkboxes.forEach(cb => {
      if (cb.checked) selectedTaughtIds.push(parseInt(cb.value));
    });
  }

  if (id) {
    const prof = DATA.users.find(u => u.id === id);
    if (prof) {
      // Update courses prof string
      DATA.courses.forEach(c => {
        if (selectedTaughtIds.includes(c.id)) {
          // ensure prof.name is in c.prof
          if (!c.prof) {
            c.prof = prof.name;
          } else if (!c.prof.includes(prof.name)) {
            c.prof = c.prof + ' - ' + prof.name;
          }
        } else {
          // remove prof.name from c.prof
          if (c.prof && c.prof.includes(prof.name)) {
            c.prof = c.prof.split('-').map(p => p.trim()).filter(p => p !== prof.name).join(' - ');
          }
        }
      });
      
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
    // Update courses prof string for new prof
    DATA.courses.forEach(c => {
      if (selectedTaughtIds.includes(c.id)) {
        if (!c.prof) {
          c.prof = name;
        } else if (!c.prof.includes(name)) {
          c.prof = c.prof + ' - ' + name;
        }
      }
    });
  }
  closeModal('modal-add-prof');
  renderAdminProfs();
};"""
    js = js.replace(modal_old, modal_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
