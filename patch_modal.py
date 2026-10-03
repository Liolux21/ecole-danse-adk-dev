import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_code = '''window.openAddStudentModal = function(studentId = null) {
  const container = document.getElementById('add-student-courses');
    if (container) {
      container.innerHTML = DATA.courses.map(c => `
        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
          <input type="checkbox" class="course-checkbox" value="${c.id}">
          ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
        </label>
      `).join('');
    }
  
  if (studentId) {
    const student = DATA.getStudentById(studentId);
    document.getElementById('add-student-firstname').value = student.firstname || '';
    document.getElementById('add-student-lastname').value = student.lastname || '';
    document.getElementById('add-student-dob').value = student.dob || '';
    document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
    document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
    document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';
    document.getElementById('add-student-email').value = student.contactEmail || '';
    const email2Input = document.getElementById('add-student-email2');
    if (email2Input) email2Input.value = student.contactEmail2 || '';
    
    if (container) {
        const checkboxes = container.querySelectorAll('.course-checkbox');
        checkboxes.forEach(chk => {
          chk.checked = (student.courseIds || []).includes(chk.value);
        });
      }'''

new_code = '''window.openAddStudentModal = function(studentId = null) {
  const container = document.getElementById('add-student-courses');
    if (container) {
      // Sort courses by style then by name
      const sortedCourses = [...DATA.courses].sort((a, b) => {
        const styleA = (a.style || '').toLowerCase();
        const styleB = (b.style || '').toLowerCase();
        if (styleA !== styleB) return styleA.localeCompare(styleB);
        return (a.name || a.title || '').localeCompare(b.name || b.title || '');
      });
      container.innerHTML = sortedCourses.map(c => `
        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-size:0.9rem; cursor:pointer;">
          <input type="checkbox" class="course-checkbox" value="${c.id}">
          ${c.name || c.title} <span style="color:gray; font-size:0.8rem;">(${c.category || c.level || ''})</span>
        </label>
      `).join('');
    }
  
  if (studentId) {
    const student = DATA.getStudentById(studentId);
    document.getElementById('add-student-firstname').value = student.firstname || '';
    document.getElementById('add-student-lastname').value = student.lastname || '';
    document.getElementById('add-student-dob').value = student.dob || '';
    document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
    document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
    document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';
    document.getElementById('add-student-email').value = student.contactEmail || '';
    const email2Input = document.getElementById('add-student-email2');
    if (email2Input) email2Input.value = student.contactEmail2 || '';
    
    if (container) {
        const checkboxes = container.querySelectorAll('.course-checkbox');
        const studentCourseIds = (student.courseIds || []).map(String);
        checkboxes.forEach(chk => {
          chk.checked = studentCourseIds.includes(String(chk.value));
        });
      }'''

content = content.replace(old_code, new_code)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Modal patched")
