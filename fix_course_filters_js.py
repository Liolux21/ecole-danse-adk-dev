import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. renderAdminCourses
pattern_render = r'window\.renderAdminCourses = function\(\) \{\n\s*const container = document\.getElementById\(\'admin-courses-tbody\'\);\n\s*if \(\!container\) return;\n\s*if \(\!DATA\.courses \|\| DATA\.courses\.length === 0\) \{\n\s*container\.innerHTML = `<div class="empty-state">Aucun cours disponible\.</div>`;\n\s*return;\n\s*\}'

replacement_render = r'''window.renderAdminCourses = function() {
  const container = document.getElementById('admin-courses-tbody');
  if (!container) return;
  
  const typeFilter = document.getElementById('filter-course-type') ? document.getElementById('filter-course-type').value : 'all';
  const styleFilter = document.getElementById('filter-course-style') ? document.getElementById('filter-course-style').value : 'all';
  
  let courses = DATA.courses || [];
  if (typeFilter !== 'all') {
     courses = courses.filter(c => (c.eventType || 'regulier') === typeFilter);
  }
  if (styleFilter !== 'all') {
     courses = courses.filter(c => c.style === styleFilter);
  }

  if (courses.length === 0) {
    container.innerHTML = `<div class="empty-state">Aucun cours ne correspond aux filtres.</div>`;
    return;
  }'''

js = re.sub(pattern_render, replacement_render, js)

# 2. openAddCourseModal
pattern_open = r'if \(typeEl\) typeEl\.value = course\.eventType \|\| \'regulier\';'
replacement_open = r'''if (typeEl) typeEl.value = course.eventType || 'regulier';
      const styleEl = document.getElementById('admin-course-style');
      if (styleEl) styleEl.value = course.style || 'classique';'''

js = re.sub(pattern_open, replacement_open, js)

pattern_open2 = r'document\.getElementById\(\'admin-course-title\'\)\.textContent = "Nouveau cours / événement";'
replacement_open2 = r'''document.getElementById('admin-course-title').textContent = "Nouveau cours / événement";
    const styleEl = document.getElementById('admin-course-style');
    if (styleEl) styleEl.value = 'classique';'''

js = re.sub(pattern_open2, replacement_open2, js)

# 3. submitAdminCourse
pattern_submit = r'style: "classique",'
replacement_submit = r'''style: document.getElementById('admin-course-style') ? document.getElementById('admin-course-style').value : 'classique','''

js = re.sub(pattern_submit, replacement_submit, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
