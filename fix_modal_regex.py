import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update openAddStudentModal (setting values when student is found)
js = re.sub(
    r"document\.getElementById\('add-student-firstname'\)\.value = student\.firstname;\s*document\.getElementById\('add-student-lastname'\)\.value = student\.lastname;\s*document\.getElementById\('add-student-age'\)\.value = student\.age;\s*document\.getElementById\('add-student-email'\)\.value = student\.contactEmail \|\| '';",
    """document.getElementById('add-student-firstname').value = student.firstname || '';
    document.getElementById('add-student-lastname').value = student.lastname || '';
    document.getElementById('add-student-dob').value = student.dob || '';
    document.getElementById('add-student-tutor-firstname').value = student.tutorFirstname || '';
    document.getElementById('add-student-tutor-lastname').value = student.tutorLastname || '';
    document.getElementById('add-student-tutor-phone').value = student.tutorPhone || '';
    document.getElementById('add-student-email').value = student.contactEmail || '';""",
    js
)

# 2. Update openAddStudentModal (clearing values when student is null)
js = re.sub(
    r"document\.getElementById\('add-student-firstname'\)\.value = '';\s*document\.getElementById\('add-student-lastname'\)\.value = '';\s*document\.getElementById\('add-student-age'\)\.value = '';\s*document\.getElementById\('add-student-email'\)\.value = '';",
    """document.getElementById('add-student-firstname').value = '';
    document.getElementById('add-student-lastname').value = '';
    document.getElementById('add-student-dob').value = '';
    document.getElementById('add-student-tutor-firstname').value = '';
    document.getElementById('add-student-tutor-lastname').value = '';
    document.getElementById('add-student-tutor-phone').value = '';
    document.getElementById('add-student-email').value = '';""",
    js
)

# 3. Update submitAddStudent
old_submit_regex = r"const prenom = document\.getElementById\('add-student-firstname'\)\.value;\s*const nom = document\.getElementById\('add-student-lastname'\)\.value;\s*const age = document\.getElementById\('add-student-age'\)\.value;\s*const email = document\.getElementById\('add-student-email'\)\.value;\s*const checkboxes = document\.querySelectorAll\('#add-student-courses \.course-checkbox:checked'\);\s*const selectedCourses = Array\.from\(checkboxes\)\.map\(chk => chk\.value\);\s*const targetId = isNew \? \"stu_\" \+ Date\.now\(\) : studentId;\s*const studentData = \{\s*firstname: prenom,\s*lastname: nom,\s*age: parseInt\(age, 10\),\s*contactEmail: email,\s*courseIds: selectedCourses,\s*parentId: email,\s*absences: isNew \? \[\] : student\.absences\s*\};"

new_submit = """const prenom = document.getElementById('add-student-firstname').value;
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

js = re.sub(old_submit_regex, new_submit, js)

with open('portail.html', 'r', encoding='utf-8') as pf:
    html = pf.read()
html = re.sub(r'src="js/app.js\?v=\d+"', 'src="js/app.js?v=29"', html)
with open('portail.html', 'w', encoding='utf-8') as pf:
    pf.write(html)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
