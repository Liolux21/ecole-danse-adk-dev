import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_open_modal = """window.openAddProfModal = function(id = null) {
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
        courseContainer.querySelectorAll('.prof-course-checkbox').forEach(cb => {
          if (p.courseIds.includes(parseInt(cb.value))) cb.checked = true;
        });
      }
      
      if (taughtContainer) {
        taughtContainer.querySelectorAll('.prof-taught-checkbox').forEach(cb => {
          const c = DATA.getCourseById(parseInt(cb.value));
          if (c && c.prof && c.prof.includes(p.name)) {
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
};"""

new_open_modal = """window.openAddProfModal = function(id = null) {
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
};"""

old_save_prof = """window.saveProf = function() {
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
      avatar: '👩‍🏫',
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

new_save_prof = """window.saveProf = async function() {
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

    // Update in Firebase users collection
    await firebase.setDoc(firebase.doc(firebase.db, 'users', targetId), profData, { merge: true });

    // Update local DATA
    let prof = DATA.users.find(u => u.id === targetId);
    if (!prof) {
      prof = { id: targetId, ...profData };
      DATA.users.push(prof);
    } else {
      Object.assign(prof, profData);
    }

    // Update courses prof string
    // Here we make a simple synchronous loop to update the local object,
    // but in a real system you'd also update the course docs in Firebase.
    // For simplicity, we assume courses just hold the name locally and are saved if edited.
    for (let c of DATA.courses) {
      if (selectedTaughtIds.includes(String(c.id))) {
        if (!c.prof) {
          c.prof = fullName;
        } else if (!c.prof.includes(fullName)) {
          c.prof = c.prof + ' - ' + fullName;
        }
      } else {
        if (c.prof && c.prof.includes(fullName)) {
          c.prof = c.prof.split('-').map(p => p.trim()).filter(p => p !== fullName).join(' - ');
        }
      }
      
      // Update the course in Firebase too if we have time, but let's just do it directly:
      await firebase.updateDoc(firebase.doc(firebase.db, 'courses', String(c.id)), { prof: c.prof });
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
};"""

js = re.sub(r'window\.openAddProfModal = function\(id = null\) \{.*?(?=\n\};\n)\n\};\n', new_open_modal + '\n', js, flags=re.DOTALL)
js = re.sub(r'window\.saveProf = function\(\) \{.*?(?=\n\};\n)\n\};\n', new_save_prof + '\n', js, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
