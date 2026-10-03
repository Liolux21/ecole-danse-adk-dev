import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update openAddProfModal
open_old = """      if (p) {
        document.getElementById('prof-id').value = p.id;
        document.getElementById('prof-firstname').value = p.firstname || '';
        document.getElementById('prof-lastname').value = p.lastname || '';
        document.getElementById('prof-dob').value = p.dob || '';
        document.getElementById('prof-email').value = p.email || '';
        document.getElementById('prof-phone').value = p.phone || '';"""

open_new = """      if (p) {
        document.getElementById('prof-id').value = p.id;
        document.getElementById('prof-firstname').value = p.firstname || '';
        document.getElementById('prof-lastname').value = p.lastname || '';
        document.getElementById('prof-dob').value = p.dob || '';
        document.getElementById('prof-email').value = p.email || '';
        document.getElementById('prof-phone').value = p.phone || '';
        document.getElementById('prof-gender').value = p.gender || 'F';"""
js = js.replace(open_old, open_new)

# 2. Update saveProf
save_old = """      const dob = document.getElementById('prof-dob').value;
      let email = document.getElementById('prof-email').value;
      email = email.toLowerCase().trim();
      const phone = document.getElementById('prof-phone').value;"""

save_new = """      const dob = document.getElementById('prof-dob').value;
      let email = document.getElementById('prof-email').value;
      email = email.toLowerCase().trim();
      const phone = document.getElementById('prof-phone').value;
      const gender = document.getElementById('prof-gender').value;"""
js = js.replace(save_old, save_new)

profdata_old = """      const profData = {
        role: 'prof',
        firstname,
        lastname,
        name: fullName,
        dob,
        email,
        phone,"""

profdata_new = """      const profData = {
        role: 'prof',
        firstname,
        lastname,
        name: fullName,
        dob,
        email,
        phone,
        gender,"""
js = js.replace(profdata_old, profdata_new)

# 3. Update showPortalDashboard
badge_old = """      if (user.role === 'prof') {
        document.getElementById('prof-name').textContent = user.name || (user.firstname + ' ' + user.lastname);"""

badge_new = """      if (user.role === 'prof') {
        document.getElementById('prof-name').textContent = user.name || (user.firstname + ' ' + user.lastname);
        const badgeSpan = document.querySelector('#panel-prof .dash-user-role .role-badge');
        if (badgeSpan) badgeSpan.textContent = user.gender === 'M' ? '👨‍🏫 Professeur' : '👩‍🏫 Professeure';"""
js = js.replace(badge_old, badge_new)

# 4. Add prof_hours saving to appelSaveBtn.onclick
# The current code is:
appel_old = """    const appelSaveBtn = document.getElementById('appel-save-btn');
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
    }"""

appel_new = """    const appelSaveBtn = document.getElementById('appel-save-btn');
    if (appelSaveBtn) {
      appelSaveBtn.onclick = async () => {
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
        
        // Save Prof Hours
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && window.AUTH && window.AUTH.currentUser) {
          const profId = window.AUTH.currentUser.id;
          const hours = parseFloat(hoursInput.value) || 0;
          const dateStr = date.replace(/\//g, '-');
          const docId = `${profId}_${selectedCourseId}_${dateStr}`;
          
          const hourData = {
            id: docId,
            profId: profId,
            courseId: selectedCourseId,
            date: date,
            hours: hours
          };
          
          const firebase = await import('./firebase-config.js');
          try {
            await firebase.setDoc(firebase.doc(firebase.db, 'prof_hours', docId), hourData, { merge: true });
            if (!DATA.prof_hours) DATA.prof_hours = [];
            const idx = DATA.prof_hours.findIndex(p => p.id === docId);
            if (idx >= 0) DATA.prof_hours[idx] = hourData;
            else DATA.prof_hours.push(hourData);
          } catch(e) {
            console.error("Could not save prof hours:", e);
          }
        }
        
        showToast('✅ Appel sauvegardé !', 'success');
        if (typeof renderAppelList === 'function') renderAppelList(selectedCourseId);
      };
    }"""

js = js.replace(appel_old, appel_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
