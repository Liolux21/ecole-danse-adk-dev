import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace appelSaveBtn logic
old_logic = """    const appelSaveBtn = document.getElementById('appel-save-btn');
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

new_logic = """    const appelSaveBtn = document.getElementById('appel-save-btn');
    if (appelSaveBtn) {
      appelSaveBtn.onclick = async () => {
        const dInput = document.getElementById('appel-date');
        const date = dInput.value.split('-').reverse().join('/');
        
        // Save attendance
        document.querySelectorAll('.appel-item').forEach(item => {
          const sid = item.dataset.studentId;
          const selected = item.querySelector('.appel-btn.selected');
          if (selected) {
            const status = selected.dataset.status;
            // The sid in DATA might be string or int. Be careful.
            DATA.markAttendance(sid, selectedCourseId, date, status);
          }
        });

        // Save Prof Hours
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && hoursInput.value) {
          const hours = parseFloat(hoursInput.value);
          if (hours > 0) {
            try {
              const profId = user.id;
              const firebase = await import('./firebase-config.js');
              // Doc ID logic: profId_courseId_date
              const docId = `${profId}_${selectedCourseId}_${date.replace(/\//g, '-')}`;
              const docData = {
                profId,
                courseId: selectedCourseId,
                date,
                hours,
                timestamp: Date.now()
              };
              
              await firebase.setDoc(firebase.doc(firebase.db, 'prof_hours', docId), docData, { merge: true });
              
              // Update local DATA
              const existing = DATA.prof_hours.find(p => p.id === docId);
              if (existing) {
                existing.hours = hours;
              } else {
                DATA.prof_hours.push({ id: docId, ...docData });
              }
              
              const statusEl = document.getElementById('prof-hours-status');
              if (statusEl) {
                statusEl.innerHTML = `<span style="color: #27ae60;">✅ Prestation validée : ${hours} heures</span>`;
              }
            } catch (err) {
              console.error("Erreur sauvegarde heures: ", err);
              alert("L'appel est sauvegardé mais une erreur est survenue pour les heures : " + err.message);
            }
          }
        }
        
        showToast('✅ Appel sauvegardé !', 'success');
      };
    }"""

js = js.replace(old_logic, new_logic)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
