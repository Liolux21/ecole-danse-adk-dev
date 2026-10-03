import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Add logic to renderAppelList
old_func = """function renderAppelList(courseId) {
  const list = document.getElementById('appel-list');
  const students = DATA.getStudentsByCourse(courseId);"""

new_func = """function renderAppelList(courseId) {
  // Update Prof Hours UI
  const hoursInput = document.getElementById('prof-hours-input');
  const statusEl = document.getElementById('prof-hours-status');
  if (hoursInput && statusEl && window.AUTH && window.AUTH.currentUser) {
    const profId = window.AUTH.currentUser.id;
    const dInput = document.getElementById('appel-date');
    if (dInput) {
      const dateStr = dInput.value.split('-').reverse().join('/');
      const docId = `${profId}_${courseId}_${dateStr.replace(/\//g, '-')}`;
      const existing = DATA.prof_hours && DATA.prof_hours.find(p => p.id === docId);
      
      if (existing) {
        hoursInput.value = existing.hours;
        statusEl.innerHTML = `<span style="color: #27ae60;">✅ Prestation validée : ${existing.hours} heures</span>`;
      } else {
        // Calculate default hours based on schedule slot
        let defaultHours = 1;
        const slot = DATA.schedule && DATA.schedule.slots.find(s => s.courseId === courseId);
        if (slot && slot.hour && slot.hour.includes('-')) {
          const parts = slot.hour.split('-');
          const start = parts[0].trim().split('h');
          const end = parts[1].trim().split('h');
          if (start.length === 2 && end.length === 2) {
            const startDec = parseInt(start[0]) + (parseInt(start[1] || '0') / 60);
            const endDec = parseInt(end[0]) + (parseInt(end[1] || '0') / 60);
            if (endDec > startDec) {
              defaultHours = endDec - startDec;
            }
          }
        }
        hoursInput.value = defaultHours;
        statusEl.innerHTML = `Confirmez vos heures pour cette session`;
      }
    }
  }

  const list = document.getElementById('appel-list');
  const students = DATA.getStudentsByCourse(courseId);"""

js = js.replace(old_func, new_func)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
