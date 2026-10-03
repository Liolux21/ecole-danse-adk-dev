import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Fix the render loop variables (c.day/c.time -> c.schedule, c.age -> c.ages)
render_old = """          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📅 Horaire :</strong> ${c.day} à ${c.time}</div>
          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>🎂 Âge :</strong> ${c.age}</div>"""

render_new = """          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📅 Horaire :</strong> ${c.schedule || 'Non défini'}</div>
          <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>🎂 Âge :</strong> ${c.ages || 'Non défini'}</div>"""

js = js.replace(render_old, render_new)

# Fix openAddCourseModal and submitManageCourse
modal_js_old = """window.openAddCourseModal = function(courseId = null) {
  const profSelect = document.getElementById('manage-course-prof');
  if (profSelect) {
    const profs = DATA.users.filter(u => u.role === 'prof');
    profSelect.innerHTML = profs.map(p => `<option value="${p.firstname ? p.firstname + ' ' + p.lastname : p.name}">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</option>`).join('');
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
};

window.submitManageCourse = async function() {
  const btn = document.querySelector('#form-manage-course button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = "Sauvegarde...";
  btn.disabled = true;

  try {
    let id = document.getElementById('manage-course-id').value;
    const isNew = !id;
    if (isNew) id = "crs_" + Date.now();
    
    const courseData = {
      id: id,
      name: document.getElementById('manage-course-name').value,
      prof: document.getElementById('manage-course-prof').value,
      schedule: document.getElementById('manage-course-schedule').value,
      ages: document.getElementById('manage-course-age').value,
      category: "Nouveau",
      style: "classique", // par défaut
      lieu: "ADK" // par défaut
    };

    const firebase = await import('./firebase-config.js');
    await firebase.setDoc(firebase.doc(firebase.db, 'courses', String(id)), courseData, { merge: true });

    if (isNew) {
      DATA.courses.push({ docId: String(id), ...courseData });
    } else {
      const existing = DATA.getCourseById(id);
      if (existing) Object.assign(existing, courseData);
    }

    closeModal('modal-add-course');
    renderAdminCourses();
  } catch (err) {
    console.error(err);
    alert("Erreur: " + err.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};"""

# Replace in js file with regex or exact match, but they might be indented
# So I'll use regex to replace openAddCourseModal through the end of submitManageCourse
pattern = r'window\.openAddCourseModal = function.*?btn\.disabled = false;\s*\}\s*\};'

modal_js_new = """window.openAddCourseModal = function(courseId = null) {
  const profSelect = document.getElementById('admin-course-prof');
  if (profSelect) {
    const profs = DATA.users.filter(u => u.role === 'prof');
    profSelect.innerHTML = profs.map(p => `<option value="${p.firstname ? p.firstname + ' ' + p.lastname : p.name}">${p.firstname ? p.firstname + ' ' + p.lastname : p.name}</option>`).join('');
  }
  
  if (courseId) {
    const course = DATA.getCourseById(courseId);
    if (course) {
      document.getElementById('admin-course-id').value = course.id;
      document.getElementById('admin-course-name').value = course.name;
      if (profSelect) profSelect.value = course.prof || '';
      document.getElementById('admin-course-schedule').value = course.schedule || '';
      document.getElementById('admin-course-age').value = course.ages || '';
      document.getElementById('admin-course-title').textContent = "Modifier le cours";
    }
  } else {
    const form = document.getElementById('form-admin-course');
    if (form) form.reset();
    document.getElementById('admin-course-id').value = '';
    document.getElementById('admin-course-title').textContent = "Nouveau cours";
  }
  
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
    
    const courseData = {
      id: id,
      name: document.getElementById('admin-course-name').value,
      prof: document.getElementById('admin-course-prof').value,
      schedule: document.getElementById('admin-course-schedule').value,
      ages: document.getElementById('admin-course-age').value,
      category: "Nouveau",
      style: "classique", // par défaut
      lieu: "ADK" // par défaut
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
  } catch (err) {
    console.error(err);
    alert("Erreur: " + err.message);
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
  }
};"""

js = re.sub(pattern, modal_js_new, js, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
