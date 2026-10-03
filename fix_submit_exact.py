import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Instead of replacing a giant block, let's use regex to replace precisely
js = re.sub(
    r"const age = document\.getElementById\('add-student-age'\)\.value;",
    """const dob = document.getElementById('add-student-dob').value;
      const tutorFirstname = document.getElementById('add-student-tutor-firstname').value;
      const tutorLastname = document.getElementById('add-student-tutor-lastname').value;
      const tutorPhone = document.getElementById('add-student-tutor-phone').value;""",
    js
)

js = re.sub(
    r"age: parseInt\(age, 10\),",
    """dob: dob,
        age: (dob ? (new Date().getFullYear() - new Date(dob).getFullYear() - ((new Date().getMonth() - new Date(dob).getMonth() < 0 || (new Date().getMonth() === new Date(dob).getMonth() && new Date().getDate() < new Date(dob).getDate())) ? 1 : 0)) : 0),
        tutorFirstname: tutorFirstname,
        tutorLastname: tutorLastname,
        tutorPhone: tutorPhone,""",
    js
)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
