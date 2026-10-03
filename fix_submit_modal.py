import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the specific lines inside submitAddStudent
old_lines = """      const isNew = !studentId;
      const prenom = document.getElementById('add-student-firstname').value;
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

new_lines = """      const isNew = !studentId;
      const prenom = document.getElementById('add-student-firstname').value;
      const nom = document.getElementById('add-student-lastname').value;
      const dob = document.getElementById('add-student-dob').value;
      const tutorFirstname = document.getElementById('add-student-tutor-firstname').value;
      const tutorLastname = document.getElementById('add-student-tutor-lastname').value;
      const tutorPhone = document.getElementById('add-student-tutor-phone').value;
      const email = document.getElementById('add-student-email').value;
      const checkboxes = document.querySelectorAll('#add-student-courses .course-checkbox:checked');
      const selectedCourses = Array.from(checkboxes).map(chk => chk.value);
  
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

js = js.replace(old_lines, new_lines)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
