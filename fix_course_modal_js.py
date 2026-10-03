import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# ADD toggleAdminCourseFields
if 'window.toggleAdminCourseFields' not in js:
    js = js.replace('window.openAddCourseModal = function', '''window.toggleAdminCourseFields = function() {
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
window.openAddCourseModal = function''')

# UPDATE openAddCourseModal
pattern_open = r'window\.openAddCourseModal = function\(courseId = null\) \{.*?\s*openModal\(\'modal-admin-course\'\);\n\};'

replacement_open = r'''window.openAddCourseModal = function(courseId = null) {
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
        if(course.schedule) {
           let sp = course.schedule.split(' - ');
           if(sp.length >= 1) {
             let d1 = sp[0].split('/');
             if(d1.length === 3) document.getElementById('admin-course-start-date').value = `${d1[2]}-${d1[1]}-${d1[0]}`;
           }
           if(sp.length >= 2) {
             let d2 = sp[1].split('/');
             if(d2.length === 3) document.getElementById('admin-course-end-date').value = `${d2[2]}-${d2[1]}-${d2[0]}`;
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
  }
  
  window.toggleAdminCourseFields();
  openModal('modal-admin-course');
};'''

js = re.sub(pattern_open, replacement_open, js, flags=re.DOTALL)


pattern_submit = r'window\.submitAdminCourse = async function\(\) \{.*?\n\s*await firebase\.setDoc.*?\}\n\s*\}\n'

replacement_submit = r'''window.submitAdminCourse = async function() {
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
        if(sd) {
           let dp = sd.split('-');
           scheduleStr = `${dp[2]}/${dp[1]}/${dp[0]}`;
        }
        if(ed) {
           let dp2 = ed.split('-');
           scheduleStr += ` - ${dp2[2]}/${dp2[1]}/${dp2[0]}`;
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
      style: "classique",
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
'''

js = re.sub(pattern_submit, replacement_submit, js, flags=re.DOTALL)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
