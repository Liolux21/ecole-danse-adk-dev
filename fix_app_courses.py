import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. openAddStudentModal
old_1 = r"""const select = document.getElementById\('add-student-courses'\);\s*if \(select\) \{\s*select\.innerHTML = DATA\.courses\.map\(c => `<option value="\$\{c\.id\}">\$\{c\.name \|\| c\.title\} \(\$\{c\.category \|\| c\.level \|\| ''\}\)</option>`\)\.join\(''\);\s*\}"""
new_1 = """const container = document.getElementById('add-student-courses');
    if (container) {
      container.innerHTML = DATA.courses.map(c => `
        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
          <input type="checkbox" class="course-checkbox" value="${c.id}">
          ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
        </label>
      `).join('');
    }"""
app = re.sub(old_1, new_1, app)

# 2. openAddStudentModal setting selected
old_2 = r"""Array\.from\(select\.options\)\.forEach\(opt => \{\s*opt\.selected = \(student\.courseIds \|\| \[\]\)\.includes\(opt\.value\);\s*\}\);"""
new_2 = """if (container) {
        const checkboxes = container.querySelectorAll('.course-checkbox');
        checkboxes.forEach(chk => {
          chk.checked = (student.courseIds || []).includes(chk.value);
        });
      }"""
app = re.sub(old_2, new_2, app)

# 3. submitAddStudent
old_3 = r"""const select = document\.getElementById\('add-student-courses'\);\s*const selectedCourses = Array\.from\(select\.selectedOptions\)\.map\(opt => opt\.value\);"""
new_3 = """const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);"""
app = re.sub(old_3, new_3, app)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print('app.js updated')
