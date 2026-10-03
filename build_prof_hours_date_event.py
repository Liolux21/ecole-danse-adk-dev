import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_event = """    document.getElementById('appel-date')?.addEventListener('change', () => {
      document.querySelectorAll('.appel-item .appel-btn').forEach(b => b.classList.remove('selected'));
    });"""

new_event = """    document.getElementById('appel-date')?.addEventListener('change', () => {
      // Re-render appel list to update hours validation for new date
      if (selectedCourseId) {
        renderAppelList(selectedCourseId);
      } else {
        document.querySelectorAll('.appel-item .appel-btn').forEach(b => b.classList.remove('selected'));
      }
    });"""

js = js.replace(old_event, new_event)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
