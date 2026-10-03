import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r'''window\.renderAdminCourses = function\(\) \{\n\s*const tbody = document\.getElementById\('admin-courses-tbody'\);\n\s*if \(\!tbody\) return;\n\s*if \(DATA\.courses\.length === 0\) \{\n\s*tbody\.innerHTML = '<div class="empty-state">Aucun cours défini\.</div>';\n\s*return;\n\s*\}\n\s*tbody\.innerHTML = DATA\.courses\.map\(c => \{'''

replacement = r'''window.renderAdminCourses = function() {
  const tbody = document.getElementById('admin-courses-tbody');
  if (!tbody) return;
  
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
    tbody.innerHTML = '<div class="empty-state">Aucun cours ne correspond aux filtres.</div>';
    return;
  }
  
  tbody.innerHTML = courses.map(c => {'''

js = re.sub(pattern, replacement, js)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
