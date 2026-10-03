import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

courses_match = re.search(r'window\.renderAdminCourses = function\(\) \{.*?\n};\n', js, re.DOTALL)
if not courses_match:
    print("Could not find renderAdminCourses")
else:
    courses_old = courses_match.group(0)
    courses_new = """window.renderAdminCourses = function() {
  const tbody = document.getElementById('admin-courses-tbody');
  if (!tbody) return;
  
  if (DATA.courses.length === 0) {
    tbody.innerHTML = '<div class="empty-state">Aucun cours défini.</div>';
    return;
  }

  tbody.innerHTML = DATA.courses.map(c => {
    return `
      <div style="background: #ffffff; padding: 1.2rem; border-radius: var(--radius); border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="margin: 0; color: #9C5858; font-size: 1.1rem; font-weight: bold;">${c.emoji || '💃'} ${c.name}</h4>
        </div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>👤 Professeur :</strong> ${c.prof}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>📅 Horaire :</strong> ${c.day} à ${c.time}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted);"><strong>🎂 Âge :</strong> ${c.age}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
          <button class="btn btn-outline btn-sm" onclick="openAddCourseModal('${c.id}')">✏️ Modifier</button>
          <button class="btn btn-outline btn-sm" style="color:#e74c3c;border-color:#e74c3c;" onclick="deleteCourse('${c.id}')">🗑️ Supprimer</button>
        </div>
      </div>
    `;
  }).join('');
};
"""
    js = js.replace(courses_old, courses_new)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
