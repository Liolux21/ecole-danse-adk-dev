import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'(DATA\.markAttendance\(sid, selectedCourseId, date, status\);\s*\}\s*\};\s*\}\);\s*)showToast\((.*?)\);'

replacement = r'''\1
        // Save Prof Hours
        const hoursInput = document.getElementById('prof-hours-input');
        if (hoursInput && window.AUTH && window.AUTH.currentUser) {
          const profId = window.AUTH.currentUser.id;
          const hours = parseFloat(hoursInput.value) || 0;
          const dateStr = date.replace(/\\//g, '-');
          const docId = `${profId}_${selectedCourseId}_${dateStr}`;
          
          const hourData = {
            id: docId,
            profId: profId,
            courseId: selectedCourseId,
            date: date,
            hours: hours
          };
          
          import('./firebase-config.js').then(firebase => {
            firebase.setDoc(firebase.doc(firebase.db, 'prof_hours', docId), hourData, { merge: true }).then(() => {
              if (!DATA.prof_hours) DATA.prof_hours = [];
              const idx = DATA.prof_hours.findIndex(p => p.id === docId);
              if (idx >= 0) DATA.prof_hours[idx] = hourData;
              else DATA.prof_hours.push(hourData);
            }).catch(e => console.error("Could not save prof hours:", e));
          });
        }
        
        showToast(\2);
        if (typeof renderAppelList === 'function') renderAppelList(selectedCourseId);'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
