import re

# Update portail.html
with open('portail.html', 'r', encoding='utf-8') as f:
    html = f.read()

modal_section_new = '''<div class="vitrine-modal" id="modal-add-student">
    <div class="vitrine-modal-content" style="max-width: 550px;">
      <div class="vitrine-modal-header" style="padding-right: 2.5rem;">
        <h2 class="vitrine-modal-title">Ajouter un élève</h2>
        <button class="vitrine-modal-close" onclick="closeModal('modal-add-student')">&times;</button>
      </div>
      <div class="vitrine-modal-body">
        <form id="form-add-student" onsubmit="event.preventDefault(); submitAddStudent();">
          <input type="hidden" id="add-student-id">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Prénom</label>
              <input type="text" id="add-student-firstname" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input type="text" id="add-student-lastname" class="form-input" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Âge</label>
            <input type="number" id="add-student-age" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Cours</label>
            <div id="add-student-courses" style="max-height: 150px; overflow-y: auto; padding: 1rem; border: 1px solid rgba(0,0,0,0.2); border-radius: 8px; background: #f9f9f9;">
              <!-- Dynamique checkboxes -->
            </div>
          </div>
          <div class="form-group" id="group-add-parent-email">
            <label class="form-label">Email parent (optionnel)</label>
            <input type="email" id="add-student-email" class="form-input">
          </div>
          <div class="form-group" id="group-add-parent-checkbox">
            <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.9rem; margin-top:0.5rem; cursor:pointer;">
              <input type="checkbox" id="add-parent-checkbox" checked>
              Créer un accès portail Parent et envoyer le mot de passe
            </label>
          </div>
          
          <div style="text-align: right; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>'''

html = re.sub(r'<div class="vitrine-modal" id="modal-add-student">.*?Enregistrer</button>\s*</form>\s*</div>', modal_section_new, html, flags=re.DOTALL)
html = html.replace('?v=31', '?v=32')
with open('portail.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('portail.html updated')

with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()
idx = idx.replace('?v=31', '?v=32')
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)

# Update app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Update openAddStudentModal to inject checkboxes
old_open_code = """  window.openAddStudentModal = function(studentId = null) {
    const select = document.getElementById('add-student-courses');
    if (select) {
      select.innerHTML = DATA.courses.map(c => `<option value="${c.id}">${c.name || c.title} (${c.category || c.level || ''})</option>`).join('');
    }"""
new_open_code = """  window.openAddStudentModal = function(studentId = null) {
    const container = document.getElementById('add-student-courses');
    if (container) {
      container.innerHTML = DATA.courses.map(c => `
        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
          <input type="checkbox" class="course-checkbox" value="${c.id}">
          ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
        </label>
      `).join('');
    }"""
app = app.replace(old_open_code, new_open_code)

# 2. Update selectedCourses in openAddStudentModal
old_selected_check = """      document.getElementById('add-student-email').value = student.contactEmail || '';
      const select = document.getElementById('add-student-courses');
      if (select && student.courseIds) {
        Array.from(select.options).forEach(opt => opt.selected = student.courseIds.includes(opt.value));
      }"""
new_selected_check = """      document.getElementById('add-student-email').value = student.contactEmail || '';
      if (container && student.courseIds) {
        const checkboxes = container.querySelectorAll('.course-checkbox');
        checkboxes.forEach(chk => {
          chk.checked = student.courseIds.includes(chk.value);
        });
      }"""
app = app.replace(old_selected_check, new_selected_check)

# 3. Update submitAddStudent to read checkboxes
old_submit_read = """      const age = document.getElementById('add-student-age').value;
      const email = document.getElementById('add-student-email').value;
      const select = document.getElementById('add-student-courses');
      const selectedCourses = Array.from(select.selectedOptions).map(opt => opt.value);"""
new_submit_read = """      const age = document.getElementById('add-student-age').value;
      const email = document.getElementById('add-student-email').value;
      const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);"""
app = app.replace(old_submit_read, new_submit_read)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app)
print('app.js updated')
