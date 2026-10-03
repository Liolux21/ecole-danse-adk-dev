import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update openAddStudentModal
old_open_modal = """      document.getElementById('add-student-firstname').value = student.firstname;
      document.getElementById('add-student-lastname').value = student.lastname;
      document.getElementById('add-student-age').value = student.age;
      document.getElementById('add-student-email').value = student.contactEmail || '';"""

new_open_modal = """      document.getElementById('add-student-firstname').value = student.firstname || '';
      document.getElementById('add-student-lastname').value = student.lastname || '';
      document.getElementById('add-student-dob').value = student.dob || '';
      document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
      document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
      document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';
      document.getElementById('add-student-email').value = student.contactEmail || '';"""

js = js.replace(old_open_modal, new_open_modal)

# Also clear the fields for new student in openAddStudentModal
old_clear = """      document.getElementById('add-student-firstname').value = '';
      document.getElementById('add-student-lastname').value = '';
      document.getElementById('add-student-age').value = '';
      document.getElementById('add-student-email').value = '';"""

new_clear = """      document.getElementById('add-student-firstname').value = '';
      document.getElementById('add-student-lastname').value = '';
      document.getElementById('add-student-dob').value = '';
      document.getElementById('add-student-tutor-firstname').value = '';
      document.getElementById('add-student-tutor-lastname').value = '';
      document.getElementById('add-student-tutor-phone').value = '';
      document.getElementById('add-student-email').value = '';"""

js = js.replace(old_clear, new_clear)

# 2. Update submitAddStudent
old_submit = """      const prenom = document.getElementById('add-student-firstname').value;
      const nom = document.getElementById('add-student-lastname').value;
      const age = document.getElementById('add-student-age').value;
      const email = document.getElementById('add-student-email').value;
      const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
        const selectedCourses = Array.from(checkboxes).map(chk => chk.value);
  
      const targetId = isNew ? "stu_" + Date.now() : studentId;
      const studentData = {
        firstname: prenom,
        lastname: nom,
        age: parseInt(age, 10),
        contactEmail: email,
        courseIds: selectedCourses,
        parentId: email,
        absences: isNew ? [] : student.absences
      };"""

new_submit = """      const prenom = document.getElementById('add-student-firstname').value;
      const nom = document.getElementById('add-student-lastname').value;
      const dob = document.getElementById('add-student-dob').value;
      const tutorFirstname = document.getElementById('add-student-tutor-firstname').value;
      const tutorLastname = document.getElementById('add-student-tutor-lastname').value;
      const tutorPhone = document.getElementById('add-student-tutor-phone').value;
      const email = document.getElementById('add-student-email').value;
      const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);
  
      // Calculate age from dob
      let age = 0;
      if (dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
      }

      const targetId = isNew ? "stu_" + Date.now() : studentId;
      const studentData = {
        firstname: prenom,
        lastname: nom,
        dob: dob,
        age: age,
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,
        contactEmail: email,
        courseIds: selectedCourses,
        parentId: email,
        absences: isNew ? [] : (DATA.getStudentById(studentId)?.absences || [])
      };"""

js = js.replace(old_submit, new_submit)

# Also fix the CSV Export to include dob instead of Age
# Wait, I already did that in the previous version! But let's check.
# The user said "le bouton extraire (excel) fonctionne mais..." so it was working.

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
