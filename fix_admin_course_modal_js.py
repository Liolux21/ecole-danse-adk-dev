import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern_open = r"document\.getElementById\('admin-course-age'\)\.value = course\.ages \|\| '';\n\s*document\.getElementById\('admin-course-title'\)\.textContent = \"Modifier le cours\";"
replacement_open = r'''document.getElementById('admin-course-age').value = course.ages || '';
      const typeEl = document.getElementById('admin-course-type');
      if (typeEl) typeEl.value = course.eventType || 'regulier';
      document.getElementById('admin-course-title').textContent = "Modifier le cours";'''

pattern_submit = r"ages: document\.getElementById\('admin-course-age'\)\.value,\n\s*category: \"Nouveau\","
replacement_submit = r'''ages: document.getElementById('admin-course-age').value,
      eventType: document.getElementById('admin-course-type') ? document.getElementById('admin-course-type').value : 'regulier',
      isPriority: (document.getElementById('admin-course-type') && document.getElementById('admin-course-type').value !== 'regulier'),
      category: "Nouveau",'''

js = re.sub(pattern_open, replacement_open, js)
js = re.sub(pattern_submit, replacement_submit, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
